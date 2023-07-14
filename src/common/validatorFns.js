export const validateName = (input) => {
  return /^[a-z A-Z]+$/.test(input) && input.length !== 0;
};

export const validateEmail = (input) => {
  return /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(input) && input.length !== 0;
};

export const validateUsername = (input) => {
  return input.length !== 0;
};

export const validatePassword = (input) => {
  const regexPwd = new RegExp(/^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/);
  return regexPwd.test(input) && input.length !== 0;
};
