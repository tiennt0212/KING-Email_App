import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import noAvt from "assets/images/no-avt.png";
const AvatarStyled = styled.img`
  border-radius: 50%;
  &.small-size {
    width: 2.4rem;
    height: 2.4rem;
  }
  &.normal-size {
    width: 3.6rem;
    height: 3.6rem;
  }
`;

const Avatar = ({ src, alt, size, className, ...rest }) => (
  <AvatarStyled
    src={src}
    alt={alt}
    className={`${className} ${size}-size`}
    {...rest}
    onError={({ currentTarget }) => {
      currentTarget.onerror = null;
      currentTarget.src = noAvt;
    }}
  />
);

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(["small", "normal"]),
};

Avatar.defaultProps = {
  src: noAvt,
  alt: "user-avatar",
  size: "normal",
};

export default Avatar;
