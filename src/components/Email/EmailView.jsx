import React from "react";
import styled from "styled-components";
import Avatar from "components/Avatar";
import { Button } from "components/origin";
import colors from "styles/colors";
import icBookmark from "assets/images/ic-bookmark.svg";
import icBookmarkFilled from "assets/images/ic-bookmark-filled.svg";

const { lightGray } = colors;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const TopUtilityStyled = styled.div`
  height: 9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 0.2rem ${lightGray};
  padding: 0 3.2rem;
  > .left-side {
  }

  > .right-side {
    overflow-x: auto;
  }
`;
const EmailViewStyled = styled.div`
  border-bottom: solid 0.2rem ${lightGray};
  padding: 4rem 3.2rem;
  font-size: 1.6rem;
  line-height: 2.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  .card-content {
    background-color: ${lightGray};
    padding: 2.4rem;
    border-radius: 0.8rem;
    flex-grow: 1;
  }
  .btn-bookmark {
    &:not(:hover) {
      filter: invert(57%) sepia(5%) saturate(146%) hue-rotate(315deg)
        brightness(98%) contrast(79%);
    }
  }
`;
const BottomUtilityStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 9rem;
  padding: 0 3.2rem;
`;

const EmailView = ({
  senderAvt,
  senderName,
  cardTitle,
  cardContent,
  time,
  hasBookmark,
  className,
  ...props
}) => {
  return (
    <Wrapper>
      <TopUtilityStyled>
        <div className="left-side">
          <Button text="Back" type="transparent" />
        </div>
        <div className="right-side">
          <Button text="Example Tag 1" type="transparent" />
          <Button text="Example Tag 2" type="transparent" />
        </div>
      </TopUtilityStyled>
      <EmailViewStyled>
        <Avatar src={senderAvt} alt="sender-avt" size="large" />
        <h4 className="sender-name">{senderName}</h4>
        <p className="timestamp">{time}</p>
        <Button
          className="btn-bookmark"
          type="link"
          size="large"
          icon={hasBookmark ? icBookmarkFilled : icBookmark}
        />
        <h2 className="card-title">{cardTitle}</h2>
        <p className="card-content">{cardContent}</p>
      </EmailViewStyled>
      <BottomUtilityStyled>
        <div className="left-side">
          <Button text="Back" type="transparent" />
        </div>
        <div className="right-side">
          <Button text="Example Tag 1" type="transparent" />
          <Button text="Example Tag 2" type="transparent" />
        </div>
      </BottomUtilityStyled>
    </Wrapper>
  );
};

EmailView.propTypes = {};

EmailView.defaultProps = {};

export default EmailView;
