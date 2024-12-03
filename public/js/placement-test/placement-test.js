// public/js/placement-test/placement-test.js

// Determine the quiz category from the data attribute or URL
let quiz_category = document.body.getAttribute("data-quiz-category") || "";
if (!quiz_category) {
  const path = window.location.pathname;
  if (path.includes("use-of-english")) {
    quiz_category = "uoe";
  } else if (path.includes("listening")) {
    quiz_category = "listening";
  }
}

// Variables for test state
let timer;
let timeLimit = 20 * 60; // 20 minutes in seconds
let timeElapsed = timeLimit;
let totalIncorrectAnswers = 0;
let consecutiveIncorrectAnswers = 0;
let testInProgress = false;
let startTime;

let currentLevel = 2;
let previousLevel = null;
let incorrectStreak = 0;
let questionsAnswered = [];
let points = 0;
let listeningScore = 0;
let useOfEnglishScore = 0;
let listeningQuestionsCount = 0;
let useOfEnglishQuestionsCount = 0;
let errors = [];

const questionElement = document.getElementById("question");
const answerForm = document.getElementById("answer-form");
const messageElement = document.getElementById("message");

// Variables specific to listening
let playCount = 0;
let currentAudioId = null;

document.addEventListener("DOMContentLoaded", () => {
  const startTestButton = document.getElementById("start-test");
  const modal = document.getElementById("modal");
  const questionDiv = document.getElementById("question");

  startTestButton.addEventListener("click", () => {
    if (!testInProgress) {
      startTime = new Date();
      testInProgress = true;
      modal.style.display = "none";
      questionDiv.style.display = "block";
      startTimer();
      startTest();
    }
  });

  window.addEventListener("beforeunload", (e) => {
    if (timeElapsed < timeLimit && testInProgress) {
      e.preventDefault();
      e.returnValue =
        "Do you really want to refresh the page? The test is still in progress and you will lose your progress. Hit the 'Cancel' button to continue doing the test, and click the 'refresh' button to refresh the page.";
    }
  });
});

// Start timer function
function startTimer() {
  timer = setInterval(() => {
    timeElapsed--;
    updateStopwatch();
    if (timeElapsed <= 0) {
      clearInterval(timer);
      endTest();
    }
  }, 1000);
}

function updateStopwatch() {
  const stopwatch = document.getElementById("stopwatch");
  const hours = Math.floor(timeElapsed / 3600);
  const minutes = Math.floor((timeElapsed % 3600) / 60);
  const seconds = timeElapsed % 60;

  stopwatch.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
  return number.toString().padStart(2, "0");
}

// Utility function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to start the test
function startTest() {
  getNextQuestion(currentLevel)
    .then((question) => {
      if (question === null || currentLevel === null) {
        endTest();
      } else {
        questionsAnswered.push(question);
        displayQuestion(question);
      }
    })
    .catch((error) => {
      console.error("Error fetching question:", error);
      endTest();
    });
}

// Function to get the next question
function getNextQuestion(level) {
  const answeredQuestionIds = questionsAnswered.map((q) => q.id.toString());

  return fetch("/api/get-question", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quiz_category: quiz_category,
      currentLevel: level,
      answeredQuestionIds: answeredQuestionIds,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.question) {
        return data.question;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error("Error fetching question:", error);
      return null;
    });
}

// Function to display the question
function displayQuestion(question) {
  // Clear the previous question
  questionElement.innerHTML = "";

  if (question.audioUrl && question.audioUrl !== "") {
    displayListeningQuestion(question);
  } else {
    displayUseOfEnglishQuestion(question);
  }
}

