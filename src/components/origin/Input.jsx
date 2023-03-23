import React from "react";

export const Text = (props) => {
  return <input type="text" {...props} />;
};

export const TextArea = (props) => {
  return <textarea type="text" {...props} />;
};

export const Number = () => {
  return <input type="number" />;
};
