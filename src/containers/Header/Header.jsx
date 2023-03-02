import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Avatar, Button, AddressShorten } from "components";
import { useDispatch, useSelect } from "hooks";
import { handleEvent } from "services/IconService";
import { BREAKPOINTS, ROUTES } from "utils/constants";

// import gifInk1 from "assets/images/ink1.gif";
// import gifInkMan from "assets/images/ink-man.gif";
// import gifPurpleInk from "assets/images/purple-ink.gif";
// import gifInkPlanet from "assets/images/ink-planet.gif";
// import gifInkDiscover from "assets/images/ink-discover.gif";
// import letter1 from "assets/images/letter1.gif";
import colors from "styles/colors";
import icWallet from "assets/images/ic-wallet.png";

const { tealGreen, lightGray } = colors;
const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3.2rem;
  border-bottom: solid 0.2rem ${lightGray};
  height: 9rem;
  box-sizing: border-box;
`;

const LogoAndSloganStyled = styled.div`
  display: flex;
  align-items: center;
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
    span {
      display: block;
    }
  }
  @media (max-width: ${BREAKPOINTS.SM}) {
    p.slogan {
      display: none;
    }
  }
`;

const NavStyled = styled.nav`
  display: flex;
  align-items: center;
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
`;

const UserUtilitiesStyled = styled.div`
  /* .logged_in-user  */

  .guest-user .btn-connect-wallet {
    margin-left: 2rem;
    font-weight: bold;
    img {
      filter: invert(1);
    }
    &:hover {
      background: linear-gradient(
        150deg,
        rgba(0, 239, 209, 1) 0%,
        rgba(0, 184, 163, 1) 23%,
        rgba(0, 157, 140, 1) 69%,
        rgba(0, 137, 123, 1) 100%
      );
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }
  }

  .logged_in-user {
    display: flex;
    align-items: center;
    p {
      margin-right: 1.2rem;
    }
    .user-avatar {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 4px 8px;
    }
  }
`;

const Header = ({
  isLoggedIn,
  userAvt,
  userAddr,
  onConnectWallet,
  ...rest
}) => {
  console.log(isLoggedIn);
  return (
    <HeaderStyled>
      <div className="left-side">
        <LogoAndSloganStyled>
          <h2>king</h2>
          <p className="slogan">
            Memories are hunting horns
            <span>whose sound dies on the wind</span>
          </p>
        </LogoAndSloganStyled>
      </div>
      <div className="center">
        <NavStyled>
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
        </NavStyled>
      </div>
      <div className="right-side">
        <UserUtilitiesStyled>
          {isLoggedIn ? (
            <div className="logged_in-user">
              <AddressShorten address={userAddr} />
              <Avatar src={userAvt} size="large" className="user-avatar" />
            </div>
          ) : (
            <div className="guest-user">
              <Button
                icon={icWallet}
                text={"Connect"}
                type="primary"
                size="large"
                className="btn-connect-wallet"
                onClick={onConnectWallet}
              />
            </div>
          )}
        </UserUtilitiesStyled>
      </div>
    </HeaderStyled>
  );
};

export default Header;
