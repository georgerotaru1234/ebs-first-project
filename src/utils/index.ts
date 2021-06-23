export const isDashboardRoute = (path: string) => {
  if (path === '/dashboard/posts') {
    return true;
  }
};

export const isLoggedIn = () => {
  const isKey = localStorage.hasOwnProperty('id') && localStorage.getItem('id') !== 'undefined' ? true : false;
  return isKey;
};
