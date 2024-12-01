// JavaScript for Section 1

const section1 = document.getElementById("section1");
const section2 = document.getElementById("section2");
const section4Empresas = document.getElementById("section4-empresas");

// Function to display price in Section 4
// Function to display price in Section 4
async function displayPrice() {
  const mode = sessionStorage.getItem("mode");
  let pricingKey = "";
  if (mode === "private") {
    const selectedDays = JSON.parse(sessionStorage.getItem("selectedDays"));
    pricingKey = selectedDays.length + "_lecciones";
  } else if (mode === "semi-private") {
    const selectedIntensity = sessionStorage.getItem("selectedIntensity");
    pricingKey = selectedIntensity === "twice" ? "2_lecciones" : "3_lecciones";
  }

  try {
    const response = await fetch("/api/pricing");
    const pricingData = await response.json();
    const priceInfo =
      pricingData[mode === "private" ? "privateLessons" : "semiPrivateLessons"][
        pricingKey
      ];
    const price = priceInfo.discountPrice || priceInfo.originalPrice;
    priceElement.innerText = `$${price}`;
    payButton.classList.remove("hidden");
  } catch (error) {
    console.error("Error fetching pricing data:", error);
  }
}

// Function to update the progress bar
function updateProgressBar(sectionId) {
  // Reset all progress sections
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`progress${i}`).classList.remove("active");
  }
  // Activate only the current section
  document.getElementById(`progress${sectionId}`).classList.add("active");
}

function updateButtonStatus(buttonId, condition) {
  const buttonElement = document.getElementById(buttonId);
  buttonElement.disabled = !condition;
  if (buttonElement.disabled) {
    buttonElement.classList.remove("enabled");
    buttonElement.classList.add("disabled");
  } else {
    buttonElement.classList.remove("disabled");
    buttonElement.classList.add("enabled");
  }
}
const next1Button = document.getElementById("next1");
document.addEventListener("DOMContentLoaded", function () {
  updateProgressBar(1);

  const ageSelect = document.getElementById("edad");
  next1Button.disabled = true;

  // Load saved data from session storage to populate the form fields
  const firstName = sessionStorage.getItem("firstName");
  const lastName = sessionStorage.getItem("lastName"); // Retrieve last name
  const email = sessionStorage.getItem("email");
  const phone = sessionStorage.getItem("phone");
  const edad = sessionStorage.getItem("edad");

  if (firstName) document.getElementById("firstName").value = firstName;
  if (lastName) document.getElementById("lastName").value = lastName; // Populate last name
  if (email) document.getElementById("email").value = email;
  if (phone) document.getElementById("phone").value = phone;
  if (edad) {
    document.getElementById("edad").value = edad;
    checkFieldsAndEnableButton(); // Call the function here
  }

  // Function to update session storage when a form field changes
  function updateSessionStorage(fieldName) {
    const fieldValue = document.getElementById(fieldName).value;
    sessionStorage.setItem(fieldName, fieldValue);
  }

  // Add event listeners to update session storage
  document
    .getElementById("firstName")
    .addEventListener("input", () => updateSessionStorage("firstName"));
  document
    .getElementById("lastName")
    .addEventListener("input", () => updateSessionStorage("lastName")); // Added line for lastName
  document
    .getElementById("email")
    .addEventListener("input", () => updateSessionStorage("email"));
  document
    .getElementById("phone")
    .addEventListener("input", () => updateSessionStorage("phone"));
  document.getElementById("edad").addEventListener("change", () => {
    updateSessionStorage("edad");
    checkFieldsAndEnableButton(); // Also check the fields when it changes
  });

  // Function to check the form fields and enable/disable the next button
  function checkFieldsAndEnableButton() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value; // Added variable for lastName
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const edadValue = document.getElementById("edad").value;
    const allFieldsFilled =
      firstName && lastName && email && phone && edadValue !== "Menor de 16";
    updateButtonStatus("next1", allFieldsFilled);
  }

  // Call the checkFieldsAndEnableButton function whenever any input is changed
  document
    .getElementById("firstName")
    .addEventListener("input", checkFieldsAndEnableButton);
  document
    .getElementById("lastName")
    .addEventListener("input", checkFieldsAndEnableButton); // Added event listener for lastName
  document
    .getElementById("email")
    .addEventListener("input", checkFieldsAndEnableButton);
  document
    .getElementById("phone")
    .addEventListener("input", checkFieldsAndEnableButton);
  document
    .getElementById("edad")
    .addEventListener("change", checkFieldsAndEnableButton);

  // Initialize the check on page load
  checkFieldsAndEnableButton();

  // Event listener for the "next" button in Section 1
  next1Button.addEventListener("click", function () {
    // Proceed to next section
    section1.classList.add("hidden");
    section2.classList.remove("hidden");
    updateProgressBar(2);

    // Save data to session storage
    updateSessionStorage("firstName");
    updateSessionStorage("lastName"); // Added line for lastName
    updateSessionStorage("email");
    updateSessionStorage("phone");
    updateSessionStorage("edad");
  });

  ageSelect.addEventListener("change", function () {
    if (this.value === "Menor de 16") {
      alert("La edad mínima es 16 años");
      next1Button.disabled = true;
    } else {
      next1Button.disabled = false;
    }
  });
});

