import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { ROUTES } from "utils/constants";
// import gifInk1 from "assets/images/ink1.gif";
// import gifInkMan from "assets/images/ink-man.gif";
// import gifPurpleInk from "assets/images/purple-ink.gif";
// import gifInkPlanet from "assets/images/ink-planet.gif";
// import gifInkDiscover from "assets/images/ink-discover.gif";
import letter1 from "assets/images/letter1.gif";
import colors from "styles/colors";

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2rem;
  border-bottom: solid 0.2rem ${colors.lightGray};
  .left-side {
    display: flex;
    align-items: center;
    /* img {
      width: 4.2rem;
    } */
    h2 {
      background-color: ${colors.tealGreen};
      color: white;
      padding: 0.4rem 1rem 0.2rem;
      border-radius: 0.8rem;
      font-size: 3.2rem;
    }
    p {
      color: ${colors.tealGreen};
      font-size: 1.2rem;
      line-height: 1.4rem;
      margin-left: 0.9rem;
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
          color: ${colors.black};
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
        {/* <img src={letter1} alt="logo" /> */}
        <h2>king</h2>
        <p className="slogan">
          Memories are hunting horns
          <div>whose sound dies on the wind</div>
        </p>
      </div>
      <div className="right-side">
        <ul>
          <li>
            <NavLink to={ROUTES.B_EMAILS} end>
              Postcard
            </NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.WORLD_OF_STAMPS} end>
              World of Stamps
            </NavLink>
          </li>
        </ul>
      </div>
    </HeaderStyled>
  );
};

export default Header;
