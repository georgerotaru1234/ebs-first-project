import { Link, useHistory } from 'react-router-dom';
import { SocialIcon, TaskIcon, AddUserIcon } from 'icons';
const Navigation = () => {
  const history = useHistory();
  const handleLogOut = () => {
    localStorage.clear();
    history.push('/');
  };

  const userName = `${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`;
  const email = localStorage.getItem('email');
  return (
    <nav className="menu">
      <div className="menu__user">
        <h5 className="menu__user__name">{userName}</h5>
        <span className="menu__user__email">{email}</span>
        <button className="btn btn--gray btn--small" onClick={() => handleLogOut()}>
          SIGN OUT
        </button>
      </div>
      <ul className="menu__navigation">
        <li className={`menu__list ${history.location.pathname === '/dashboard/users' ? 'menu__list--active' : ''}`}>
          <Link className="menu__link" to="/dashboard/users">
            <span className="menu__navigation__icon">
              <SocialIcon />
            </span>
            Users
          </Link>
        </li>
        <li className={`menu__list ${history.location.pathname === '/dashboard/posts' ? 'menu__list--active' : ''}`}>
          <Link className="menu__link" to="/dashboard/posts">
            <span className="menu__navigation__icon">
              <TaskIcon />
            </span>
            Posts
          </Link>
        </li>
        <li
          className={`menu__list ${
            history.location.pathname === '/dashboard/users/create' ? 'menu__list--active' : ''
          }`}
        >
          <Link className="menu__link" to="/dashboard/users/create">
            <span className="menu__navigation__icon">
              <AddUserIcon />
            </span>
            Create New User
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
