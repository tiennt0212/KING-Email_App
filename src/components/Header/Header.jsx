import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { BREAKPOINTS, ROUTES } from "utils/constants";
// import gifInk1 from "assets/images/ink1.gif";
// import gifInkMan from "assets/images/ink-man.gif";
// import gifPurpleInk from "assets/images/purple-ink.gif";
// import gifInkPlanet from "assets/images/ink-planet.gif";
// import gifInkDiscover from "assets/images/ink-discover.gif";
// import letter1 from "assets/images/letter1.gif";
import colors from "styles/colors";

const { tealGreen, lightGray } = colors;
const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3.2rem;
  border-bottom: solid 0.2rem ${lightGray};
  height: 9rem;
  box-sizing: border-box;
  .left-side {
    display: flex;
    align-items: center;
    /* img {
      width: 4.2rem;
    } */
    h2 {
      background-color: ${tealGreen};
      color: white;
      padding: 0.4rem 1rem 0rem;
      border-radius: 0.8rem;
      font-size: 4.8rem;
    }
    .slogan {
      color: ${tealGreen};
      font-size: 1.6rem;
      line-height: 1.8rem;
      margin-left: 1.8rem;
    }
  }
  .right-side {
    height: 100%;
    * {
      height: inherit;
    }
    ul {
      display: flex;
      align-items: center;
      li {
        list-style: none;
        margin-right: 2rem;
        a {
          text-decoration: none;
          color: ${colors.black};
          display: block;
          .nav-item {
            display: flex;
            align-items: center;
            p {
              vertical-align: middle;
              text-align: center;
              font-size: 2rem;
              line-height: 2.4rem;
              flex-grow: 1;
              height: 2.4rem;
            }
          }
          &.active {
            color: ${tealGreen};
            font-weight: bold;
          }
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  @media (max-width: ${BREAKPOINTS.SM}) {
    p.slogan {
      display: none;
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
            <NavLink to={ROUTES.B_EMAILS}>
              <div className="nav-item">
                <p>Postcards</p>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.WORLD_OF_STAMPS} end>
              <div className="nav-item">
                <p>Stamp World</p>
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    </HeaderStyled>
  );
};

export default Header;
