export const userSignupValidation = (formData) => {
  const { email, firstName, lastName, password, confirmedPassword } = formData;
  const emailPattern = /^\S+@\S+\.\S+$/;
  const emailPatternMatch = email.match(emailPattern);
  let message = {};

  if (email || password || confirmedPassword || firstName || lastName) {
    if (firstName.length < 2) {
      message = {
        isValid: false,
        message: "First name should contain at lest 2 characters",
      };
      return message;
    } else if (lastName.length < 2) {
      message = {
        isValid: false,
        message: "Last name should contain at lest 2 characters",
      };
      return message;
    } else if (password.length < 7) {
      message = {
        isValid: false,
        message: "Password lenght must be at least 7 characters long",
      };
      return message;
    } else if (password !== confirmedPassword) {
      message = { isValid: false, message: "Passwords did not match" };
      return message;
    } else if (!emailPatternMatch) {
      message = { isValid: false, message: "Email is not in valid format" };
      return message;
    }
    message = { isValid: true };
    return message;
  } else {
    message = { isValid: false, message: "Fillin all details" };
    return message;
  }
};

export const userLoginValidation = (formData) => {
  const { email, password } = formData;
  const emailPattern = /^\S+@\S+\.\S+$/;
  const emailPatternMatch = email.match(emailPattern);
  let message = {};

  if (email || password) {
    if (!emailPatternMatch) {
      message = { isValid: false, message: "Email is not in valid format" };
      return message;
    } else if (password.length < 7) {
      message = {
        isValid: false,
        message: "password should be at least 7 characters long",
      };
      return message;
    }
    message = { isValid: true };
    return message;
  } else {
    message = { isValid: false, message: "Fillin all details" };
    return message;
  }
};

export const addProjectValidation = (formData) => {
  const { projectName } = formData;
  let message = "";

  if (!projectName) {
    message = { isValid: false, message: "Please add a project name" };
    return message;
  } else {
    message = { isValid: true };
    return message;
  }
};

export const createTaskValidation = (formData) => {
  console.log(formData);
  const { taskName } = formData;
  let message = "";

  if (!taskName) {
    message = { isValid: false, message: "Please add a task name" };
    return message;
  } else {
    message = { isValid: true };
    return message;
  }
};

export const passwordResetValidation = (formData) => {
  const { email } = formData;
  let message = "";
  const emailPattern = /^\S+@\S+\.\S+$/;

  if (email) {
    const emailPatternMatch = email.match(emailPattern);
    if (!emailPatternMatch) {
      message = { isValid: false, message: "Email is not in valid format" };
      return message;
    } else {
      message = { isValid: true };
      return message;
    }
  } else {
    message = { isValid: false, message: "please enter and emaail" };
    return message;
  }
};

export const profileUpdateValidation = (formData) => {
  const { firstName, lastName, email } = formData;
  const emailPattern = /^\S+@\S+\.\S+$/;
  const emailPatternMatch = email.match(emailPattern);
  let message = "";

  if (firstName != "") {
    if (firstName.length < 2) {
      message = {
        isValid: false,
        message: "First name should be at least 2 char",
      };
      return message;
    }
  }

  if (lastName != "") {
    if (lastName.length < 2) {
      message = {
        isValid: false,
        message: "Last name should be at least 2 char",
      };
      return message;
    }
  }

  if (email != "") {
    if (!emailPatternMatch) {
      message = { isValid: false, message: "Email is invalid" };
      return message;
    }
  }

  message = { isValid: true };
  return message;
};
