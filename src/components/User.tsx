import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getSingleUser } from 'api/endpoints';
import Loader from './Loader';
const User = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, error, isSuccess } = useQuery('user', () => getSingleUser(id));

  return (
    <div>
      {isLoading && <Loader />}
      {error && <p>Error!</p>}
      {isSuccess && (
        <div className="table">
          <div className="user">
            <span className="user__cell">{user.id}</span>
            <span className="user__cell">{user.firstName}</span>
            <span className="user__cell">{user.lastName}</span>
            <span className="user__cell">{user.email}</span>
            <span className="user__cell">{user.password}</span>
            <span className="user__cell user__cell--edit">
              <Link className="btn btn--gray btn--small" to={`/dashboard/users/${id}/edit`}>
                Edit user
              </Link>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
