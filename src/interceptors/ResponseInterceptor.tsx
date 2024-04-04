export const responseErrorInterceptor = (error, logout, navigate) => {
  console.log(error);
  if (error.response) {
    console.log(error.response);
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
