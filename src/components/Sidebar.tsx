import React from "react";

type ActivePageType = "Dashboard" | "Products" | "Reviews" | "HotTrendes"; // Add other pages as needed
interface SidebarProps {
  activePage: "Dashboard" | "Products" | "Reviews" | "HotTrendes"; // Add other pages as needed
  handelLogOut: () => void;
  onNavigate: (page: ActivePageType) => void; // Function to handle navigation
}

const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  handelLogOut,
  onNavigate,
}) => {
  const navItems = ["Dashboard", "Products", "Reviews", "HotTrends"]; // Add other pages as needed
  const [showLogout, setShowLogout] = React.useState(false);

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
                className={getNavItemClasses(item)}
              >
                {item}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => setShowLogout(true)} // Show logout confirmation
              className={getNavItemClasses("hello")}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
      {/* Logout Confirmation Popup */}
      {showLogout && (
        <PopUpLogout
          setShowLogout={setShowLogout}
          handelLogOut={handelLogOut}
        />
      )}
    </div>
  );
};

export default Sidebar;

export function PopUpLogout({
  setShowLogout,
  handelLogOut,
}: {
  setShowLogout: (show: boolean) => void;
  handelLogOut: () => void;
}) {
  const handleLogout = () => {
    handelLogOut();
    console.log("Logging out...");
    setShowLogout(false);
  };

  return (
    <div
      onClick={() => setShowLogout(false)}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
        className="relative z-50 w-full max-w-md rounded-lg bg-white p-6 text-gray-800 shadow-2xl animate-fade-in"
      >
        <h2 className="mb-4 text-xl font-semibold text-center">
          Confirm Logout
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Are you sure you want to log out?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Yes, log me out
          </button>
          <button
            onClick={() => setShowLogout(false)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