// JavaScript for Section 2
const next2Button = document.getElementById("next2");
const back1Button = document.getElementById("back1");

// New code: Start
const modeOptions = document.querySelectorAll(".mode-option");
let selectedMode = sessionStorage.getItem("mode") || "";

// Event listener for the "Ir atrás" button in Section 2
back1Button.addEventListener("click", function () {
  // Show the previous section and hide the current one
  section1.classList.remove("hidden");
  section2.classList.add("hidden");
  updateProgressBar(1);
});

// Initialize selected mode
if (selectedMode) {
  document.getElementById(selectedMode).classList.add("selected");
  checkAndEnableNext2Button();
} else {
  // Make sure neither is selected and next button is disabled
  next2Button.disabled = true;
}

// New function: Checks if a mode option is selected and enables/disables the next2Button accordingly
function checkAndEnableNext2Button() {
  updateButtonStatus("next2", selectedMode);
}

// Function to check if there's existing data for a given modality
function hasExistingDataForModality(modality) {
  if (modality === "private") {
    return (
      sessionStorage.getItem("selectedDays") ||
      sessionStorage.getItem("selectedTimesPrivate")
    );
  } else if (modality === "semi-private") {
    return (
      sessionStorage.getItem("selectedIntensity") ||
      sessionStorage.getItem("selectedTimeSemiPrivate")
    );
  } else if (modality === "empresas") {
    return (
      sessionStorage.getItem("companyName") ||
      sessionStorage.getItem("employeeCount")
    );
  }
  return false;
}

// Function to clear session storage data and update UI for a given modality
function clearSessionStorageForModality(modality) {
  if (modality === "private") {
    // Clear session storage for private classes
    sessionStorage.removeItem("selectedDays");
    sessionStorage.removeItem("selectedTimesPrivate");

    // Reset UI and selectedDays array for private classes
    selectedDays.length = 0; // Reset the array
    weekdays.forEach((weekday) => {
      weekday.classList.remove("selected");
      const timeDivId = `time-${weekday.id}`;
      const timeDiv = document.getElementById(timeDivId);
      if (timeDiv) {
        timeDiv.innerHTML = "";
      }
    });
  } else if (modality === "semi-private") {
    // Clear session storage for semi-private classes
    sessionStorage.removeItem("selectedIntensity");
    sessionStorage.removeItem("selectedTimeSemiPrivate");

    // Reset UI for semi-private classes
    intensities.forEach((intensity) => intensity.classList.remove("selected"));
    const selectedTimeButton = document.querySelector(
      "#time-semi-private .time-button.selected"
    );
    if (selectedTimeButton) {
      selectedTimeButton.classList.remove("selected");
    }
  }
  if (modality === "empresas") {
    // Clear session storage for empresas
    sessionStorage.removeItem("companyName");
    sessionStorage.removeItem("employeeCount");
    // Reset UI for empresas
    const companyNameInput = document.getElementById("companyName");
    const employeeCountSelect = document.getElementById("employee-count");
    if (companyNameInput) companyNameInput.value = "";
    if (employeeCountSelect) employeeCountSelect.value = "";
  }
}

