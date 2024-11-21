import { ResponsiveHeatMap } from "@nivo/heatmap";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { splitString } from "../utils/auxUtils";
import { color } from "@mui/system";

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

  const getLabelTextColor = (value, cellColor) => {
    if (value === 0) {
      return cellColor;
    }
    return colors.primary[400];
    // return value < 3.8 ? colors.primary[600] : colors.primary[400];
  };

  return (
    <ResponsiveHeatMap
      data={data}
      theme={themeMap}
      sizeVariation={{ sizes: [0.7, 1] }}
      // margin={{ top: 10, right: 30, bottom: 60, left: 130 }}
      margin={{ top: 10, right: 0, bottom: 60, left: 0 }}
      valueFormat=">-.0%"
      axisTop={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 15,
        // legend: "Meses",
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
      axisLeft={null}
      colors={(cell) => {
        // no color for 0 values
        if (cell.value === 0) {
          return "#ebebeb";
        }
        return cell.data.color;
      }}
      emptyColor="#555555"
      cellComponent="circle"
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.8"]],
      }}
      labelTextColor={(cell) => getLabelTextColor(cell.value, cell.color)}
      // label={function (cell) {
      //   // no label for 0 values
      //   if (cell.value === 0) {
      //     return "";
      //   }
      //   //add % to percentage values
      //   if (
      //     (cell.value <= 1 && cell.value > 0) ||
      //     (cell.value >= -1 && cell.value < 0)
      //   ) {
      //     return `${Math.round(cell.value * 100)}%`;
      //   }
      //   return cell.value;
      // }}
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
