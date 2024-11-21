import React from "react";
import {
  ComposedChart,
  // Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  //   Scatter,
  ResponsiveContainer,
} from "recharts";

function LineBarComposedAnalisis({ data }) {
  //   const data = [
  //     {
  //       name: "Page A",
  //       uv: 590,
  //       pv: 800,
  //       amt: 1400,
  //       cnt: 490,
  //     },
  //     {
  //       name: "Page B",
  //       uv: 868,
  //       pv: 967,
  //       amt: 1506,
  //       cnt: 590,
  //     },
  //     {
  //       name: "Page C",
  //       uv: 1397,
  //       pv: 1098,
  //       amt: 989,
  //       cnt: 350,
  //     },
  //     {
  //       name: "Page D",
  //       uv: 1480,
  //       pv: 1200,
  //       amt: 1228,
  //       cnt: 480,
  //     },
  //     {
  //       name: "Page E",
  //       uv: 1520,
  //       pv: 1108,
  //       amt: 1100,
  //       cnt: 460,
  //     },
  //     {
  //       name: "Page F",
  //       uv: 1400,
  //       pv: 680,
  //       amt: 1700,
  //       cnt: 380,
  //     },
  //   ];
  const barKeys = Object.keys(data[0]).filter((key) => key !== "mes");
  const colors = [
    "#cd5c5c",
    "#68804d",
    "#67a3cb",
    "#8f5fa4",
    "#3e647c",
    "#FF851B",
  ];
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
        <Tooltip />
        <Legend />
        {barKeys.map((key, index) => (
          <Bar
            key={index}
            dataKey={key}
            stackId="a"
            fill={colors[index % colors.length]} // Assign predefined colors from the array
          />
        ))}

        {/* <Line
          type="monotone"
          dataKey="Confort invierno"
          stroke="#0074D9"
          strokeWidth={2.5}
        />
        <Line
          type="monotone"
          dataKey="Confort verano"
          stroke="#e8b02c"
          strokeWidth={2.5}
        /> */}
        {/* <Scatter dataKey="cnt" fill="red" /> */}
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default LineBarComposedAnalisis;
