import React from 'react';
import { Link } from 'react-router-dom';
import { RegisterType } from 'types/types';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { registerUser } from 'api/endpoints';
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
  const [registerData, setRegisterData] = React.useState<RegisterType>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleForm = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    mutate(registerData);
    setRegisterData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    console.log(mutate);
  };

  return (
    <div>
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
          <button className="default-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
