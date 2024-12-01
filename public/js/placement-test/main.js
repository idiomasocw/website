function setTestButtonState() {
  const useOfEnglishCompleted = localStorage.getItem("use_of_english");

  const listeningButton = document.getElementById("listening");

  // Clear any existing click event listeners to avoid duplications
  listeningButton.onclick = null;

  if (useOfEnglishCompleted) {
    // If the Use of English test is completed, enable the listening button
    listeningButton.classList.remove("disabled");
    listeningButton.classList.add("enabled");
    listeningButton
      .querySelector(".button-overlay")
      .classList.remove("disabled");
    listeningButton.querySelector(".button-overlay").classList.add("enabled");

    // Add click event to redirect to the 'listening' test
    listeningButton.onclick = function () {
      window.location.href = "/placement-test/listening";
    };
  } else {
    // Ensure the listening button is disabled if Use of English hasn't been completed
    listeningButton.classList.add("disabled");
    listeningButton.classList.remove("enabled");
    listeningButton.querySelector(".button-overlay").classList.add("disabled");
    listeningButton
      .querySelector(".button-overlay")
      .classList.remove("enabled");

    // Prevent click action when the button is disabled
    listeningButton.onclick = function (event) {
      event.preventDefault();
      alert("Please complete the Use of English section first.");
    };
  }
}

