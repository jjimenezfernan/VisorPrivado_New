import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { getLastPartOfString, splitString } from "../utils/auxUtils";

// import { mockBarData as data } from "../data/mockData";

function BarChartDash3({ data }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const getLabelTextColor = (value) => {
    // return value < 4.5 ? colors.primary[900] : colors.primary[100];
    return "#fff";
  };
  const themeMap = {
    axis: {
      ticks: {
        line: {
          strokeWidth: 0,
        },
        text: {
          fontSize: 10,
          fill: colors.gray[100],
        },
      },
    },
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
      margin={{ top: 20, right: 20, bottom: 35, left: 100 }}
      padding={0.4}
      valueScale={{ type: "linear" }}
      valueFormat=" >-.2%"
      layout="horizontal"
      indexScale={{ type: "band", round: true }}
      colors={({ id, data }) => String(data[`${id}Color`])}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      //   axisBottom={{
      //     tickSize: 5,
      //     tickPadding: 5,
      //     tickRotation: 0,
      //     legend: "Motivo de la visita",
      //     legendPosition: "middle",
      //     legendOffset: 40,
      //     renderTick: ({
      //       opacity,
      //       textAnchor,
      //       textBaseline,
      //       textX,
      //       textY,
      //       theme,
      //       value,
      //       x,
      //       y,
      //     }) => {
      //       const values = splitString(value, 15).split("\n");
      //       return (
      //         <g transform={`translate(${x},${y})`} style={{ opacity }}>
      //           {values.map((val, i) => (
      //             <text
      //               key={i}
      //               alignmentBaseline={textBaseline}
      //               //   style={themeMap.axis.ticks.text}
      //               textAnchor={"middle"}
      //               transform={`translate(${textX},${i * 10})`}
      //             >
      //               <tspan x="0" dy="2em">
      //                 {val}
      //               </tspan>
      //             </text>
      //           ))}
      //           {/* <text
      //             alignmentBaseline={textBaseline}
      //             style={themeMap.axis.ticks.text}
      //             textAnchor={"middle"}
      //             transform={`translate(${textX},${textY})`}
      //           >
      //             {value}
      //           </text> */}
      //         </g>
      //       );
      //     },
      //   }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 0,
        // legend: "Patologías",
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
          const values = splitString(value, 20).split("\n");
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
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "% personas",
        legendPosition: "middle",
        legendOffset: 30,
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

export default BarChartDash3;
