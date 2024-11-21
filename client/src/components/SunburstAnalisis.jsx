import React, { useState } from "react";
import { ResponsiveSunburst } from "@nivo/sunburst";
import { useTheme, Button, Box } from "@mui/material";
import { tokens } from "../theme";
import { splitString, getLastPartOfString } from "../utils/auxUtils";

function SunburstAnalisis({ data }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [currentData, setCurrentData] = useState(data);
  const [centerText, setCenterText] = useState("G");
  const [centerSize, setCenterSize] = useState("6em");

  const handleNodeClick = (node) => {
    // console.log(node);
    if (node.height !== 0) {
      const newData = node.data;
      setCurrentData(newData);
      if (
        node.data.id === "G" ||
        node.data.id === "G1" ||
        node.data.id === "G2" ||
        node.data.id === "G3A" ||
        node.data.id === "G3B" ||
        node.data.id === "G4" ||
        node.data.id === "G5" ||
        node.data.id === "G6"
      ) {
        setCenterSize("6em");
      } else {
        setCenterSize("1.5em");
      }
      setCenterText(node.data.id);
    }
  };

  const CenteredText = ({ centerX, centerY }) => (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: centerSize,
        fontWeight: "bold",
        // color: colors.blueAccent[200],
        fill: colors.primary[800],
      }}
    >
      {centerText}
    </text>
  );

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
            setCenterText("G");
            setCenterSize("6em");
          }}
        >
          Resetear
        </Button>
      </Box>
      <ResponsiveSunburst
        data={currentData}
        margin={{ top: 10, right: 50, bottom: 10, left: 50 }}
        id="id"
        value="value"
        animate={true}
        isInteractive={true}
        motionConfig="gentle"
        onClick={handleNodeClick}
        transitionMode="pushIn"
        layers={[
          "arcs",
          "arcLabels",
          "arcLinkLabels",
          "markers",
          "legends",
          CenteredText, // layer for rendering centered text
        ]}
        // cornerRadius={3}
        borderWidth={2}
        borderColor={colors.gray[900]}
        colors={{
          datum: "data.color",
        }}
        inheritColorFromParent={false}
        childColor={{
          from: "color",
          modifiers: [["brighter", 0.1]],
        }}
        enableArcLabels={true}
        arcLabel={(node) => {
          //only show labels for the first level
          if (node.depth !== 1) return "";
          return getLastPartOfString(node.data.id);
        }}
        // arcLabelsSkipAngle={25}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 10]],
        }}
        tooltip={({ id, color, formattedValue }) => {
          let def = "";
          switch (id) {
            case "G1":
              def =
                "Personas situadas o por debajo del umbral de pobreza y nivel de gasto energético igual o superior a 10%.";
              break;
            case "G2":
              def =
                "Personas situadas o por debajo del umbral de pobreza y nivel de gasto energético igual o inferior a 10%.";
              break;
            case "G3A":
              def =
                "Personas situadas entre el umbral de pobreza y la mediana de la renta, y nivel de gasto energético igual o superior a 10%.";
              break;
            case "G3B":
              def =
                "Personas situadas o por encima de la mediana de la renta, y nivel de gasto energético igual o superior a 10%.";
              break;
            case "G4":
              def =
                "Personas situadas entre el umbral de pobreza y la mediana de la renta, y nivel de gasto energético entre la mitad de la mediana y el 10%.";
              break;
            case "G5":
              def =
                "Personas situadas entre el umbral de pobreza y la mediana de la renta, y nivel de gasto energético por debajo de la mitad de la mediana.";
              break;
            case "G6":
              def =
                "Personas situadas o por encima de la mediana de la renta, y nivel de gasto energético igual o inferior a 10%.";
              break;
            default:
              def = "";
          }
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
                {formattedValue}
              </strong>
              {def !== "" && <br />}
              {splitString(def, 25)
                .split("\n")
                .map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
            </div>
          );
        }}
      />
    </>
  );
}

export default SunburstAnalisis;
