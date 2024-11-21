import { ResponsiveLine } from "@nivo/line";

function LineChartDash({ data, markers }) {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
      }}
      //   yFormat=" >-.2f"
      colors={{
        datum: "color",
      }}
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Meses",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Nº de usuarios",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      enableSlices="x"
      markers={markers}
      legends={[
        {
          anchor: "top",
          direction: "row",
          justify: false,
          translateX: 20,
          translateY: -35,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 200,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}

export default LineChartDash;
