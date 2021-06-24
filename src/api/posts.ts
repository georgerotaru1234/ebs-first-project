import { PostType } from 'types/types';
const url = 'http://localhost:3000';

export const getPosts = async (): Promise<PostType[]> => {
  const response = await fetch(`${url}/posts`);

  return response.json();
};

export const updatePost = async (value: PostType): Promise<PostType> => {
  const response = await fetch(`${url}/posts/${value.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });

  return response.json();
};

export const addNewPost = async (value: PostType): Promise<PostType> => {
  const response = await fetch(`${url}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });

  return response.json();
};

export const deletePost = async (value: number): Promise<void> => {
  const response = await fetch(`${url}/posts/${value}`, {
    method: 'DELETE',
  });
  return response.json();
};
