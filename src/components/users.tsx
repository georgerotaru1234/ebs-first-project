import { useState } from 'react';
import { useQuery } from 'react-query';
import { UserType } from 'types/types';
import { getUsers } from 'api/endpoints';
import Loader from './loader';
import Modal from './modal';
const Users = () => {
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState({});
  const { data: users, status } = useQuery('Users', getUsers);
  const handleModal = (item: UserType) => {
    setModal(!modal);
    setItem(item);
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
        users.map((item: UserType) => {
          const { id, firstName, lastName, email, password } = item;
          return (
            <div className="user-card" key={id}>
              <span>{id}</span>
              <span>{firstName}</span>
              <span>{lastName}</span>
              <span>{email}</span>
              <span>{password}</span>
              <span>
                <button className="default-btn" onClick={() => handleModal(item)}>
                  Edit
                </button>
              </span>
            </div>
          );
        })}
      {modal && <Modal item={item} onRequestClose={handleModal} />}
    </div>
  );
};
export default Users;
