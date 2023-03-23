import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "hooks";
import { DiscoverLoading } from "components";
import StampPreview from "./StampPreview";
import { useLocation } from "react-router-dom";
import { ROUTES } from "utils/constants";
import icPlane from "assets/images/ic-plane.png";
import icDollarCoin from "assets/images/ic-dollar-coin.png";
import gifInkDiscover from "assets/images/ink-discover.gif";

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
`;

const OverlayStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  /* height: 100vh; */
  /* width: inherit; */
  background-image: url(${gifInkDiscover});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  animation: fadeOut 3s;
  animation-fill-mode: forwards;

  @keyframes fadeOut {
    30% {
      opacity: 1;
    }
    99% {
      opacity: 0.01;
      width: 100%;
      height: 100%;
    }
    100% {
      opacity: 0;
      width: 0;
      height: 0;
    }
  }
`;
const WorldOfStamps = (props) => {
  const location = useLocation();
  const isMyStampPage = location.pathname === ROUTES.WORLD_OF_STAMPS_ME;
  const { worldOfStamps, personalCollected, loadingGetWorldOfStamps } =
    useSelector(({ StampStore, loading }) => ({
      worldOfStamps: StampStore.worldWide,
      personalCollected: StampStore.personal.collected,
      loadingGetWorldOfStamps: loading.effects.StampStore.getWorldOfStamps,
    }));

  const { getWorldOfStamps, getMyStamp, buyStamp } = useDispatch(
    ({ StampStore }) => ({
      getWorldOfStamps: StampStore.getWorldOfStamps,
      getMyStamp: StampStore.getMyStamp,
      buyStamp: StampStore.buyStamp,
    })
  );

  useEffect(() => {
    if (!isMyStampPage) getWorldOfStamps();
    else getMyStamp();
  }, [getWorldOfStamps, location]);

  return (
    <StyledWrapper>
      {(!isMyStampPage ? worldOfStamps : personalCollected).map((stamp) => {
        return (
          <StampPreview
            {...stamp}
            key={stamp?.id}
            buttonIcon={isMyStampPage ? icPlane : icDollarCoin}
            buttonText={isMyStampPage ? "SEND MAIL" : "BUY"}
            stampAction={
              isMyStampPage
                ? () => {
                    localStorage.setItem("selected", stamp?.id);
                    window.location.assign(ROUTES.EMAIL_COMPOSE);
                  }
                : () => buyStamp({ stampId: stamp?.id })
            }
          />
        );
      })}
      <OverlayStyled />
    </StyledWrapper>
  );
};

export default WorldOfStamps;