const modalityNames = {
  private: "clases privadas",
  "semi-private": "clases semi-personalizadas",
  empresas: "empresas", // Translation or descriptor for "empresas"
};

// Add click event to each mode option
modeOptions.forEach((option) => {
  option.addEventListener("click", function () {
    const newMode = this.id;
    const otherModes = ["private", "semi-private", "empresas"].filter(
      (m) => m !== newMode
    );

    for (const mode of otherModes) {
      if (hasExistingDataForModality(mode)) {
        const modeSpanish = modalityNames[mode] || "empresas"; // default to 'empresas' if not found
        const confirmMessage = `Si haces click en "ok", la información que has completado en la modalidad "${modeSpanish}" será borrada. ¿Deseas continuar?`;
        if (!confirm(confirmMessage)) {
          return; // If user cancels, don't change the mode
        }
        clearSessionStorageForModality(mode);
      }
    }

    // Update the mode
    selectedMode = newMode;
    sessionStorage.setItem("mode", selectedMode);

    // Update UI
    modeOptions.forEach((opt) => opt.classList.remove("selected"));
    this.classList.add("selected");
    checkAndEnableNext2Button();
  });
});

// Section 2: End

// JavaScript for Section 3 for Private Classes

const section3Private = document.getElementById("section3-private");
const next3PrivateButton = document.getElementById("next3-private");
const back2PrivateButton = document.getElementById("back2-private");
const weekdays = document.querySelectorAll(".weekday");
const selectedDays = [];
const timeOptionsPrivate = document.getElementById("time-options-private");
const selectedTimesPrivate = {};
let selectedTimeSemiPrivate = "";
let lastClickedDay = null;
next3PrivateButton.disabled = true;
checkSelectedTimes();

// Event Listener to close button
const closeButton = document.querySelector(".close");
if (closeButton) {
  closeButton.addEventListener("click", function () {
    sessionStorage.setItem("modalClosedBySelection", "false"); // Set flag when close button is clicked
    closeModal();
  });
}

// New Function to generate time options
function generateTimeOptions() {
  let options = "";
  for (let i = 6; i <= 20; i++) {
    const time = `${i}:00 - ${i + 1}:00`;
    options += `<button type="button" class="time-button" onclick="toggleTime('${time}', this)">${time}</button>`;
  }
  return options;
}

// New Function to toggle time selection for private classes
function toggleTime(time, buttonElement) {
  const day = buttonElement.parentElement.id.split("-")[1];
  if (selectedTimesPrivate[day]) {
    const previousSelectedButton = document.querySelector(
      `#time-${day} .time-button.selected`
    );
    if (previousSelectedButton) {
      previousSelectedButton.classList.remove("selected");
    }
  }
  selectedTimesPrivate[day] = time;
  buttonElement.classList.add("selected");

  // Update session storage instantly
  sessionStorage.setItem(
    "selectedTimesPrivate",
    JSON.stringify(selectedTimesPrivate)
  );

  checkSelectedTimes();
}

function checkSelectedTimes() {
  let enableButton = true; // Initialize a variable to check if the button should be enabled

  if (
    selectedDays.length !== 2 &&
    selectedDays.length !== 3 &&
    selectedDays.length !== 5
  ) {
    enableButton = false; // Set the variable to false if the condition is not met
  }

  for (const day of selectedDays) {
    if (!selectedTimesPrivate[day]) {
      enableButton = false; // Set the variable to false if the condition is not met
      break; // Exit the loop
    }
  }
  updateButtonStatus("next3-private", enableButton);
  return enableButton;
}

