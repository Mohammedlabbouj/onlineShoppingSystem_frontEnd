import React from "react";
import { Link } from "react-router-dom";
import { AiFillBank } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext"; // Update this line

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

function Toggleswitch() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center p-[2px] border border-solid border-zinc-500 rounded-full w-[120px] justify-between">
      <button
        className={`inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1 w-[32px] h-[32px] rounded-full ${
          theme === "light" ? "bg-black text-white" : "hover:text-black"
        }`}
        aria-label="light"
        onClick={() => setTheme("light")}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
        </svg>
      </button>

      <button
        className={`inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1 w-[32px] h-[32px] rounded-full ${
          theme === "github" ? "bg-[#0d1117] text-white" : "hover:text-black"
        }`}
        aria-label="github"
        onClick={() => setTheme("github")}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.42 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      </button>

      <button
        className={`inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1 w-[32px] h-[32px] rounded-full ${
          theme === "dark" ? "bg-[#0d1117] text-white" : "hover:text-black"
        }`}
        aria-label="dark"
        onClick={() => setTheme("dark")}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z" />
        </svg>
      </button>
    </div>
  );
}

interface DropdownProps {
  onClick: () => void;
  handelLogout: () => void;
}
function Dropdown({ onClick, handelLogout }: DropdownProps) {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");

  return (
    <div className="fixed right-4 top-17 z-50 bg-white rounded-lg shadow-lg w-44 divide-y divide-gray-100 animate-slideDown">
      <div className="flex items-center justify-center px-4 py-3">
        <Toggleswitch />
      </div>
      <div className="px-4 py-3 text-sm text-black">
        <div className="font-medium">{`${firstName} ${lastName}`}</div>
        <div className="truncate text-gray-500">{email}</div>
      </div>
      <ul className="py-2 text-sm text-gray-700">
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
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
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
            <div onClick={handleDropdown} className=" text-white">
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
                firstName={firstName || ""}
                lastName={lastName || ""}
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
  firstName: string;
  lastName: string;
  onClick: () => void;
}
export function UserInfo({ firstName, lastName, onClick }: prop) {
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
          {firstName} {lastName}
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
