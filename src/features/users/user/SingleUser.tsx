import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Table, Button, Loader } from 'ebs-design';
import { getSingleUser } from 'api/users';
import { RegisterType } from 'types/types';

const SingleUser = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, isError, error, isSuccess } = useQuery('user', () => getSingleUser(id));

  const columns = [
    { title: 'Id', dataIndex: 'id' },
    { title: 'First Name', dataIndex: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName' },
    { title: 'E-mail', dataIndex: 'email' },
    { title: 'password', dataIndex: 'password' },
    {
      title: 'Edit User',
      dataIndex: '',
      render: function (row: RegisterType) {
        return (
          <div>
            <Link to={`/dashboard/users/${row.id}/edit`}>
              <Button className="mr-15" type="primary">
                Edit User
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {isLoading && <Loader.Inline />}
      {isError && <p>Error: {error}</p>}
      {isSuccess && <Table data={user ? [user] : []} columns={columns} />}
    </div>
  );
};

export default SingleUser;
