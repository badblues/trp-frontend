import React, { createContext, Component, ReactNode } from "react";
import AuthApiService from "../services/AuthApiService.ts";
import { jwtDecode } from "jwt-decode";
import { AuthDTO } from "../models/DTO/AuthDTO.ts";
import { User } from "../models/domain/User.ts";

export interface UserContextType {
  user: {
    loggedIn: boolean;
    id: number;
    username: string;
    fullName: string;
    role: string;
  };
  login: (AuthDTO: AuthDTO) => Promise<void>;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export class UserContextProvider extends Component<{ children: ReactNode }> {
  private authService: AuthApiService;

  constructor(props: { children: ReactNode }) {
    super(props);
    this.authService = new AuthApiService();
    this.state = {
      user: this.loadUser(),
      login: this.login.bind(this),
      logout: this.logout.bind(this),
    };
  }

  login(AuthDTO: AuthDTO): Promise<void> {
    return this.authService
      .login(AuthDTO)
      .then((token: string | undefined) => {
        if (token) {
          localStorage.setItem("userToken", token);
          this.setUserData(token);
          this.updateUser();
        }
      });
  }

  setUserData(token: string): void {
    try {
      const decodedToken: any = jwtDecode(token);
      const userInfo: User = {
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

  logout(): void {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    this.updateUser();
  }

  updateUser = (): void => {
    this.setState({
      user: this.loadUser(),
      login: this.login.bind(this),
      logout: this.logout.bind(this),
    });
  };

  loadUser = (): {
    loggedIn: boolean;
    id: number;
    username: string;
    fullName: string;
    role: string;
  } => {
    const user = {
      loggedIn: false,
      id: 0,
      username: "",
      fullName: "",
      role: "",
    };
    const data = localStorage.getItem("user");
    if (data != null) {
      const userInfo: User = JSON.parse(data);
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
      <UserContext.Provider value={this.state as UserContextType}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
