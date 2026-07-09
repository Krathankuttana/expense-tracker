// Reusable dashboard stat widget (Total Balance / Income / Expenses)
const StatCard = ({ title, value, icon: Icon, color = "primary", trend }) => {
  const colorMap = {
    primary: "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300",
    green: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-300",
    red: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300",
  };

  return (
    <div className="card flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold mt-1">
          ₹{Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </p>
        {trend && <p className="text-xs text-gray-400 mt-1">{trend}</p>}
      </div>
      {Icon && (
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          <Icon size={24} />
        </div>
      )}
    </div>
  );
};

export default StatCard;
