/**
 * Codigo del sankey de la pagina de derivacion
 * 
 */
import { ResponsiveSankey } from "@nivo/sankey";

function SankeyChart({ data }) {
  return (
    <ResponsiveSankey
      data={data}
      margin={{ top: 40, right: 155, bottom: 40, left: 195 }}
      align={"justify"}
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
    />
  );
}

export default SankeyChart;
