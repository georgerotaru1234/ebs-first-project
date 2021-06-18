import { Link, useHistory } from 'react-router-dom';
import { SocialIcon, TaskIcon } from 'icons';
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
      <div className="menu--user-details">
        <h5 className="menu--name">{userName}</h5>
        <span className="menu--user-email">{email}</span>
        <button className="btn btn--secondary btn--small" onClick={() => handleLogOut()}>
          SIGN OUT
        </button>
      </div>
      <ul className="menu--navigation">
        <li className={`menu--list ${history.location.pathname === '/dashboard' ? 'active' : ''}`}>
          <Link className="menu--link" to="/dashboard">
            <span className="icon">
              <SocialIcon />
            </span>
            Users
          </Link>
        </li>
        <li className={`menu--list ${history.location.pathname === '/dashboard/posts' ? 'active' : ''}`}>
          <Link className="menu--link" to="/dashboard/posts">
            <span className="icon">
              <TaskIcon />
            </span>
            Posts
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
