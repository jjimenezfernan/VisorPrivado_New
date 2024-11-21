import { ResponsiveHeatMap } from "@nivo/heatmap";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { splitString } from "../utils/auxUtils";

function HeatMap({ data }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const themeMap = {
    axis: {
      ticks: {
        line: {
          strokeWidth: 0,
        },
        text: {
          fontSize: 9,
          fill: colors.gray[100],
        },
      },
    },
  };

  const getLabelTextColor = (value) => {
    return value < 3.8 ? colors.primary[600] : colors.primary[400];
  };

  return (
    <ResponsiveHeatMap
      data={data}
      theme={themeMap}
      sizeVariation={{ sizes: [0.3, 1] }}
      margin={{ top: 10, right: 30, bottom: 60, left: 130 }}
      // valueFormat=">-.3s"
      axisTop={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 15,
        legend: "Meses",
        legendPosition: "middle",
        legendOffset: 43,
        renderTick: ({
          opacity,
          textAnchor,
          textBaseline,
          textX,
          textY,
          theme,
          value,
          x,
          y,
        }) => {
          const values = splitString(value, 15).split("\n");
          return (
            <g transform={`translate(${x},${y})`} style={{ opacity }}>
              {values.map((val, i) => (
                <text
                  key={i}
                  alignmentBaseline={textBaseline}
                  style={themeMap.axis.ticks.text}
                  textAnchor={"middle"}
                  transform={`translate(${textX},${i * 10})`}
                >
                  <tspan x="0" dy="2em">
                    {val}
                  </tspan>
                </text>
              ))}
              {/* <text
                alignmentBaseline={textBaseline}
                style={themeMap.axis.ticks.text}
                textAnchor={"middle"}
                transform={`translate(${textX},${textY})`}
              >
                {value}
              </text> */}
            </g>
          );
        },
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 0,
        legend: "Patologías",
        legendPosition: "middle",
        legendOffset: -115,
        renderTick: ({
          opacity,
          textAnchor,
          textBaseline,
          textX,
          textY,
          theme,
          value,
          x,
          y,
        }) => {
          const values = splitString(value, 30).split("\n");
          return (
            <g transform={`translate(${x},${y - 15})`} style={{ opacity }}>
              {values.map((val, i) => (
                <text
                  key={i}
                  alignmentBaseline={textBaseline}
                  style={themeMap.axis.ticks.text}
                  textAnchor={"middle"}
                  transform={`translate(${textX - 40},${i * 10})`}
                >
                  <tspan x="0" dy="2em">
                    {val}
                  </tspan>
                </text>
              ))}
            </g>
          );
        },
      }}
      colors={(cell) => {
        // console.log(cell);
        return cell.data.color;
      }}
      emptyColor="#555555"
      cellComponent="circle"
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.8"]],
      }}
      labelTextColor={(cell) => getLabelTextColor(cell.value)}
      isInteractive={true}
      hoverTarget="row"
      // legends={[
      //   {
      //     anchor: "top",
      //     translateX: 0,
      //     translateY: -40,
      //     length: 400,
      //     thickness: 8,
      //     direction: "row",
      //     tickPosition: "after",
      //     tickSize: 3,
      //     tickSpacing: 4,
      //     tickOverlap: false,
      //     tickFormat: ">-.2s",
      //     title: "Value →",
      //     titleAlign: "start",
      //     titleOffset: 4,
      //   },
      // ]}
    />
  );
}

export default HeatMap;
