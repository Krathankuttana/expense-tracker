import { MdMenu, MdDarkMode, MdLightMode, MdLogout } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-20">
      <button onClick={onMenuClick} className="md:hidden text-gray-600 dark:text-gray-300">
        <MdMenu size={26} />
      </button>

      <div className="hidden md:block" />

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          title="Toggle dark mode"
        >
          {darkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
        </button>

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold uppercase">
            {user?.name?.charAt(0) || "U"}
          </div>
          <span className="hidden sm:block text-sm font-medium">{user?.name}</span>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          title="Logout"
        >
          <MdLogout size={20} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
