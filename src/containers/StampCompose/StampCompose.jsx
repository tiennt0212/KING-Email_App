import React, { Suspense, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "hooks";
import { Button, DiscoverLoading, Input } from "components";
import { useLocation } from "react-router-dom";
import { ROUTES } from "utils/constants";
import icPlane from "assets/images/ic-plane.png";
import icDollarCoin from "assets/images/ic-dollar-coin.png";
import colors from "styles/colors";

const { tealGreen, lightGray } = colors;
const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  padding: 5rem 5rem 5rem 0;
  margin: 0 5rem 0 0;
  padding: 5rem;
  min-width: fit-content;
  width: calc(100% - rem);
  width: 100%;
  /* button[type="submit"] {
    margin-top: 1rem;
    &:hover {
      background-color: ${colors.tealGreen};
      color: white;
    }
  } */
  .mail-header,
  .mail-body {
    display: flex;
    padding: 2rem;
    width: 100%;

    /* border:  0.1rem gray; */
    border-radius: 1.6rem;
    align-items: center;
    background-color: ${lightGray};
    margin-bottom: 2rem;
  }
  .mail-header {
    /* justify-content: space-between; */
    .mail-info {
      width: 100%;
    }
    .stamp-preview img {
      margin-left: 5rem;
      width: 15rem;
      height: 15rem;
      object-fit: contain;
    }
  }
  .mail-body {
    textarea {
      width: calc(100% - 2rem);
    }
  }
  .form-action {
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: 3rem;
    }
  }
  input,
  textarea {
    width: 100%;
    background-color: white;
    color: inherit;
    border: solid 1px ${colors.tealGreen};
    border-radius: 4px;
    padding: 8px;
    font-family: inherit;
    font-size: 1.6rem;
    &:focus {
      outline: none;
    }
    &::-webkit-search-cancel-button {
      /* Hide the close button in the input field has type = "search" */
      -webkit-appearance: none;
    }
  }
`;

const FormItem = styled.div`
  display: block;
  width: 100%;
  label {
    width: 100%;
    display: block;
    font-size: 1.6rem;
    font-weight: bold;
    margin: 1.2rem 0.1rem 0.6rem;
  }
`;
const StampCompose = (props) => {
  const { selectedStamp } = useSelector(({ StampStore }) => ({
    selectedStamp: StampStore.personal.selected,
  }));

  const { getStampById, openModal, sendMail } = useDispatch(
    ({ StampStore, AppStore }) => ({
      getStampById: StampStore.getStampById,
      openModal: AppStore.openModal,
      sendMail: StampStore.sendMail,
    })
  );

  const getData = (form) => {
    let formData = new FormData(form);

    // iterate through entries...
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    // ...or output as an object
    console.log(Object.fromEntries(formData));
    return Object.fromEntries(formData);
  };

  const formHandlerSubmit = (event) => {
    event.preventDefault();
    const values = getData(event.target);
    console.log(values);
    sendMail({ ...values, stampId: selectedStamp?.id });
  };

  useEffect(() => {
    if (!localStorage.getItem("selected"))
      openModal({
        title: "Oooopppppppppsssss!",
        message: "Please select a stamp from your collection first!",
        closeable: true,
        children: (
          <Button
            text="Go to My Stamps Page"
            type="transparent"
            onClick={() => window.location.assign(ROUTES.WORLD_OF_STAMPS_ME)}
          />
        ),
      });
    else getStampById({ stampId: localStorage.getItem("selected") });
  }, [getStampById]);

  return (
    <FormStyled id="register-sbt" onSubmit={formHandlerSubmit}>
      <div className="mail-header">
        <div className="mail-info">
          <FormItem>
            <label>Receiver:</label>
            <Input.Text name="receiver" />
          </FormItem>
          <FormItem>
            <label>Title</label>
            <Input.Text name="title" />
          </FormItem>
        </div>
        <div className="stamp-preview">
          <img src={selectedStamp.image} alt="stamp" />
        </div>
      </div>
      <div className="mail-body">
        <FormItem>
          <label>Message:</label>
          <Input.TextArea type="textarea" rows="10" name="content" />
        </FormItem>
      </div>
      <div className="form-action">
        <Button
          text="Cancel"
          type="transparent"
          onClick={() => {
            localStorage.removeItem("selected");
            window.location.assign(ROUTES.MAILS);
          }}
        />
        <Button text="Send" htmlType="submit" type="primary" />
      </div>
    </FormStyled>
  );
};

export default StampCompose;
