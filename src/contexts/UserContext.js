import React, { createContext, Component } from "react";
import AuthApiService from "../services/AuthApiService";
import jwtDecode from "jwt-decode";

export const UserContext = createContext({});

export class UserContextProvider extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthApiService();
    this.state = {
      user: this.loadUser(),
      login: this.login.bind(this),
      logout: this.logout.bind(this),
    };
  }

  login(authData) {
    return this.authService.login(authData).then((token) => {
      if (token) {
        localStorage.setItem("userToken", token);
        this.setUserData(token);
        this.updateUser();
      }
    });
  }

  setUserData(token) {
    try {
      const decodedToken = jwtDecode(token);
      const userInfo = {
        id: decodedToken.id,
        fullName: decodedToken.fullName,
        role: decodedToken.role,
        username: decodedToken.username,
      };
      const userInfoStr = JSON.stringify(userInfo);
      localStorage.setItem("user", userInfoStr);
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
      id: 0,
      username: "",
      fullName: "",
      role: "",
    };
    const data = localStorage.getItem("user");
    if (data != null) {
      const userInfo = JSON.parse(data);
      user.loggedIn = true;
      user.id = userInfo.id;
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
