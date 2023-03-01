import React from "react";
import styled from "styled-components";
import { Header, Sidebar } from "components";
const PrimaryLayoutStyled = styled.div`
  height: 100%;
`;
const ContentStyled = styled.div`
  display: flex;
  height: calc(100% - 9rem);
`;

const PrimaryLayout = ({ children, sidebarItems, ...rest }) => {
  return (
    <PrimaryLayoutStyled>
      <Header />
      <ContentStyled>
        <Sidebar items={sidebarItems} />
        {children}
      </ContentStyled>
    </PrimaryLayoutStyled>
  );
};

export default PrimaryLayout;