function displayListeningQuestion(question) {
  // Clear the previous question
  questionElement.innerHTML = "";

  // Check if the audio is from a different question
  if (currentAudioId !== question.id) {
    playCount = 0;
    currentAudioId = question.id;
  }

  // Display the audio player
  questionElement.innerHTML = `
  <div class="audioContainer">
      <audio id="audio" controlsList="nodownload" playbackRate="1" disableRemotePlayback>
          <source src="${question.audioUrl}" type="audio/mpeg">
          Your browser does not support the audio element.
      </audio>
      <i id="audioPlayButton" class="fa-solid fa-circle-play fa-2xl" style="color: #0e124d; cursor: pointer;"></i>
  </div>
  <hr>
`;

  const tempContainer = document.createElement("div");
  tempContainer.className = "options-container"; // Add a class to the container

  if (question.options) {
    const listeningPromptContainer = document.createElement("div");
    listeningPromptContainer.className = "listening-prompt"; // Add a class to the listening prompt container

    const listeningPromptText = document.createElement("p");
    listeningPromptText.innerHTML = question.text;
    listeningPromptContainer.appendChild(listeningPromptText);

    tempContainer.appendChild(listeningPromptContainer);
    // Shuffle the options array for randomness
    shuffleArray(question.options);

    // Create and display radio buttons for each option
    const optionsContainer = document.createElement("div");
    optionsContainer.className =
      question.answerType === "single" ? "radio-buttons" : "checkbox-buttons";

    question.options.forEach((option) => {
      const optionContainer = document.createElement("div");
      optionContainer.className = "radio-option"; // Add a class to the option container

      // Add event listener to the optionContainer for better UX
      optionContainer.addEventListener("click", (event) => {
        if (question.answerType === "single") {
          // For single answer type, behave like radio buttons
          const inputElement = optionContainer.querySelector(
            'input[type="radio"]'
          );
          if (inputElement) {
            inputElement.checked = true;
          }

          // Remove 'selected' class from all options
          const allOptions = document.querySelectorAll(".radio-option");
          allOptions.forEach((opt) => opt.classList.remove("selected"));

          // Add 'selected' class to the clicked optionContainer
          optionContainer.classList.add("selected");
        } else {
          // For multiple answers type, behave like checkboxes
          const inputElement = optionContainer.querySelector(
            'input[type="checkbox"]'
          );
          if (inputElement) {
            inputElement.checked = !inputElement.checked;
            optionContainer.classList.toggle("selected");
          }
        }
      });

      const optionLabel = document.createElement("label");
      optionLabel.className = "option-label"; // Add a class to the label

      const optionElement = document.createElement("input");
      optionElement.type =
        question.answerType === "single" ? "radio" : "checkbox";
      optionElement.name =
        question.answerType === "single" ? "option" : "options"; // Ensure correct name for single or multiple answers
      optionElement.className = "option"; // Add a class to the radio button or checkbox
      optionElement.value = option;

      // Hide the default radio button or checkbox visually but make it accessible
      optionElement.style.opacity = 0;
      optionElement.style.position = "absolute";
      optionElement.style.left = "-9999px";

      const optionText = document.createTextNode(option);

      optionLabel.appendChild(optionElement);
      optionLabel.appendChild(optionText);

      optionContainer.appendChild(optionLabel);
      optionsContainer.appendChild(optionContainer);
    });

    // Append the 'Omit this question' option only for single answer type
    if (question.answerType === "single") {
      const omitOptionContainer = document.createElement("div");
      omitOptionContainer.className = "radio-option";

      // Add event listener to the omitOptionContainer for better UX
      omitOptionContainer.addEventListener("click", () => {
        const inputElement = omitOptionContainer.querySelector(
          'input[type="radio"]'
        );
        if (inputElement) {
          inputElement.checked = true;
        }

        // Remove 'selected' class from all options
        const allOptions = document.querySelectorAll(".radio-option");
        allOptions.forEach((opt) => opt.classList.remove("selected"));

        // Add 'selected' class to the clicked omitOptionContainer
        omitOptionContainer.classList.add("selected");
      });

      const omitOptionLabel = document.createElement("label");
      const omitOptionElement = document.createElement("input");
      omitOptionElement.type = "radio";
      omitOptionElement.name = "option";
      omitOptionElement.className = "option";
      omitOptionElement.value = "Omit this question. I don't know the answer";

      omitOptionElement.style.opacity = 0;
      omitOptionElement.style.position = "absolute";
      omitOptionElement.style.left = "-9999px";

      omitOptionLabel.appendChild(omitOptionElement);
      const omitOptionText = document.createTextNode(
        "Omit this question. I don't know the answer"
      );
      omitOptionLabel.appendChild(omitOptionText);
      omitOptionContainer.appendChild(omitOptionLabel);
      optionsContainer.appendChild(omitOptionContainer); // Append the 'Omit' option last
    }

    tempContainer.appendChild(optionsContainer);
  }

  // Append the options container to the main question element
  while (tempContainer.firstChild) {
    questionElement.appendChild(tempContainer.firstChild);
  }

  // Add a listener to the Font Awesome play button to handle audio play
  const audioElement = document.getElementById("audio");
  const audioPlayButton = document.getElementById("audioPlayButton");

  audioPlayButton.addEventListener("click", () => {
    // If the playCount is under the limit, play the audio
    if (playCount < 2) {
      audioElement.play();
    }

    // If the playCount reaches the limit, alert the user, disable the play button and change its color
    if (playCount == 2) {
      alert("You can only play the recording twice.");
      audioPlayButton.classList.add("disabled");
    }
  });

  // Listen for the audio ending and increment the play count
  audioElement.addEventListener("ended", () => {
    playCount++;

    if (playCount < 2) {
      audioPlayButton.classList.remove("disabled");
    }
  });
}

