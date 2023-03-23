import React, { Suspense, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "hooks";
import { DiscoverLoading } from "components";
import StampPreview from "./StampPreview";
import { useLocation } from "react-router-dom";
import { ROUTES } from "utils/constants";
import icPlane from "assets/images/ic-plane.png";
import icDollarCoin from "assets/images/ic-dollar-coin.png";

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
`;
const WorldOfStamps = (props) => {
  const location = useLocation();
  const isMyStampPage = location.pathname === ROUTES.WORLD_OF_STAMPS_ME;
  const { worldOfStamps, personalCollected } = useSelector(
    ({ StampStore }) => ({
      worldOfStamps: StampStore.worldWide,
      personalCollected: StampStore.personal.collected,
    })
  );

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
                ? () => window.location.assign(`/mails/compose/${stamp?.id}`)
                : () => buyStamp({ stampId: stamp?.id })
            }
          />
        );
      })}
    </StyledWrapper>
  );
};

export default WorldOfStamps;
