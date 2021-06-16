import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { RemoveIcon } from 'icons/index';
import { updateUser } from 'api/endpoints';
import { UserType } from 'types/types';
import Loader from './Loader';

interface ModalProps {
  item: UserType;
  closeModal: () => void;
}
const Modal = ({ item, closeModal }: ModalProps) => {
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
        closeModal();
      },
    });
  };

  return (
    <div className="modal">
      <div className="modal-wrapper">
        <span className="close-modal" onClick={() => closeModal()}>
          <RemoveIcon />
        </span>
        <div className="content">
          {isLoading && <Loader />}
          {error && <p>Error!!</p>}
          <form onSubmit={editForm}>
            <div className="input-wrapper">
              <label>ID</label>
              <input
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
            <div className="input-wrapper">
              <label>First Name</label>
              <input
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
            <div className="input-wrapper">
              <label>Last Name</label>
              <input
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
            <div className="input-wrapper">
              <label>E-mail</label>
              <input
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
            <div className="input-wrapper">
              <label>Password</label>
              <input
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
            <button className="btn btn--secondary btn--small">SAVE</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
