import { RegisterType } from 'types/types';
export const isDashboardRoute = (path: string) => {
  if (path === '/dashboard/posts') {
    return true;
  }
};
export const getCurrentDate = () => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${date}.${month < 10 ? '0' + month : month}.${year}`;
};

export const validateForm = (value: RegisterType) => {
  const invalid: string[] = [];
  const allLetters = /^[a-zA-Z]+$/;
  const passRgx = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/;

  if (!allLetters.test(value.firstName)) {
    invalid.push('Provide a valid First Name');
  }

  if (!allLetters.test(value.lastName)) {
    invalid.push('Provide a valid LastName');
  }

  if (
    value.email.indexOf('@') < 1 ||
    value.email.lastIndexOf('.') < value.email.indexOf('@') + 2 ||
    value.email.lastIndexOf('.') + 2 >= value.email.length
  ) {
    invalid.push('Provide a valid E-mail');
  }

  if (!passRgx.test(value.password)) {
    console.log(passRgx.test(value.password));
    invalid.push(
      'Password must contain minimum eight characters, at least one letter, at least one special character and one number:',
    );
  }

  if (value.password !== value.confirmPassword) {
    invalid.push('Your password and confirm password are not equal');
  }
  if (invalid.length !== 0) {
    return invalid;
  } else {
    return true;
  }
};
