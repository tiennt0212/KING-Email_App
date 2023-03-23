import React from "react";
import styled from "styled-components";
import Avatar from "components/Avatar";
import { Button } from "components/origin";
import colors from "styles/colors";

import icMail from "assets/images/mail.png";
import icBookmark from "assets/images/ic-bookmark.svg";
import icBookmarkFilled from "assets/images/ic-bookmark-filled.svg";
import UserInfo from "components/UserInfo";

const { darkGray, black, lightGray } = colors;
const EmailPreviewStyled = styled.div`
  background-color: white;
  border-radius: 0.8rem;
  padding: 2rem 2rem 1rem;
  position: relative;
  color: ${darkGray};
  font-size: 1.6rem;
  border: solid 0.1rem ${lightGray};
  h3 {
    margin-top: 0.5rem;
    line-height: 2.5rem;
    font-size: 2rem;
    color: ${black};
    > .sender-name {
      color: ${darkGray};
    }
  }
  .card-content {
    margin-top: 0.5rem;
    color: ${darkGray};
    font-size: inherit;
    line-height: 2.5rem;
    -webkit-line-clamp: 4;
  }
  .card-timestamp {
    color: ${darkGray};
    font-size: inherit;
    line-height: 2.5rem;
  }
  .email-header {
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
  }
  .btn-change-state {
    font-size: 1.4rem;
    color: ${darkGray};
    font-weight: bold;
    &:not(:hover) {
      filter: invert(56%) sepia(10%) saturate(33%) hue-rotate(10deg)
        brightness(99%) contrast(85%);
    }
    &:hover {
      color: ${black};
    }
  }
  .btn-bookmark {
    /* margin: -2rem -2rem 2rem 2rem; */
    &:not(:hover) {
      filter: invert(57%) sepia(5%) saturate(146%) hue-rotate(315deg)
        brightness(98%) contrast(79%);
    }
  }
`;

const EmailPreview = ({
  senderAvt,
  senderName,
  cardTitle,
  cardContent,
  time,
  hasBookmark,
  className,
  senderInfo,
  onSelectEmail,
  ...rest
}) => {
  return (
    <EmailPreviewStyled className={className} onClick={() => onSelectEmail()}>
      <div className="email-header">
        <UserInfo {...senderInfo} />
        <Button
          className="btn-change-state"
          text="Mark as read"
          icon={icMail}
          type="link"
          size="normal"
          onClick={() =>
            alert("Thanks for your using. But it wasn't implemented!")
          }
        />
        <Button
          className="btn-bookmark"
          icon={hasBookmark ? icBookmarkFilled : icBookmark}
          size="large"
          type="link"
          onClick={() =>
            alert("Thanks for your using. But it wasn't implemented!")
          }
        />
      </div>
      <h3>
        {cardTitle} - <span className="sender-name">{senderName}</span>
      </h3>
      <p className="card-content limit-text-line">{cardContent}</p>
    </EmailPreviewStyled>
  );
};

EmailPreview.propTypes = {};

EmailPreview.defaultProps = {};

export default EmailPreview;
