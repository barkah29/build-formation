import React from "react";

const Button = (props) => {
  const { className, children, onClick, type } = props;
  return (
    <button
      className={`${
        className || ""
      } py-3 px-3 text-sm rounded-lg text-white font-bold capitalize hover:bg-gray-800 active:bg-gray-700`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
