import React from "react";
import styled from "styled-components";
import { Button, Avatar, EmailPreview } from "components";
import { useDispatch, useSelector } from "hooks";
import colors from "styles/colors";
import mail from "assets/images/mail.png";

const LeftSideStyled = styled.div`
  border-right: solid 0.2rem ${colors.lightGray};
`;

const RightSideStyled = styled.div``;

const Bemails = () => {
  const { count } = useSelector(({ count }) => ({ count }));
  const { increment, incrementAsync } = useDispatch(({ count }) => ({
    increment: count.increment,
    incrementAsync: count.incrementAsync,
  }));
  return (
    <>
      <LeftSideStyled>
        <EmailPreview
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
        <EmailPreview
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
        <EmailPreview
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
      </LeftSideStyled>
      <RightSideStyled>
        <h1> This is Bemails container</h1>
        <h2> This is Bemails container</h2>
        <h3> This is Bemails container</h3>
        <h4> This is Bemails container</h4>
        <h5> This is Bemails container</h5>
        <h6> This is Bemails container</h6>
        <div>{count}</div>
        <Button onClick={() => increment(1)} text="Test func" />
        <Button
          onClick={async () => {
            for (let index = 0; index < 10; index++) {
              await incrementAsync(1);
            }
          }}
          text="Async Incre"
        />
        <br />

        <Button icon={mail} size="small" text="ABC" />
        <Button icon={mail} size="small" text="ABC" type="primary" />
        <Button icon={mail} size="small" text="ABC" type="link" />
        <Button icon={mail} size="small" text="ABC" type="transparent" />
        <br />

        <Button icon={mail} text="ABC" />
        <Button icon={mail} text="ABC" type="primary" />
        <Button icon={mail} text="ABC" type="link" />
        <Button icon={mail} text="ABC" type="transparent" />

        <br />
        <Button icon={mail} size="large" text="ABC" />
        <Button icon={mail} size="large" text="ABC" type="primary" />
        <Button icon={mail} size="large" text="ABC" type="link" />
        <Button icon={mail} size="large" text="ABC" type="transparent" />
        <Avatar
          src={
            "htt://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
          }
        />
      </RightSideStyled>
    </>
  );
};

export default Bemails;
