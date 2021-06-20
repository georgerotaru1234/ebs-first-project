import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updateUser } from 'api/endpoints';
import { UserType } from 'types/types';
import Loader from './Loader';

interface ModalProps {
  item: UserType;
  closeModal?: () => void;
}
const EditUserForm: React.FC<ModalProps> = ({ item, closeModal }) => {
  const queryClient = useQueryClient();
  const [userDetails, setUserDetails] = useState<UserType>({
    id: item.id,
    firstName: item.firstName,
    lastName: item.lastName,
    password: item.password,
    email: item.email,
  });
  const { mutate, isLoading, error } = useMutation(updateUser);

  const editForm = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    mutate(userDetails, {
      onSuccess: () => {
        queryClient.refetchQueries(['users'], { stale: true, exact: true });
        closeModal !== undefined && closeModal();
      },
    });
  };

  return (
    <div className="content">
      {isLoading && <Loader />}
      {error && <p>Error!!</p>}
      <form className="form" onSubmit={editForm}>
        <div className="form__group">
          <label className="form__label">ID</label>
          <input
            className="form__input"
            type="text"
            defaultValue={userDetails.id}
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
            defaultValue={userDetails.firstName}
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
            defaultValue={userDetails.lastName}
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
            defaultValue={userDetails.email}
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
            type="text"
            defaultValue={userDetails.password}
            onChange={(e) =>
              setUserDetails((prevData: any) => ({
                ...prevData,
                password: e.target.value,
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
