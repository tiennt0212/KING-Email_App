import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Avatar, Button, AddressShorten, UserInfo } from "components";
import { BREAKPOINTS, ROUTES } from "utils/constants";

// import gifInk1 from "assets/images/ink1.gif";
// import gifInkMan from "assets/images/ink-man.gif";
// import gifPurpleInk from "assets/images/purple-ink.gif";
// import gifInkPlanet from "assets/images/ink-planet.gif";
// import gifInkDiscover from "assets/images/ink-discover.gif";
// import letter1 from "assets/images/letter1.gif";
import icWallet from "assets/images/ic-wallet.png";
import icLogout from "assets/images/ic-logout.png";
import { WATER_THEME, PAPER_THEME } from "styles/theme";

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: inherit;
  height: 9rem;
  padding: 0 3.2rem;
  border-bottom: solid 0.2rem;
  border-color: ${({ theme }) =>
    theme.name === PAPER_THEME.name ? theme.subColor2 : "transparent"};
  box-sizing: border-box;
`;

const LogoAndSloganStyled = styled.div`
  display: flex;
  align-items: center;
  h2 {
    background-color: ${(props) => props.theme.primaryColor};
    color: white; // Fixed color on both theme
    padding: 0.4rem 1rem 0rem;
    border-radius: 0.8rem;
    font-size: 4.8rem;
  }
  .slogan {
    color: ${(props) => props.theme.subColor};
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
        color: inherit;
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
          color: ${(props) => props.theme.primaryColor};
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
      color: inherit;
      margin-right: 1.2rem;
      font-size: 1.6rem;
      font-weight: bold;
    }
    .btn-logout {
      filter: invert(
        ${(props) => (props.theme.name === WATER_THEME.name ? 1 : 0)}
      );
    }
  }
`;

const Header = ({
  isLoggedIn,
  userAvt,
  userAddr,
  userNickname,
  onConnectWallet,
  logoutHandler,
  user,
  ...rest
}) => {
  console.log(user);
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
                  <p>Bemails</p>
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
              {/* {userNickname ? (
                <p>{userNickname}</p>
              ) : (
                <AddressShorten address={userAddr} />
              )} */}

              {/* <Avatar src={userAvt} size="large" className="user-avatar" /> */}
              <UserInfo {...user} />
              <Button
                icon={icLogout}
                type={"link"}
                size="large"
                className="btn-logout"
                onClick={() => logoutHandler()}
              />
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
