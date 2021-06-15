import React from 'react';
import { useMutation } from 'react-query';
import { RemoveIcon } from 'icons/index';
import { updateUser } from 'api/endpoints';
import { UserType } from 'types/types';
const Modal = (props: any) => {
  const [userDetails, setUserDetails] = React.useState<UserType>({
    id: 1,
    firstName: '',
    lastName: '',
    password: '',
    email: '',
  });
  const { id, firstName, lastName, password, email } = props.item;
  const { mutate } = useMutation(updateUser);

  const editForm = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    console.log(userDetails, 'userDetails');
    mutate(userDetails);
  };
  return (
    <div className="modal">
      <div className="modal-wrapper">
        <span className="close-modal" onClick={props.onRequestClose}>
          <RemoveIcon />
        </span>
        <div className="content">
          <form onSubmit={editForm}>
            <input
              type="text"
              defaultValue={id}
              onChange={(e) =>
                setUserDetails((prevData: any) => ({
                  ...prevData,
                  id: e.target.value,
                }))
              }
            />
            <input
              type="text"
              defaultValue={firstName}
              onChange={(e) =>
                setUserDetails((prevData: any) => ({
                  ...prevData,
                  firstName: e.target.value,
                }))
              }
            />
            <input
              type="text"
              defaultValue={lastName}
              onChange={(e) =>
                setUserDetails((prevData: any) => ({
                  ...prevData,
                  lastName: e.target.value,
                }))
              }
            />
            <input
              type="text"
              defaultValue={email}
              onChange={(e) =>
                setUserDetails((prevData: any) => ({
                  ...prevData,
                  email: e.target.value,
                }))
              }
            />
            <input
              type="text"
              defaultValue={password}
              onChange={(e) =>
                setUserDetails((prevData: any) => ({
                  ...prevData,
                  password: e.target.value,
                }))
              }
            />
            <button className="default-btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
