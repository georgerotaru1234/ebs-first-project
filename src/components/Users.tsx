import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { Table, Button, Container, Row, Col, Loader } from 'ebs-design';
import { RegisterType } from 'types/types';
import { useUsers } from 'hooks/useUsers';
import { deleteUser } from 'api/endpoints';
import ModalComp from './Modal';
import CreateUserForm from './CreateUserForm';
import EditUserForm from './EditUserForm';

const Users = () => {
  const queryClient = useQueryClient();
  const { data: users, isLoading, error, isSuccess } = useUsers();
  const [isModalVisible, setModalVisibility] = useState(false);
  const [isFormVisible, setFormVisibility] = useState(false);
  const [item, setItem] = useState<RegisterType>();

  const { mutate } = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.refetchQueries(['users'], { stale: true, exact: true });
    },
  });

  const addNewUser = () => {
    setModalVisibility(true);
    setFormVisibility(false);
  };
  const changeUserData = (item: RegisterType) => {
    setItem(item);
    setFormVisibility(true);
    setModalVisibility(true);
  };

  const closeModal = () => {
    setModalVisibility(false);
    setFormVisibility(false);
  };

  const removeUser = (id: string) => {
    if (id) {
      mutate(id);
    }
  };

  const columns = [
    { title: 'Id', dataIndex: 'id' },
    { title: 'First Name', dataIndex: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName' },
    { title: 'E-mail', dataIndex: 'email' },
    { title: 'password', dataIndex: 'password' },
    {
      title: 'Edit User',
      dataIndex: '',
      render: function (o: any, row: any, index: any) {
        const { id } = row;
        return (
          <div>
            <Button className="mr-15" type="primary" onClick={() => changeUserData(row)}>
              Edit
            </Button>
            <Button className="mr-15" type="primary" onClick={() => removeUser(id)}>
              Remove
            </Button>
            <Link className="btn btn--gray btn--small" to={`/dashboard/users/${id}`}>
              <Button className="mr-15" type="primary">
                View More
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Container>
        <Row gy={4}>
          <Col size={12}>
            <Button onClick={addNewUser}>NEW USER</Button>
          </Col>
          <Col size={12}>
            {isLoading && <Loader.Inline />}
            {error && <p>Error!!</p>}
            {isSuccess && <Table data={users} columns={columns} />}
          </Col>
        </Row>
      </Container>
      <ModalComp
        open={isModalVisible}
        closeModal={closeModal}
        title={isFormVisible ? 'Edit User:' : 'Create new user:'}
      >
        {isFormVisible ? <EditUserForm item={item!} /> : <CreateUserForm />}
      </ModalComp>
    </div>
  );
};
export default Users;
