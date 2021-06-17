import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RegisterType } from 'types/types';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { registerUser } from 'api/endpoints';
import { validatePassword } from 'utils';
import Loader from 'components/Loader';
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
  });
  const [errors, setErrors] = useState({
    formErrors: '',
  });

  const handleForm = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const validate = validatePassword();
    if (!errors.formErrors.length) {
      mutate(registerData);
      setRegisterData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  const validatePassword = () => {
    if (registerData.password.length < 8) {
      setErrors({
        formErrors: [...errors.formErrors, 'Your password must be at least 8 characters'],
      });
      // errors.push('Your password must be at least 8 characters');
    }
    if (registerData.password.search(/[a-z]/i) < 0) {
      setErrors({
        formErrors: [...errors.formErrors, 'Your password must contain at least one letter.'],
      });
    }
    if (registerData.password.search(/[0-9]/) < 0) {
      setErrors({
        formErrors: [...errors.formErrors, 'Your password must contain at least one digit.'],
      });
    }
    return true;
  };

  return (
    <div>
      {/* {errors && <p className="danger">{errors}</p>} */}
      <form className="login-form" onSubmit={handleForm}>
        {isLoading && <Loader />}
        {error && <p>Something is wrong!!!</p>}
        <div className="input-wrapper">
          <label>First Name</label>
          <input
            type="text"
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
          <label>Last Name</label>
          <input
            type="text"
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
          <label>E-mail</label>
          <input
            type="email"
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
          <label>Password</label>
          <input
            type="password"
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
          <label>Confirm Password</label>
          <input
            type="password"
            value={registerData.confirmPassword}
            onChange={(e) =>
              setRegisterData((prevData) => ({
                ...prevData,
                confirmPassword: e.target.value,
              }))
            }
          />
        </div>
        <div className="form-footer">
          <Link to="/">Login</Link>
          <button className="btn btn--secondary btn--small">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
