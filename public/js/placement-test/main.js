// js/placement-test/main.js

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
    sessionStorage.removeItem("resultsSent");
    sessionStorage.removeItem("useOfEnglishErrors");
    sessionStorage.removeItem("listeningErrors");
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
    sessionStorage.getItem("userInfo") &&
    !sessionStorage.getItem("emailSent")
  ) {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const useOfEnglishResults = JSON.parse(
      localStorage.getItem("use_of_english")
    );
    const listeningResults = JSON.parse(localStorage.getItem("listening"));
    const useOfEnglishErrors =
      JSON.parse(sessionStorage.getItem("useOfEnglishErrors")) || [];
    const listeningErrors =
      JSON.parse(sessionStorage.getItem("listeningErrors")) || [];

    // First, generate the current date and time
    const now = new Date();
    const dateTimeString = now.toISOString(); // ISO string ensures a unique value for each email

    // Prepare the data to send to the backend
    const testResults = {
      email: userInfo.email,
      full_name: `${userInfo.firstName} ${userInfo.lastName}`,
      useOfEnglish: {
        points: useOfEnglishResults.points,
        recommendedLevel: useOfEnglishResults.recommendedLevel,
        timeTaken: useOfEnglishResults.timeTaken,
        errors: useOfEnglishErrors,
      },
      listening: {
        points: listeningResults.points,
        recommendedLevel: listeningResults.recommendedLevel,
        timeTaken: listeningResults.timeTaken,
        errors: listeningErrors,
      },
      timestamp: Date.now(),
    };

    // Send the data to the backend
    fetch("/api/save-test-results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testResults),
    })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("resultsSent", true); // Set the flag that results have been sent

        // Clear errors from session storage
        sessionStorage.removeItem("useOfEnglishErrors");
        sessionStorage.removeItem("listeningErrors");

        // Now send the email after saving test results
        const resultsString = `<div style="font-family: Arial, sans-serif; background-color: #031116; color: #ffffff; padding: 20px; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
    <header style="background-color: #23598b; padding: 15px; text-align: center;">
      <h1 style="font-size: 24px; color: #ffffff; margin: 0;">Hello, ${userInfo.firstName} ${userInfo.lastName}</h1>
    </header>

    <main style="padding: 20px; background-color: #031116;">
      <p style="font-size: 18px; margin-bottom: 20px; color: #00d5dd; text-align: center; font-weight: bold;">Here are your placement test results:</p>

      <table style="width: 100%; table-layout: fixed; text-align: center; border-spacing: 15px;">
        <tr>
          <!-- Use of English Section -->
          <td style="vertical-align: middle; width: 50%; padding: 15px; background: linear-gradient(217deg, #23598b, #00d5dd); border-radius: 8px; color: #ffffff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">
            <h3 style="margin-bottom: 10px; font-size: 18px; text-transform: uppercase; color: #ffffff;">Use of English</h3>
            <p style="margin: 5px 0; color: #ffffff;"><strong>Points:</strong> ${useOfEnglishResults.points}</p>
            <p style="margin: 5px 0; color: #ffffff;"><strong>Recommended Level:</strong> ${useOfEnglishResults.recommendedLevel}</p>
            <p style="margin: 5px 0; color: #ffffff;"><strong>Time Taken:</strong> ${useOfEnglishResults.timeTaken}</p>
          </td>

          <!-- Listening Section -->
          <td style="vertical-align: middle; width: 50%; padding: 15px; background: linear-gradient(217deg, #23598b, #00d5dd); border-radius: 8px; color: #ffffff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">
            <h3 style="margin-bottom: 10px; font-size: 18px; text-transform: uppercase; color: #ffffff;">Listening</h3>
            <p style="margin: 5px 0; color: #ffffff;"><strong>Points:</strong> ${listeningResults.points}</p>
            <p style="margin: 5px 0; color: #ffffff;"><strong>Recommended Level:</strong> ${listeningResults.recommendedLevel}</p>
            <p style="margin: 5px 0; color: #ffffff;"><strong>Time Taken:</strong> ${listeningResults.timeTaken}</p>
          </td>
        </tr>
      </table>
    </main>

    <footer style="padding: 20px; background-color: #031116; text-align: center;">
      <a href="https://wa.link/tldshy" style="display: inline-block; margin: 15px 0; padding: 10px 20px; color: #031116; background-color: #00d5dd; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">Click here to get more info about our courses</a>
      <p style="font-size: 14px; color: #ffffff; margin-top: 20px;">Best Regards,<br>OneCulture World Team</p>
      <hr style="border: none; border-top: 1px solid #23598b; margin: 20px 0;" />
      <span style="opacity: 0;">${dateTimeString}</span>
    </footer>
  </div>
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
            const emailNotification =
              document.getElementById("emailNotification");
            if (emailNotification) {
              emailNotification.style.display = "block";
            }
          })
          .catch((error) => {
            console.error("Error sending email:", error);
          });
      })
      .catch((error) => {
        console.error("Error saving test results:", error);
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
