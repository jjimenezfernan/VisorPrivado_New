import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function StackedBarLine() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        type: "bar", // Bar chart dataset
        label: "Bar Dataset 1",
        data: [10, 20, 30, 40, 50, 60],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        order: 3,
      },
      {
        type: "bar", // Bar chart dataset
        label: "Bar Dataset 2",
        data: [10, 20, 30, 40, 50, 60],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        order: 3,
      },
      {
        type: "line", // Line chart dataset
        label: "Line Dataset 1",
        data: [5, 30, 15, 20, 25, 10],
        fill: false,
        backgroundColor: "#85144b",
        borderColor: "#85144b",
        borderWidth: 2,
        tension: 0.4,
        order: 1,
      },
      {
        type: "line", // Line chart dataset
        label: "Line Dataset 2",
        // data: [30, 20, 25, 10, 55, 35],
        data: [5, 30, 15, 20, 25, 10],

        fill: false,
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
        borderWidth: 2,
        tension: 0.4,
        order: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true, // Enable stacked bar chart on the x-axis
      },
      y: {
        stacked: true, // Enable stacked bar chart on the y-axis
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default StackedBarLine;
