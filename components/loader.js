"use client";
import React from "react";

const Loader = () => {
  return (
    <div className="wrapper fixed inset-0 z-10 bg-white flex items-center justify-center">
      <img
        src="/NutriCare Inverted Color.png"
        alt="Logo"
        className="w-40 h-40 lg:w-[30%] lg:h-[40vh] animate-pulse"
      />
    </div>
  );
};

export default Loader;