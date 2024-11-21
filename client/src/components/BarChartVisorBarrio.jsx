import { ResponsiveBar } from "@nivo/bar";
import { useTheme, Box, Typography } from "@mui/material";
import { tokens } from "../theme";
import { getLastPartOfString } from "../utils/auxUtils";

function BarChart({
  data,
  isAnoConstru = false,
  isEuro = false,
  isPorcent = false,
}) {
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
      margin={{ top: 0, right: 15, bottom: 25, left: 100 }}
      padding={0.4}
      valueScale={{
        type: "linear",
        min: isAnoConstru ? 1950 : "auto",
        clamp: true,
      }}
      // valueFormat=">-"
      layout="horizonal"
      indexScale={{ type: "band", round: true }}
      colors={({ id, data }) => String(data[`${id}Color`])}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      // minValue={50}
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
      label={(cell) => {
        if (isAnoConstru) {
          return cell.formattedValue;
        }
        if (isEuro) {
          return cell.formattedValue + " €";
        }
        if (isPorcent) {
          return cell.formattedValue + "%";
        }
        return cell.formattedValue;
      }}
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

export default BarChart;
