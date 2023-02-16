import React from "react";
import { Button, Avatar, Header } from "components";
import { useDispatch, useSelector } from "hooks";
import mail from "assets/images/mail.png";
const Bemails = () => {
  const { count } = useSelector(({ count }) => ({ count }));
  const { increment, incrementAsync } = useDispatch(({ count }) => ({
    increment: count.increment,
    incrementAsync: count.incrementAsync,
  }));
  return (
    <>
      <Header />
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
    </>
  );
};

export default Bemails;
