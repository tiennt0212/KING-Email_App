import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AddressShorten } from "components";
import { useDispatch } from "hooks";
import { UserInfo, Button } from "components";
import icDollarCoin from "assets/images/ic-dollar-coin.png";
const StampPreviewStyled = styled.div`
  width: 20rem;
  height: 20rem;
  padding: 5rem 2rem 12rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  > img {
    height: inherit;
    object-fit: contain;
    transition: all 300ms linear;
  }

  &:hover {
    > img {
      box-shadow: 0 0 3rem 0.2rem #0ff;
      transform: scale(1.1);
    }
    > div.stamp-info {
      display: flex;
    }
  }
  > div.stamp-info {
    margin-top: 2rem;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
      font-weight: bold;
    }
    .user-info {
      margin-top: 0.5rem;
    }
    > button {
      margin-top: 1rem;
      img {
        filter: invert(1);
        width: 2.6rem;
        height: 2.6rem;
      }
    }
  }
`;

const StampPreview = (props) => {
  const {
    id,
    image,
    sender,
    receiver,
    title,
    content,
    expired,
    creatorInfo,
    onBuyStamp,
  } = props;
  const displayable = !(sender || receiver || title || content || expired);
  if (!displayable) {
    console.log(`Stamp at ID ${id} has something wrong`);
  }
  return (
    displayable && (
      <StampPreviewStyled>
        <img src={image} alt="stamp-preview" />
        <div className="stamp-info">
          <p>Created By</p>
          <UserInfo {...creatorInfo} className="user-info" />
          <Button
            text={"BUY"}
            type="primary"
            icon={icDollarCoin}
            onClick={onBuyStamp}
          />
        </div>
      </StampPreviewStyled>
    )
  );
};

export default StampPreview;
