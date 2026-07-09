import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdAdd, MdSearch } from "react-icons/md";
import expenseService from "../services/expenseService";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import Loader from "../components/Loader";

const CATEGORIES = ["All", "Food", "Travel", "Shopping", "Bills", "Education", "Health", "Entertainment", "Others"];

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await expenseService.getAll({ search, category });
      setExpenses(res.data);
    } catch (err) {
      toast.error("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(fetchExpenses, 300);
    return () => clearTimeout(debounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category]);

  const handleCreateOrUpdate = async (payload) => {
    try {
      if (editingExpense) {
        await expenseService.update(editingExpense._id, payload);
        toast.success("Expense updated");
      } else {
        await expenseService.create(payload);
        toast.success("Expense added");
      }
      setShowForm(false);
      setEditingExpense(null);
      fetchExpenses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    try {
      await expenseService.remove(id);
      toast.success("Expense deleted");
      fetchExpenses();
    } catch (err) {
      toast.error("Failed to delete expense");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <button
          onClick={() => { setEditingExpense(null); setShowForm(true); }}
          className="btn-primary flex items-center gap-1 w-fit"
        >
          <MdAdd /> Add Expense
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="input-field pl-9"
            placeholder="Search by title or note..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="input-field sm:w-48" value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <ExpenseTable
          expenses={expenses}
          onEdit={(exp) => { setEditingExpense(exp); setShowForm(true); }}
          onDelete={handleDelete}
        />
      )}

      {showForm && (
        <ExpenseForm
          initialData={editingExpense}
          onSubmit={handleCreateOrUpdate}
          onClose={() => { setShowForm(false); setEditingExpense(null); }}
        />
      )}
    </div>
  );
};

export default Expenses;
