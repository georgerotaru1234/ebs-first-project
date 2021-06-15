import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { RegisterType } from 'types/types';
import { LoginType } from 'types/types';
import { getUsers } from 'api/endpoints';
import Loader from 'components/loader';

const Login = () => {
  const { data: users, status } = useQuery('users', getUsers);
  const history = useHistory();
  const [userData, setUserData] = React.useState<LoginType>({
    email: '',
    password: '',
    error: '',
  });

  const handleForm = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const res = users.filter((item: RegisterType) => {
      if (item.email === userData.email && item.password === userData.password) {
        return true;
      }
      return false;
    });
    if (res.length) {
      localStorage.setItem('key', res[0].id);
      history.push('/dashboard');
    } else {
      setUserData((prevData) => ({
        ...prevData,
        error: 'Your Password or Email is incorrect',
      }));
    }
  };

  return (
    <div>
      {status === 'error' && <p>Something is wrong!</p>}
      {status === 'loading' && <Loader />}
      <form className="login-form" onSubmit={handleForm}>
        {userData.error && <p className="login-error">{userData.error}</p>}
        <div className="input-wrapper">
          <label>E-mail</label>
          <input
            type="email"
            value={userData.email}
            onChange={(e) =>
              setUserData((prevData: any) => ({
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
            value={userData.password}
            onChange={(e) =>
              setUserData((prevData: any) => ({
                ...prevData,
                password: e.target.value,
              }))
            }
          />
        </div>
        <div className="form-footer">
          <Link to="/register">Create new account.</Link>
          <div className="submit-form">
            <button className="default-btn">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
