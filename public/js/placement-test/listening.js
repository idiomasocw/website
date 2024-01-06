// Variables for stopwatch
let timer;
let timeLimit = 20 * 60; // 20 minutes in seconds
let timeElapsed = timeLimit;
let totalIncorrectAnswers = 0;
let consecutiveIncorrectAnswers = 0;
let testInProgress = false;
let startTime; // Variable to store the start time of the test

document.addEventListener('DOMContentLoaded', () => {
    const startTestButton = document.getElementById('start-test');
    const modal = document.getElementById('modal');
    const question = document.getElementById('question');

    startTestButton.addEventListener('click', () => {
        if(!testInProgress){
            startTime = new Date(); // Set the start time at the beginning of the test
            console.log("Test Started - startTime:", startTime);  // Log startTime
            testInProgress = true; // Flag to indicate the test has started
            modal.style.display = 'none';
            question.style.display = 'block';
            startTimer();
        }
    });
    
    window.addEventListener('beforeunload', (e) => {
        if (timeElapsed < timeLimit && testInProgress) {
            e.preventDefault();
            e.returnValue = "Do you really want to refresh the page? The test is still in progress and you will lose your progress. Hit the 'Cancel' button to continue doing the test, and click the 'refresh' button to refresh the page.";
        }
    });
});

//This is the start timer function
function startTimer() {
    timer = setInterval(() => {
        timeElapsed--;
        updateStopwatch();
        if (timeElapsed <= 0) {
            clearInterval(timer);
            endTest('listening');
        }
    }, 1000);
}

function updateStopwatch() {
    const stopwatch = document.getElementById('stopwatch');
    const hours = Math.floor(timeElapsed / 3600);
    const minutes = Math.floor((timeElapsed % 3600) / 60);
    const seconds = timeElapsed % 60;

    stopwatch.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number.toString().padStart(2, '0');
}


const questionElement = document.getElementById('question');
const answerForm = document.getElementById('answer-form');
const messageElement = document.getElementById('message');

let currentLevel = 2;
let previousLevel = null;
let incorrectStreak = 0;
let questionsAnswered = [];
let points = 0;
let listeningScore = 0;
let listeningQuestionsCount = 0;


// Returns points based on the question level
function getPointsForLevel(level) {
    if (level >= 1 && level <= 4) { //A1
        return 1;
    } else if (level >= 5 && level <= 7) { //A2
        return 3;
    } else if (level >= 8 && level <= 13) { //B1
        return 9;
    } else if (level >= 14 && level <= 19) { //B2
        return 27;
    } else if (level >= 20 && level <= 25) { //C1
        return 81;
    } else {
        return 0;
    }
}

