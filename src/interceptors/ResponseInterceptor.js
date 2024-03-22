export const responseErrorInterceptor = (error, logout, navigate) => {
  if (error.response) {
    switch(error.response.status) {
      case 400:
        logout();
        break;
    } 
  }
  throw error;
};
