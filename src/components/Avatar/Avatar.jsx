import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import noAvt from "assets/images/no-avt.png";
const AvatarStyled = styled.span`
  display: inline-block;
  &.small-size {
    width: 2.4rem;
    height: 2.4rem;
  }
  &.normal-size {
    width: 3.6rem;
    height: 3.6rem;
  }
  &.large-size {
    width: 4.8rem;
    height: 4.8rem;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const Avatar = ({ src, alt, size, className, ...rest }) => (
  <AvatarStyled className={[className, `${size}-size`].join(" ")}>
    <img
      src={src}
      alt={alt}
      {...rest}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = noAvt;
      }}
    />
  </AvatarStyled>
);

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(["small", "normal", "large"]),
};

Avatar.defaultProps = {
  src: noAvt,
  alt: "user-avatar",
  size: "normal",
};

export default Avatar;
