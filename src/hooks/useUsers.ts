import { useQuery } from 'react-query';
import { getUsers } from 'api/endpoints';

export const useUsers = (config = {}) => {
  return useQuery('users', getUsers, config);
};
