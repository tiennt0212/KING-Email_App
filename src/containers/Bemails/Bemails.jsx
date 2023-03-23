import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, Avatar, EmailPreview, EmailView } from "components";
import EmailPreviewPanel from "./EmailPreviewPanel";
import { useDispatch, useSelector, useStore } from "hooks";
import colors from "styles/colors";
import { BREAKPOINTS } from "utils/constants";
import mail from "assets/images/mail.png";
import { handleEvent, getWallet } from "services/IconService";
const EmailLayout = styled.div`
  display: flex;
  > .left-side {
    border-right: solid 0.2rem ${colors.lightGray};
    flex-grow: 1;
  }
  > .right-side {
    flex-grow: 2;
  }
  @media (max-width: ${BREAKPOINTS.LG}) {
  }
`;

const Bemails = () => {
  const { receivedEmail } = useSelector(({ StampStore }) => ({
    receivedEmail: StampStore.personal.received,
  }));
  const { increment, incrementAsync, getReceivedEmail, getStamp } = useDispatch(
    ({ count, StampStore }) => ({
      increment: count.increment,
      incrementAsync: count.incrementAsync,
      getReceivedEmail: StampStore.getReceivedEmail,
      getStamp: StampStore.getStamp,
    })
  );
  const { isLoggedIn } = useStore(({ UserStore }) => ({
    isLoggedIn: UserStore.isLoggedIn,
  }));

  useEffect(() => {
    if (isLoggedIn) getReceivedEmail();
    // getStamp();
  }, [getReceivedEmail]);
  const exampleEmailList = [
    {
      senderAvt:
        "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
      senderName: "Tien Nguyen",
      cardTitle: "Hello World",
      time: "25-Feb-2023",
      cardContent:
        "Lorem ipsum ipsim... I first want to apologize that we haven’t been able to connect recently. I feel like somewhere along the way I must have made it difficult to communicate",
    },
    {
      senderAvt:
        "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
      senderName: "Tien Nguyen",
      cardTitle: "Hello World",
      time: "26-Feb-2023",
      cardContent:
        "Lorem ipsum ipsim... I first want to apologize that we haven’t been able to connect recently. I feel like somewhere along the way I must have made it difficult to communicate",
    },
    {
      senderAvt:
        "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
      senderName: "Tien Nguyen",
      cardTitle: "Hello World",
      time: "27-Feb-2023",
      cardContent:
        "Lorem ipsum ipsim... I first want to apologize that we haven’t been able to connect recently. I feel like somewhere along the way I must have made it difficult to communicate",
    },
  ];
  return (
    <EmailLayout>
      <div className="left-side">
        <EmailPreviewPanel emailList={receivedEmail} />
        {/* <EmailPreviewPanel emailList={exampleEmailList} /> */}
      </div>
      <div className="right-side">
        <EmailView
          senderAvt={
            "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg"
          }
          senderName=" Tien Nguyen Tien Nguyen"
          cardTitle={"Hello World"}
          time={"26-Feb-2023"}
          cardContent={
            "Lorem ipsum ipsim... I first want to apologize that we haven’t been able to connect recently. I feel like somewhere along the way I must have made it difficult to communicate"
          }
        />
      </div>
    </EmailLayout>
  );
};

export default Bemails;
