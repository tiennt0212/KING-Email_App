import React from "react";
import styled from "styled-components";
import { Header, Sidebar, Modal } from "components";
const PrimaryLayoutStyled = styled.div`
  height: 100%;
`;
const ContentStyled = styled.div`
  display: flex;
  height: calc(100% - 9rem);
`;

const PrimaryLayout = ({ children, sidebar, ...rest }) => {
  return (
    <PrimaryLayoutStyled>
      <Header />
      <ContentStyled>
        <Sidebar {...sidebar} />
        {children}
        <Modal />
      </ContentStyled>
    </PrimaryLayoutStyled>
  );
};

export default PrimaryLayout;