// Function to toggle time selection for semi-private classes
function toggleTimeSemiPrivate(time, buttonElement) {
  const previouslySelected = document.querySelector(
    "#time-semi-private .time-button.selected"
  );
  if (previouslySelected) {
    previouslySelected.classList.remove("selected");
  }

  if (selectedTimeSemiPrivate === time) {
    selectedTimeSemiPrivate = "";
    buttonElement.classList.remove("selected");
  } else {
    selectedTimeSemiPrivate = time;
    buttonElement.classList.add("selected");
  }
  checkSemiPrivateConditions();

  // Save the selected time to session storage
  sessionStorage.setItem("selectedTimeSemiPrivate", selectedTimeSemiPrivate);
}

// New Function to populate time options for semi-private classes
function populateTimeOptionsSemiPrivate() {
  const timeDiv = document.getElementById("time-semi-private");
  let options = "";
  for (let i = 6; i <= 20; i++) {
    const time = `${i}:00 - ${i + 1}:00`;
    options += `<button type="button" class="time-button" onclick="toggleTimeSemiPrivate('${time}', this)">${time}</button>`;
  }
  timeDiv.innerHTML = options;
}

// Existing Function to toggle weekday selection with modifications
function toggleWeekday(event) {
  const day = event.target.id;
  lastClickedDay = day; // Set the last clicked day

  const index = selectedDays.indexOf(day);
  if (index === -1) {
    selectedDays.push(day);
    event.target.classList.add("selected");
  }

  // Update session storage
  sessionStorage.setItem("selectedDays", JSON.stringify(selectedDays));
  sessionStorage.setItem(
    "selectedTimesPrivate",
    JSON.stringify(selectedTimesPrivate)
  );

  checkSelectedTimes();
}

// New Function to toggle time selection for private classes
function toggleTime(time, buttonElement) {
  const day = buttonElement.parentElement.id.split("-")[1];
  if (selectedTimesPrivate[day]) {
    const previousSelectedButton = document.querySelector(
      `#time-${day} .time-button.selected`
    );
    if (previousSelectedButton) {
      previousSelectedButton.classList.remove("selected");
    }
  }
  selectedTimesPrivate[day] = time;
  buttonElement.classList.add("selected");

  // Hide all other time buttons for the same day
  const allTimeButtons = document.querySelectorAll(`#time-${day} .time-button`);
  allTimeButtons.forEach((btn) => {
    if (btn !== buttonElement) {
      btn.style.display = "none";
    }
  });

  // Update session storage instantly
  sessionStorage.setItem(
    "selectedTimesPrivate",
    JSON.stringify(selectedTimesPrivate)
  );

  checkSelectedTimes();
}

// Add event listeners for weekday buttons
weekdays.forEach((button) => button.addEventListener("click", toggleWeekday));

// Existing next3PrivateButton event listener with modifications
next3PrivateButton.addEventListener("click", function () {
  if (selectedDays.length === 1 || selectedDays.length === 4) {
    alert("Por favor, selecciona 2, 3 o 5 días.");
    return;
  }

  // New: Save selected times to session storage
  sessionStorage.setItem(
    "selectedTimesPrivate",
    JSON.stringify(selectedTimesPrivate)
  );

  // Save data to session storage
  sessionStorage.setItem("selectedDays", JSON.stringify(selectedDays));

  // TODO: Show time selection popup and proceed to next section
  updateProgressBar(4);
});

// Event listener for the "Ir atrás" button in Section 3 for Private Classes
back2PrivateButton.addEventListener("click", function () {
  // Show the previous section and hide the current one
  section2.classList.remove("hidden");
  section3Private.classList.add("hidden");
  updateProgressBar(2);
});

// Event listener for the "Siguiente" button in Section 2 to show the appropriate Section 3
document.getElementById("next2").addEventListener("click", function () {
  const mode = sessionStorage.getItem("mode");
  section2.classList.add("hidden");
  if (mode === "private") {
    section3Private.classList.remove("hidden");
    updateProgressBar(3);
  } else if (mode === "semi-private") {
    section3SemiPrivate.classList.remove("hidden");
    populateTimeOptionsSemiPrivate(); // New: populate the time options
  } else if (mode === "empresas") {
    section3Empresas.classList.remove("hidden");
    updateProgressBar(3);
  }
});

