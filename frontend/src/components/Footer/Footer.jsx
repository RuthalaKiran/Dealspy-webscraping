import React from "react";
import logo from "../../assets/logo.png"

const Footer = () => {
  return (
    <div className="bg-gray-800 flex flex-col text-center px-5 py-10 ">
      <div className="flex items-center justify-center gap-2">
        <img src={logo} className="w-10 mb-3" alt="" />
        <p className="text-2xl pb-4 flex items-center justify-center text-gray-200 font-bold">
          DeaL <span className="text-red-700">Spy</span>
        </p>
      </div>
      <hr className="py-3" />
      <p className="text-white">Made with React ❤️</p>
    </div>
  );
};

export default Footer;
