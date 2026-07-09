import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const MonthlyBarChart = ({ data }) => {
  const chartData = {
    labels: MONTH_LABELS,
    datasets: [
      {
        label: "Income",
        data: data.map((d) => d.income),
        backgroundColor: "#22c55e",
        borderRadius: 4,
      },
      {
        label: "Expenses",
        data: data.map((d) => d.expenses),
        backgroundColor: "#ef4444",
        borderRadius: 4,
      },
    ],
  };

  return (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        plugins: { legend: { position: "bottom" } },
        scales: { y: { beginAtZero: true } },
      }}
    />
  );
};

export default MonthlyBarChart;
