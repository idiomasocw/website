// JavaScript for Section 1

const section1 = document.getElementById("section1");
const section2 = document.getElementById("section2");

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
        buttonElement.classList.remove('enabled');
        buttonElement.classList.add('disabled');
    } else {
        buttonElement.classList.remove('disabled');
        buttonElement.classList.add('enabled');
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Initialize session storage
    //sessionStorage.clear();
    updateProgressBar(1);
    const next1Button = document.getElementById("next1");
    const ageSelect = document.getElementById("edad");
    next1Button.disabled = true;
    const ageWarning = document.getElementById("age-warning");

      // Load saved data from session storage to populate the form fields
  const nombre = sessionStorage.getItem("nombre");
  const email = sessionStorage.getItem("email");
  const telefono = sessionStorage.getItem("telefono");
  const edad = sessionStorage.getItem("edad");

  if (nombre) document.getElementById("nombre").value = nombre;
  if (email) document.getElementById("email").value = email;
  if (telefono) document.getElementById("telefono").value = telefono;
  if (edad) {
    document.getElementById("edad").value = edad;
    checkAgeAndEnableButton(); // Call the function here
  }
  
  // Function to update session storage when a form field changes
function updateSessionStorage(fieldName) {
    const fieldValue = document.getElementById(fieldName).value;
    sessionStorage.setItem(fieldName, fieldValue);
  }
  
  // Add event listeners to update session storage
  document.getElementById("nombre").addEventListener("input", () => updateSessionStorage("nombre"));
  document.getElementById("email").addEventListener("input", () => updateSessionStorage("email"));
  document.getElementById("telefono").addEventListener("input", () => updateSessionStorage("telefono"));
  document.getElementById("edad").addEventListener("change", () => {
    updateSessionStorage("edad");
    checkAgeAndEnableButton(); // Also check the age when it changes
  });
  

  // Add this function to check the age and enable/disable the next button
function checkAgeAndEnableButton() {
    const edadValue = document.getElementById("edad").value;
    updateButtonStatus("next1", edadValue !== "Menor de 16");    
  }
  
  
    // Event listener for the "Siguiente" button in Section 1
    next1Button.addEventListener("click", function() {
      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const telefono = document.getElementById("telefono").value;
      const edad = ageSelect.value;
  
      if (!nombre || !email || !telefono) {
        alert("Por favor completa todos los campos requeridos.");
        return;
      }
  
      if (edad === "Menor de 16") {
        alert("La edad mínima es 16 años");
        return;
      }
        
      // Save data to session storage
      sessionStorage.setItem("nombre", nombre);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("telefono", telefono);
      sessionStorage.setItem("edad", edad);
  
      // Proceed to next section
      section1.classList.add("hidden");
      section2.classList.remove("hidden");
      updateProgressBar(2);
    });
    ageSelect.addEventListener("change", function() {
        if (this.value === "Menor de 16") {
          alert("La edad mínima es 16 años");
          next1Button.disabled = true;
        } else {
          next1Button.disabled = false;
        }
      });
  });
  


  // JavaScript for Section 2

// JavaScript for Section 2
const next2Button = document.getElementById("next2");
const back1Button = document.getElementById("back1");

// New code: Start
const modeOptions = document.querySelectorAll('.mode-option');
let selectedMode = sessionStorage.getItem("mode") || "";

