// import Footer from "@/Components/Footer";
import Navbar from "@/Components/Header/Navbar";
import React from "react";

export default function Layouts({ children }) {
    return (
        <>
            <Navbar />
            <div className="w-full h-full mt-[1rem]">{children}</div>
            {/* <Footer /> */}
        </>
    );
}
