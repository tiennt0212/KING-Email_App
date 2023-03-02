import React from "react";
import styled from "styled-components";
import { Sidebar } from "components";
import { Header } from "containers";
import { useDispatch, useSelector, useStore } from "hooks";
const PrimaryLayoutStyled = styled.div`
  height: 100%;
`;
const ContentStyled = styled.div`
  display: flex;
  height: calc(100% - 9rem);
`;

const PrimaryLayout = ({ children, sidebar, ...rest }) => {
  const { wallet, info } = useSelector(({ User, cart }) => ({
    wallet: User.wallet,
    info: User.info,
  }));
  const { getWallet } = useDispatch(({ User }) => ({
    getWallet: User.getWallet,
  }));

  const { isLoggedIn } = useStore(({ User }) => ({
    isLoggedIn: User.isLoggedIn,
  }));

  return (
    <PrimaryLayoutStyled>
      <Header
        isLoggedIn={isLoggedIn}
        userAvt={info?.avatar}
        userAddr={wallet?.address}
        onConnectWallet={getWallet}
      />
      <ContentStyled>
        <Sidebar {...sidebar} />
        {children}
      </ContentStyled>
    </PrimaryLayoutStyled>
  );
};

export default PrimaryLayout;
