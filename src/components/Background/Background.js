import React from "react";

export const Background = (props) => {
  return (
    <div
      className={`background-type ${props.background} ${
        props.background + "-image"
      }`}
    ></div>
  );
};
