export const responseErrorInterceptor = (error, logout) => {
  if (error.response?.status === 403) {
    logout();
  }
  throw error;
};
