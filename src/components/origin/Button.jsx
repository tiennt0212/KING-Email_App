import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import colors from "styles/colors";

const { tealGreen, lightGray } = colors;
const ButtonStyled = styled.button`
  display: inline-flex;
  border-radius: 0.6rem;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: unset;
  }
  &::before {
    content: "";
    background-image: url(${(props) => props.icon});
    background-repeat: no-repeat;
    background-size: contain;
    display: block;
  }

  &.small-size {
    padding: 0.6rem 1.2rem;
    font-size: 1.4rem;
    line-height: 1.4rem;
    &::before {
      width: 1.4rem;
      height: 1.4rem;
      margin-right: 0.6rem;
    }
  }
  &.normal-size {
    padding: 0.8rem 1.6rem;
    line-height: 1.8rem;
    font-size: 1.8rem;
    &::before {
      width: 1.8rem;
      height: 1.8rem;
      margin-right: 0.8rem;
    }
  }
  &.large-size {
    padding: 1rem 2rem;
    font-size: 2.4rem;
    line-height: 2.4rem;
    &::before {
      width: 2.4rem;
      height: 2.4rem;
      margin-right: 1rem;
    }
  }
  &.normal-type {
    background-color: ${lightGray};
    border: none;
  }
  &.primary-type {
    background-color: ${tealGreen};
    color: white;
    border: none;
  }
  &.transparent-type {
    background-color: transparent;
    color: ${tealGreen};
    border: solid 0.1rem ${tealGreen};
  }
  &.link-type {
    background-color: transparent;
    border: none;
  }
`;

const Button = ({ size, icon, text, type, htmlType, className, ...rest }) => {
  return (
    <ButtonStyled
      type={htmlType}
      className={[className, `${type}-type`, `${size}-size`].join(" ")}
      {...rest}
      icon={icon}
    >
      {text}
    </ButtonStyled>
  );
};

Button.propTypes = {
  size: PropTypes.oneOf(["small", "normal", "large"]),
  icon: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.oneOf(["normal", "primary", "transparent", "link"]),
  htmlType: PropTypes.string,
};

Button.defaultProps = {
  size: "normal",
  icon: null,
  text: "",
  type: "normal",
  htmlType: "button",
};

export default Button;
