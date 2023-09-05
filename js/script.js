// Define the constants for code columns and portfolioElement here
const htmlColumn = document.querySelector(".html-code");
const cssColumn = document.querySelector(".css-code");
const jsColumn = document.querySelector(".js-code");

// Import all functions from helpers.js using the alias 'Helpers'
import * as Helpers from './helpers.js';

// Import Prism.js and its plugins from a CDN
import 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/plugins/autoloader/prism-autoloader.min.js';

// Initialize variables
let charIndex = 0;
let codeIndex = 0;
export let currentStep = 0;

// Set the HTML column's opacity to 0.5 at the start
document.querySelector(".html-code").style.opacity = 0.5;

// Define variables to track code indices for each column
let htmlCodeIndex = 0;
let cssCodeIndex = 0;
let jsCodeIndex = 0;

let currentActiveColumn = "html"; // Initialize with the HTML column as active

const switchColumnCharacters = [
  '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|'
]; // Define an array of switch characters
let currentSwitchIndex = 0; // Initialize the index to 0

// Import the stepInfo array from steps.js
import { stepInfo } from './steps.js';
import { totalSteps } from './steps.js';

// Define your HTML, CSS, and JavaScript file paths
const codePaths = {
  html: "CodeColumns/html-code.txt",
  css: "CodeColumns/css-code.txt",
  js: "CodeColumns/js-code.txt",
};

// Define constants to store the fetched code
const codeConfig = {
  html: "",
  css: "",
  js: "",
};

// Define codeColumns at a higher scope
const codeColumns = {
  html: htmlColumn,
  css: cssColumn,
  js: jsColumn,
};

// Function to fetch code and store it
function fetchCode(codePath) {
  return fetch(codePath)
    .then((response) => response.text())
    .catch((error) => {
      console.error(`Error loading code from ${codePath}: ${error}`);
    });
}

// Fetch code for each code column and store it in codeConfig
fetchCode(codePaths.html).then((htmlText) => {
  codeConfig.html = htmlText;
  updateCodeColumns(); // Update code columns after fetching code
});

fetchCode(codePaths.css).then((cssText) => {
  codeConfig.css = cssText;
});

fetchCode(codePaths.js).then((jsText) => {
  codeConfig.js = jsText;
});

function updateCharacterOpacity() {
  // Get the active column
  const activeColumn = codeColumns[currentActiveColumn];

  // Reset the opacity for the entire column to 0.5
  activeColumn.style.opacity = '0.5';

  // Calculate the current character index
  const currentIndex = Math.min(charIndex, activeColumn.textContent.length - 1);

  console.log('Current Index:', currentIndex); // Debugging log

  // Set the opacity of the current character to 1
  if (currentIndex >= 0) {
    const currentCharacter = activeColumn.childNodes[currentIndex];
    if (currentCharacter && currentCharacter.nodeType === 1) {
      currentCharacter.style.opacity = '1';
      console.log('Updated Opacity for Index', currentIndex, 'to 1'); // Added console log
    }
  }

  // Increment charIndex to move to the next character
  charIndex++;
}




// Function to update code columns with current code and apply Prism.js highlighting
function updateCodeColumns() {
  const currentHtmlCode = codeConfig.html.substring(0, htmlCodeIndex);
  const currentCssCode = codeConfig.css.substring(0, cssCodeIndex);
  const currentJsCode = codeConfig.js.substring(0, jsCodeIndex);

  // Update the code columns
  htmlColumn.textContent = currentHtmlCode;
  cssColumn.textContent = currentCssCode;
  jsColumn.textContent = currentJsCode;

  // Apply Prism.js highlighting to the code columns
  Prism.highlightElement(htmlColumn);
  Prism.highlightElement(cssColumn);
  Prism.highlightElement(jsColumn);

  // Update the opacity of the current character and the two characters before it in the active column
  updateCharacterOpacity();
}

function updateLoadingBar() {
  const completedSteps = currentStep; // Assuming currentStep is the current step number
  const progress = (completedSteps / totalSteps) * 100; // Calculate progress percentage
  const loadingBar = document.querySelector(".loading-bar");

  // Update the loading bar width
  loadingBar.style.width = `${progress}%`;
}

