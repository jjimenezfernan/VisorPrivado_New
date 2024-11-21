import { ResponsiveBar } from "@nivo/bar";
import { useTheme, Box, Typography } from "@mui/material";
import { tokens } from "../theme";
// import { mockBarData as data } from "../data/mockData";

function BarChart({ data, headers }) {
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
      keys={headers}
      indexBy="id"
      margin={{ top: 20, right: 30, bottom: 60, left: 60 }}
      padding={0.4}
      valueScale={{ type: "linear" }}
      valueFormat=" >-.3"
      layout="vertical"
      indexScale={{ type: "band", round: true }}
      // colors={({ id, data }) => String(data[`${id}Color`])}
      colors={["#001f3f", "#3D9970", "#0074D9"]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      // minValue={-1200}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // legend: "Meses",
        legendPosition: "middle",
        legendOffset: 40,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // legend: "Consumo energético medio / Viviendas en confort",
        legendPosition: "middle",
        legendOffset: -40,
        tickValues: 1,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={(cell) => getLabelTextColor(cell.data.data.valor)}
    />
  );
}

export default BarChart;
