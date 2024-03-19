import { Strength } from "./types";

export default function calculatePasswordStrength(password: string): Strength {
  // Define criteria weights
  const lengthWeight = 1;
  const lowercaseWeight = 1;
  const uppercaseWeight = 1;
  const digitWeight = 1;
  const specialCharWeight = 2;

  // Calculate score based on criteria
  let score = 0;

  // Length
  if (password.length >= 8 && password.length <= 12) {
    score += lengthWeight;
  } else if (password.length > 12) {
    score += lengthWeight * 2; // Double weight for longer passwords
  }

  // Lowercase letters
  if (/[a-z]/.test(password)) {
    score += lowercaseWeight;
  }

  // Uppercase letters
  if (/[A-Z]/.test(password)) {
    score += uppercaseWeight;
  }

  // Digits
  if (/\d/.test(password)) {
    score += digitWeight;
  }

  // Special characters
  if (/[^a-zA-Z0-9]/.test(password)) {
    score += specialCharWeight;
  }

  // Determine strength level based on score
  if (score === 0) {
    return 'Empty';
  } else if (score <= 2) {
    return 'Weak';
  } else if (score <= 4) {
    return 'Medium';
  } else {
    return 'Strong';
  }
}