function displayUseOfEnglishQuestion(question) {
  // Clear the previous question
  questionElement.innerHTML = "";

  // Create a container for the question and image (if any)
  const questionContainer = document.createElement("div");
  questionContainer.className = "question-container"; // Add a class to the question container for flex styling

  const grammarPromptContainer = document.createElement("div");
  grammarPromptContainer.className = "grammar-prompt"; // Add a class to the grammar prompt container

  // Check if the question has an image URL and create an img element if it does
  if (question.url) {
    const questionImage = document.createElement("img");
    questionImage.src = question.url;
    questionImage.className = "questionPic"; // Add class for styling the image
    grammarPromptContainer.appendChild(questionImage); // Append the image to the grammar prompt container
  }

  if (question.options && question.options.length > 0) {
    // Append the grammar prompt to the grammar prompt container
    const grammarPromptText = document.createElement("p");
    grammarPromptText.innerHTML = question.text;
    grammarPromptContainer.appendChild(grammarPromptText);

    // Shuffle the options array for randomness
    shuffleArray(question.options);

    question.options.forEach((option) => {
      const optionContainer = document.createElement("div");
      optionContainer.className = "radio-option"; // Add a class to the option container

      // Add event listener to the optionContainer for better UX
      optionContainer.addEventListener("click", () => {
        // Find the radio input inside this optionContainer and check it
        const inputElement = optionContainer.querySelector(
          'input[type="radio"]'
        );
        if (inputElement) {
          inputElement.checked = true;
        }

        // Remove 'selected' class from all options
        const allOptions = document.querySelectorAll(".radio-option");
        allOptions.forEach((opt) => opt.classList.remove("selected"));

        // Add 'selected' class to the clicked optionContainer
        optionContainer.classList.add("selected");
      });

      const optionLabel = document.createElement("label");
      const optionElement = document.createElement("input");
      optionElement.type = "radio";
      optionElement.name = "option";
      optionElement.className = "option"; // Add a class to the radio button
      optionElement.value = option;

      // Hide the default radio button visually but make it accessible
      optionElement.style.opacity = 0;
      optionElement.style.position = "absolute";
      optionElement.style.left = "-9999px";

      optionLabel.appendChild(optionElement);
      const optionText = document.createTextNode(option);
      optionLabel.appendChild(optionText);
      optionContainer.appendChild(optionLabel);
      grammarPromptContainer.appendChild(optionContainer); // Append the option to the grammar prompt container
    });

    // Append the 'Omit this question' option at the end
    const omitOptionContainer = document.createElement("div");
    omitOptionContainer.className = "radio-option";

    // Add event listener to the omitOptionContainer for better UX
    omitOptionContainer.addEventListener("click", () => {
      // Find the radio input inside this omitOptionContainer and check it
      const inputElement = omitOptionContainer.querySelector(
        'input[type="radio"]'
      );
      if (inputElement) {
        inputElement.checked = true;
      }

      // Remove 'selected' class from all options
      const allOptions = document.querySelectorAll(".radio-option");
      allOptions.forEach((opt) => opt.classList.remove("selected"));

      // Add 'selected' class to the clicked omitOptionContainer
      omitOptionContainer.classList.add("selected");
    });

    const omitOptionLabel = document.createElement("label");
    const omitOptionElement = document.createElement("input");
    omitOptionElement.type = "radio";
    omitOptionElement.name = "option";
    omitOptionElement.className = "option";
    omitOptionElement.value = "Omit this question. I don't know the answer";

    omitOptionElement.style.opacity = 0;
    omitOptionElement.style.position = "absolute";
    omitOptionElement.style.left = "-9999px";

    omitOptionLabel.appendChild(omitOptionElement);
    const omitOptionText = document.createTextNode(
      "Omit this question. I don't know the answer"
    );
    omitOptionLabel.appendChild(omitOptionText);
    omitOptionContainer.appendChild(omitOptionLabel);
    grammarPromptContainer.appendChild(omitOptionContainer); // Append the 'Omit' option last
  } else {
    // For fill-in-the-gaps question type
    grammarPromptContainer.innerHTML = question.text.replace(
      /\*(.*?)\*/g,
      '<input type="text" class="blank">'
    );
  }

  // Append the grammar prompt container to the question container
  questionContainer.appendChild(grammarPromptContainer);

  // Append the question container to the main question element
  questionElement.appendChild(questionContainer);

  // Focus the input field
  const inputField = document.querySelector(".blank");
  if (inputField) inputField.focus();
}

