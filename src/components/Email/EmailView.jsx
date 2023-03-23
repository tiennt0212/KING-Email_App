import React from "react";
import styled from "styled-components";
import Avatar from "components/Avatar";
import { Button } from "components/origin";
import UserInfo from "components/UserInfo";
import colors from "styles/colors";
import icBookmark from "assets/images/ic-bookmark.svg";
import icBookmarkFilled from "assets/images/ic-bookmark-filled.svg";
import { InkBallLoading } from "components/Loading";

const { lightGray } = colors;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const TopUtilityStyled = styled.div`
  height: 9rem;
  min-height: 6rem;
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
  flex-grow: 1;
  border-bottom: solid 0.2rem ${lightGray};
  padding: 4rem 3.2rem;
  font-size: 1.6rem;
  line-height: 2.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  /* overflow: ; */
  .card-content {
    margin-top: 2rem;
    background-color: ${lightGray};
    padding: 2.4rem;
    border-radius: 0.8rem;
    flex-grow: 1;
  }
  .email-header {
    display: flex;
    justify-content: space-between;
    > img {
      height: 8rem;
      width: 8rem;
      object-fit: contain;
      margin-left: 2rem;
    }
  }
  .btn-bookmark {
    &:not(:hover) {
      filter: invert(57%) sepia(5%) saturate(146%) hue-rotate(315deg)
        brightness(98%) contrast(79%);
    }
  }
`;

const NoSelectedStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* height: 100%; */
  > div {
    max-width: 40rem;
  }
`;
const BottomUtilityStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 9rem;
  min-height: 6rem;
  padding: 0 3.2rem;
`;

const EmailView = ({
  title,
  content,
  time,
  image,
  hasBookmark,
  className,
  senderInfo,
  receiverInfo,
  ...props
}) => {
  return (
    <Wrapper>
      <TopUtilityStyled>
        <div className="left-side">
          <Button
            text="Previous"
            type="transparent"
            onClick={() =>
              alert(
                "Thanks for your using. Please use it later! It will be implemented in the next time"
              )
            }
          />
        </div>
        <div className="right-side">
          <Button
            text="Next"
            type="transparent"
            onClick={() =>
              alert(
                "Thanks for your using. Please use it later! It will be implemented in the next time"
              )
            }
          />
        </div>
      </TopUtilityStyled>
      <EmailViewStyled>
        {title && content ? (
          <>
            <div className="email-header">
              <UserInfo {...(senderInfo || receiverInfo)} avtSize="large" />
              <img src={image} alt="stamp" />
            </div>

            <h2 className="card-title">{title}</h2>
            <p className="card-content">{content}</p>
          </>
        ) : (
          <NoSelectedStyled>
            <InkBallLoading />
            <h2>No Email was selected yet</h2>
          </NoSelectedStyled>
        )}
      </EmailViewStyled>
      <BottomUtilityStyled>
        <div className="left-side">
          <Button
            text="Archived"
            type="transparent"
            onClick={() =>
              alert(
                "Thanks for your using. Please use it later! It will be implemented in the next time"
              )
            }
          />
        </div>
        <div className="right-side">
          <Button
            text="Reply"
            type="primary"
            onClick={() =>
              alert(
                "Thanks for your using. Please use it later! It will be implemented in the next time"
              )
            }
          />
        </div>
      </BottomUtilityStyled>
    </Wrapper>
  );
};

EmailView.propTypes = {};

EmailView.defaultProps = {};

export default EmailView;
