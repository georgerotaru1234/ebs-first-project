import { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <div className="table">
      {isLoading && <Loader />}
      {error && <p>Error!!</p>}
      <div className="user">
        <span className="user__cell">ID</span>
        <span className="user__cell">FIRST NAME</span>
        <span className="user__cell">LAST NAME</span>
        <span className="user__cell">EMAIL</span>
        <span className="user__cell">PASSWORD</span>
        <span className="user__cell">EDIT USER DATA</span>
      </div>
      {isSuccess &&
        users.map((element: UserType) => {
          const { id, firstName, lastName, email, password } = element;
          return (
            <div className="user" key={id}>
              <span className="user__cell">{id}</span>
              <span className="user__cell">{firstName}</span>
              <span className="user__cell">{lastName}</span>
              <span className="user__cell">{email}</span>
              <span className="user__cell">{password}</span>
              <span className="user__cell user__cell--edit">
                <button className="btn btn--gray btn--small" onClick={() => changeUserData(element)}>
                  Edit
                </button>
                <Link className="btn btn--gray btn--small" to={`/dashboard/users/${id}`}>
                  View More
                </Link>
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
