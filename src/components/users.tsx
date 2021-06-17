import { useState } from 'react';
import { UserType } from 'types/types';
import { useUsers } from 'hooks/useUsers';
import Loader from './Loader';
import Modal from './Modal';
import EditUserForm from './EditUserForm';
const Users = () => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [item, setItem] = useState<UserType>();
  const { data: users, isLoading, error, isSuccess } = useUsers();
  const changeUserData = (item: UserType) => {
    setModalVisibility(true);
    setItem(item);
  };
  const closeModal = () => {
    setModalVisibility(false);
  };
  return (
    <div className="users-wrapper">
      {isLoading && <Loader />}
      {error && <p>Error!!</p>}
      <div className="user-card">
        <span>ID</span>
        <span>FIRST NAME</span>
        <span>LAST NAME</span>
        <span>EMAIL</span>
        <span>PASSWORD</span>
        <span>EDIT USER DATA</span>
      </div>
      {isSuccess &&
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
      {isModalVisible && (
        <Modal closeModal={closeModal}>
          <EditUserForm item={item!} closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};
export default Users;
