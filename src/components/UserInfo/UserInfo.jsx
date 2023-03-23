import React from "react";
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
  }
`;

const UserInfo = (props) => {
  console.log(props);
  const { address, name, avatar, id } = props;
  return (
    <WrapperStyled>
      <div className="left-side">
        <Avatar src={avatar} className="user-avatar" size="large" />
      </div>
      <div className="right-side">
        <p>{name}</p>
        <p>
          {`${address?.substr(0, 4)}...${address?.substr(-4, address.length)}`}
        </p>
      </div>
    </WrapperStyled>
  );
};

export default UserInfo;
