import React from "react";

const ColGroup = (props) => {
  const { children } = props;
  return <div className="flex flex-col gap-2 mb-5">{children}</div>;
};

export default ColGroup;
