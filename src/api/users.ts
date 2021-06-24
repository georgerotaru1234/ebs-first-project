import { RegisterType } from 'types/types';
const url = 'http://localhost:3000';

export const getUsers = async (): Promise<RegisterType[]> => {
  const response = await fetch(`${url}/profile`);
  return response.json();
};

export const getSingleUser = async (id: string): Promise<RegisterType> => {
  const response = await fetch(`${url}/profile/${id}`);
  return response.json();
};

export const createUser = async (value: RegisterType) => {
  const response = await fetch(`${url}/profile/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });

  return response.json();
};

export const updateUser = async (value: RegisterType) => {
  const response = await fetch(`${url}/profile/${value.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });

  return response.json();
};

export const deleteUser = async (id: string): Promise<void> => {
  const response = await fetch(`${url}/profile/${id}`, {
    method: 'DELETE',
  });

  return response.json();
};
