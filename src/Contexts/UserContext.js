import React, { createContext, Component } from "react";
import jwtDecode from "jwt-decode";

export const UserContext = createContext({});

export class UserContextProvider extends Component {

  constructor(props) {
    super(props);
    this.authService = props.authService;
    this.state = {
      user: this.loadUser(),
      login: this.login.bind(this),
      logout: this.logout.bind(this),
    };
  }

  login(authData) {
    //TODO would be great if only token was accesible here
    return this.authService.login(authData).then((response) => {
      if (response?.data?.data) {
        const token = response.data.data.jwtToken;
        localStorage.setItem("userToken", token);
        this.setUserData(token);
        this.updateUser();
      }
    });
  }

  setUserData(token) {
    try {
      const decodedToken = JSON.stringify(jwtDecode(token));
      localStorage.setItem("user", decodedToken);
    } catch (error) {
      console.error(error);
    }
  }

  logout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    this.updateUser();
  }

  updateUser = () => {
    this.setState({
      user: this.loadUser(),
      login: this.login.bind(this),
      logout: this.logout.bind(this),
    });
  };

  loadUser = () => {
    const user = {
      loggedIn: false,
      username: "",
      fullName: "",
      role: "",
    };
    const data = localStorage.getItem("user");
    if (data != null) {
      const userInfo = JSON.parse(data);
      user.loggedIn = true;
      user.username = userInfo.username;
      user.fullName = userInfo.fullName;
      user.role = userInfo.role;
    }
    return user;
  };

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