/*Code for modal logic */
// Function to open modal with time slots
function openModalWithTimes(day) {
  const modalContent =
    `
        <h3>Elige el horario de tu conveniencia</h3>
        <i class="fas fa-trash" onclick="trashCanCloseModal()" style="cursor:pointer;"></i>
        ` + generateTimeOptions(day);

  // Populate the modal with the heading and time slots
  document.getElementById("modal-time-options").innerHTML = modalContent;

  // Display the modal
  document.getElementById("modal").style.display = "block";
}

// Function to handle the trash can icon click, similar to the X closeButton
function trashCanCloseModal() {
  sessionStorage.setItem("modalClosedBySelection", "false");
  closeModal();
}

// Function to generate time options with columns and rows
function generateTimeOptions(day) {
  let options = '<div class="time-options-grid">';
  for (let i = 6; i <= 20; i++) {
    const time = `${i}:00 - ${i + 1}:00`;
    options += `<button type="button" class="time-button" onclick="selectTime('${day}', '${time}')">${time}</button>`;
  }
  options += "</div>";
  return options;
}

// Function to handle the selection of a time slot
function selectTime(day, time) {
  // Set the selected time for the given day
  selectedTimesPrivate[day] = time;

  // Update the display for the selected day
  const timeDiv = document.getElementById(`time-${day}`);
  timeDiv.innerHTML = `<div class="selected-time">${time}</div>`;

  // Update session storage
  sessionStorage.setItem(
    "selectedTimesPrivate",
    JSON.stringify(selectedTimesPrivate)
  );

  // Re-evaluate the button status
  checkSelectedTimes(); // ADD THIS LINE

  // Close the modal
  sessionStorage.setItem("modalClosedBySelection", "true"); // Set flag
  closeModal();
}

// Function to close the modal
function closeModal() {
  if (
    sessionStorage.getItem("modalClosedBySelection") === "false" &&
    lastClickedDay
  ) {
    // Find the corresponding DOM element for the day
    const dayElement = document.getElementById(lastClickedDay);
    if (dayElement) {
      dayElement.classList.remove("selected");
    }

    // Remove the corresponding day from selectedDays
    const dayIndex = selectedDays.indexOf(lastClickedDay);
    if (dayIndex > -1) {
      selectedDays.splice(dayIndex, 1);
    }

    // Remove the corresponding time from selectedTimesPrivate
    if (selectedTimesPrivate[lastClickedDay]) {
      delete selectedTimesPrivate[lastClickedDay];

      // Find and clear the time display element for the day
      const timeDisplayElement = document.getElementById(
        `time-${lastClickedDay}`
      );
      if (timeDisplayElement) {
        timeDisplayElement.innerHTML = "";
      }
    }

    // Update session storage after modifications
    sessionStorage.setItem("selectedDays", JSON.stringify(selectedDays));
    sessionStorage.setItem(
      "selectedTimesPrivate",
      JSON.stringify(selectedTimesPrivate)
    );

    // Reset the last clicked day
    lastClickedDay = null;
  }

  // Reset the flag and close the modal
  sessionStorage.removeItem("modalClosedBySelection");
  document.getElementById("modal").style.display = "none";
  // Call checkSelectedTimes to validate conditions for enabling the "next" button
  checkSelectedTimes();
}

// Function to populate time options when a day is clicked
weekdays.forEach((button) =>
  button.addEventListener("click", function (event) {
    openModalWithTimes(event.target.id); // Call the function to open the modal
  })
);

// JavaScript for Section 3 for Semi-Private Classes

