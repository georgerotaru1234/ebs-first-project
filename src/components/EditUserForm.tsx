import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updateUser } from 'api/endpoints';
import { RegisterType } from 'types/types';
import { validateForm } from 'utils';
import Loader from './Loader';
import Alert from './Alert';

interface ModalProps {
  item: RegisterType;
  closeModal?: () => void;
}
const EditUserForm: React.FC<ModalProps> = ({ item }) => {
  const queryClient = useQueryClient();
  const [userDetails, setUserDetails] = useState<RegisterType>({
    id: item.id,
    firstName: item.firstName,
    lastName: item.lastName,
    password: item.password,
    email: item.email,
    confirmPassword: item.password,
  });
  console.log(userDetails, 'userDetails');
  const [errorArray, setErrorArray] = useState<{ errors: string[] }>({
    errors: [],
  });
  const [alert, setAlert] = useState({
    isVisible: false,
  });
  const { mutate, isLoading, error } = useMutation(updateUser);

  const editForm = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const formValidation = validateForm(userDetails);
    if (formValidation === true) {
      setErrorArray({ errors: [] });
      mutate(userDetails, {
        onSuccess: () => {
          queryClient.refetchQueries(['users'], { stale: true, exact: true });
        },
      });
      setAlert({ isVisible: true });
    } else {
      setErrorArray({ errors: formValidation });
    }
  };

  return (
    <div className="content">
      {isLoading && <Loader />}
      {error && <p>Error!!</p>}
      {errorArray.errors.length
        ? errorArray.errors.map((element, index) => {
            return (
              <Alert className="alert alert--danger" key={index}>
                {element}
              </Alert>
            );
          })
        : null}
      {alert.isVisible && <Alert className="alert alert--success">Your user data was changed successfully</Alert>}
      <form className="form" onSubmit={editForm}>
        <div className="form__group">
          <label className="form__label">ID</label>
          <input
            className="form__input"
            type="text"
            disabled
            value={userDetails.id}
            onChange={(e) =>
              setUserDetails((prevData: any) => ({
                ...prevData,
                id: e.target.value,
              }))
            }
          />
        </div>
        <div className="form__group">
          <label className="form__label">First Name</label>
          <input
            className="form__input"
            type="text"
            value={userDetails.firstName}
            onChange={(e) =>
              setUserDetails((prevData: any) => ({
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
            value={userDetails.lastName}
            onChange={(e) =>
              setUserDetails((prevData: any) => ({
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
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails((prevData: any) => ({
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
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails((prevData: any) => ({
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
            value={userDetails.confirmPassword}
            onChange={(e) =>
              setUserDetails((prevData: any) => ({
                ...prevData,
                confirmPassword: e.target.value,
              }))
            }
          />
        </div>
        <button className="btn btn--gray btn--small">SAVE</button>
      </form>
    </div>
  );
};

export default EditUserForm;
