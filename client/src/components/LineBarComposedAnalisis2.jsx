import React from "react";
import {
  ComposedChart,
  Line,
  // Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  //   Scatter,
  ResponsiveContainer,
} from "recharts";

function LineBarComposedAnalisis2({ data }) {
  const lineKeys = Object.keys(data[0]).filter((key) => key !== "mes");
  const colors = ["#3e647c", "#cd5c5c"];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="mes" scale="auto" />
        <YAxis />
        <Tooltip
          formatter={(value, name, props) => {
            return value + "%";
          }}
        />
        <Legend />
        {lineKeys.map((key, index) => (
          <Line
            type="monotone"
            key={index}
            dataKey={key}
            stroke={colors[index % colors.length]}
            strokeWidth={2.5}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default LineBarComposedAnalisis2;
