import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getSingleUser } from 'api/endpoints';
import { RegisterType } from 'types/types';
import Alert from 'components/Alert';
const EditUserForm = () => {
  const [user, setUser] = useState<RegisterType>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: [],
  });
  const [alert, setAlert] = useState({
    isVisible: false,
  });
  const { id } = useParams<{ id: string }>();
  const { data: prevUser, isLoading, error, isSuccess } = useQuery('user', () => getSingleUser(id));

  console.log(prevUser, 'dddddd');
  console.log(prevUser);
  const handleNewUserForm = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setUser((prevData) => ({
      ...prevData,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    }));
    setAlert({ isVisible: true });
    setTimeout(() => {
      setAlert({ isVisible: false });
    }, 2000);
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="new_user_wrapper">
      {user.errors.length > 0 &&
        user.errors.map((error, index) => {
          return (
            <Alert className="alert alert--danger" key={index}>
              {error}
            </Alert>
          );
        })}
      {alert.isVisible && <Alert className="alert alert--success">The user was successfully created!</Alert>}
      <form className="form form--small" onSubmit={handleNewUserForm}>
        <div className="form__group">
          <label className="form__label">First Name</label>
          <input
            name="firstName"
            defaultValue={prevUser.firstName}
            type="text"
            onChange={onChangeHandler}
            className="form__input"
          />
        </div>
        <div className="form__group">
          <label className="form__label">Last Name</label>
          <input
            name="lastName"
            type="text"
            defaultValue={prevUser.lastName}
            onChange={onChangeHandler}
            className="form__input"
          />
        </div>
        <div className="form__group">
          <label className="form__label">E-mail</label>
          <input name="email" type="text" value={prevUser.email} onChange={onChangeHandler} className="form__input" />
        </div>
        <div className="form__group">
          <label className="form__label">Password</label>
          <input
            name="password"
            type="password"
            defaultValue={prevUser.password}
            onChange={onChangeHandler}
            className="form__input"
          />
        </div>
        <div className="form__group">
          <label className="form__label">Password</label>
          <input
            name="confirmPassword"
            type="password"
            defaultValue={prevUser.confirmPassword}
            onChange={onChangeHandler}
            className="form__input"
          />
        </div>
        <button className="btn btn--gray btn--small">Save</button>
      </form>
    </div>
  );
};
export default EditUserForm;