window.onload = function () {
  const resultsDiv = document.getElementById("results");
  const tests = ["use_of_english", "listening"];
  let completedTests = [];
  let htmlContent = "";
  let message = "";
  // Initial state
  setTestButtonState();

  tests.forEach((test) => {
    const result = localStorage.getItem(test);
    if (result) {
      const {
        points,
        listeningAverageScore,
        useOfEnglishAverageScore,
        recommendedLevel,
        timeTaken,
      } = JSON.parse(result);
      let additionalContent = "";

      if (test === "use_of_english") {
        additionalContent = `<p>Use of English Average Score: ${useOfEnglishAverageScore}</p>`;
      } else if (test === "listening") {
        additionalContent = `<p>Listening Average Score: ${listeningAverageScore}</p>`;
      }

      htmlContent += `
                <div class="result">
                    <h2 id=results-heading>${test
                      .replace(/_/g, " ")
                      .toUpperCase()} Results</h2>
                    <p>Points: ${points}</p>
                    ${additionalContent}
                    <p>Recommended Level: ${recommendedLevel}</p>
                    <p>Time Taken: ${timeTaken}</p>
                </div>
            `;

      completedTests.push(test);
    }
  });

  function clearTestResults() {
    tests.forEach((test) => localStorage.removeItem(test));
    sessionStorage.removeItem("emailSent");
    sessionStorage.removeItem("userInfoSubmitted");
    sessionStorage.removeItem("userInfo");
    resultsDiv.innerHTML = "You can retake the test now.";
    document.getElementById("user-info-modal").style.display = "block";
    const emailNotification = document.getElementById("emailNotification");
    if (emailNotification) {
      emailNotification.style.display = "none";
    }
  }

  if (completedTests.length > 0) {
    if (completedTests.length === 1 && completedTests[0] === "use_of_english") {
      message = "<p>Please take the listening test now.</p>";
    }

    resultsDiv.innerHTML = message + htmlContent;
    const clearIcon = document.getElementById("clearResultsContainer");
    // Create a button to clear the test results from local storage
    const clearButton = document.createElement("button");
    clearButton.textContent = "Take test again";

    // Attach the clearTestResults function to both the clearIcon and clearButton
    clearIcon.addEventListener("click", clearTestResults);
    clearButton.addEventListener("click", clearTestResults);

    // Append the button to the resultsDiv
    resultsDiv.appendChild(clearButton);
  } else {
    resultsDiv.innerHTML =
      "You can now take the Use of English and the Listening tests.";
  }

  // Check if the user has already submitted their info
  if (!sessionStorage.getItem("userInfoSubmitted")) {
    document.getElementById("user-info-modal").style.display = "flex";
  }

  // Check if both sections are completed and email has not been sent yet
  if (
    localStorage.getItem("use_of_english") &&
    localStorage.getItem("listening") &&
    !sessionStorage.getItem("emailSent")
  ) {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const useOfEnglishResults = JSON.parse(
      localStorage.getItem("use_of_english")
    );
    const listeningResults = JSON.parse(localStorage.getItem("listening"));

    // First, generate the current date and time
    const now = new Date();
    const dateTimeString = now.toISOString(); // ISO string ensures a unique value for each email

    const resultsString = `
        <div style="font-family: Arial, sans-serif; color: #34babf; background-color: #0e124d;padding: 10px;">
        <h1 style="font-size:18px;color:#34babf">Hello ${userInfo.firstName} ${userInfo.lastName},</h1>
        <p style="color: #34babf;">Here are your placement test results:</p>
        <div style="display: flex; justify-content: space-between;gap:10px;flex-wrap: wrap;">
            <div style="flex: 1; padding: 10px;background:linear-gradient(217deg,#706da5,#6a3ad4);color:#d1ff4f;border-radius: 5px;box-shadow: 5px 5px 5px #0c0c1e;margin-right:5px;margin-left:5px;">
                <h3 style="text-transform: uppercase;color:#d1ff4f;">Use of English</h3>
                <p style="color:#d1ff4f;"><strong>Points:</strong> ${useOfEnglishResults.points}</p>
                <p style="color:#d1ff4f;"><strong>Average Score:</strong> ${useOfEnglishResults.useOfEnglishAverageScore}%</p>
                <p style="color:#d1ff4f;"><strong>Recommended Level:</strong> ${useOfEnglishResults.recommendedLevel}</p>
                <p style="color:#d1ff4f;"><strong>Time Taken:</strong> ${useOfEnglishResults.timeTaken}</p>
            </div>
            <div style="flex: 1; padding: 10px;background:linear-gradient(217deg,#706da5,#6a3ad4);color:#d1ff4f;border-radius: 5px;box-shadow: 5px 5px 5px #0c0c1e;margin-right:5px;margin-left:5px;">
                <h3 style="text-transform: uppercase;color:#d1ff4f;">Listening</h3>
                <p style="color:#d1ff4f;"><strong>Points:</strong> ${listeningResults.points}</p>
                <p style="color:#d1ff4f;"><strong>Average Score:</strong> ${listeningResults.listeningAverageScore}%</p>
                <p style="color:#d1ff4f;"><strong>Recommended Level:</strong> ${listeningResults.recommendedLevel}</p>
                <p style="color:#d1ff4f;"><strong>Time Taken:</strong> ${listeningResults.timeTaken}</p>
            </div>

        </div>
                <a style="color: #d1ff4f;margin-top:5px;margin-bottom:5px;" id="walink" href="https://wa.link/tldshy"
          >Click here to get more info about our course</a>
          <hr/>
            <p style="color: #34babf;">Best Regards,<br>OneCulture World Team</p>
            <!-- Transparent span with the unique date-time string -->
            <span style="opacity: 0;">${dateTimeString}</span>
        </div>`;

    fetch("/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userInfo.email,
        name: `${userInfo.firstName} ${userInfo.lastName}`,
        results: resultsString,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("emailSent", true); // Set the flag that email has been sent

        // Show the email notification message
        const emailNotification = document.getElementById("emailNotification");
        if (emailNotification) {
          emailNotification.style.display = "block";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Handle user-info-form submission
  const userInfoForm = document.getElementById("user-info-form");
  if (userInfoForm) {
    userInfoForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var email = document.getElementById("user-info-email").value;
      if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email address.");
        return false;
      }

      var userInfo = {
        firstName: document.getElementById("user-info-first-name").value,
        lastName: document.getElementById("user-info-last-name").value,
        email: email,
      };
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      sessionStorage.setItem("userInfoSubmitted", true);
      document.getElementById("user-info-modal").style.display = "none";
    });
  }
};
