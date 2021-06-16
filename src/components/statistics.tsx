import React from 'react';
import { ClientIcon, PostIcon } from 'icons/index';
import { useUsers } from 'hooks/useUsers';
import { usePosts } from 'hooks/usePosts';

const Statistics = () => {
  const { data: userData, status: userStatus } = useUsers();
  const { data: postData, status: postStatus } = usePosts();
  return (
    <div className="statistics">
      <ul>
        <li className="item">
          <span className="icon">
            <ClientIcon />
          </span>
          <p>
            <span className="count">{userStatus === 'success' && userData.length}</span> Users
          </p>
        </li>
        <li className="item">
          <span className="icon">
            <PostIcon />
          </span>
          <p>
            <span className="count">{postStatus === 'success' && postData.length}</span> Posts
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Statistics;
