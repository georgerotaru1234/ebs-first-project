import { useQuery } from 'react-query';
import { getUsers } from 'api/users';

export const useUsers = (config = {}) => {
  return useQuery('users', getUsers, config);
};
