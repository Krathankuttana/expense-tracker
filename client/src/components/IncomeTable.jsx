import { MdEdit, MdDelete } from "react-icons/md";

const sourceColors = {
  Salary: "bg-green-100 text-green-700",
  Freelancing: "bg-blue-100 text-blue-700",
  Investments: "bg-purple-100 text-purple-700",
  Others: "bg-gray-100 text-gray-700",
};

const IncomeTable = ({ income, onEdit, onDelete }) => {
  if (!income.length) {
    return (
      <div className="card text-center text-gray-500 py-10">
        No income entries found. Add your first income source.
      </div>
    );
  }

  return (
    <div className="card overflow-x-auto p-0">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
            <th className="py-3 px-4">Source</th>
            <th className="py-3 px-4">Note</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4 text-right">Amount</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {income.map((inc) => (
            <tr key={inc._id} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${sourceColors[inc.source] || sourceColors.Others}`}>
                  {inc.source}
                </span>
              </td>
              <td className="py-3 px-4 text-gray-500">{inc.note || "—"}</td>
              <td className="py-3 px-4 text-gray-500">
                {new Date(inc.date).toLocaleDateString()}
              </td>
              <td className="py-3 px-4 text-right font-semibold text-green-600">
                +₹{Number(inc.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </td>
              <td className="py-3 px-4">
                <div className="flex justify-end gap-2">
                  <button onClick={() => onEdit(inc)} className="text-gray-500 hover:text-primary-600">
                    <MdEdit size={18} />
                  </button>
                  <button onClick={() => onDelete(inc._id)} className="text-gray-500 hover:text-red-500">
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

export default IncomeTable;
