import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserType } from 'types/types';
import { LoginType } from 'types/types';
import { useUsers } from 'hooks/useUsers';
import Loader from 'components/Loader';
import Alert from 'components/Alert';
const Login = () => {
  const { data: users, status } = useUsers();
  const history = useHistory();
  const [userData, setUserData] = React.useState<LoginType>({
    email: '',
    password: '',
    error: '',
  });

  const handleForm = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    users.filter((item: UserType) => {
      if (item.email === userData.email && item.password === userData.password) {
        for (let element in item) {
          if (element === 'password') {
            continue;
          }
          localStorage.setItem(element, item[element as keyof UserType] + '');
          history.push('/dashboard');
        }
      }
      return false;
    });
    setUserData((prevData) => ({
      ...prevData,
      error: 'Your Password or Email is incorrect',
    }));
  };

  return (
    <div>
      {status === 'error' && <p>Something is wrong!</p>}
      {status === 'loading' && <Loader />}
      <form className="default-form absolute-center" onSubmit={handleForm}>
        <h5 className="form-title">Login</h5>
        {userData.error && <Alert className="alert alert--danger">{userData.error}</Alert>}
        <div className="input-wrapper">
          <label>E-mail</label>
          <input
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
            <button className="btn btn--secondary btn--small">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
