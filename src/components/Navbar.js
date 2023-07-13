import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  const onCreateUser = () => {
    navigate("/create-user");
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="logo clickable">
            TERPI
          </Link>
          <div className="menu">
            {user.role === "ROLE_ADMIN" ? <div>
              <p onClick={onCreateUser}>Создать пользователя</p>
            </div> : null}
          </div>
          {user.loggedIn ? (
            <div>
              <p>{user.fullName}</p>
              <p className="logout clickable" onClick={onLogout}>
                logout
              </p>
            </div>
          ) : null}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
