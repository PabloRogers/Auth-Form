"use client";

import { ReactElement, useState, cloneElement } from "react";

interface MultiStepFormProps {
  steps: ReactElement[];
}

export function useMultiStepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function nextStep() {
    setCurrentStepIndex((currentIndex) => {
      if (currentIndex >= steps.length - 1) return currentIndex;
      return currentIndex + 1;
    });
  }

  function backStep() {
    setCurrentStepIndex((currentIndex) => {
      if (currentIndex <= 0) return currentIndex;
      return currentIndex - 1;
    });
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    isFistStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    nextStep,
    backStep,
  };
}
