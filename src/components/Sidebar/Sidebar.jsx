import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Button } from "components/origin";
import colors from "styles/colors";
import icDoubleLeft from "assets/images/ic-double-left.png";
import { BREAKPOINTS } from "utils/constants";

const { tealGreen, lightGray } = colors;
const SidebarItemStyled = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 1rem 2.2rem;
  min-width: 18rem;
  img {
    width: 2.4rem;
    height: 2.4rem;
  }
  span {
    margin-left: 1rem;
    font-size: 1.8rem;
    line-height: 2.1rem;
  }
  @media (max-width: ${BREAKPOINTS.LG}) {
    min-width: 0;
    span {
      display: none;
    }
  }
  &.user-wallet {
    padding-left: 1.9rem;
    border-radius: 0.8rem;

    img {
      width: 3.2rem;
      height: 3.2rem;
    }
    span {
      margin-left: 0.6rem;
      line-height: 2.5rem;
    }
    &:not(:hover) img {
      filter: invert(0%) sepia(100%) saturate(0%) hue-rotate(312deg)
        brightness(90%) contrast(107%);
    }
    &:hover {
      cursor: pointer;
      img {
        transform: scale(1.5);
        transition: transform 0.4s;
      }
      span {
        font-size: 2.4rem;
        margin-left: 1.2rem;
        transition: font-size 0.5s;
        transition: margin-left 0.15s;
        background: linear-gradient(
          90deg,
          rgba(85, 134, 255, 1) 0%,
          rgba(175, 115, 255, 1) 30%,
          rgba(210, 193, 255, 1) 70%,
          rgba(223, 140, 255, 1) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  &.need-support {
    img {
      width: 3.6rem;
      height: 3.6rem;
      margin-left: -0.5rem;
      margin-bottom: -0.5rem;
    }
    span {
      margin-left: 0.5rem;
    }
    &:hover {
      cursor: pointer;
      color: ${tealGreen};
      img {
        filter: invert(35%) sepia(97%) saturate(620%) hue-rotate(132deg)
          brightness(94%) contrast(104%);
      }
    }
  }
`;
const SidebarStyled = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
  border-right: solid 0.2rem ${lightGray};
  overflow-y: auto;
  flex-grow: 0;
  flex-shrink: 0;
  overflow-y: auto;

  ul li {
    margin-bottom: 0.6rem;
    border: solid 0.8rem transparent;
    &:has(a.active) {
      border-left-color: ${tealGreen};
      background-color: ${colors.lightGray};
    }
    a {
      text-decoration: none;
      color: black;
      &.active,
      &:hover {
        color: ${tealGreen};
        img {
          filter: invert(35%) sepia(97%) saturate(620%) hue-rotate(132deg)
            brightness(94%) contrast(104%);
        }
      }
    }
  }
`;

const SidebarItem = ({ icon, name, action, htmlClass }) => {
  return (
    <SidebarItemStyled onClick={action} className={htmlClass}>
      <img src={icon} alt="menu-item-icon" />
      <span>{name}</span>
    </SidebarItemStyled>
  );
};

const Sidebar = (props) => {
  const { topUtilities, botUtilities } = props;

  return (
    <SidebarStyled>
      <div className="top-utilities">
        <nav>
          <ul>
            {topUtilities.map((item) => (
              <li key={item.route}>
                <NavLink to={item.route} end>
                  <SidebarItem {...item} />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="bottom-utilities">
        <ul>
          {botUtilities.map((item) => (
            <li key={item.route}>
              {item.route ? (
                <NavLink to={item.route} end>
                  <SidebarItem {...item} />
                </NavLink>
              ) : (
                <SidebarItem {...item} />
              )}
            </li>
          ))}
        </ul>
        <hr />
      </div>
    </SidebarStyled>
  );
};

export default Sidebar;
