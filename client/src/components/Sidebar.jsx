import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdReceiptLong,
  MdAttachMoney,
  MdBarChart,
  MdPerson,
  MdSettings,
  MdClose,
} from "react-icons/md";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: MdDashboard },
  { to: "/expenses", label: "Expenses", icon: MdReceiptLong },
  { to: "/income", label: "Income", icon: MdAttachMoney },
  { to: "/reports", label: "Reports", icon: MdBarChart },
  { to: "/profile", label: "Profile", icon: MdPerson },
  { to: "/settings", label: "Settings", icon: MdSettings },
];

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-40 md:z-0 md:static top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 transform transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 dark:border-gray-700">
          <span className="text-xl font-bold text-primary-600">💰 ExpenseTracker</span>
          <button onClick={onClose} className="md:hidden text-gray-500">
            <MdClose size={22} />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
