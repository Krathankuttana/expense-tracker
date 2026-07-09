import { useState } from "react";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

// Notification preferences are stored client-side (localStorage) for this
// demo project since there's no push/email delivery service configured.
const Settings = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(() => {
    const stored = localStorage.getItem("notificationPrefs");
    return stored ? JSON.parse(stored) : { budgetAlerts: true, weeklySummary: true, monthlyReport: false };
  });

  const updateNotifications = (key) => {
    const next = { ...notifications, [key]: !notifications[key] };
    setNotifications(next);
    localStorage.setItem("notificationPrefs", JSON.stringify(next));
    toast.success("Preference updated");
  };

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="card">
        <h3 className="font-semibold mb-4">Appearance</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Dark Mode</p>
            <p className="text-sm text-gray-500">Switch between light and dark theme</p>
          </div>
          <button
            onClick={toggleTheme}
            className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? "bg-primary-600" : "bg-gray-300"}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${darkMode ? "translate-x-6" : "translate-x-0.5"}`} />
          </button>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {[
            { key: "budgetAlerts", label: "Budget Alerts", desc: "Get notified when you're close to overspending" },
            { key: "weeklySummary", label: "Weekly Summary", desc: "A weekly recap of your income and expenses" },
            { key: "monthlyReport", label: "Monthly Report", desc: "Detailed monthly report via email" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{label}</p>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
              <button
                onClick={() => updateNotifications(key)}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications[key] ? "bg-primary-600" : "bg-gray-300"}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${notifications[key] ? "translate-x-6" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
