"use strict";

const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.getElementById("primary-navigation");

navToggle.addEventListener("click", () => {
  console.log("Toggle clicked");
  const isVisible = primaryNav.getAttribute("data-visible") === "true";

  primaryNav.setAttribute("data-visible", String(!isVisible));
  navToggle.setAttribute("aria-expanded", String(!isVisible));
});

const words = ["Web Developer", "Freelancer", "Creative"];
const colors = ["#E63946", "#1D3557", "#2A9D8F"];
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
  } else typeEffect();
}
