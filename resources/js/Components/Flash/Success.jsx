import React, { useState } from "react";

const Success = (props) => {
    const { message } = props;
    const [isVisible, setVisible] = useState(true);
    return (
        <>
            <div
                className={`bg-green-500 fixed shadow-lg py-4 px-4 rounded-lg text-white top-0 border w-[500px] left-1/2 -translate-x-1/2 z-50 transition-all ${
                    isVisible ? "translate-y-[75px]" : "-translate-y-full"
                }`}
            >
                <div className="flex justify-between">
                    <p>{message}</p>
                    <button onClick={() => setVisible(false)}>CLOSE</button>
                </div>
            </div>
        </>
    );
};

export default Success;
