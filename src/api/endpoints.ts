import { RegisterType, UserType } from 'types/types';
const url = 'http://localhost:3000';

export const registerUser = async (value: RegisterType) => {
  const response = await fetch(`${url}/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });

  return response.json();
};
export const getPosts = async () => {
  const response = await fetch(`${url}/posts`);
  return response.json();
};

export const getUsers = async () => {
  const response = await fetch(`${url}/profile`);
  return response.json();
};

export const updateUser = async (value: UserType) => {
  const response = await fetch(`${url}/profile/${value.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });
  return response.json();
};
