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

  // Close mobile menu when a navigation link is clicked
  const navLinks = primaryNav.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Only close menu if it's currently open
      if (primaryNav.getAttribute("data-visible") === "true") {
        primaryNav.setAttribute("data-visible", "false");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

/* ==========================================
   TYPING EFFECT (for index.html only)
   ========================================== */

const words = ["Web Developer", "Freelancer", "Creative"];
const colors = ["#16C47F", "#EB5B00", "#9929EA"];
let currentWordIndex = 0;
let currentLetterIndex = 0;
let isDeleting = false;

const textElement = document.querySelector(".job-title .text");
const typingSpeed = 250;
const deletingSpeed = 180;
const pauseTime = 1500;

const devMode = false;
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
const successMessage = document.querySelector(".success-message");
const mainForm = document.querySelector(".main-form");

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
    e.preventDefault();

    // Validate both fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();

    // Only proceed if both validations pass
    if (isNameValid && isEmailValid) {
      successMessage.style.display = "block";

      mainForm.style.display = "none";

      // Scroll to success message
      successMessage.scrollIntoView({ behavior: "smooth" });

      // When you add a backend, replace this with your submission logic:
      // - Send data to your server
      // - Handle response
      // - Show appropriate success/error messages

      // Reset the form (hidden but ready for potential reuse)
      form.reset();
    }
    // If validation fails, error messages are already shown by the validation functions
  });
}

/* ==========================================
   PROJECT CARD LINKS INITIALIZATION
   ========================================== */

// Ensure project links are properly initialized with robust timing
function initProjectLinks() {
  const projectLinks = document.querySelectorAll(".project-card a");

  if (projectLinks.length === 0) {
    // Retry if links aren't found yet
    setTimeout(initProjectLinks, 100);
    return;
  }

  projectLinks.forEach((link) => {
    // Ensure links are properly styled and clickable
    link.style.display = "block";
    link.style.position = "relative";
    link.style.zIndex = "999";
    link.style.cursor = "pointer";
    link.style.pointerEvents = "auto";
  });
}

// Use multiple timing approaches to ensure links work consistently
document.addEventListener("DOMContentLoaded", initProjectLinks);
window.addEventListener("load", initProjectLinks);
setTimeout(initProjectLinks, 500);
