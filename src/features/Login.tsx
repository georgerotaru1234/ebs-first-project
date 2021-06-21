import React, { useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { RegisterType, LoginType } from 'types/types';
import { useUsers } from 'hooks/useUsers';
import { isLoggedIn } from 'utils';
import Loader from 'components/Loader';
import Alert from 'components/Alert';

const Login = () => {
  const { data: users, status } = useUsers();
  const history = useHistory();
  const [userData, setUserData] = React.useState<LoginType>({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    errors: '',
  });

  const handleForm = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    users.filter((item: RegisterType) => {
      if (item.email === userData.email && item.password === userData.password) {
        setError({ errors: '' });
        for (let element in item) {
          if (element === 'password') {
            continue;
          }
          localStorage.setItem(element, item[element as keyof RegisterType] + '');
        }
        setTimeout(() => {
          history.push('/dashboard/users');
        }, 3000);
      }
      setError({ errors: 'Your E-mail or password are incorrect!' });
      return false;
    });
  };
  return (
    <div className="login vertical--center">
      {isLoggedIn() && error.errors ? <Redirect to="/dashboard/users" /> : null}
      {status === 'error' && <p>Something is wrong!</p>}
      {status === 'loading' && <Loader />}
      <form className="form align--vertical-center" onSubmit={handleForm}>
        <h5 className="form__title">Login</h5>
        {error.errors ? <Alert className="alert alert--danger">{error.errors}</Alert> : null}
        <div className="form__group">
          <label className="form__label">E-mail</label>
          <input
            className="form__input"
            type="text"
            value={userData.email}
            onChange={(e) =>
              setUserData((prevData: any) => ({
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
            value={userData.password}
            onChange={(e) =>
              setUserData((prevData: any) => ({
                ...prevData,
                password: e.target.value,
              }))
            }
          />
        </div>
        <div className="form__footer">
          <Link className="form__link" to="/register">
            Create new account.
          </Link>
          <button className="btn btn--gray btn--small">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
