import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/login')
  };

  return (
    <header className="l-header">
      <nav className="nav bd-grid">
        <div>
          <Link to="/login" className="nav_logo">
            <h2>Lendsqr</h2>
          </Link>
        </div>

        {userInfo ? (
          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <Link
                  to="/login"
                  className="nav__link 
							logout"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        ) : ""}
      </nav>
    </header>
  );
}

export default Header