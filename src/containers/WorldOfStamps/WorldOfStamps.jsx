import React, { Suspense, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "hooks";
import { DiscoverLoading } from "components";
import StampPreview from "./StampPreview";
const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
`;
const WorldOfStamps = (props) => {
  const { worldOfStamps } = useSelector(({ StampStore }) => ({
    worldOfStamps: StampStore.worldWide,
  }));

  const { getWorldOfStamps, buyStamp } = useDispatch(({ StampStore }) => ({
    getWorldOfStamps: StampStore.getWorldOfStamps,
    buyStamp: StampStore.buyStamp,
  }));

  useEffect(() => {
    getWorldOfStamps();
  }, [getWorldOfStamps]);

  return (
    <StyledWrapper>
      {worldOfStamps.map((stamp) => {
        return (
          <StampPreview
            {...stamp}
            key={stamp?.id}
            onBuyStamp={() => buyStamp({ stampId: stamp?.id })}
          />
        );
      })}
    </StyledWrapper>
  );
};

export default WorldOfStamps;
