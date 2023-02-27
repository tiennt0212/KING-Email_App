import React from "react";
import styled from "styled-components";
import Avatar from "components/Avatar";
import { Button } from "components/origin";
import colors from "styles/colors";

import icMail from "assets/images/mail.png";
import icBookmark from "assets/images/ic-bookmark.svg";
import icBookmarkFilled from "assets/images/ic-bookmark-filled.svg";

const EmailPreviewStyled = styled.div`
  background-color: white;
  border-radius: 0.8rem;
  padding: 2rem 2rem 1rem;
  display: grid;
  grid-template-columns: 6.8rem 13rem 25rem 4.8rem;
  grid-template-rows: 2rem 2.8rem 5.8rem 3.6rem;
  position: relative;

  &:hover {
    box-shadow: 0px 10px 34px rgba(0, 0, 0, 0.08);
    transition: transform 0.2s;
    transform: scale(1.02);
    z-index: 10;
  }
  span {
    grid-column: 1/2;
    grid-row: 1/3;
    /* grid-column-start: 1; */
    width: 100%;
    height: 100%;
  }
  h3 {
    font-size: 1.8rem;
    &.sender-name {
      color: ${colors.darkGray};
      grid-column: 2/4;
      grid-row: 1/2;
    }
    &.card-title {
      margin-top: 1rem;
      grid-row-start: 2;
      grid-column: 2/4;
    }
  }
  p {
    color: ${colors.darkGray};
    &.card-content {
      margin-top: 0.8rem;
      font-size: 1.6rem;
      line-height: 2.5rem;
      grid-column: 2/4;
      grid-row-start: 3;
      -webkit-line-clamp: 2;
    }
    &.card-timestamp {
      /* margin-top: 1.3rem; */
      grid-column: 2/3;
      font-size: 1.4rem;
      line-height: 4rem;
    }
  }
  button {
    &.btn-change-state {
      grid-column: 3/4;
      font-size: 1.4rem;
      color: ${colors.darkGray};
      &:not(:hover) {
        filter: invert(56%) sepia(10%) saturate(33%) hue-rotate(10deg)
          brightness(99%) contrast(85%);
      }
      &:hover {
        color: ${colors.black};
      }
    }
    &.btn-bookmark {
      grid-column: 4;
      grid-row: 1/3;
      margin: -2rem -2rem 2rem 2rem;
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
      <Avatar size="large" src={senderAvt} />
      <h3 className="sender-name">{senderName}</h3>
      <h3 className="card-title">{cardTitle}</h3>
      <p className="card-content limit-text-line">{cardContent}</p>
      <p className="card-timestamp">{time}</p>
      <Button
        className="btn-change-state"
        text="Mark as unread"
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
