import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector, useStore } from "hooks";
import { Sidebar, Modal } from "components";
import { Header } from "containers";
const PrimaryLayoutStyled = styled.div`
  height: 100%;
  position: relative;
`;
const ContentStyled = styled.div`
  display: flex;
  height: calc(100% - 9rem);
`;

const PrimaryLayout = ({ children, sidebar, ...rest }) => {
  const { wallet, info, modal } = useSelector(({ User, AppStore }) => ({
    wallet: User.wallet,
    info: User.info,
    modal: AppStore.modal,
  }));

  const { getWallet, authenticate, logout, closeModal } = useDispatch(
    ({ User, AppStore }) => ({
      getWallet: User.getWallet,
      authenticate: User.authenticate,
      logout: User.logout,
      closeModal: AppStore.closeModal,
    })
  );

  const { isLoggedIn } = useStore(({ User }) => ({
    isLoggedIn: User.isLoggedIn,
  }));

  useEffect(() => {
    if (isLoggedIn) authenticate({ address: wallet.address });
  }, [isLoggedIn]);
  return (
    <PrimaryLayoutStyled>
      <Header
        isLoggedIn={isLoggedIn}
        userAvt={info?.avatar}
        userAddr={wallet?.address}
        userNickname={info?.name}
        onConnectWallet={getWallet}
        logoutHandler={logout}
      />
      <ContentStyled>
        <Sidebar {...sidebar} />
        {children}
      </ContentStyled>
      <Modal {...modal} onCloseModal={closeModal} />
    </PrimaryLayoutStyled>
  );
};

export default PrimaryLayout;
