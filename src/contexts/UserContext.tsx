import React, { createContext, Component, ReactNode } from "react";
import AuthApiService from "../services/AuthApiService.ts";
import { jwtDecode } from "jwt-decode";
import { AuthDTO } from "../models/DTO/AuthDTO.ts";
import { User } from "../models/domain/User.ts";

export interface UserContextType {
  loggedIn: boolean;
  user?: User;
  login: (AuthDTO: AuthDTO) => Promise<void>;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export class UserContextProvider extends Component<{ children: ReactNode }> {
  private authService: AuthApiService;

  constructor(props: { children: ReactNode }) {
    super(props);
    this.authService = new AuthApiService();

    const user: User | null = this.loadUser();
    this.state = {
      user: user,
      loggedId: user != null,
      login: this.login.bind(this),
      logout: this.logout.bind(this),
    };
  }

  login(AuthDTO: AuthDTO): Promise<void> {
    return this.authService.login(AuthDTO).then((token: string | undefined) => {
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
    const user: User | null = this.loadUser();
    this.setState({
      user: user,
      loggedId: user != null,
      login: this.login.bind(this),
      logout: this.logout.bind(this),
    });
  };

  loadUser = (): User | null => {
    const data = localStorage.getItem("user");
    if (data != null) {
      const user: User = JSON.parse(data);
      return user;
    }
    return null;
  };

  render() {
    return (
      <UserContext.Provider value={this.state as UserContextType}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
