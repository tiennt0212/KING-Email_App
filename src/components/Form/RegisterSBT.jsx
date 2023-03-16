import React from "react";
import styled from "styled-components";
import { Button } from "components/origin";
import colors from "styles/colors";
const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  button[type="submit"] {
    margin-top: 1rem;
    &:hover {
      background-color: ${colors.tealGreen};
      color: white;
    }
  }
  input {
    background-color: transparent;
    color: inherit;
    border: solid 1px ${colors.tealGreen};
    border-radius: 4px;
    padding: 8px;
    &:focus {
      outline: none;
    }
    &::-webkit-search-cancel-button {
      /* Hide the close button in the input field has type = "search" */
      -webkit-appearance: none;
    }
  }
`;

const RegisterSBT = ({ submitFunc, ...props }) => {
  const getData = (form) => {
    let formData = new FormData(form);

    // iterate through entries...
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    // ...or output as an object
    console.log(Object.fromEntries(formData));
    return Object.fromEntries(formData);
  };

  const formHandlerSubmit = (event) => {
    event.preventDefault();
    const values = getData(event.target);
    submitFunc(values);
  };

  // document
  //   .getElementById("register-sbt")
  //   .addEventListener("submit", formHandlerSubmit);

  return (
    <FormStyled id="register-sbt" onSubmit={formHandlerSubmit}>
      <label></label>
      <input type="text" name="_name" />
      <Button text="Submit" htmlType="submit" />
    </FormStyled>
  );
};

export default RegisterSBT;
