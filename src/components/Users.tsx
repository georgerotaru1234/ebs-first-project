import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { RegisterType } from 'types/types';
import { useUsers } from 'hooks/useUsers';
import { deleteUser } from 'api/endpoints';
import Loader from './Loader';
import Modal from './Modal';
import EditUserForm from './EditUserForm';
const Users = () => {
  const queryClient = useQueryClient();
  const [isModalVisible, setModalVisibility] = useState(false);
  const [item, setItem] = useState<RegisterType>();
  const { mutate } = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.refetchQueries(['users'], { stale: true, exact: true });
    },
  });
  const { data: users, isLoading, error, isSuccess } = useUsers();
  const changeUserData = (item: RegisterType) => {
    setModalVisibility(true);
    setItem(item);
  };
  const closeModal = () => {
    setModalVisibility(false);
  };
  const removeUser = (id: string | undefined) => {
    if (id) {
      mutate(id);
    }
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
        users.map((element: RegisterType) => {
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
                <button className="btn btn--gray btn--small" onClick={() => removeUser(id)}>
                  Remove
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