// Gets the next question based on the current level and filters out answered questions
function getNextQuestion(level) {
    const answeredQuestionIds = questionsAnswered.map(q => q.id); // Get IDs of answered questions
    const availableQuestions = questions.filter(q => q.level === level && !answeredQuestionIds.includes(q.id));
    if (availableQuestions.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
}

// Displays the question on the screen and replaces the placeholder with an input field, includes multiple choice- listening section
let playCount = 0;
let currentAudioId = null;

function displayQuestion(question) {
    if (question.audioUrl) {
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

        const tempContainer = document.createElement('div');
        tempContainer.className = 'options-container'; // Add a class to the container

        if (question.options) {
            const listeningPromptContainer = document.createElement('div');
            listeningPromptContainer.className = 'listening-prompt'; // Add a class to the listening prompt container

            const listeningPromptText = document.createElement('p');
            listeningPromptText.innerHTML = question.text;
            listeningPromptContainer.appendChild(listeningPromptText);

            tempContainer.appendChild(listeningPromptContainer);

            // Create and display radio buttons for each option
            const optionsContainer = document.createElement('div');
            optionsContainer.className = question.answerType === 'single' ? 'radio-buttons' : 'checkbox-buttons';

            question.options.forEach(option => {
                const optionLabel = document.createElement('label');
                optionLabel.className = 'option-label'; // Add a class to the label

                const optionElement = document.createElement('input');
                optionElement.type = question.answerType === 'single' ? 'radio' : 'checkbox';
                optionElement.name = 'option';
                optionElement.className = 'option'; // Add a class to the radio button
                optionElement.value = option;

                const optionText = document.createTextNode(option);

                optionLabel.appendChild(optionElement);
                optionLabel.appendChild(optionText);

                const optionContainer = document.createElement('div');
                optionContainer.className = 'radio-option'; // Add a class to the option container

                optionContainer.appendChild(optionLabel);
                optionsContainer.appendChild(optionContainer);
            });

            tempContainer.appendChild(optionsContainer);
        }

        // Append the options container to the main question element
        while (tempContainer.firstChild) {
            questionElement.appendChild(tempContainer.firstChild);
        }

// Add a listener to the Font Awesome play button to handle audio play
const audioElement = document.getElementById('audio');
const audioPlayButton = document.getElementById('audioPlayButton');

audioPlayButton.addEventListener('click', () => {
    // If the playCount is under the limit, play the audio
    if (playCount < 2) {
        audioElement.play();
    }

    // If the playCount reaches the limit, alert the user, disable the play button and change its color
    if (playCount == 2) {
        alert('You can only play the recording twice.');
        audioPlayButton.classList.add('disabled');
    }
});

// Listen for the audio ending and increment the play count
audioElement.addEventListener('ended', () => {
    playCount++;

    if (playCount < 2) {
        audioPlayButton.classList.remove('disabled');
    }
});

    }
}


// Checks if the submitted answer matches any of the correct answers
function checkAnswer(question, answers) {
    if (question.answerType === 'single') {
        return question.answer[0].toLowerCase() === answers[0].toLowerCase() ? 1 : 0;
    } else {
        // For multiple answer questions, ensure every answer selected by the user is correct
        // and the user has selected the same number of answers as there are correct answers
        const correctAnswers = answers.filter(answer => question.answer.includes(answer));
        return correctAnswers.length === question.answer.length && correctAnswers.length === answers.length ? correctAnswers.length : 0;
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
    
    while (getNextQuestion(nextLevel) === null) {
        // If we're stepping up and there are no more questions at higher levels
        if (step > 0) {
            // Try to get a question at the current level
            if (getNextQuestion(currentLevel) !== null) {
                return currentLevel;
            }
            // If there's no question at the current level, step down
            else {
                step = -1;
            }
        }
        // If we're stepping down and there are no more questions at lower levels
        else if (step < 0) {
            // If there are no more questions at the current level, it's the end of the test
            if (getNextQuestion(currentLevel) === null) {
                return null;
            }
            // If there's a question at the current level, return current level
            else {
                return currentLevel;
            }
        }

        nextLevel += step;
    }

    return nextLevel;
}


// Ends the test, displays the final score and hides the form
function endTest() {
    console.log("Listening test ending now");
    testInProgress = false;
    clearInterval(timer); // Stop the timer

    let endTime = new Date(); // Capture end time
    console.log("Test Ended - endTime:", endTime);  // Log endTime
    let timeTaken = endTime - startTime; // Calculate time taken in milliseconds
    console.log("timeTaken (ms):", timeTaken);  // Log timeTaken in milliseconds
    let minutesTaken = Math.floor(timeTaken / 60000); // Convert milliseconds to minutes
    let secondsTaken = ((timeTaken % 60000) / 1000).toFixed(0); // Convert remainder to seconds, rounded to nearest second

    // Add leading zeros if minutes or seconds are less than 10 and format time taken as mm:ss
    minutesTaken = minutesTaken < 10 ? '0' + minutesTaken : minutesTaken;
    secondsTaken = secondsTaken < 10 ? '0' + secondsTaken : secondsTaken;

    console.log("Formatted Time Taken:", `${minutesTaken}:${secondsTaken}`);  // Log formatted time taken


    let recommendedLevel = ''; // Calculate recommended level based on points
    if (points >= 0 && points <= 8) {
        recommendedLevel = 'A1';
    } else if (points >= 9 && points <= 29) {
        recommendedLevel = 'A2';
    } else if (points >= 30 && points <= 160) {
        recommendedLevel = 'B1';
    } else if (points >= 161 && points <= 320) {
        recommendedLevel = 'B2';
    } else if (points >= 321) {
        recommendedLevel = 'C1';
    }

    let listeningAverageScore = listeningQuestionsCount ? (listeningScore / listeningQuestionsCount).toFixed(2) : "0.00";

    questionElement.innerHTML = `The test is over. You scored <b>${points}</b> points. Your average Listening score is <b>${listeningAverageScore}%</b>. Based on your score, we recommend you enroll in the level <b>${recommendedLevel}</b> English course. Thank you for taking the test with us!`;
    answerForm.style.display = "none";
    messageElement.style.display = "none";

    let testResult = {
        testType: 'listening',
        points: points,
        listeningAverageScore: listeningAverageScore,
        recommendedLevel: recommendedLevel,
        timeTaken: `${minutesTaken}:${secondsTaken}` // Formatted time taken as mm:ss
    };

    localStorage.setItem('listening', JSON.stringify(testResult)); // Save the result in local storage
}



// Starts the test by getting the next question and displaying it
function startTest() {
    console.log("Listening test starting now");
    const returnButton = document.querySelector('.returnToMenu');
    returnButton.classList.add('scaled');
    const question = getNextQuestion(currentLevel);
    if (question === null || currentLevel === null) {
        // If there are no more questions at the current level, end the test
        endTest('listening');
    } else {
        questionsAnswered.push(question);
        displayQuestion(question);
    }
}

// Submits the answer, validates it and updates the score, level, and incorrect streak
function submitAnswer() {
    const answerInputs = document.querySelectorAll('.option:checked, .blank');
    if (answerInputs.length === 0) return;
    const answers = Array.from(answerInputs).map(input => input.value.trim());
    if (answers.some(answer => !answer)) return;
    const question = questionsAnswered[questionsAnswered.length - 1];
    const correctAnswers = checkAnswer(question, answers);

    const percentageCorrect = (correctAnswers / question.answer.length) * 100;
    const correct = percentageCorrect >= 69;

    // Add points for each correct answer
    for (let i = 0; i < correctAnswers; i++) {
        points += getPointsForLevel(question.level);
    }

    // Add to Listening category score and increment question count
    listeningScore += percentageCorrect;
    listeningQuestionsCount++;

    if (correct) {
        let nextLevel = getNextAvailableLevel(currentLevel, 1);
        if (nextLevel !== null) {
            currentLevel = nextLevel;
        }
        consecutiveIncorrectAnswers = 0;  // Reset the consecutive incorrect answers counter
    } else {
        let previousLevel = getNextAvailableLevel(currentLevel, -1);
        if (previousLevel !== null) {
            currentLevel = previousLevel;
        }
        incorrectStreak++;
        consecutiveIncorrectAnswers++;  // Increment the consecutive incorrect answers counter
        totalIncorrectAnswers++;  // Increment the total incorrect answers counter
    }

    if (consecutiveIncorrectAnswers === 2 || totalIncorrectAnswers === 5) {
        endTest('listening');
    } else if (currentLevel === null) {
        endTest('listening');
    } else {
        startTest();
    }

    answerInputs.forEach(input => input.value = "");
}


document.getElementById('submitAnswerButton').addEventListener('click', (e) => {
    e.preventDefault();  // Prevent the default form submit action
    submitAnswer();
});

// If you want to keep the keydown event listener for Enter, ensure it only triggers when appropriate
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && testInProgress) {
        e.preventDefault();  // Prevent the default action
        submitAnswer();
    }
});

startTest();