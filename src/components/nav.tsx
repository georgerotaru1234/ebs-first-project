import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { SocialIcon, TaskIcon } from 'icons';

const Navigation = () => {
  const history = useHistory();
  const handleLogOut = () => {
    console.log(1);
    localStorage.removeItem('key');
    history.push('/');
  };
  return (
    <nav className="menu">
      <div className="user-details">
        <h5>George Rotaru</h5>
        <span className="user-email">georgerotaru1234@gmail.com</span>
        <button className="default-btn" onClick={() => handleLogOut()}>
          SIGN OUT
        </button>
      </div>
      <ul className="navigation">
        <li>
          <Link to="/dashboard">
            <span className="icon">
              <SocialIcon />
            </span>
            Users
          </Link>
        </li>
        <li>
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
