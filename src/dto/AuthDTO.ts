import * as validator from 'validator';

// Validation function for signup
export const validateSignup = ({ username, password }: { username: string; password: string }): string[] => {
  const errors: string[] = [];

  if (!username || !password) {
    errors.push('Username and password are required');
  }

  if (!validator.isLength(username, { min: 3, max: 20 })) {
    errors.push('Username must be between 3 and 20 characters');
  }

  if (!validator.isLength(password, { min: 6 })) {
    errors.push('Password must be at least 6 characters');
  }

  return errors;
};

// Validation function for login
export const validateLogin = ({ username, password }: { username: string; password: string }): string[] => {
  const errors: string[] = [];

  if (!username || !password) {
    errors.push('Username and password are required');
  }

  return errors;
};

