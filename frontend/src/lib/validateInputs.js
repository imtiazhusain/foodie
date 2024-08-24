export function isPasswordValid(password) {
  // Check for at least one uppercase letter
  const hasUpperCase = /[A-Z]/.test(password);

  // Check for at least one lowercase letter
  const hasLowerCase = /[a-z]/.test(password);

  // Check for any character that is not a letter or number, i.e., special characters
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  console.log(hasSpecialChar);

  // Ensure all conditions are met
  return hasUpperCase && hasLowerCase && hasSpecialChar;
}

export default function validateInputs(inputs, setIsErrors) {
  let newErrors = {};
  if (!inputs.name) {
    newErrors.name = "Name is required";
  }
  if (inputs.name && inputs.name.length <= 2) {
    newErrors.name = "Name should be at least 3 characters";
  }

  if (!inputs.email) {
    newErrors.email = "Email is required";
  }

  if (!inputs.password) {
    newErrors.password = "Password is required";
  }
  if (inputs.password && inputs.password.length <= 7) {
    newErrors.password = "Password must have 7+ characters";
  }

  if (inputs.password && !isPasswordValid(inputs.password)) {
    newErrors.password =
      "Password must have  7+ chars, 1 uppercase, 1 lowercase, 1 special char";
  }

  if (!inputs.confirm_password) {
    newErrors.confirm_password = "Confirm Password is required";
  }

  if (
    inputs.password &&
    inputs.confirm_password &&
    inputs.password != inputs.confirm_password
  ) {
    newErrors.confirm_password = "Passwords do not match!";
  }

  if (!inputs.profile_pic.name) {
    console.log(inputs.profile_pic);
    newErrors.profile_pic = "Please upload profile picture";
  }

  setIsErrors(newErrors);
  if (Object.values(newErrors).some((error) => error !== "")) {
    return true;
  }
  return false;
}