const section3SemiPrivate = document.getElementById("section3-semi-private");
const next3SemiPrivateButton = document.getElementById("next3-semi-private");
const back2SemiPrivateButton = document.getElementById("back2-semi-private");
const intensities = document.querySelectorAll(".intensity");
let selectedIntensity = "";
const timeOptionsSemiPrivate = document.getElementById(
  "time-options-semi-private"
);
next3SemiPrivateButton.disabled = true;
checkSemiPrivateConditions();

function checkSemiPrivateConditions() {
  updateButtonStatus(
    "next3-semi-private",
    selectedIntensity && selectedTimeSemiPrivate
  );
}

// Function to toggle intensity selection
function toggleIntensity(event) {
  selectedIntensity = event.target.id;
  intensities.forEach((button) => button.classList.remove("selected"));
  event.target.classList.add("selected");
  checkSemiPrivateConditions();

  // Save the selected intensity to session storage
  sessionStorage.setItem("selectedIntensity", selectedIntensity);
}

// Add event listeners for intensity buttons
intensities.forEach((button) =>
  button.addEventListener("click", toggleIntensity)
);

// Event listener for the "Siguiente" button in Section 3 for Semi-Private Classes
next3SemiPrivateButton.addEventListener("click", function () {
  if (!selectedIntensity) {
    alert("Por favor, selecciona la intensidad de las clases.");
    return;
  }

  // New: Save selected time to session storage
  sessionStorage.setItem("selectedTimeSemiPrivate", selectedTimeSemiPrivate);
  // Save data to session storage
  sessionStorage.setItem("selectedIntensity", selectedIntensity);

  // TODO: Proceed to next section
});

// Event listener for the "Ir atrás" button in Section 3 for Semi-Private Classes
back2SemiPrivateButton.addEventListener("click", function () {
  // Show the previous section and hide the current one
  section2.classList.remove("hidden");
  section3SemiPrivate.classList.add("hidden");
  updateProgressBar(2);
});

function restoreSelectedTimeSemiPrivate() {
  const storedTime = sessionStorage.getItem("selectedTimeSemiPrivate");
  if (storedTime) {
    selectedTimeSemiPrivate = storedTime;
    const timeButtons = document.querySelectorAll(
      "#time-semi-private .time-button"
    );
    timeButtons.forEach((button) => {
      if (button.textContent === storedTime) {
        button.classList.add("selected");
      }
    });
  }
}

// Event listener for the "Siguiente" button in Section 2 to show the appropriate Section 3
document.getElementById("next2").addEventListener("click", function () {
  const mode = sessionStorage.getItem("mode");
  section2.classList.add("hidden");
  if (mode === "semi-private") {
    section3SemiPrivate.classList.remove("hidden");
    updateProgressBar(3);
    restoreSelectedTimeSemiPrivate(); // Restore the selected time
  }
  // TODO: Implement for private classes
});

const section3Empresas = document.getElementById("section3-empresas");
const next3EmpresasButton = document.getElementById("next3-empresas");
const back2EmpresasButton = document.getElementById("back2-empresas");
const companyNameInput = document.getElementById("companyName");
const employeeCountSelect = document.getElementById("employee-count");
next3EmpresasButton.disabled = true;

// Function to check whether both inputs are filled
function checkEmpresasConditions() {
  const isCompanyNameFilled = companyNameInput.value.trim() !== "";
  const isEmployeeCountSelected = employeeCountSelect.value !== "";

  // Set the disabled attribute based on conditions
  next3EmpresasButton.disabled = !(
    isCompanyNameFilled && isEmployeeCountSelected
  );

  // Update classes based on the disabled state
  if (next3EmpresasButton.disabled) {
    next3EmpresasButton.classList.remove("enabled");
    next3EmpresasButton.classList.add("disabled");
  } else {
    next3EmpresasButton.classList.remove("disabled");
    next3EmpresasButton.classList.add("enabled");
  }
}

// Event listeners for the inputs
companyNameInput.addEventListener("input", () => {
  sessionStorage.setItem("companyName", companyNameInput.value);
  checkEmpresasConditions();
});

