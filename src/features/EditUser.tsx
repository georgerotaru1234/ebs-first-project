import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { getSingleUser, updateUser } from 'api/endpoints';
import { RegisterType } from 'types/types';
import { validateForm } from 'utils';
import Alert from 'components/Alert';
import Loader from 'components/Loader';
const EditUserForm = () => {
  const { id } = useParams<{ id: string }>();
  const { data: prevUser, isLoading, error, isSuccess } = useQuery('user', () => getSingleUser(id), { enabled: !!id });
  const { mutate } = useMutation(updateUser);
  const [user, setUser] = useState<RegisterType>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  useEffect(() => {
    if (prevUser) {
      setUser({
        id: prevUser.id,
        firstName: prevUser.firstName,
        lastName: prevUser.lastName,
        email: prevUser.email,
        password: prevUser.password,
        confirmPassword: prevUser.password,
      });
    }
  }, [prevUser]);

  const [errorArray, setErrorArray] = useState<{ errors: string[] }>({
    errors: [],
  });
  const [alert, setAlert] = useState<{ isVisible: boolean }>({
    isVisible: false,
  });
  const handleNewUserForm = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const formValidation = validateForm(user);
    if (formValidation === true) {
      setErrorArray({ errors: [] });
      mutate({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      });

      setUser({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setAlert({ isVisible: true });
    } else {
      setErrorArray({
        errors: formValidation,
      });
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
      {isLoading && <Loader />}
      {error && <p>Error!</p>}
      {errorArray.errors && errorArray.errors.length !== 0
        ? errorArray.errors.map((error, index) => {
            return (
              <Alert className="alert alert--danger" key={index}>
                {error}
              </Alert>
            );
          })
        : null}
      {alert.isVisible && <Alert className="alert alert--success">The user was successfully created!</Alert>}
      {isSuccess && (
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
            <input
              name="lastName"
              type="text"
              value={user.lastName}
              onChange={onChangeHandler}
              className="form__input"
            />
          </div>
          <div className="form__group">
            <label className="form__label">E-mail</label>
            <input
              name="email"
              type="text"
              value={user.email}
              onChange={() => onChangeHandler}
              className="form__input"
            />
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
            <label className="form__label">Confirm Password</label>
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
      )}
    </div>
  );
};
export default EditUserForm;
