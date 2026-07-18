import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function OrderStatusChart({ orders }) {
  const statusCount = {
    Pending: 0,
    Accepted: 0,
    Preparing: 0,
    Ready: 0,
    Completed: 0,
  };

  orders.forEach((order) => {
    if (statusCount.hasOwnProperty(order.status)) {
      statusCount[order.status]++;
    }
  });

  const data = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        label: "Orders",
        data: Object.values(statusCount),
        backgroundColor: [
          "#f39c12", // Pending
          "#3498db", // Accepted
          "#9b59b6", // Preparing
          "#2ecc71", // Ready
          "#e74c3c", // Completed
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
  <div
    style={{
      width: "320px",
      height: "320px",
      margin: "20px auto",
    }}
  >
    <Pie data={data} options={options} />
  </div>
);
}

export default OrderStatusChart;