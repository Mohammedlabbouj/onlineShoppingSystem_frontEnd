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

function Toggleswitch() {
  const [theme, setTheme] = React.useState("dark");

  return (
    <div className="flex items-center p-[2px] border border-solid border-zinc-500 rounded-full w-max">
      <button
        className="inline-flex items-center justify-center ring-offset-zinc-400 transition-colors text-zinc-500 hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:text-black w-[var(--sz)] h-[var(--sz)] min-w-[var(--sz)] min-h-[var(--sz)] max-w-[var(--sz)] max-h-[var(--sz)] [--sz:28px] p-0.5 rounded-full hover:bg-transparent data-[state=active]:bg-zinc-600/30 data-[state=active]:text-black"
        aria-label="light"
        onClick={() => {
          setTheme("light");
        }}
        data-state={theme === "light" ? "active" : ""}
        role="button"
        type="button"
      >
        <svg
          data-initial="icon-theme-sync"
          width="14px"
          height="14px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
        >
          <path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z"></path>
          <g data-g="high">
            <path d="M4 12h-3"></path>
            <path d="M12 4v-3"></path>
            <path d="M20 12h3"></path>
            <path d="M12 20v3"></path>
          </g>
          <g data-g="low">
            <path d="M6.343 17.657l-1.414 1.414"></path>
            <path d="M6.343 6.343l-1.414 -1.414"></path>
            <path d="M17.657 6.343l1.414 -1.414"></path>
            <path d="M17.657 17.657l1.414 1.414"></path>
          </g>
        </svg>
      </button>

      <button
        className="inline-flex items-center justify-center ring-offset-zinc-400 transition-colors text-zinc-500 hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:text-black w-[var(--sz)] h-[var(--sz)] min-w-[var(--sz)] min-h-[var(--sz)] max-w-[var(--sz)] max-h-[var(--sz)] [--sz:28px] p-0.5 rounded-full hover:bg-transparent data-[state=active]:bg-zinc-600/30 data-[state=active]:text-black"
        aria-label="system"
        onClick={() => setTheme("system")}
        data-state={theme === "system" ? "active" : ""}
        role="button"
        type="button"
      >
        <svg
          data-initial="icon-theme-sync"
          width="14px"
          height="14px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
        >
          <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"></path>
          <path d="M10 19v-3.96 3.15"></path>
          <path d="M7 19h5"></path>
          <rect rx="2" y="12" x="16" height="10" width="6"></rect>
        </svg>
      </button>

      <button
        className="inline-flex items-center justify-center ring-offset-zinc-400 transition-colors text-zinc-500 hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:text-black w-[var(--sz)] h-[var(--sz)] min-w-[var(--sz)] min-h-[var(--sz)] max-w-[var(--sz)] max-h-[var(--sz)] [--sz:28px] p-0.5 rounded-full hover:bg-transparent data-[state=active]:bg-zinc-600/30 data-[state=active]:text-black"
        aria-label="dark"
        onClick={() => setTheme("dark")}
        data-state={theme === "dark" ? "active" : ""}
        role="button"
        type="button"
      >
        <svg
          data-initial="icon-theme-sync"
          width="14px"
          height="14px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="0"
          stroke="currentColor"
          fill="none"
        >
          <path
            d="m4.8.69c0-.38-.31-.69-.69-.69s-.69.31-.69.69v1.03h-1.03c-.38,0-.69.31-.69.69s.31.69.69.69h1.03v1.03c0,.38.31.69.69.69s.69-.31.69-.69v-1.03h1.03c.38,0,.69-.31.69-.69s-.31-.69-.69-.69h-1.03V.69Zm5.14,5.14c0-.38-.31-.69-.69-.69s-.69.31-.69.69v1.03h-1.03c-.38,0-.69.31-.69.69s.31.69.69.69h1.03v1.03c0,.38.31.69.69.69s.69-.31.69-.69v-1.03h1.03c.38,0,.69-.31.69-.69s-.31-.69-.69-.69h-1.03v-1.03Zm-6.86,5.14c0-.38-.31-.69-.69-.69s-.69.31-.69.69v1.03H.69c-.38,0-.69.31-.69.69s.31.69.69.69h1.03v1.03c0,.38.31.69.69.69s.69-.31.69-.69v-1.03h1.03c.38,0,.69-.31.69-.69s-.31-.69-.69-.69h-1.03v-1.03ZM14.47,1.51l-.51-.07c-.37-.04-.58.38-.37.69.24.35.46.71.67,1.08.86,1.59,1.35,3.42,1.35,5.36,0,5.61-4.08,10.26-9.43,11.16-.41.07-.84.12-1.27.14-.37.02-.57.45-.31.71.12.12.24.24.36.35l.12.11.45.39.32.25.21.15.32.22.3.2c.21.13.42.25.64.37l.45.23.45.2.52.21.42.15c.23.08.46.14.7.21.18.05.36.09.54.13.22.04.43.08.65.12l.54.07.46.04c.22.01.44.02.66.02,6.25,0,11.31-5.07,11.31-11.31,0-.43-.02-.85-.07-1.27l-.06-.48c-.06-.38-.14-.76-.23-1.13-.12-.44-.26-.88-.43-1.3l-.19-.46-.13-.28-.13-.26c-.27-.53-.58-1.03-.93-1.51l-.26-.34-.34-.41-.28-.31-.2-.21-.28-.27-.38-.34-.55-.45-.42-.3-.5-.33-.55-.32-.56-.28-.19-.09-.41-.17-.47-.18-.43-.14-.56-.15-.45-.1-.5-.09Zm3.19,7.4c0-1.76-.35-3.43-.98-4.96,3.31,1.52,5.61,4.86,5.61,8.73,0,5.3-4.3,9.6-9.6,9.6-1.49,0-2.89-.34-4.15-.94,2.5-.79,4.67-2.3,6.27-4.3.23.32.61.53,1.04.53.71,0,1.29-.58,1.29-1.29,0-.61-.43-1.12-1-1.25.11-.2.21-.4.3-.61.33.2.71.32,1.13.32,1.18,0,2.14-.96,2.14-2.14s-.96-2.14-2.14-2.14c.06-.51.09-1.02.09-1.54Z"
            fill="currentColor"
            clip-rule="evenodd"
            fill-rule="evenodd"
          ></path>
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
      py-2 block px-4  text-sm text-gray-700 hover:bg-gray-100 transition-colors">
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
        <div className="flex h-16 w-[100%] space-x-4 items-center justify-between border-b ">
          <div className="flex space-x-4 items-center p-4">
            <div onClick={handleDropdown} className=" text-white">
              <Link to={"/"}>
                <AiFillBank size={50} />
              </Link>
            </div>
            <div
              onClick={handleDropdown}
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
        <span className="hidden md:inline-block">
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
