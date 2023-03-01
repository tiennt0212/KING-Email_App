import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import colors from "styles/colors";

const { tealGreen, lightGray, darkGray } = colors;
const ButtonStyled = styled.button`
  /* display: inline-flex; */
  border-radius: 0.6rem;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: unset;
  }
  * {
    vertical-align: middle;
  }
  &.small-size {
    padding: 0.6rem 0.6rem;
    font-size: 1.2rem;
    line-height: 1.4rem;
    img {
      width: 1.4rem;
      height: 1.4rem;
      + span {
        margin-left: 0.6rem;
      }
    }
  }
  &.normal-size {
    padding: 0.8rem 0.8rem;
    line-height: 1.8rem;
    font-size: 1.8rem;
    img {
      width: 1.8rem;
      height: 1.8rem;
      + span {
        margin-left: 0.8rem;
      }
    }
  }
  &.large-size {
    padding: 1rem 1rem;
    font-size: 2.4rem;
    line-height: 2.4rem;
    img {
      width: 2.4rem;
      height: 2.4rem;
      + span {
        margin-left: 1rem;
      }
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
    color: ${darkGray};
    border: solid 0.1rem ${darkGray};
    &:hover {
      color: ${tealGreen};
      border-color: ${tealGreen};
    }
  }
  &.link-type {
    background-color: transparent;
    border: none;
    padding: 0;
  }
`;

const Button = ({
  size,
  icon,
  text,
  type,
  htmlType,
  className,
  onClick,
  ...rest
}) => {
  return (
    <ButtonStyled
      type={htmlType}
      className={[
        className,
        `${type}-type`,
        `${size}-size`,
        icon && text ? "btn-filled" : "",
      ].join(" ")}
      onClick={onClick}
      {...rest}
    >
      {icon && <img src={icon} alt="btn-icon" />}
      {text && <span>{text}</span>}
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
