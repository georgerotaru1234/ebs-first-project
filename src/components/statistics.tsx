import React from 'react';
import { ClientIcon, PostIcon } from 'icons/index';
import { useQuery } from 'react-query';
import { getUsers, getPosts } from 'api/endpoints';

const Statistics = () => {
  const { data: userData, status: userStatus } = useQuery('Users', getUsers);
  const { data: postData, status: postStatus } = useQuery('Posts', getPosts);
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
