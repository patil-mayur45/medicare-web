export const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

export const validateSignup = (values) => {
  const errors = {};
  if (!values.name?.trim()) errors.name = "Name is required";
  if (!values.email?.trim()) errors.email = "Email is required";
  else if (!isValidEmail(values.email)) errors.email = "Enter a valid email address";
  if (!values.phone?.trim()) errors.phone = "Contact number is required";
  else if (values.phone.trim().length < 7) errors.phone = "Enter a valid contact number";
  if (!values.password) errors.password = "Password is required";
  else if (values.password.length < 6) errors.password = "Password must be at least 6 characters";
  if (!values.confirmPassword) errors.confirmPassword = "Please confirm your password";
  else if (values.confirmPassword !== values.password) errors.confirmPassword = "Passwords do not match";
  return errors;
};

export const validateLogin = (values) => {
  const errors = {};
  if (!values.email?.trim()) errors.email = "Email is required";
  else if (!isValidEmail(values.email)) errors.email = "Enter a valid email address";
  if (!values.password) errors.password = "Password is required";
  return errors;
};

export const validateAppointment = (values) => {
  const errors = {};
  if (!values.doctorType) errors.doctorType = "Please select a doctor specialty";
  if (!values.date) errors.date = "Please select a date";
  else {
    const chosen = new Date(values.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (chosen < today) errors.date = "Date cannot be in the past";
  }
  if (!values.time) errors.time = "Please select a time";
  return errors;
};
