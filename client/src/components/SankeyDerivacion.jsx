import { ResponsiveSankey } from "@nivo/sankey";
// import { mockSankeyData as data } from "../data/mockData";

function SankeyChart({ data }) {
  return (
    <ResponsiveSankey
      data={data}
      margin={{ top: 40, right: 155, bottom: 40, left: 195 }}
      align={"center"}
      // colors={{ scheme: "category10" }}
      colors={(node) => node.nodeColor}
      nodeOpacity={1}
      nodeHoverOthersOpacity={0.35}
      nodeThickness={18}
      nodeSpacing={20}
      nodeBorderWidth={0}
      nodeBorderColor={{
        from: "color",
        modifiers: [["darker", 0.8]],
      }}
      nodeBorderRadius={3}
      linkOpacity={0.5}
      linkHoverOthersOpacity={0.1}
      linkContract={3}
      enableLinkGradient={true}
      labelPosition="outside"
      labelOrientation="horizontal"
      labelPadding={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1]],
      }}
      sort={"descending"}

      // legends={[
      //   {
      //     anchor: "bottom-right",
      //     direction: "column",
      //     translateX: 130,
      //     itemWidth: 100,
      //     itemHeight: 14,
      //     itemDirection: "right-to-left",
      //     itemsSpacing: 2,
      //     itemTextColor: "#999",
      //     symbolSize: 14,
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemTextColor: "#000",
      //         },
      //       },
      //     ],
      //   },
      // ]}
    />
  );
}

export default SankeyChart;
