import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AddressShorten } from "components";
import { useDispatch } from "hooks";
import { UserInfo } from "components";

const StampPreviewStyled = styled.div`
  width: 10rem;
  height: 10rem;
  margin: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  > img {
    height: inherit;
    object-fit: contain;
    transition: all 300ms linear;
    &:hover {
      box-shadow: 0 0 3rem 0.2rem #0ff;
      transform: scale(1.1);
    }
  }
`;

const StampPreview = (props) => {
  const { id, image, sender, receiver, title, content, expired, creatorInfo } =
    props;
  const displayable = !(sender || receiver || title || content || expired);
  if (!displayable) {
    console.log(`Stamp at ID ${id} has something wrong`);
  }
  return (
    displayable && (
      <StampPreviewStyled>
        <img src={image} alt="stamp-preview" />
        <UserInfo {...creatorInfo} />
      </StampPreviewStyled>
    )
  );
};

export default StampPreview;
