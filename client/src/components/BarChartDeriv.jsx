import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
// import { mockBarData as data } from "../data/mockData";

function BarChart({ data }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const getLabelTextColor = (value) => {
    // return value < 4.5 ? colors.primary[900] : colors.primary[100];
    return "#fff";
  };

  return (
    <ResponsiveBar
      data={data}
      theme={{
        textColor: colors.gray[100],
        labels: {
          text: {
            fill: getLabelTextColor,
          },
        },
        tooltip: {
          container: {
            color: colors.gray[300],
          },
        },
        axis: {
          domain: {
            line: {
              stroke: colors.gray[100],
            },
          },
          legend: {
            text: {
              fill: colors.gray[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.gray[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.gray[100],
            },
          },
        },
      }}
      keys={["valor"]}
      indexBy="id"
      margin={{ top: 20, right: 55, bottom: 60, left: 80 }}
      padding={0.4}
      valueScale={{ type: "linear" }}
      valueFormat=" >-.3"
      layout="horizontal"
      indexScale={{ type: "band", round: true }}
      colors={({ id, data }) => String(data[`${id}Color`])}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Nota media",
        legendPosition: "middle",
        legendOffset: 40,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Asociación o área",
        legendPosition: "middle",
        legendOffset: -60,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={(cell) => getLabelTextColor(cell.data.data.valor)}
    />
  );
}

export default BarChart;
