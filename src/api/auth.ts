import { RegisterType } from 'types/types';
const url = 'http://localhost:3000';

export const registerUser = async (value: RegisterType): Promise<RegisterType> => {
  const response = await fetch(`${url}/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });
  console.log('response!!', response.json());
  return response.json();
};
