import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  "#6366f1", "#f97316", "#22c55e", "#eab308",
  "#ec4899", "#06b6d4", "#ef4444", "#8b5cf6",
];

const CategoryPieChart = ({ data }) => {
  if (!data?.length) {
    return <p className="text-sm text-gray-500 text-center py-10">No expense data yet.</p>;
  }

  const chartData = {
    labels: data.map((d) => d.category),
    datasets: [
      {
        data: data.map((d) => d.total),
        backgroundColor: COLORS,
        borderWidth: 0,
      },
    ],
  };

  return (
    <Pie
      data={chartData}
      options={{
        plugins: { legend: { position: "bottom", labels: { boxWidth: 12 } } },
        maintainAspectRatio: true,
      }}
    />
  );
};

export default CategoryPieChart;