// Function to submit answer
function submitAnswer() {
  let answers = [];
  const radioOptions = document.querySelectorAll('input[name="option"]');
  if (radioOptions.length > 0) {
    // This block is for radio button options (Multiple-choice questions)
    radioOptions.forEach((option) => {
      if (option.checked) {
        answers.push(option.value);
      }
    });
  } else {
    // This block is for fill-in-the-blank type questions
    const answerInputs = document.querySelectorAll(".blank");
    if (answerInputs.length > 0) {
      answers = Array.from(answerInputs).map((input) => input.value.trim());
      if (answers.some((answer) => !answer)) return;
    }
  }

  if (answers.length === 0) return; // No answers provided

  const question = questionsAnswered[questionsAnswered.length - 1];
  const correctAnswers = checkAnswer(question, answers);

  const percentageCorrect = (correctAnswers / question.answer.length) * 100;
  const correctThreshold = quiz_category === "listening" ? 69 : 70;
  const correct = percentageCorrect >= correctThreshold;

  // Add points for each correct answer
  for (let i = 0; i < correctAnswers; i++) {
    points += getPointsForLevel(question.level);
  }

  // Add to specific category score and increment question count
  if (quiz_category === "listening") {
    listeningScore += percentageCorrect;
    listeningQuestionsCount++;
  } else {
    // 'uoe'
    useOfEnglishScore += percentageCorrect;
    useOfEnglishQuestionsCount++;
  }

  if (correct) {
    let nextLevel = getNextAvailableLevel(currentLevel, 1);
    if (nextLevel !== null) {
      currentLevel = nextLevel;
    }
    consecutiveIncorrectAnswers = 0; // Reset the consecutive incorrect answers counter
  } else {
    let previousLevel = getNextAvailableLevel(currentLevel, -1);
    // Collect error details
    let errorDetail = {
      questionId: question.id,
      level: question.level,
      tags: [], // Extract tags from question.answer
    };
    // Extract tags from question.answer
    if (question.answer && question.answer.length > 0) {
      question.answer.forEach((ans) => {
        if (ans.tag && Array.isArray(ans.tag)) {
          errorDetail.tags.push(...ans.tag);
        }
      });
    }

    errors.push(errorDetail);
    if (previousLevel !== null) {
      currentLevel = previousLevel;
    }
    incorrectStreak++;
    consecutiveIncorrectAnswers++; // Increment the consecutive incorrect answers counter
    totalIncorrectAnswers++; // Increment the total incorrect answers counter
  }

  // Decide whether to end the test based on quiz_category
  if (quiz_category === "listening") {
    if (
      consecutiveIncorrectAnswers === 2 ||
      totalIncorrectAnswers === 5 ||
      currentLevel === null
    ) {
      endTest();
      return;
    }
  } else {
    // 'uoe'
    if (
      currentLevel === null ||
      consecutiveIncorrectAnswers === 2 ||
      totalIncorrectAnswers === 5
    ) {
      endTest();
      return;
    }
  }

  startTest();

  // Clear the values of answerInputs after submitting the answer
  if (radioOptions.length > 0) {
    radioOptions.forEach((option) => (option.checked = false));
  } else {
    const answerInputs = document.querySelectorAll(".blank");
    answerInputs.forEach((input) => (input.value = ""));
  }
}

