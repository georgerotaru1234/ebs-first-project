import React from 'react';
import { ClientIcon, PostIcon } from 'icons/index';
import { useUsers } from 'hooks/useUsers';
import { usePosts } from 'hooks/usePosts';

const Statistics = () => {
  const { data: userData, status: userStatus } = useUsers();
  const { data: postData, status: postStatus } = usePosts();
  return (
    <div className="statistics">
      <ul className="list">
        <li className="list__item">
          <span className="list__item__icon">
            <ClientIcon />
          </span>
          <div className="list__item__info">
            <span className="list__item__count">{userStatus === 'success' && userData.length}</span>
            <p className="list__item__name">User</p>
          </div>
        </li>
        <li className="list__item">
          <span className="list__item__icon">
            <PostIcon />
          </span>
          <div className="list__item__info">
            <span className="list__item__count">{postStatus === 'success' && postData.length}</span>
            <p className="list__item__name">User</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Statistics;
