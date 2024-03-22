export const responseErrorInterceptor = (error, logout, navigate) => {
  if (error.response) {
    switch(error.response.status) {
      case 403:
        logout();
        break;
    } 
  }
  throw error;
};