// Event listener for the "Ir atrás" button in Section 2
back1Button.addEventListener("click", function() {
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

// Add click event to each mode option
modeOptions.forEach(option => {
  option.addEventListener('click', function() {
    // Remove 'selected' class from all options
    modeOptions.forEach(opt => opt.classList.remove('selected'));
    
    // Add 'selected' class to clicked option
    this.classList.add('selected');
    
    // Update selected mode
    selectedMode = this.id;
    
    // Update session storage
    sessionStorage.setItem("mode", selectedMode);
    
    // Enable the next button
    next2Button.disabled = false;

    checkAndEnableNext2Button();
      
  });
});
// New code: End



// JavaScript for Section 3 for Private Classes

const section3Private = document.getElementById("section3-private");
const next3PrivateButton = document.getElementById("next3-private");
const back2PrivateButton = document.getElementById("back2-private");
const weekdays = document.querySelectorAll(".weekday");
const selectedDays = [];
const timeOptionsPrivate = document.getElementById("time-options-private");
const selectedTimesPrivate = {};
let selectedTimeSemiPrivate = "";
next3PrivateButton.disabled = true; 
checkSelectedTimes();

// New Function to generate time options
function generateTimeOptions() {
    let options = '';
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
      const previousSelectedButton = document.querySelector(`#time-${day} .time-button.selected`);
      if (previousSelectedButton) {
        previousSelectedButton.classList.remove("selected");
      }
    }
    selectedTimesPrivate[day] = time;
    buttonElement.classList.add("selected");

    // Update session storage instantly
    sessionStorage.setItem("selectedTimesPrivate", JSON.stringify(selectedTimesPrivate));

    checkSelectedTimes();
}
  

function checkSelectedTimes() {
    let enableButton = true;  // Initialize a variable to check if the button should be enabled
    
    if (selectedDays.length !== 2 && selectedDays.length !== 3 && selectedDays.length !== 5) {
      enableButton = false;  // Set the variable to false if the condition is not met
    }

    for (const day of selectedDays) {
      if (!selectedTimesPrivate[day]) {
        enableButton = false;  // Set the variable to false if the condition is not met
        break;  // Exit the loop
      }
    }
    updateButtonStatus("next3-private", enableButton);   
    return enableButton;
}
  
  // Function to toggle time selection for semi-private classes (New Function)
// New Function to toggle time selection for semi-private classes
function toggleTimeSemiPrivate(time, buttonElement) {
    const previouslySelected = document.querySelector("#time-semi-private .time-button.selected");
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
  }
  
// New Function to populate time options for semi-private classes
function populateTimeOptionsSemiPrivate() {
    const timeDiv = document.getElementById("time-semi-private");
    let options = '';
    for (let i = 6; i <= 20; i++) {
      const time = `${i}:00 - ${i + 1}:00`;
      options += `<button type="button" class="time-button" onclick="toggleTimeSemiPrivate('${time}', this)">${time}</button>`;
    }
    timeDiv.innerHTML = options;
  }
  

// Existing Function to toggle weekday selection with modifications
function toggleWeekday(event) {
    const day = event.target.id;
    const index = selectedDays.indexOf(day);
    const timeDiv = document.getElementById(`time-${day}`);
    if (index > -1) {
      selectedDays.splice(index, 1);
      event.target.classList.remove("selected");
      timeDiv.innerHTML = "";  // Clear the time options
      delete selectedTimesPrivate[day]; // Remove the time for the unselected day
    } else {
      selectedDays.push(day);
      event.target.classList.add("selected");
      timeDiv.innerHTML = generateTimeOptions();  // Add the time options
    }

    // Update session storage instantly
    sessionStorage.setItem("selectedDays", JSON.stringify(selectedDays));
    sessionStorage.setItem("selectedTimesPrivate", JSON.stringify(selectedTimesPrivate));
    
    checkSelectedTimes();
}

// New Function to toggle time selection for private classes
function toggleTime(time, buttonElement) {
    const day = buttonElement.parentElement.id.split("-")[1];
    if (selectedTimesPrivate[day]) {
      const previousSelectedButton = document.querySelector(`#time-${day} .time-button.selected`);
      if (previousSelectedButton) {
        previousSelectedButton.classList.remove("selected");
      }
    }
    selectedTimesPrivate[day] = time;
    buttonElement.classList.add("selected");

    // Hide all other time buttons for the same day
    const allTimeButtons = document.querySelectorAll(`#time-${day} .time-button`);
    allTimeButtons.forEach(btn => {
      if (btn !== buttonElement) {
        btn.style.display = "none";
      }
    });

    // Update session storage instantly
    sessionStorage.setItem("selectedTimesPrivate", JSON.stringify(selectedTimesPrivate));

    checkSelectedTimes();
}

// Add event listeners for weekday buttons
weekdays.forEach(button => button.addEventListener("click", toggleWeekday));

// Existing next3PrivateButton event listener with modifications
next3PrivateButton.addEventListener("click", function() {
    if (selectedDays.length === 1 || selectedDays.length === 4) {
      alert("Por favor, selecciona 2, 3 o 5 días.");
      return;
    }

    // New: Save selected times to session storage
  sessionStorage.setItem("selectedTimesPrivate", JSON.stringify(selectedTimesPrivate));

  // Save data to session storage
  sessionStorage.setItem("selectedDays", JSON.stringify(selectedDays));

  // TODO: Show time selection popup and proceed to next section
  updateProgressBar(4);
});

// Event listener for the "Ir atrás" button in Section 3 for Private Classes
back2PrivateButton.addEventListener("click", function() {
  // Show the previous section and hide the current one
  section2.classList.remove("hidden");
  section3Private.classList.add("hidden");
  updateProgressBar(2);
});

// Event listener for the "Siguiente" button in Section 2 to show the appropriate Section 3
document.getElementById("next2").addEventListener("click", function() {
    const mode = sessionStorage.getItem("mode");
    section2.classList.add("hidden");
    if (mode === "private") {
      section3Private.classList.remove("hidden");
      updateProgressBar(3);
    } else if (mode === "semi-private") {
      section3SemiPrivate.classList.remove("hidden");
      populateTimeOptionsSemiPrivate();  // New: populate the time options
    }
  });
  


// JavaScript for Section 3 for Semi-Private Classes

const section3SemiPrivate = document.getElementById("section3-semi-private");
const next3SemiPrivateButton = document.getElementById("next3-semi-private");
const back2SemiPrivateButton = document.getElementById("back2-semi-private");
const intensities = document.querySelectorAll(".intensity");
let selectedIntensity = "";
const timeOptionsSemiPrivate = document.getElementById("time-options-semi-private");
next3SemiPrivateButton.disabled = true;
checkSemiPrivateConditions();

function checkSemiPrivateConditions() {
    updateButtonStatus("next3-semi-private", selectedIntensity && selectedTimeSemiPrivate);

  }

// Function to toggle intensity selection
function toggleIntensity(event) {
  selectedIntensity = event.target.id;
  intensities.forEach(button => button.classList.remove("selected"));
  event.target.classList.add("selected");
  checkSemiPrivateConditions();
}

// Add event listeners for intensity buttons
intensities.forEach(button => button.addEventListener("click", toggleIntensity));

// Event listener for the "Siguiente" button in Section 3 for Semi-Private Classes
next3SemiPrivateButton.addEventListener("click", function() {
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
back2SemiPrivateButton.addEventListener("click", function() {
  // Show the previous section and hide the current one
  section2.classList.remove("hidden");
  section3SemiPrivate.classList.add("hidden");
  updateProgressBar(2);
});

// Event listener for the "Siguiente" button in Section 2 to show the appropriate Section 3
document.getElementById("next2").addEventListener("click", function() {
  const mode = sessionStorage.getItem("mode");
  section2.classList.add("hidden");
  if (mode === "semi-private") {
    section3SemiPrivate.classList.remove("hidden");
    updateProgressBar(3);
  }
  // TODO: Implement for private classes
});


// JavaScript for Section 4: Pricing

const section4 = document.getElementById("section4");
const priceElement = document.getElementById("price");
const payButton = document.getElementById("pay-button");
const back3Button = document.getElementById("back3");

// Function to calculate and display price
function calculatePrice() {
    const mode = sessionStorage.getItem("mode");
    let price = 0;
    let paymentUrl = "";  // Initialize payment URL
    
    if (mode === "private") {
      const selectedDays = JSON.parse(sessionStorage.getItem("selectedDays"));
      if (selectedDays.length === 2) {
        price = 255000;
        paymentUrl = "https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848b48faa1018b605e48380dff";  // Set the URL for 2 days in private lessons
      } else if (selectedDays.length === 3) {
        price = 373000;
        paymentUrl = "https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848b48fa5a018b605c40770db0";  // Set the URL for 3 days in private lessons
      } else if (selectedDays.length === 5) {
        price = 600000;
        paymentUrl = "https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848b48fa5a018b605b01a20daf";  // Set the URL for 5 days in private lessons
      }
    } else if (mode === "semi-private") {
      const selectedIntensity = sessionStorage.getItem("selectedIntensity");
      if (selectedIntensity === "twice") {
        price = 152000;
        paymentUrl = "https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848b48faa1018b6060107b0e00";  // Set the URL for 2 days in semi-private lessons
      } else if (selectedIntensity === "thrice") {
        price = 230000;
        paymentUrl = "https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848b48fa3b018b605f45cb0d80";  // Set the URL for 3 days in semi-private lessons
      }
    }
    
    priceElement.innerText = `$${price}`;
    if (price > 0) {
      payButton.classList.remove("hidden");
      payButton.href = paymentUrl;  // Update the URL of the "Pagar" button
    }
  }
  

// Event listener for the "Ir atrás" button in Section 4
back3Button.addEventListener("click", function() {
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
document.getElementById("next3-private").addEventListener("click", function() {
  calculatePrice();  
  section3Private.classList.add("hidden");
  section4.classList.remove("hidden");
  updateProgressBar(4);
});

document.getElementById("next3-semi-private").addEventListener("click", function() {
  calculatePrice();
  section3SemiPrivate.classList.add("hidden");
  section4.classList.remove("hidden");
  updateProgressBar(4);
});
