import { ResponsiveChord } from "@nivo/chord";
// import { chordData as data } from "../data/mockData";

function MyResponsiveChord({ headers, data }) {
  const customColors = [
    "#cd5c5c",
    "#68804d",
    "#67a3cb",
    "#8f5fa4",
    "#3e647c",
    "#FF851B",
  ];
  return (
    <ResponsiveChord
      data={data}
      keys={headers}
      margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
      // valueFormat=".2f"
      // onRibbonClick={(ribbon) => {
      //   console.log(ribbon);
      // }}
      padAngle={0.05}
      innerRadiusRatio={0.96}
      innerRadiusOffset={0.02}
      inactiveArcOpacity={0.25}
      arcBorderColor={{
        from: "color",
        modifiers: [["darker", 0.6]],
      }}
      activeRibbonOpacity={0.75}
      inactiveRibbonOpacity={0.25}
      ribbonBorderColor={{
        from: "color",
        modifiers: [["darker", 0.6]],
      }}
      ribbonTooltip={({ ribbon }) => {
        if (ribbon.source.id === ribbon.target.id) {
          return (
            <div
              style={{
                padding: 12,
                color: "#000",
                background: "#fff",
                borderRadius: "4px",
                boxShadow: "0 0 4px #999",
              }}
            >
              <span>{ribbon.source.id}</span>
              <br />
              <strong>{ribbon.target.value}</strong>
            </div>
          );
        } else {
          return (
            <div
              style={{
                padding: 12,
                color: "#000",
                background: "#fff",
                borderRadius: "4px",
                boxShadow: "0 0 4px #999",
              }}
            >
              <span>{ribbon.source.id}</span>
              <br />
              <span>{ribbon.target.id}</span>
              <br />
              <strong>{ribbon.target.value}</strong>
            </div>
          );
        }
      }}
      enableLabel={false}
      labelOffset={6}
      labelRotation={-90}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1]],
      }}
      // colors={{ scheme: "nivo" }}
      colors={customColors}
      motionConfig="stiff"
      legends={[
        {
          anchor: "bottom-left",
          direction: "column",
          justify: false,
          translateX: -15,
          translateY: 0,
          itemWidth: 100,
          itemHeight: 14,
          itemsSpacing: 10,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          symbolSize: 12,
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

export default MyResponsiveChord;
