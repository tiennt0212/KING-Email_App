import React, { memo } from "react";
import styled from "styled-components";
import Avatar from "components/Avatar";
const WrapperStyled = styled.div`
  display: flex;
  align-items: center;
  .left-side {
    .user-avatar {
      box-shadow: rgba(${(props) => props.theme.shadow}, 0.3) 0px 4px 8px;
      margin-right: 1.2rem;
    }
  }
  .right-side {
    flex: column no-wrap;
    p {
      color: inherit;
      &.user-name {
        font-size: 1.6rem;
        font-weight: bold;
      }
      &.user-address {
        font-size: 1.2rem;
      }
    }
  }
`;

const UserInfo = memo(({ address, name, avatar, id, avtSize, ...rest }) => {
  console.count("render UserInfo");
  return (
    <WrapperStyled {...rest}>
      <div className="left-side">
        <Avatar src={avatar} className="user-avatar" size={avtSize} />
      </div>
      <div className="right-side">
        <p className="user-name">{name}</p>
        <p className="user-address">
          {`${address?.substr(0, 4)}...${address?.substr(-4, address.length)}`}
        </p>
      </div>
    </WrapperStyled>
  );
});

export default UserInfo;
