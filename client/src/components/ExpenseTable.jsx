import { MdEdit, MdDelete } from "react-icons/md";

const categoryColors = {
  Food: "bg-orange-100 text-orange-700",
  Travel: "bg-blue-100 text-blue-700",
  Shopping: "bg-pink-100 text-pink-700",
  Bills: "bg-yellow-100 text-yellow-700",
  Education: "bg-purple-100 text-purple-700",
  Health: "bg-green-100 text-green-700",
  Entertainment: "bg-red-100 text-red-700",
  Others: "bg-gray-100 text-gray-700",
};

const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
  if (!expenses.length) {
    return (
      <div className="card text-center text-gray-500 py-10">
        No expenses found. Try adjusting your filters or add a new expense.
      </div>
    );
  }

  return (
    <div className="card overflow-x-auto p-0">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4 text-right">Amount</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
              <td className="py-3 px-4">
                <div className="font-medium">{exp.title}</div>
                {exp.note && <div className="text-xs text-gray-400">{exp.note}</div>}
              </td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[exp.category] || categoryColors.Others}`}>
                  {exp.category}
                </span>
              </td>
              <td className="py-3 px-4 text-gray-500">
                {new Date(exp.date).toLocaleDateString()}
              </td>
              <td className="py-3 px-4 text-right font-semibold text-red-500">
                -₹{Number(exp.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </td>
              <td className="py-3 px-4">
                <div className="flex justify-end gap-2">
                  <button onClick={() => onEdit(exp)} className="text-gray-500 hover:text-primary-600">
                    <MdEdit size={18} />
                  </button>
                  <button onClick={() => onDelete(exp._id)} className="text-gray-500 hover:text-red-500">
                    <MdDelete size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
