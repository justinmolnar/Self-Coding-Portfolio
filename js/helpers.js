// Import the stepInfo array from steps.js
import { stepInfo } from './steps.js';

import { currentStep } from './script.js';

// Import all functions from helpers.js
import * as Helpers from './helpers.js';

const portfolioElement = document.querySelector(".portfolio h1");
const portfolioContainer = document.querySelector(".portfolio .container");

// Define the container element
const elementContainer = document.querySelector(".element-container");

// Center the portfolio container
export function centerContainer() {
    if (portfolioContainer) {
      portfolioContainer.classList.add("centered-scaled");
    } else {
      console.error("Portfolio container not found.");
    }
  }
  
  // Change the background color of the portfolio container
  export function changeBackgroundColor() {
    if (portfolioContainer) {
      portfolioContainer.style.backgroundColor = "lightblue";
    } else {
      console.error("Portfolio container not found.");
    }
  }
  
  // Change the text color of the portfolio element
  export function changeTextColor() {
    if (portfolioElement) {
      portfolioElement.style.color = "blue";
    } else {
      console.error("Portfolio element not found.");
    }
  }
  
  // Create and animate an element for a specific step
  export function createAndAnimateElementForStep(tagName, text, targetSelector, stepClass) {
      const stepDiv = createAndAnimateElement(tagName, text, targetSelector, [stepClass]);
      stepInfo[currentStep].stepDiv = stepDiv; // Store the reference to the step div
      return stepDiv;
    }

    // Apply a scaling effect to a target element by adding a class
    export function applyScalingEffect(targetSelector, className) {
    const targetElement = document.querySelector(targetSelector);
    if (targetElement) {
      targetElement.classList.add(className);
    } else {
      console.error(`Target element not found: ${targetSelector}`);
    }
  }
  
  export function createAndAnimateElement(tagName, text, targetSelector, classes = [], id = "") {
      const existingElement = document.querySelector(`${targetSelector} .${classes[0]}`);
      const newElement = existingElement || document.createElement(tagName);
    
      if (id) {
        newElement.id = id;
      }
    
      // Add classes if provided
      classes.forEach((className) => {
        newElement.classList.add(className);
      });
    
      const targetElement = document.querySelector(targetSelector);
    
      if (targetElement) {
        if (!existingElement) {
          targetElement.appendChild(newElement);
          console.log(`Created element with classes: ${classes.join(", ")}`);
        }
    
        let localCharIndex = 0;
        const stepText = text; // Use the "text" argument as the step text
    
        function handleKeyDown(event) {
          if (localCharIndex < stepText.length) {
            newElement.textContent += stepText.charAt(localCharIndex);
            localCharIndex++;
            event.preventDefault(); // Prevent default keydown behavior to avoid page scrolling
          } else {
            // Remove the event listener when the entire step text is displayed
            document.removeEventListener("keydown", handleKeyDown);
          }
        }
    
        // Add a keydown event listener to the document
        document.addEventListener("keydown", handleKeyDown);
      } else {
        console.error(`Target element not found: ${targetSelector}`);
      }
    
      return newElement;
    }
    
      
  