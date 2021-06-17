import { RegisterType } from 'types/types';

export const isDashboardRoute = (path: string) => {
  if (path === '/dashboard/posts') {
    return true;
  }
};
export const getCurrentDate = () => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${date}.${month < 10 ? '0' + month : month}.${year}`;
};
