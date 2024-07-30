import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  // const navicons = [
  //   {
  //     src: <IoSearch />,
  //   },
  //   {
  //     src: <FaRegHeart />,
  //   },
  //   {
  //     src: <CgProfile />,
  //   },
  // ];
  return (
    <header className="w-full sticky top-0 z-10 bg-gray-100 shadow-md">
      <nav className="nav">
        <Link to="/" className="flex items-center gap-1">
          <img src={logo} width={30} height={30} alt="logo" />
          <p className="nav-logo">
            Deal<span className=" text-primary">Spy</span>
          </p>
        </Link>
        <Link to='/about' className=" cursor-pointer">
         About Us
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
