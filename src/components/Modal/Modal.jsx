import React from "react";
import styled from "styled-components";
// import colors from "styles/colors";
import { Button } from "components/origin";
import { useOuterClick } from "hooks";

const ModalContainerStyled = styled.div`
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalStyled = styled.div`
  position: relative;
  background-color: white;
  padding: 4rem;
  border-radius: 1.6rem;
  width: 40%;
  text-align: center;
  > h3 {
    font-size: 2.4rem;
    line-height: 2.8rem;
  }
  > p {
    margin-top: 1rem;
    font-size: 1.8rem;
    line-height: 2.2rem;
  }
  > button {
    position: absolute;
    top: 0;
    right: 0;
  }
  > .child-component {
    margin-top: 2rem;
  }
`;

const Modal = ({
  visible,
  title,
  message,
  type,
  closeable,
  onCloseModal,
  children,
  ...rest
}) => {
  const modalRef = useOuterClick(closeable ? onCloseModal : null);
  return visible ? (
    <ModalContainerStyled>
      <ModalStyled ref={modalRef}>
        {closeable ? <Button text="Close" onClick={onCloseModal} /> : null}
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="child-component">{children}</div>
      </ModalStyled>
    </ModalContainerStyled>
  ) : null;
};

export { Modal, ModalContainerStyled };
