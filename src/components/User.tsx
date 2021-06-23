import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Table, Button, Loader } from 'ebs-design';
import { getSingleUser } from 'api/endpoints';

const User = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, error, isSuccess } = useQuery('user', () => getSingleUser(id));

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
            <Link to={`/dashboard/users/${id}/edit`}>
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
      {error && <p>Error!</p>}
      {isSuccess && <Table data={[user]} columns={columns} />}
    </div>
  );
};

export default User;
