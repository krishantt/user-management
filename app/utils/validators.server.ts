export const validateEmail = (email: string): string | undefined => {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email.length || !validRegex.test(email)) {
    return "Please enter a valid email address";
  }
};

export const validatePassword = (password: string): string | undefined => {
  if (password.length < 5) {
    return "Please enter a password that is at least 5 characters long";
  }
};

export const validateRole = (role: string): string | undefined => {
  if (!role.length) return `Please enter a role value`;
  if (role !== "ADMIN" && role !== "USER") return `Please enter a valid role`;
};

export const validateName = (name: string): string | undefined => {
  if (!name.length) return `Please enter a name value`;
};

export const validateDob = (dob: string): string | undefined => {
  if (!dob.length) return `Please enter a date of birth`;
  const date = new Date(dob);
  if (date.toString() === "Invalid Date") return `Please enter a valid date`;
};