// Event listener for keydown events (used for code typing animation)
document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
  if (currentStep < stepInfo.length) {
    if (htmlCodeIndex < codeConfig.html.length || cssCodeIndex < codeConfig.css.length || jsCodeIndex < codeConfig.js.length) {
      let codeCharacter = '';

      switch (currentActiveColumn) {
        case 'html':
          codeCharacter = codeConfig.html.charAt(htmlCodeIndex);
          break;
        case 'css':
          codeCharacter = codeConfig.css.charAt(cssCodeIndex);
          break;
        case 'js':
          codeCharacter = codeConfig.js.charAt(jsCodeIndex);
          break;
        default:
          break;
      }

      // Update code columns
      updateCodeColumns();

      if (!switchColumnCharacters.includes(codeCharacter)) {
        // Continue with typing and applying the step for the current column
        applyCurrentStep(codeCharacter);

        // Increment the code index for the current column
        incrementCodeIndex();

        event.preventDefault(); // Prevent default keydown behavior to avoid page scrolling

        // No need to call updateCharacterOpacity here
      } else {
        // Move to the next column based on the encountered character
        switchColumn();
        // Exit the function to prevent further processing
        return;
      }
    } else {
      // All steps completed, remove the event listener
      document.removeEventListener('keydown', handleKeyPress);
    }
  } else {
    // All steps completed, remove the event listener
    document.removeEventListener('keydown', handleKeyPress);
  }
}

// Function to switch to the next code column and update opacity
function switchColumn() {
  // Remove the switch character from the code column
  switch (currentActiveColumn) {
    case "html":
      codeConfig.html = codeConfig.html.substring(0, htmlCodeIndex) + codeConfig.html.substring(htmlCodeIndex + 1);
      break;
    case "css":
      codeConfig.css = codeConfig.css.substring(0, cssCodeIndex) + codeConfig.css.substring(cssCodeIndex + 1);
      break;
    case "js":
      codeConfig.js = codeConfig.js.substring(0, jsCodeIndex) + codeConfig.js.substring(jsCodeIndex + 1);
      break;
    default:
      break;
  }

  // Reduce opacity for the current column
  document.querySelector(`.${currentActiveColumn}-code`).style.opacity = 0.1; // Updated opacity to 0.1

  switch (currentActiveColumn) {
    case "html":
      currentActiveColumn = "css";
      break;
    case "css":
      currentActiveColumn = "js";
      break;
    case "js":
      currentActiveColumn = "html"; // Loop back to HTML column when reaching the end
      break;
    default:
      break;
  }

  // Get the active column
  const activeColumn = codeColumns[currentActiveColumn];
  const activeText = activeColumn.textContent;

  // Reset the opacity for the entire column
  activeColumn.style.opacity = '0.5';

  // Calculate the current character index
  const currentIndex = Math.min(charIndex, activeText.length - 1);

  // Apply different opacities to the current character and the two characters before it
  for (let i = currentIndex; i >= Math.max(0, currentIndex - 2); i--) {
    const opacity = 0.8 - (currentIndex - i) * 0.1; // Calculate opacity
    activeColumn.childNodes[i].style.opacity = opacity.toFixed(1);
  }

  // Increase opacity for the newly active column
  document.querySelector(`.${currentActiveColumn}-code`).style.opacity = 0.5; // Updated opacity to 0.5
}


// Call updateCharacterOpacity after updating charIndex in applyCurrentStep
function applyCurrentStep(codeCharacter) {
  if (currentStep < stepInfo.length) {
    if (stepInfo[currentStep].triggerCharacter === codeCharacter) {
      // Apply the action associated with the current step
      stepInfo[currentStep].action();

      // Increment the current step
      currentStep++;

      // Update the loading bar
      updateLoadingBar();

      // Call updateCharacterOpacity here
      updateCharacterOpacity();
    }
  }
}

// Function to increment the code index without appending the character
function incrementCodeIndex() {
  switch (currentActiveColumn) {
    case "html":
      htmlCodeIndex++; // Increment the code index for HTML
      break;
    case "css":
      cssCodeIndex++; // Increment the code index for CSS
      break;
    case "js":
      jsCodeIndex++; // Increment the code index for JS
      break;
    default:
      break;
  }
}

function applyStepText() {
  if (currentStep < stepInfo.length) {
    const stepDiv = stepInfo[currentStep].stepDiv; // Get the stored reference
    if (stepDiv) {
      const stepText = stepDiv.textContent;
      console.log(`Current Step: ${currentStep}`);
      console.log(`Step Text: ${stepText}`);

      if (charIndex < stepText.length) {
        const nextCharacter = stepText.charAt(charIndex);

        // Append the next character in the step text
        stepDiv.textContent = stepText.substring(0, charIndex + 1);
        charIndex++;
        console.log(`Appended Character: ${nextCharacter}`);
      } else {
        // Move to the next step if the step text is completed
        currentStep++;
        charIndex = 0; // Reset the character index for the next step
        console.log(`Step Completed. Current Step: ${currentStep}`);
      }
    }
  }
}
