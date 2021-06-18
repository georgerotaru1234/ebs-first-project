import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RegisterType } from 'types/types';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { registerUser } from 'api/endpoints';
import { validateForm } from 'utils';
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
    const formValidation = validateForm(registerData);
    if (formValidation === true) {
      mutate(registerData);
      setRegisterData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: [],
      });
    } else {
      setRegisterData((prevData) => ({
        ...prevData,
        errors: formValidation,
      }));
    }
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
