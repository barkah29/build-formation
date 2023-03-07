import { Tab } from "@headlessui/react";
import React, { Fragment } from "react";

const TabsButton = (props) => {
  const { children } = props;
  return (
    <>
      <Tab as={Fragment}>
        {({ selected }) => (
          /* Use the `selected` state to conditionally style the selected tab. */
          <button
            className={`p-2 text-black border-b-2 outline-none ${
              selected ? "border-black" : "border-transparent"
            }`}
          >
            {children}
          </button>
        )}
      </Tab>
    </>
  );
};

export default TabsButton;
