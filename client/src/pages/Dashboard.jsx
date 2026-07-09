import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdAccountBalanceWallet, MdArrowUpward, MdArrowDownward, MdAdd } from "react-icons/md";
import toast from "react-hot-toast";
import reportService from "../services/reportService";
import StatCard from "../components/StatCard";
import Loader from "../components/Loader";
import MonthlyBarChart from "../components/charts/MonthlyBarChart";
import CategoryPieChart from "../components/charts/CategoryPieChart";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [summaryRes, monthlyRes, categoryRes] = await Promise.all([
          reportService.getSummary(),
          reportService.getMonthly(new Date().getFullYear()),
          reportService.getByCategory(),
        ]);
        setSummary(summaryRes.data);
        setMonthly(monthlyRes.data);
        setByCategory(categoryRes.data);
      } catch (err) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader size="lg" />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500">Here's your financial overview</p>
        </div>
        <div className="flex gap-2">
          <Link to="/expenses" className="btn-primary flex items-center gap-1">
            <MdAdd /> Add Expense
          </Link>
          <Link to="/income" className="btn-secondary flex items-center gap-1">
            <MdAdd /> Add Income
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard title="Total Balance" value={summary?.balance} icon={MdAccountBalanceWallet} color="primary" />
        <StatCard title="Total Income" value={summary?.totalIncome} icon={MdArrowUpward} color="green" />
        <StatCard title="Total Expenses" value={summary?.totalExpenses} icon={MdArrowDownward} color="red" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="card lg:col-span-2">
          <h3 className="font-semibold mb-4">Income vs Expenses ({new Date().getFullYear()})</h3>
          <MonthlyBarChart data={monthly} />
        </div>
        <div className="card">
          <h3 className="font-semibold mb-4">Spending by Category</h3>
          <CategoryPieChart data={byCategory} />
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-4">Recent Transactions</h3>
        {summary?.recentTransactions?.length ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {summary.recentTransactions.map((t) => (
              <div key={t._id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">{t.title || t.source}</p>
                  <p className="text-xs text-gray-500">{new Date(t.date).toLocaleDateString()}</p>
                </div>
                <span className={`font-semibold ${t.type === "income" ? "text-green-600" : "text-red-500"}`}>
                  {t.type === "income" ? "+" : "-"}₹{Number(t.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-6">No transactions yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
