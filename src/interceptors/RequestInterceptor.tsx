const requestInterceptor = (config: any) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
};

export default requestInterceptor;
