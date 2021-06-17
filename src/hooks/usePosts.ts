import { useQuery } from 'react-query';
import { getPosts } from 'api/endpoints';
export const usePosts = (config = {}) => {
  return useQuery('posts', getPosts, config);
};
