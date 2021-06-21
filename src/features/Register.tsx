import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { RegisterType } from 'types/types';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { registerUser } from 'api/endpoints';
import { validateForm, isLoggedIn } from 'utils';
import Loader from 'components/Loader';
import Alert from 'components/Alert';

const Register = () => {
  let history = useHistory();
  const { mutate, isLoading, error } = useMutation(registerUser, {
    onSuccess: () => {
      setTimeout(() => {
        history.push('/');
      }, 2000);
    },
  });
  const [registerData, setRegisterData] = useState<RegisterType>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [alert, setAlert] = useState({
    isVisible: false,
  });
  const [errorArray, setErrorArray] = useState<{ errors: string[] }>({
    errors: [],
  });

  const handleForm = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const formValidation = validateForm(registerData);
    if (formValidation === true) {
      setErrorArray({ errors: [] });
      mutate({
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        password: registerData.password,
      });
      setRegisterData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
      setAlert({ isVisible: true });
    } else {
      setErrorArray({ errors: formValidation });
    }
  };

  return (
    <div className="register vertical--center">
      {isLoggedIn() && <Redirect to="/" />}
      <form className="form" onSubmit={handleForm}>
        <h5 className="form__title">Register</h5>
        {isLoading && <Loader />}
        {error && <p>Error!</p>}
        {alert.isVisible ? (
          <Alert className="alert alert--success">Your account was created successfully!</Alert>
        ) : null}
        {errorArray.errors.length !== 0
          ? errorArray.errors.map((error: string, index: number) => {
              return (
                <Alert key={index} className="alert alert--danger">
                  {error}
                </Alert>
              );
            })
          : null}

        <div className="form__group">
          <label className="form__label">First Name</label>
          <input
            className="form__input"
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
        <div className="form__group">
          <label className="form__label">Last Name</label>
          <input
            className="form__input"
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
        <div className="form__group">
          <label className="form__label">E-mail</label>
          <input
            className="form__input"
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
        <div className="form__group">
          <label className="form__label">Password</label>
          <input
            className="form__input"
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
        <div className="form__group">
          <label className="form__label">Confirm Password</label>
          <input
            className="form__input"
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
        <div className="form__footer">
          <Link className="form__link" to="/">
            I already have and account.
          </Link>
          <button className="btn btn--gray btn--small">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
