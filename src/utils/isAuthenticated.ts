export const isAuthenticated = () => {
  const parsedToken = sessionStorage.getItem('user');

  if (!parsedToken) return false;

  const { exp } = JSON.parse(parsedToken);

  return Date.now() < exp * 1000;
};