employeeCountSelect.addEventListener("change", () => {
  sessionStorage.setItem("employeeCount", employeeCountSelect.value);
  checkEmpresasConditions();
});

// Restore the values from session storage if they exist
const storedCompanyName = sessionStorage.getItem("companyName");
const storedEmployeeCount = sessionStorage.getItem("employeeCount");

if (storedCompanyName) {
  companyNameInput.value = storedCompanyName;
}
if (storedEmployeeCount) {
  employeeCountSelect.value = storedEmployeeCount;
}

// Check conditions on page load
checkEmpresasConditions();

next3EmpresasButton.addEventListener("click", function () {
  // Proceed to next section (Section 4 for empresas)
  section3Empresas.classList.add("hidden");
  section4Empresas.classList.remove("hidden");
  updateProgressBar(4);
});

back2EmpresasButton.addEventListener("click", function () {
  // Go back to Section 2
  section3Empresas.classList.add("hidden");
  section2.classList.remove("hidden");
  updateProgressBar(2);
});

// JavaScript for Section 4: Pricing

const section4 = document.getElementById("section4");
const priceElement = document.getElementById("price");
const payButton = document.getElementById("pay-button");
const back3Button = document.getElementById("back3");

// Function to calculate and display price

// Event listener for the "Ir atrás" button in Section 4
back3Button.addEventListener("click", function () {
  // Show the previous section and hide the current one
  const mode = sessionStorage.getItem("mode");
  section4.classList.add("hidden");
  if (mode === "private") {
    section3Private.classList.remove("hidden");
    updateProgressBar(3);
  } else if (mode === "semi-private") {
    section3SemiPrivate.classList.remove("hidden");
    updateProgressBar(3);
  }
});

// Event listeners to show Section 4 and calculate the price
document.getElementById("next3-private").addEventListener("click", function () {
  displayPrice();
  section3Private.classList.add("hidden");
  section4.classList.remove("hidden");
  updateProgressBar(4);
});

document
  .getElementById("next3-semi-private")
  .addEventListener("click", function () {
    displayPrice();
    section3SemiPrivate.classList.add("hidden");
    section4.classList.remove("hidden");
    updateProgressBar(4);
  });

const back3EmpresasButton = document.getElementById("back3-empresas");

back3EmpresasButton.addEventListener("click", function () {
  // Go back to Section 3 for empresas
  section4Empresas.classList.add("hidden");
  section3Empresas.classList.remove("hidden");
  updateProgressBar(3);
});

//Functionality that gathers all data from session storage and sends it to the server and then clears session storage

document
  .getElementById("send-form-empresas")
  .addEventListener("click", submitForm);
document.getElementById("pay-button").addEventListener("click", submitForm);

async function submitForm(event) {
  event.preventDefault();
  // Retrieve all keys from session storage
  let formData = {};
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    formData[key] = sessionStorage.getItem(key);
  }

  // Send data to server
  try {
    const response = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const responseText = await response.text();

    if (response.ok) {
      alert(`🥳 Felicidades! ${responseText}`); // Show success message
      sessionStorage.clear();
      resetFormUI();
    } else {
      console.error("Form submission failed:", responseText);
      alert(`😞 Lo sentimos! ${responseText}`); // Show error message from server
    }
  } catch (error) {
    console.error("Error in submitting form:", error);
    alert("An error occurred. Please try again.");
  }
}

// Function to reset the form UI for a new entry
function resetFormUI() {
  // Reset the form fields
  document.getElementById("registration-form").reset();

  // Reset the UI elements
  // Example: Set the first section visible and others hidden
  section1.classList.remove("hidden");
  section2.classList.add("hidden");
  section3Private.classList.add("hidden"); // Add this line to hide section3Private
  section3SemiPrivate.classList.add("hidden"); // Add this line to hide section3SemiPrivate
  section3Empresas.classList.add("hidden"); // Add this line to hide section3Empresas
  section4.classList.add("hidden");
  section4Empresas.classList.add("hidden");

  // Reset the progress bar to the first section
  updateProgressBar(1);
}