// Function to check the answer
function checkAnswer(question, answers) {
  // Normalize question.answer to be an array of strings
  const correctAnswers = question.answer.map((ans) => {
    if (typeof ans === "string") {
      return ans.toLowerCase();
    } else if (typeof ans === "object" && ans.text) {
      return ans.text.toLowerCase();
    } else {
      return "";
    }
  });

  if (quiz_category === "listening") {
    if (question.answerType === "single") {
      return correctAnswers[0] === answers[0].toLowerCase() ? 1 : 0;
    } else {
      // For multiple answer questions
      const userAnswersLower = answers.map((ans) => ans.toLowerCase());
      const correctAnswersSet = new Set(correctAnswers);
      const userAnswersSet = new Set(userAnswersLower);

      const isCorrect =
        correctAnswersSet.size === userAnswersSet.size &&
        [...correctAnswersSet].every((ans) => userAnswersSet.has(ans));

      return isCorrect ? correctAnswers.length : 0;
    }
  } else {
    // 'uoe'
    let correctAnswersCount = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
      // Split the correct answers string into an array of possible answers
      let possibleAnswers = correctAnswers[i]
        .split("|")
        .map((ans) => ans.toLowerCase().trim());
      // Check if the submitted answer matches any of the possible answers
      if (possibleAnswers.includes(answers[i].toLowerCase().trim())) {
        correctAnswersCount++;
      }
    }
    return correctAnswersCount;
  }
}

// Returns points based on the question level
function getPointsForLevel(level) {
  if (level >= 1 && level <= 5) {
    // A1
    return 1;
  } else if (level >= 6 && level <= 9) {
    // A2
    return 3;
  } else if (level >= 10 && level <= 15) {
    // B1
    return 9;
  } else if (level >= 16 && level <= 21) {
    // B2
    return 27;
  } else if (level >= 22 && level <= 26) {
    // C1
    return 81;
  } else {
    return 0;
  }
}

// Updates the current level and handles the incorrect streak based on the submitted answer
function updateLevel(correct) {
  previousLevel = currentLevel;
  if (correct) {
    currentLevel = getNextAvailableLevel(currentLevel, 1);
    incorrectStreak = 0;
  } else {
    currentLevel = getNextAvailableLevel(currentLevel, -1);
    incorrectStreak++;
  }
}

// Returns the next available level based on the current level and a step value
function getNextAvailableLevel(currentLevel, step) {
  let nextLevel = currentLevel + step;

  // Since we are fetching questions dynamically, we'll assume levels from 1 to 26
  while (nextLevel >= 1 && nextLevel <= 26) {
    return nextLevel;
  }

  return null;
}

