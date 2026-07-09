import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdFileDownload, MdPictureAsPdf } from "react-icons/md";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import reportService from "../services/reportService";
import expenseService from "../services/expenseService";
import Loader from "../components/Loader";
import MonthlyBarChart from "../components/charts/MonthlyBarChart";
import CategoryPieChart from "../components/charts/CategoryPieChart";
import TrendLineChart from "../components/charts/TrendLineChart";

const Reports = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthly, setMonthly] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [monthlyRes, categoryRes] = await Promise.all([
        reportService.getMonthly(year),
        reportService.getByCategory(),
      ]);
      setMonthly(monthlyRes.data);
      setByCategory(categoryRes.data);
    } catch (err) {
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  // Exports every expense (unfiltered) to a CSV file
  const exportCSV = async () => {
    try {
      const res = await expenseService.getAll({ limit: 10000 });
      const rows = res.data;

      const header = ["Title", "Category", "Amount", "Date", "Note"];
      const csvRows = [
        header.join(","),
        ...rows.map((r) =>
          [r.title, r.category, r.amount, new Date(r.date).toLocaleDateString(), (r.note || "").replace(/,/g, ";")]
            .map((val) => `"${val}"`)
            .join(",")
        ),
      ];

      const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "expenses.csv";
      link.click();
      URL.revokeObjectURL(url);
      toast.success("CSV exported");
    } catch (err) {
      toast.error("Failed to export CSV");
    }
  };

  // Exports a summary report (monthly income vs expenses) to a PDF file
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Expense Tracker Report - ${year}`, 14, 18);

    autoTable(doc, {
      startY: 25,
      head: [["Month", "Income", "Expenses", "Net"]],
      body: monthly.map((m, i) => [
        ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
        m.income.toFixed(2),
        m.expenses.toFixed(2),
        (m.income - m.expenses).toFixed(2),
      ]),
    });

    doc.save(`report-${year}.pdf`);
    toast.success("PDF exported");
  };

  if (loading) return <Loader size="lg" />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex gap-2">
          <select className="input-field w-28" value={year} onChange={(e) => setYear(Number(e.target.value))}>
            {[year - 1, year, year + 1].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <button onClick={exportCSV} className="btn-secondary flex items-center gap-1">
            <MdFileDownload /> CSV
          </button>
          <button onClick={exportPDF} className="btn-secondary flex items-center gap-1">
            <MdPictureAsPdf /> PDF
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-semibold mb-4">Monthly Income vs Expenses</h3>
          <MonthlyBarChart data={monthly} />
        </div>
        <div className="card">
          <h3 className="font-semibold mb-4">Net Balance Trend</h3>
          <TrendLineChart data={monthly} />
        </div>
      </div>

      <div className="card lg:w-1/2">
        <h3 className="font-semibold mb-4">Spending by Category</h3>
        <CategoryPieChart data={byCategory} />
      </div>
    </div>
  );
};

export default Reports;
