import React from "react";
import { Link } from "react-router-dom";
import { AiFillBank } from "react-icons/ai";

function sreach() { 
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



interface DropdownProps {
  onClick: () => void;
  handelLogout: () => void;
}
function Dropdown({ onClick, handelLogout }: DropdownProps) {
  const email = localStorage.getItem("email");

  return (
    <div className="fixed right-4 top-17 z-50 bg-white rounded-lg shadow-lg w-44 divide-y divide-gray-100 animate-slideDown">
      <div className="px-4 py-3 text-sm text-black">
        <div className="truncate text-gray-500">{email}</div>
      </div>
      <ul className="py-2 text-sm text-gray-700">
        
        <li>
          <Link
            to="/AddProduct"
            className="block px-4 py-2 hover:bg-gray-100 transition-colors"
            onClick={onClick}
          >
            AddProduct
          </Link>
        </li>
        <li>
          <Link
            to="/cart"
            className="block px-4 py-2 hover:bg-gray-100 transition-colors"
            onClick={onClick}
          >
            Cart
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className="block px-4 py-2 hover:bg-gray-100 transition-colors"
          >
            Settings
          </Link>
        </li>
      </ul>
      <div
        onClick={handelLogout}
        className="
      hover:cursor-pointer
      py-2 block px-4  text-sm text-gray-700 hover:bg-gray-100 transition-colors"
      >
        Sign out
      </div>
    </div>
  );
}

interface NavBarProps {
  handleLogout: () => void;
}
export default function NavBar({ handleLogout }: NavBarProps) {
  const username = localStorage.getItem("username");
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  function handleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black">
        <div
          // onClick={() => setIsDropdownOpen(false)}
          className="flex h-16 w-[100%] space-x-4 items-center justify-between border-b "
        >
          <div className="flex space-x-4 items-center p-4">
            <div onClick={()=> setIsDropdownOpen(false)} className=" text-white">
              <Link to={"/"}>
                <AiFillBank size={50} />
              </Link>
            </div>
            <div
              onClick={() => {
                setIsDropdownOpen(false);
              }}
              className=" text-white hover:text-gray-300 transition-colors"
            >
              <Link to={"/"}>Home</Link>
            </div>
          </div>
          <div className="flex space-x-7 items-center p-5 ">
            <div>{sreach()}</div>
            <div>
              <UserInfo
                username={username || ""}
                onClick={handleDropdown}
              />
            </div>
          </div>
        </div>
      </header>

      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 animate-fadeIn"
            onClick={handleDropdown}
          />
          <Dropdown onClick={handleDropdown} handelLogout={handleLogout} />
        </>
      )}
    </>
  );
}

interface prop {
  username: string;
  onClick: () => void;
}
export function UserInfo({ username, onClick }: prop) {
  return (
    <>
      <button
        id="dropdownAvatarNameButton"
        data-dropdown-toggle="dropdownAvatarName"
        className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
        type="button"
        onClick={onClick}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 me-2 rounded-full"
          src="../../public/user.svg"
          alt="user photo"
        />
        <span className=" text-white md:inline-block">
          {username}
        </span>
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
    </>
  );
}
