import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { getLastPartOfString } from "../utils/auxUtils";

function BarChartBarrios1({ data }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const getLabelTextColor = (value) => {
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
      margin={{ top: 20, right: 0, bottom: 30, left: 50 }}
      padding={0.4}
      valueScale={{ type: "linear" }}
      valueFormat=" >-"
      //layout="horizontal"
      indexScale={{ type: "band", round: true }}
      colors={({ id, data }) => String(data[`${id}Color`])}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: 21,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Nº de atenciones",
        legendPosition: "middle",
        legendOffset: -43,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={(cell) => getLabelTextColor(cell.data.data.valor)}
      tooltip={({ formattedValue, color, label }) => {
        return (
          <div
            style={{
              padding: 5,
              color: "#000",
              background: "#fff",
              borderRadius: "4px",
              boxShadow: "0 0 4px #999",
            }}
          >
            <div
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                marginRight: 5,
                backgroundColor: color,
              }}
            ></div>
            <span>{getLastPartOfString(label)}: </span>
            <strong
              style={{
                color: colors.gray[300],
              }}
            >
              {formattedValue}
            </strong>
          </div>
        );
      }}
    />
  );
}

export default BarChartBarrios1;
