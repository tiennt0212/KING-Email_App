import React from "react";
import styled from "styled-components";
import { Header, Sidebar, Modal } from "components";
import { useDispatch, useSelector } from "hooks";
const PrimaryLayoutStyled = styled.div`
  height: 100%;
  position: relative;
`;
const ContentStyled = styled.div`
  display: flex;
  height: calc(100% - 9rem);
`;

const PrimaryLayout = ({ children, sidebar, ...rest }) => {
  const { modal } = useSelector(({ AppStore }) => ({ modal: AppStore.modal }));
  const { openModal, closeModal } = useDispatch(({ AppStore }) => ({
    openModal: AppStore.openModal,
    closeModal: AppStore.closeModal,
  }));
  return (
    <PrimaryLayoutStyled>
      <Header />
      <ContentStyled>
        <Sidebar {...sidebar} />
        {children}
      </ContentStyled>
      <Modal {...modal} onCloseModal={closeModal} />
    </PrimaryLayoutStyled>
  );
};

export default PrimaryLayout;
