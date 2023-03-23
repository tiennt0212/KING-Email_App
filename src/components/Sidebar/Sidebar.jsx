import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
// import { Button } from "components/origin";
import { BREAKPOINTS } from "utils/constants";
import colors from "styles/colors";
// import icDoubleLeft from "assets/images/ic-double-left.png";
import { PAPER_THEME } from "styles/theme";
const { tealGreen } = colors;
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
`;
const SidebarStyled = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
  border-right: solid 0.2rem;
  border-color: ${({ theme }) =>
    theme.name === PAPER_THEME.name ? theme.subColor2 : "transparent"};
  overflow-y: auto;
  flex-grow: 0;
  flex-shrink: 0;
  overflow-y: auto;

  ul li {
    margin-bottom: 0.6rem;
    border: solid 0.8rem transparent;
    &:has(a.active) {
      border-left-color: ${tealGreen};
      background-color: ${(props) => props.theme.bgColor};
    }
    a {
      text-decoration: none;
      color: inherit;
      img {
        filter: invert(
          ${({ theme }) => (theme.name === PAPER_THEME.name ? 0 : 1)}
        );
      }
      &.active,
      &:hover {
        color: ${(props) => props.theme.primaryColor};
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
              <li key={`${item.name}-${item.route}`}>
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
            <li key={`${item.name}-${item.route}`}>
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
      </div>
    </SidebarStyled>
  );
};

export default Sidebar;