// Function to end the test
function endTest() {
  testInProgress = false;
  clearInterval(timer); // Stop the timer

  let endTime = new Date();
  let timeTaken = endTime - startTime;
  let minutesTaken = Math.floor(timeTaken / 60000);
  let secondsTaken = ((timeTaken % 60000) / 1000).toFixed(0);

  // Add leading zeros if minutes or seconds are less than 10 and format time taken as mm:ss
  minutesTaken = minutesTaken < 10 ? "0" + minutesTaken : minutesTaken;
  secondsTaken = secondsTaken < 10 ? "0" + secondsTaken : secondsTaken;

  let recommendedLevel = "";

  if (quiz_category === "listening") {
    // Calculate recommended level based on points
    if (points >= 0 && points <= 8) {
      recommendedLevel = "A1";
    } else if (points >= 9 && points <= 29) {
      recommendedLevel = "A2";
    } else if (points >= 30 && points <= 80) {
      recommendedLevel = "B1";
    } else if (points >= 81 && points <= 419) {
      recommendedLevel = "B2";
    } else if (points >= 420) {
      recommendedLevel = "C1";
    }

    let listeningAverageScore = listeningQuestionsCount
      ? (listeningScore / listeningQuestionsCount).toFixed(2)
      : "0.00";

    questionElement.innerHTML = `The test is over. You scored <b>${points}</b> points. Your average Listening score is <b>${listeningAverageScore}%</b>. Based on your score, we recommend you enroll in the level <b>${recommendedLevel}</b> English course. Thank you for taking the test with us!`;
    answerForm.style.display = "none";
    messageElement.style.display = "none";

    let testResult = {
      testType: "listening",
      points: points,
      listeningAverageScore: listeningAverageScore,
      recommendedLevel: recommendedLevel,
      timeTaken: `${minutesTaken}:${secondsTaken}`, // Formatted time taken as mm:ss
    };
    sessionStorage.setItem("listeningErrors", JSON.stringify(errors));
    localStorage.setItem("listening", JSON.stringify(testResult)); // Save the result in local storage
    // Redirect the user to the menu and ensure results are sent
    setTimeout(() => {
      window.location.href = "/placement-test";
    }, 1200); // Redirect after 1.2 seconds to ensure user sees their results
  } else {
    // 'uoe'
    if (points >= 0 && points <= 17) {
      recommendedLevel = "A1";
    } else if (points >= 18 && points <= 45) {
      recommendedLevel = "A2";
    } else if (points >= 46 && points <= 99) {
      recommendedLevel = "B1";
    } else if (points >= 100 && points <= 368) {
      recommendedLevel = "B2";
    } else if (points >= 369) {
      recommendedLevel = "C1";
    }
    // Calculate average scores for each category
    let useOfEnglishAverageScore = useOfEnglishQuestionsCount
      ? (useOfEnglishScore / useOfEnglishQuestionsCount).toFixed(2)
      : "0.00";

    questionElement.innerHTML = `The test is over. You scored <b>${points}</b> points. Your average Use of English score is <b>${useOfEnglishAverageScore}%</b>. Based on your score, we recommend you enroll in the level <b>${recommendedLevel}</b> English course. Thank you for taking the test with us!`;
    answerForm.style.display = "none";
    messageElement.style.display = "none";

    let testResult = {
      testType: "use_of_english",
      points: points,
      useOfEnglishAverageScore: useOfEnglishAverageScore,
      recommendedLevel: recommendedLevel,
      timeTaken: `${minutesTaken}:${secondsTaken}`, // Formatted time taken as mm:ss
    };
    sessionStorage.setItem("useOfEnglishErrors", JSON.stringify(errors));
    localStorage.setItem("use_of_english", JSON.stringify(testResult)); // Save the result in local storage

    // Redirect the user to the listening test section after 0.9 second
    setTimeout(() => {
      window.location.href = "/placement-test/listening";
    }, 900); // Redirect after 0.9 second
  }
}

// Event listeners for submitting answer
document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  submitAnswer();
});

// Optionally handle 'Enter' keypress
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && testInProgress) {
    e.preventDefault();
    submitAnswer();
  }
});
