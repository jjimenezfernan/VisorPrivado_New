import { useState } from "react";
import { ResponsiveCirclePacking } from "@nivo/circle-packing";
import { useTheme, Button, Box } from "@mui/material";
import { tokens } from "../theme";

function CirclePacking({ data }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [currentData, setCurrentData] = useState(data);

  const handleNodeClick = (node) => {
    console.log(node);
    if (node.height !== 0) {
      const newData = node.data;
      setCurrentData(newData);
    }
  };

  function getLastPartOfString(str) {
    const parts = str.split(" - ");
    return parts.pop();
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "100%",
          pr: 1,
        }}
      >
        <Button
          sx={{
            backgroundColor: colors.blueAccent[400],
            "&:hover": {
              backgroundColor: colors.blueAccent[300],
            },
          }}
          onClick={() => {
            setCurrentData(data);
          }}
        >
          Resetear
        </Button>
      </Box>
      <ResponsiveCirclePacking
        data={currentData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        id="name"
        value="valor"
        // colors={{ scheme: "blues" }}
        colors={{
          datum: "data.color",
        }}
        childColor={{
          from: "color",
          modifiers: [["brighter", 0.4]],
        }}
        // zoomedId={zoomedId}
        motionConfig="fast"
        onClick={handleNodeClick}
        padding={4}
        enableLabels={true}
        labelsFilter={function (n) {
          return 1 === n.node.depth;
        }}
        labelsSkipRadius={10}
        labelTextColor={{
          from: "color",
          modifiers: [["brighter", 6]],
        }}
        label={(node) => {
          return getLastPartOfString(node.id);
        }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.5]],
        }}
        tooltip={({ id, color, formattedValue, value }) => {
          // console.log(node);
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
              <span>{getLastPartOfString(id)}: </span>
              <strong
                style={{
                  color: colors.gray[300],
                }}
              >
                {value} ({formattedValue})
              </strong>
            </div>
          );
        }}
        // defs={[
        //   {
        //     id: "lines",
        //     type: "patternLines",
        //     background: "none",
        //     color: "inherit",
        //     rotation: -45,
        //     lineWidth: 5,
        //     spacing: 8,
        //   },
        // ]}
        // fill={[
        //   {
        //     match: {
        //       depth: 1,
        //     },
        //     id: "lines",
        //   },
        // ]}
      />
    </>
  );
}

export default CirclePacking;
