import { ResponsiveHeatMap } from "@nivo/heatmap";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { splitString } from "../utils/auxUtils";
// import { mockDataHeatMap as mockdata } from "../data/mockData";

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
    if (value === 0) return colors.gray[900];
    return value < 4 ? colors.primary[600] : colors.primary[400];
  };

  return (
    <ResponsiveHeatMap
      data={data}
      theme={themeMap}
      sizeVariation={{ sizes: [0, 1] }}
      margin={{ top: 60, right: 30, bottom: 60, left: 150 }}
      valueFormat=">-.3s"
      axisTop={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 15,
        legend: "",
        legendPosition: "middle",
        legendOffset: 36,
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
        legend: "Asociación o área",
        legendPosition: "middle",
        legendOffset: -125,
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
      colors={{
        type: "quantize",
        scheme: "blues",
        steps: 5,
        domain: [3.5, 5],
      }}
      emptyColor="#555555"
      cellComponent="circle"
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.8"]],
      }}
      labelTextColor={(cell) => getLabelTextColor(cell.value)}
      legends={[
        {
          anchor: "top",
          translateX: 0,
          translateY: -40,
          length: 400,
          thickness: 8,
          direction: "row",
          tickPosition: "after",
          tickSize: 3,
          tickSpacing: 4,
          tickOverlap: false,
          tickFormat: ">-.2s",
          title: "Value →",
          titleAlign: "start",
          titleOffset: 4,
        },
      ]}
    />
  );
}

export default HeatMap;
