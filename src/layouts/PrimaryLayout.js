import React from "react";
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
  const { getWallet, openModal, closeModal } = useDispatch(
    ({ User, AppStore }) => ({
      getWallet: User.getWallet,
      openModal: AppStore.openModal,
      closeModal: AppStore.closeModal,
    })
  );

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
      <Modal {...modal} onCloseModal={closeModal} />
    </PrimaryLayoutStyled>
  );
};

export default PrimaryLayout;
