function setTestButtonState() {
    const useOfEnglishCompleted = localStorage.getItem('use_of_english');
    
    const listeningButton = document.getElementById('listening');
    
    // Clear any existing click event listeners to avoid duplications
    listeningButton.onclick = null;

    if(useOfEnglishCompleted) {
        // If the Use of English test is completed, enable the listening button
        listeningButton.classList.remove('disabled');
        listeningButton.classList.add('enabled');
        listeningButton.querySelector('.button-overlay').classList.remove('disabled');
        listeningButton.querySelector('.button-overlay').classList.add('enabled');

        // Add click event to redirect to the 'listening' test
        listeningButton.onclick = function() {
            window.location.href = '/placement-test/listening';
        };
    } else {
        // Ensure the listening button is disabled if Use of English hasn't been completed
        listeningButton.classList.add('disabled');
        listeningButton.classList.remove('enabled');
        listeningButton.querySelector('.button-overlay').classList.add('disabled');
        listeningButton.querySelector('.button-overlay').classList.remove('enabled');

        // Prevent click action when the button is disabled
        listeningButton.onclick = function(event) {
            event.preventDefault();
            alert("Please complete the Use of English section first.");
        };
    }
}

window.onload = function() {
    const resultsDiv = document.getElementById('results');
    const tests = ['use_of_english', 'listening'];
    let completedTests = [];
    let htmlContent = '';
    let message = '';
        // Initial state
        setTestButtonState();

    tests.forEach((test) => {
        const result = localStorage.getItem(test);
        if (result) {
            const { points, listeningAverageScore, useOfEnglishAverageScore, recommendedLevel,timeTaken } = JSON.parse(result);
            let additionalContent = '';

            if (test === 'use_of_english') {
                additionalContent = `<p>Use of English Average Score: ${useOfEnglishAverageScore}</p>`;
            } else if (test === 'listening') {
                additionalContent = `<p>Listening Average Score: ${listeningAverageScore}</p>`;
            }

            htmlContent += `
                <div class="result">
                    <h2 id=results-heading>${test.replace(/_/g, ' ').toUpperCase()} Results</h2>
                    <p>Points: ${points}</p>
                    ${additionalContent}
                    <p>Recommended Level: ${recommendedLevel}</p>
                    <P>Time Taken: ${timeTaken}</P>
                </div>
            `;

            completedTests.push(test);
        }
    });

    if (completedTests.length > 0) {
        if (completedTests.length === 1 && completedTests[0] === 'use_of_english') {
            message = "<p>Please take the listening test now.</p>";
        }

        resultsDiv.innerHTML = message + htmlContent;

        // Create a button to clear the test results from local storage
        const clearButton = document.createElement('button');
        clearButton.textContent = 'Take test again';
        clearButton.addEventListener('click', () => {
            tests.forEach((test) => {
                localStorage.removeItem(test);
            });
            resultsDiv.innerHTML = 'You can retake the test now.';
        });

        // Append the button to the resultsDiv
        resultsDiv.appendChild(clearButton);
    } else {
        resultsDiv.innerHTML = 'You can now take the Use of English and the Listening tests.';
    }

    // Check if the user has already submitted their info
    if (!sessionStorage.getItem('userInfoSubmitted')) {
        // If not, show the modal
        document.getElementById('user-info-modal').style.display = 'block';
    }

    // Handle form submission
    document.getElementById('user-info-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Validate email format - simple validation
        var email = document.getElementById('user-info-email').value;
        if (!email.includes('@') || !email.includes('.')) {
            alert("Please enter a valid email address.");
            return false;
        }

        // Collect user info (further validation can be added as needed)
        var userInfo = {
            firstName: document.getElementById('user-info-first-name').value,
            lastName: document.getElementById('user-info-last-name').value,
            email: email
        };

        // Store user info in session storage
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        sessionStorage.setItem('userInfoSubmitted', true);

        // Close the modal
        document.getElementById('user-info-modal').style.display = 'none';
    });
};