import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { createUser } from 'api/endpoints';
import { RegisterType } from 'types/types';
import { validateForm } from 'utils';
import Alert from './Alert';
const CreateUserForm = () => {
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
  const { mutate } = useMutation('user', createUser);
  const handleNewUserForm = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const formValidate = validateForm(user);
    console.log('dsadas', formValidate);
    if (formValidate === true) {
      mutate(user);
      setUser((prevData) => ({
        ...prevData,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: [],
      }));
      setAlert({ isVisible: true });
      setTimeout(() => {
        setAlert({ isVisible: false });
      }, 2000);
    } else {
      console.log(formValidate, 'form validation');
      setUser((prevData) => ({
        ...prevData,
        errors: formValidate,
      }));
    }
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
            value={user.firstName}
            type="text"
            onChange={onChangeHandler}
            className="form__input"
          />
        </div>
        <div className="form__group">
          <label className="form__label">Last Name</label>
          <input name="lastName" type="text" value={user.lastName} onChange={onChangeHandler} className="form__input" />
        </div>
        <div className="form__group">
          <label className="form__label">E-mail</label>
          <input name="email" type="text" value={user.email} onChange={onChangeHandler} className="form__input" />
        </div>
        <div className="form__group">
          <label className="form__label">Password</label>
          <input
            name="password"
            type="password"
            value={user.password}
            onChange={onChangeHandler}
            className="form__input"
          />
        </div>
        <div className="form__group">
          <label className="form__label">Password</label>
          <input
            name="confirmPassword"
            type="password"
            value={user.confirmPassword}
            onChange={onChangeHandler}
            className="form__input"
          />
        </div>
        <button className="btn btn--gray btn--small">Save</button>
      </form>
    </div>
  );
};
export default CreateUserForm;
