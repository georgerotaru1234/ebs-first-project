import { Link, useHistory } from 'react-router-dom';
import { SocialIcon, TaskIcon } from 'icons';
const Navigation = () => {
  const history = useHistory();
  const handleLogOut = () => {
    localStorage.removeItem('key');
    history.push('/');
  };

  const userName = `${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`;
  const email = localStorage.getItem('email');
  return (
    <nav className="menu">
      <div className="user-details">
        <h5>{userName}</h5>
        <span className="user-email">{email}</span>
        <button className="btn btn--secondary btn--small" onClick={() => handleLogOut()}>
          SIGN OUT
        </button>
      </div>
      <ul className="navigation">
        <li className={history.location.pathname === '/dashboard' ? 'active' : undefined}>
          <Link to="/dashboard">
            <span className="icon">
              <SocialIcon />
            </span>
            Users
          </Link>
        </li>
        <li className={history.location.pathname === '/dashboard/posts' ? 'active' : undefined}>
          <Link to="/dashboard/posts">
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
