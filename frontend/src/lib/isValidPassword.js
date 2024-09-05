export default function isPasswordValid(password) {
  // Check for at least one uppercase letter
  const hasUpperCase = /[A-Z]/.test(password);

  // Check for at least one lowercase letter
  const hasLowerCase = /[a-z]/.test(password);

  // Check for any character that is not a letter or number, i.e., special characters
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  // Ensure all conditions are met
  return hasUpperCase && hasLowerCase && hasSpecialChar;
}
