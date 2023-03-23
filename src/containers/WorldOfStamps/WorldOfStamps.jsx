import React, { Suspense, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "hooks";
import { DiscoverLoading } from "components";
import StampPreview from "./StampPreview";
const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const WorldOfStamps = (props) => {
  const { worldOfStamps } = useSelector(({ StampStore }) => ({
    worldOfStamps: StampStore.worldWide,
  }));
  const { getWorldOfStamps } = useDispatch(({ StampStore }) => ({
    getWorldOfStamps: StampStore.getWorldOfStamps,
  }));
  useEffect(() => {
    getWorldOfStamps();
  }, [getWorldOfStamps]);
  return (
    <StyledWrapper>
      {worldOfStamps.map((stamp) => {
        // console.log("stamp", stamp);
        return <StampPreview {...stamp} key={stamp?.id} />;
      })}
    </StyledWrapper>
  );
};

export default WorldOfStamps;
