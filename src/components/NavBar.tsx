import React from "react";
import { Link } from "react-router-dom";
import { AiFillBank } from "react-icons/ai";

export function sreach() {
  const [search, setSearch] = React.useState("");
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }
  return (
    <div className="flex items-center border w-80 pr-3 gap-2 bg-white border-gray-500/30 h-[46px] rounded-[5px] overflow-hidden text-black">
      <input
        value={search}
        onInput={handleChange}
        className="w-full h-full pl-5 outline-none placeholder-gray-500 text-sm"
        placeholder="Search for products"
        type="text"
      />
      <div className="h-6 w-px bg-gray-500/50"></div>
      <svg
        fill="#6B7280"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 32.00 32.00"
        width="20px"
      >
        <svg
          fill="#6B7280"
          viewBox="0 0 30 30"
          height="22"
          width="22"
          y="0px"
          x="0px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
        </svg>
      </svg>
    </div>
  );
}

export default function NavBar() {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="flex h-16 w-[100%] space-x-4 items-center justify-between border-b ">
        <div className="flex space-x-4 items-center p-4">
          <div className=" text-white">
            <Link to={"/"}>
              <AiFillBank size={50}  />
            </Link>
          </div>
          <div className=" text-white hover:text-gray-300 transition-colors">
            <Link to={"/"}>Home</Link>
          </div>
          <div className=" text-white hover:text-gray-300 transition-colors">
            <Link to={"/cart"}>Cart</Link>
          </div>
        </div>
        <div className="flex space-x-7 items-center p-5 ">
          <div>{sreach()}</div>
          <div className="flex justify-start space-x-1 gap-1 items-center h-10 bg-white w-auto text-black rounded-[50px] p-3">
            <img
              src="../public/user.svg"
              alt=""
              className="rounded-[50px]  w-[39px] h-[39px] "
            />
            {firstName}
            {lastName}
          </div>
        </div>
      </div>
    </header>
  );
}
