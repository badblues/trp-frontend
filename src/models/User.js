import { AuthData } from "./AuthData";

class User extends AuthData {
  constructor(username, password, fullName, role) {
    super(username, password);
    this.fullName = fullName;
    this.role = role;
  }
}