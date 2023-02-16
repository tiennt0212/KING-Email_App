import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { ROUTES } from "utils/constants";
import gifInk1 from "assets/images/ink1.gif";
import gifInkMan from "assets/images/ink-man.gif";
import gifPurpleInk from "assets/images/purple-ink.gif";
import gifInkPlanet from "assets/images/ink-planet.gif";
import gifInkDiscover from "assets/images/ink-discover.gif";
import letter1 from "assets/images/letter1.gif";
import colors from "styles/colors";

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2.4rem 1.2rem 1.2rem;
  .left-side {
    display: flex;
    align-items: center;
    img {
      width: 4.2rem;
    }
    h2 {
      font-size: 3.6rem;
    }
  }
  .right-side {
    ul {
      display: flex;
      li {
        list-style: none;
        margin-right: 2rem;
        a {
          text-decoration: none;
          font-size: 2rem;
          &.active {
            color: ${colors.tealGreen};
            font-weight: bold;
          }
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`;
const Header = () => {
  return (
    <HeaderStyled>
      <div className="left-side">
        <img src={letter1} />
        <h2>RETEL</h2>
      </div>
      <div className="right-side">
        <ul>
          <li>
            <NavLink to={ROUTES.B_EMAILS}>Bemails</NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.WORLD_OF_STAMPS}>World of Stamps</NavLink>
          </li>
        </ul>
      </div>
    </HeaderStyled>
  );
};

export default Header;
