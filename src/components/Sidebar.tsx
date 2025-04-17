// src/components/Sidebar.tsx
import React from "react";

// Assume you'd use React Router or similar for navigation
// We'll just use a simple active prop for now
type ActivePageType = "Dashboard" | "Products" | "Reviews";
interface SidebarProps {
  activePage: "Dashboard" | "Products" | "Reviews"; // Add other pages as needed
  handelLogOut: () => void;
  onNavigate: (page: ActivePageType) => void; // Function to handle navigation
}


const Sidebar: React.FC<SidebarProps> = ({ activePage, handelLogOut ,  onNavigate }) => {
  const navItems = ["Dashboard", "Products", "Reviews"];

  const getNavItemClasses = (item: string) => {
    const baseClasses =
      "block w-full text-left px-4 py-3 rounded-lg transition duration-150 ease-in-out";
    if (item === activePage) {
      return `${baseClasses} bg-white text-green-700 font-semibold shadow-inner`;
    }
    return `${baseClasses} text-white hover:bg-green-700 hover:text-white`;
  };

  return (
    <div className="w-64 bg-green-600 text-white h-screen p-5 flex flex-col fixed top-0 left-0 shadow-lg">
      {" "}
      {/* Fixed sidebar */}
      {/* Logo */}
      <div className="mb-10 text-center">
        {/* if i   want to display "../../public/quickcart.svg" how?  */}
        <img
          src="../../public/Quick.png"
          alt="Logo"
          className="w-[170px] h-[150px] mx-auto mb-2    "
        />
      </div>
      {/* Navigation */}
      <nav className="flex-grow">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item}>
              {/* In a real app, use <Link> from react-router-dom */}

              <button  
                onClick={() => onNavigate(item)} // Call the navigation Function
                className={getNavItemClasses(item)}>{item}</button>
            </li>
          ))}
          <li>
            <button
              onClick={handelLogOut}
              className={getNavItemClasses("hello")}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
      {/* Optional Footer or User Info in Sidebar */}
      {/* <div>Footer</div> */}
    </div>
  );
};

export default Sidebar;
