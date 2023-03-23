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
const EmailLayout = styled.div`
  display: flex;
  width: 100%;
  > .left-side {
    border-right: solid 0.2rem ${colors.lightGray};
    width: 50%;
    flex-grow: 1;
  }
  > .right-side {
    width: 50%;
    flex-grow: 1;
  }
  @media (max-width: ${BREAKPOINTS.LG}) {
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
  }, [getReceivedEmail, location]);

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
    </Suspense>
  );
};

export default Bemails;
