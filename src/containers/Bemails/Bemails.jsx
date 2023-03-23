import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Avatar,
  EmailPreview,
  EmailView,
  InkBallLoading,
} from "components";
import EmailPreviewPanel from "./EmailPreviewPanel";
import { useDispatch, useSelector, useStore } from "hooks";
import colors from "styles/colors";
import { BREAKPOINTS, ROUTES } from "utils/constants";
import mail from "assets/images/mail.png";
import { handleEvent, getWallet } from "services/IconService";
import { useLocation } from "react-router-dom";
import gifInkDiscover from "assets/images/ink-discover.gif";

const EmailLayout = styled.div`
  display: flex;
  width: 100%;
  > .left-side {
    border-right: solid 0.2rem ${colors.lightGray};
    width: 50%;
    flex-grow: 1;
    overflow-y: auto;
  }
  > .right-side {
    width: 50%;
    flex-grow: 1;
  }
  @media (max-width: ${BREAKPOINTS.LG}) {
  }
`;

const OverlayStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  /* height: 100vh; */
  /* width: inherit; */
  background-image: url(${gifInkDiscover});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  animation: fadeOut 2s;
  animation-fill-mode: forwards;

  @keyframes fadeOut {
    30% {
      opacity: 1;
    }
    99% {
      opacity: 0.01;
      width: 100%;
      height: 100%;
    }
    100% {
      opacity: 0;
      width: 0;
      height: 0;
    }
  }
`;

const Bemails = () => {
  const location = useLocation();
  const isReceivedEmailPage = location.pathname === ROUTES.MAILS;
  const [selectedEmail, setSelectedEmail] = useState(null);
  const { receivedEmail, sentEmail, loadingGetReceivedEmail } = useSelector(
    ({ StampStore, loading }) => ({
      receivedEmail: StampStore.personal.received,
      sentEmail: StampStore.personal.sent,
      loadingGetReceivedEmail: loading.effects.StampStore.getReceivedEmail,
    })
  );
  const {
    increment,
    incrementAsync,
    getReceivedEmail,
    getSentEmail,
    getStamp,
    openModal,
    getWallet,
  } = useDispatch(({ count, StampStore, AppStore, UserStore }) => ({
    increment: count.increment,
    incrementAsync: count.incrementAsync,
    getReceivedEmail: StampStore.getReceivedEmail,
    getSentEmail: StampStore.getSentEmail,
    getStamp: StampStore.getStamp,
    openModal: AppStore.openModal,
    getWallet: UserStore.getWallet,
  }));
  const { isLoggedIn } = useStore(({ UserStore }) => ({
    isLoggedIn: UserStore.isLoggedIn,
  }));

  useEffect(() => {
    if (isLoggedIn) {
      if (isReceivedEmailPage) getReceivedEmail();
      else getSentEmail();
    } else {
      openModal({
        title: "You haven't connected to any wallet",
        message: "Please connect your wallet before use Mail features",
        children: (
          <Button
            type="transparent"
            text="Connect Wallet"
            onClick={() => getWallet()}
          />
        ),
      });
    }
    setSelectedEmail(null);
  }, [getReceivedEmail, getSentEmail, location, isLoggedIn]);

  const emailPanelInput = isReceivedEmailPage ? receivedEmail : sentEmail;

  return (
    <Suspense fallback={<InkBallLoading />}>
      <EmailLayout>
        <div className="left-side">
          <EmailPreviewPanel
            emailList={emailPanelInput}
            loading={loadingGetReceivedEmail}
            selectEmail={setSelectedEmail}
          />
          {/* <EmailPreviewPanel emailList={exampleEmailList} /> */}
        </div>
        <div className="right-side">
          <EmailView {...selectedEmail} />
        </div>
      </EmailLayout>
      <OverlayStyled />
    </Suspense>
  );
};

export default Bemails;
