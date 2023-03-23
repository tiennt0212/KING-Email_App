import React from "react";
import styled from "styled-components";
import gifInkBall from "assets/images/ink-ball.gif";
import gifInkDiscover from "assets/images/ink-discover.gif";
const LoadingStyled = styled.div`
  width: 100%;
  img {
  }
`;
const InkBallLoading = () => {
  return (
    <LoadingStyled>
      <img src={gifInkBall} alt="ink-ball-loading" />
    </LoadingStyled>
  );
};

const DiscoverLoading = () => {
  return (
    <LoadingStyled>
      <img src={gifInkDiscover} alt="discover-loading" />
    </LoadingStyled>
  );
};
export { InkBallLoading, DiscoverLoading };
