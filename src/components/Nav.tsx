import { Link, useHistory } from 'react-router-dom';
import { Sidebar, Icon } from 'ebs-design';

const Navigation = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const handleLogOut = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <Sidebar>
      <Sidebar.TopMenu>
        <Link to="/dashboard/users">
          <Sidebar.Item prefix={<Icon type="users" />} text="Users" active={pathname === '/dashboard/users' && true} />
        </Link>
        <Link to="/dashboard/posts">
          <Sidebar.Item
            prefix={<Icon type="message" />}
            text="Posts"
            active={pathname === '/dashboard/posts' && true}
          />
        </Link>
        <Link to="/dashboard/users/create">
          <Sidebar.Item
            prefix={<Icon type="create" />}
            text="Create User"
            active={pathname === '/dashboard/users/create' && true}
          />
        </Link>
        <Sidebar.Item prefix={<Icon type="lock" />} text="Log out" onClick={handleLogOut} />
      </Sidebar.TopMenu>
    </Sidebar>
  );
};

export default Navigation;
