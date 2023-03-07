import React from "react";

const Label = (props) => {
  const { children, className } = props;
  return (
    <label htmlFor="" className={`font-semibold ${className}`}>
      {children}
    </label>
  );
};

export default Label;
