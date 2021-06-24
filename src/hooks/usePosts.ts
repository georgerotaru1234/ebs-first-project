import { useQuery } from 'react-query';
import { getPosts } from 'api/posts';
export const usePosts = (config = {}) => {
  return useQuery('posts', getPosts, config);
};
