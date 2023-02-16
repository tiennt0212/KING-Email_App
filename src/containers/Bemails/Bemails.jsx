import React from "react";
import { Button, Avatar } from "components";
import { useDispatch, useSelector } from "hooks";
const Bemails = () => {
  const { count } = useSelector(({ count }) => ({ count }));
  const { increment, incrementAsync } = useDispatch(({ count }) => ({
    increment: count.increment,
    incrementAsync: count.incrementAsync,
  }));
  return (
    <>
      <h1> This is Bemails container</h1>
      <h2> This is Bemails container</h2>
      <h3> This is Bemails container</h3>
      <h4> This is Bemails container</h4>
      <h5> This is Bemails container</h5>
      <h6> This is Bemails container</h6>
      <div>{count}</div>
      <Button onClick={() => increment(1)}>ABC</Button>
      <Button
        onClick={async () => {
          for (let index = 0; index < 10; index++) {
            await incrementAsync(1);
          }
        }}
      >
        Async Incre
      </Button>
      <Avatar
        src={
          "htt://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
        }
      />
    </>
  );
};

export default Bemails;
