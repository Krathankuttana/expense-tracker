import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdAdd, MdSearch } from "react-icons/md";
import incomeService from "../services/incomeService";
import IncomeForm from "../components/IncomeForm";
import IncomeTable from "../components/IncomeTable";
import Loader from "../components/Loader";

const SOURCES = ["All", "Salary", "Freelancing", "Investments", "Others"];

const Income = () => {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("All");

  const fetchIncome = async () => {
    setLoading(true);
    try {
      const res = await incomeService.getAll({ search, source });
      setIncome(res.data);
    } catch (err) {
      toast.error("Failed to load income");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(fetchIncome, 300);
    return () => clearTimeout(debounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, source]);

  const handleCreateOrUpdate = async (payload) => {
    try {
      if (editingIncome) {
        await incomeService.update(editingIncome._id, payload);
        toast.success("Income updated");
      } else {
        await incomeService.create(payload);
        toast.success("Income added");
      }
      setShowForm(false);
      setEditingIncome(null);
      fetchIncome();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this income entry?")) return;
    try {
      await incomeService.remove(id);
      toast.success("Income deleted");
      fetchIncome();
    } catch (err) {
      toast.error("Failed to delete income entry");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-bold">Income</h1>
        <button
          onClick={() => { setEditingIncome(null); setShowForm(true); }}
          className="btn-primary flex items-center gap-1 w-fit"
        >
          <MdAdd /> Add Income
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="input-field pl-9"
            placeholder="Search by note..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="input-field sm:w-48" value={source} onChange={(e) => setSource(e.target.value)}>
          {SOURCES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <IncomeTable
          income={income}
          onEdit={(inc) => { setEditingIncome(inc); setShowForm(true); }}
          onDelete={handleDelete}
        />
      )}

      {showForm && (
        <IncomeForm
          initialData={editingIncome}
          onSubmit={handleCreateOrUpdate}
          onClose={() => { setShowForm(false); setEditingIncome(null); }}
        />
      )}
    </div>
  );
};

export default Income;
