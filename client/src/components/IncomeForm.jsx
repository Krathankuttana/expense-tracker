import { useEffect, useState } from "react";

const SOURCES = ["Salary", "Freelancing", "Investments", "Others"];

const emptyForm = {
  source: "Salary",
  amount: "",
  note: "",
  date: new Date().toISOString().slice(0, 10),
};

const IncomeForm = ({ initialData, onSubmit, onClose }) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        source: initialData.source,
        amount: initialData.amount,
        note: initialData.note || "",
        date: initialData.date?.slice(0, 10) || emptyForm.date,
      });
    }
  }, [initialData]);

  const validate = () => {
    const next = {};
    if (!form.amount || Number(form.amount) <= 0) next.amount = "Enter a valid amount";
    if (!form.date) next.date = "Date is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit({ ...form, amount: Number(form.amount) });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Income" : "Add Income"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Source</label>
              <select
                className="input-field"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
              >
                {SOURCES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Amount</label>
              <input
                type="number"
                step="0.01"
                className="input-field"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="0.00"
              />
              {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
            </div>
          </div>

          <div>
            <label className="label">Date</label>
            <input
              type="date"
              className="input-field"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="label">Note (optional)</label>
            <textarea
              className="input-field"
              rows={2}
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              placeholder="Add a note..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="btn-primary">
              {submitting ? "Saving..." : initialData ? "Update" : "Add Income"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncomeForm;
