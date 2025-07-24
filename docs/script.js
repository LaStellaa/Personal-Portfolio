"use strict";

/* ==========================================
   MOBILE NAVIGATION (for index.html only)
   ========================================== */

const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.getElementById("primary-navigation");

// Only add navigation event listener if elements exist (for index.html)
if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const isVisible = primaryNav.getAttribute("data-visible") === "true";
    primaryNav.setAttribute("data-visible", String(!isVisible));
    navToggle.setAttribute("aria-expanded", String(!isVisible));
  });
}

/* ==========================================
   TYPING EFFECT (for index.html only)
   ========================================== */

const words = ["Web Developer", "Freelancer", "Creative"];
const colors = ["#fe8e69ff", "#65d690d3", "#b0abe6ff"];
let currentWordIndex = 0;
let currentLetterIndex = 0;
let isDeleting = false;

const textElement = document.querySelector(".job-title .text");
const typingSpeed = 250;
const deletingSpeed = 180;
const pauseTime = 1500;

const devMode = true;
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Only run typing effect if element exists (for index.html)
if (textElement) {
  if (prefersReducedMotion) {
    // Show the first word statically and skip animation
    textElement.textContent = words[0];
    textElement.style.color = colors[0];
  } else {
    function typeEffect() {
      const currentWord = words[currentWordIndex];
      if (isDeleting) {
        currentLetterIndex--;
      } else {
        currentLetterIndex++;
      }
      textElement.innerHTML = `<span style="color: ${
        colors[currentWordIndex]
      }">${currentWord.substring(0, currentLetterIndex)}</span>`;
      let timeout = isDeleting ? deletingSpeed : typingSpeed;
      if (!isDeleting && currentLetterIndex === currentWord.length) {
        timeout = pauseTime;
        isDeleting = true;
      } else if (isDeleting && currentLetterIndex === 0) {
        isDeleting = false;
        currentWordIndex = (currentWordIndex + 1) % words.length;
        timeout = typingSpeed;
      }
      setTimeout(typeEffect, timeout);
    }

    if (devMode || prefersReducedMotion) {
      // Show the first word statically and skip animation
      textElement.textContent = words[0];
      textElement.style.color = colors[0];
    } else {
      typeEffect();
    }
  }
}

/* ==========================================
   FORM VALIDATION (for form.html only)
   ========================================== */

// Get form elements
const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const nameError = document.querySelector(".error-name");
const emailError = document.querySelector(".error-email");

// Email validation regex pattern
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Helper functions to show/hide error messages
function showError(errorElement, inputElement) {
  errorElement.style.display = "block";
  inputElement.setAttribute("aria-invalid", "true");
}

function hideError(errorElement, inputElement) {
  errorElement.style.display = "none";
  inputElement.setAttribute("aria-invalid", "false");
}

// Validate name field (required)
function validateName() {
  const nameValue = nameInput.value.trim();
  if (nameValue === "") {
    showError(nameError, nameInput);
    return false;
  } else {
    hideError(nameError, nameInput);
    return true;
  }
}

// Validate email field (required + valid format)
function validateEmail() {
  const emailValue = emailInput.value.trim();
  if (emailValue === "" || !emailRegex.test(emailValue)) {
    showError(emailError, emailInput);
    return false;
  } else {
    hideError(emailError, emailInput);
    return true;
  }
}

// Set up form validation if form exists
if (form) {
  // Real-time validation for name field only
  nameInput.addEventListener("input", validateName);

  // Email validation only happens on form submission

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Validate both fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();

    // Only proceed if both validations pass
    if (isNameValid && isEmailValid) {
      // Form is valid - show success message
      alert(
        "Form submitted successfully! (This is just a test - no backend connected yet)"
      );

      // When you add a backend, replace the alert above with your submission logic:
      // - Send data to your server
      // - Handle response
      // - Show appropriate success/error messages

      // Optionally reset the form after successful submission
      // form.reset();
    }
    // If validation fails, error messages are already shown by the validation functions
  });
}
