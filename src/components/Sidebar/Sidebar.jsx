import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Button } from "components/origin";
import colors from "styles/colors";
import icDoubleLeft from "assets/images/ic-double-left.png";

const { tealGreen, lightGray } = colors;
const SidebarItemStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 1.2rem;
  font-size: 1.4rem;
  &::before {
    content: "";
    display: block;
    width: 2.4rem;
    height: 2.4rem;
    background-image: url(${(props) => props.icon});
    background-size: contain;
    background-repeat: no-repeat;
    margin-right: 1rem;
  }
`;
const SidebarStyled = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90vh;
  font-size: 14px;
  border-right: solid 0.2rem ${lightGray};

  ul li {
    margin-bottom: 1.2rem;
    border: solid 0.4rem transparent;
    &:has(a.active) {
      border-left-color: ${tealGreen};
      background-color: ${colors.lightGray};
    }
    a {
      text-decoration: none;
      color: black;
      &.active {
        color: ${tealGreen};
        font-weight: bold;
        div::before {
          filter: invert(35%) sepia(97%) saturate(620%) hue-rotate(132deg)
            brightness(94%) contrast(104%);
        }
      }
    }
  }
`;

const SidebarItem = ({ icon, name }) => {
  return <SidebarItemStyled icon={icon}>{name}</SidebarItemStyled>;
};

const Sidebar = (props) => {
  const { items } = props;

  return (
    <SidebarStyled>
      <nav>
        <ul>
          {items.map((item) => (
            <li key={item.route}>
              <NavLink to={item.route} end>
                <SidebarItem {...item} />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="controls-box">
        <hr />
        <Button icon={icDoubleLeft}></Button>
      </div>
    </SidebarStyled>
  );
};

export default Sidebar;
