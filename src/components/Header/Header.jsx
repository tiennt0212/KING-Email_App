import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "utils/constants";

const Header = () => {
  return (
    <header>
      <ul>
        <li>
          <NavLink to={ROUTES.B_EMAILS}>Bemails</NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.BOOKMARKS}>Bookmarks</NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
