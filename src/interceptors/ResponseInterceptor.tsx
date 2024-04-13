export const responseErrorInterceptor = (error, logout, navigate) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        logout();
        break;
      default:
        break;
    }
  }
  throw error;
};
