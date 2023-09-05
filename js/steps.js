// Import all functions from helpers.js using the alias 'Helpers'
import * as Helpers from './helpers.js';

import { currentStep } from './script.js';

const stepInfo = [
    {
      Descripion: "Center the container",
      action: () => {
        Helpers.centerContainer();
      },
      triggerCharacter: '/',
      getClass: () => "",
    },
    {
      Descripion: "Change background color",
      action: () => {
        Helpers.changeBackgroundColor();
      },
      triggerCharacter: '5',
      getClass: () => "",
    },
    {
      Descripion: "Change text color",
      action: () => {
        Helpers.changeTextColor();
      },
      triggerCharacter: ';',
      getClass: () => "",
    },
    {
      Descripion: "New Div",
      action: () => {
        Helpers.createAndAnimateElementForStep("div", "New Div", ".element-container", "step3-div");
      },
      triggerCharacter: ';',
      getClass: () => "step3-div",
    },
    {
      Descripion: "Step 4",
      action: () => {
        Helpers.createAndAnimateElementForStep("div", "Step 4", ".element-container", "step4-div");
      },
      triggerCharacter: ';',
      getClass: () => "step4-div",
    },
    {
      Descripion: "Func",
      action: () => {
        Helpers.createAndAnimateElementForStep("div", "Func", ".element-container", "step5-div");
      },
      triggerCharacter: ';',
      getClass: () => "step5-div",
    },
    {
      Descripion: "Apply scaling effect to the div created in Step 5",
      action: () => {
        Helpers.applyScalingEffect(".step5-div", "step6-div");
      },
      triggerCharacter: ';',
      getClass: () => "step6-div",
    },
    {
      Descripion: "Hello World!",
      action: () => {
        const step7Div = Helpers.createAndAnimateElement("div", "", ".element-container", ["step7-div"]);
        Helpers.createAndAnimateElement("h1", "Hello World!", ".step7-div", ["fat", "cat"]);
      },
      triggerCharacter: ';',
      getClass: () => "step7-div",
    },
  ];

  export { stepInfo };
  export const totalSteps = stepInfo.length; 