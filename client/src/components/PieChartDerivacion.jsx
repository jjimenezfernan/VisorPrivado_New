import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { splitString } from "../utils/auxUtils";
// import { mockPieData as data } from "../data/mockData";

function PieChart({ data }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <ResponsivePie
      data={data}
      // valueFormat=">-.3s"
      theme={{
        tooltip: {
          container: {
            color: colors.gray[500],
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
              fontSize: 4,
              fill: colors.gray[100],
            },
          },
          //   legends: {
          //     text: {
          //       fill: colors.gray[100],
          //     },
          //   },
        },
      }}
      // colors={{ scheme: "set1" }}
      colors={{
        datum: "data.color",
      }}
      margin={{ top: 10, right: -180, bottom: 15, left: 0 }}
      innerRadius={0.5}
      padAngle={1}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.gray[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsTextColor={colors.primary[400]}
      legends={[
        {
          anchor: "bottom-left",
          direction: "column",
          justify: false,
          translateX: 15,
          translateY: 5,
          itemsSpacing: 15,
          itemWidth: 100,
          itemHeight: 10,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 15,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
}

export default PieChart;
