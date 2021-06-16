import { useState } from 'react';
import { UserType } from 'types/types';
import { useUsers } from 'hooks/useUsers';
import Loader from './Loader';
import Modal from './Modal';
const Users = () => {
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState<UserType>();
  const { data: users, status } = useUsers();
  const changeUserData = (item: UserType) => {
    setModal(true);
    setItem(item);
  };
  const closeModal = () => {
    setModal(false);
  };
  return (
    <div className="users-wrapper">
      {status === 'loading' && <Loader />}
      {status === 'error' && <p>Error!!</p>}
      <div className="user-card">
        <span>ID</span>
        <span>FIRST NAME</span>
        <span>LAST NAME</span>
        <span>EMAIL</span>
        <span>PASSWORD</span>
        <span>EDIT USER DATA</span>
      </div>
      {status === 'success' &&
        users.map((element: UserType) => {
          const { id, firstName, lastName, email, password } = element;
          return (
            <div className="user-card" key={id}>
              <span>{id}</span>
              <span>{firstName}</span>
              <span>{lastName}</span>
              <span>{email}</span>
              <span>{password}</span>
              <span className="edit-user">
                <button className="btn btn--secondary btn--small" onClick={() => changeUserData(element)}>
                  Edit
                </button>
              </span>
            </div>
          );
        })}
      {modal && <Modal item={item!} closeModal={closeModal} />}
    </div>
  );
};
export default Users;
