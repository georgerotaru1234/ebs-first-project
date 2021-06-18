import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RegisterType } from 'types/types';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { registerUser } from 'api/endpoints';
import Loader from 'components/Loader';
import Alert from 'components/Alert';

const Register = () => {
  let history = useHistory();
  const { mutate, isLoading, error } = useMutation(registerUser, {
    onSuccess: (res) => {
      if (res.id) {
        localStorage.setItem('key', res.id);
        history.push('/dashboard/posts');
      }
    },
  });
  const [registerData, setRegisterData] = useState<RegisterType>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: [],
  });

  const handleForm = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const validateForm = validator(registerData);
    if (validateForm) {
      mutate(registerData);
      setRegisterData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: [],
      });
    }
  };

  const validator = (value: RegisterType) => {
    const invalid: string[] = [];
    const allLetters = /^[a-zA-Z]+$/;
    // const letter = /[a-zA-Z]/;
    // const number = /[0-9]/;
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

    if (registerData.password !== registerData.confirmPassword) {
      invalid.push('Your password and confirm password are not equal');
    }
    if (invalid.length !== 0) {
      setRegisterData((prevData) => ({
        ...prevData,
        errors: invalid,
      }));
      return false;
    }
    return true;
  };

  return (
    <div>
      <form className="default-form absolute-center" onSubmit={handleForm}>
        <h5 className="form-title">Register</h5>
        {isLoading && <Loader />}
        {error && <p>Something is wrong!!!</p>}
        {console.log('reg', registerData)}
        {registerData.errors.length !== 0
          ? registerData.errors.map((error: string, index: number) => {
              return (
                <Alert key={index} className="alert alert--danger">
                  {error}
                </Alert>
              );
            })
          : null}
        <div className="input-wrapper">
          <label className="input-label">First Name</label>
          <input
            className="input-field"
            type="text"
            name="firstName"
            value={registerData.firstName}
            onChange={(e) =>
              setRegisterData((prevData) => ({
                ...prevData,
                firstName: e.target.value,
              }))
            }
          />
        </div>
        <div className="input-wrapper">
          <label className="input-label">Last Name</label>
          <input
            className="input-field"
            type="text"
            name="lastName"
            value={registerData.lastName}
            onChange={(e) =>
              setRegisterData((prevData) => ({
                ...prevData,
                lastName: e.target.value,
              }))
            }
          />
        </div>
        <div className="input-wrapper">
          <label className="input-label">E-mail</label>
          <input
            className="input-field"
            type="text"
            name="email"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData((prevData) => ({
                ...prevData,
                email: e.target.value,
              }))
            }
          />
        </div>
        <div className="input-wrapper">
          <label className="input-label">Password</label>
          <input
            className="input-field"
            type="password"
            name="password"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData((prevData) => ({
                ...prevData,
                password: e.target.value,
              }))
            }
          />
        </div>
        <div className="input-wrapper">
          <label className="input-label">Confirm Password</label>
          <input
            className="input-field"
            type="password"
            name="confirmPassword"
            value={registerData.confirmPassword}
            onChange={(e) =>
              setRegisterData((prevData) => ({
                ...prevData,
                confirmPassword: e.target.value,
              }))
            }
          />
        </div>
        <div className="default--form--footer">
          <Link className="link" to="/">
            Login
          </Link>
          <button className="btn btn--secondary btn--small">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
