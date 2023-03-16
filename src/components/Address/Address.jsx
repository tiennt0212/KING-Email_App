import React from "react";
import styled from "styled-components";

const AddressShortenStyled = styled.p`
  font-size: 1.6rem;
`;

const AddressShorten = ({ address, ...rest }) => {
  return (
    <AddressShortenStyled>
      {`${address.substr(0, 4)}...${address.substr(-4, address.length)}`}
    </AddressShortenStyled>
  );
};

export default AddressShorten;
