import React from "react";
import styled from "styled-components";
import Avatar from "components/Avatar";
import { Button } from "components/origin";
import colors from "styles/colors";

import icMail from "assets/images/mail.png";
import icBookmark from "assets/images/ic-bookmark.svg";
import icBookmarkFilled from "assets/images/ic-bookmark-filled.svg";

const { darkGray, black } = colors;
const EmailPreviewStyled = styled.div`
  background-color: white;
  border-radius: 0.8rem;
  padding: 2rem 2rem 1rem;
  position: relative;
  color: ${darkGray};
  font-size: 1.6rem;
  &:hover {
    box-shadow: 0px 10px 34px rgba(0, 0, 0, 0.08);
    transition: transform 0.2s;
    transform: scale(1.002);
    z-index: 1;
  }
  h3 {
    line-height: 2.5rem;
    font-size: 1.8rem;
    color: ${black};
    > .sender-name {
      color: ${darkGray};
    }
  }
  .card-content {
    color: ${darkGray};
    font-size: inherit;
    line-height: 2.5rem;
    -webkit-line-clamp: 2;
  }
  .card-timestamp {
    /* margin-top: 1.3rem; */
    color: ${darkGray};
    font-size: inherit;
    line-height: 2.5rem;
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
    margin: -2rem -2rem 2rem 2rem;
    &:not(:hover) {
      filter: invert(57%) sepia(5%) saturate(146%) hue-rotate(315deg)
        brightness(98%) contrast(79%);
    }
  }
  /* button.btn-bookmark:after {
    content: "";
    background-image: url(${icBookmarkFilled});
    background-repeat: no-repeat;
    background-size: contain;
    display: block;
    width: 2.4rem;
    height: 2.4rem;
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
  } */
`;

const EmailPreview = ({
  senderAvt,
  senderName,
  cardTitle,
  cardContent,
  time,
  hasBookmark,
  className,
  ...rest
}) => {
  return (
    <EmailPreviewStyled className={className}>
      <Avatar size="large" src={senderAvt} alt="sender-avt" />
      <h3>
        {cardTitle} - <span className="sender-name">{senderName}</span>
      </h3>
      <p className="card-timestamp">{time}</p>
      <p className="card-content limit-text-line">{cardContent}</p>
      <Button
        className="btn-change-state"
        text="Mark as read"
        icon={icMail}
        type="link"
        size="normal"
        onClick={() => alert("Change READ status")}
      />
      <Button
        className="btn-bookmark"
        icon={hasBookmark ? icBookmarkFilled : icBookmark}
        size="large"
        type="link"
        onClick={() => alert("Change Bookmark status")}
      />
    </EmailPreviewStyled>
  );
};

EmailPreview.propTypes = {};

EmailPreview.defaultProps = {};

export default EmailPreview;
