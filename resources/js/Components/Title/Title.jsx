import React from "react";

const Title = (props) => {
    const { children, fontSize } = props;
    return (
        <>
            <h2
                className={`${
                    fontSize || "text-xl md:text-[2rem]"
                } capitalize font-slate-800 font-semibold`}
            >
                {children}
            </h2>
        </>
    );
};

export default Title;
