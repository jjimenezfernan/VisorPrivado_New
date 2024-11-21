import React, { useState, useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  ZoomControl,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { Box, Typography, useTheme } from "@mui/material";
// import { alpha } from "@mui/system";
// import { tokens } from "../theme";
import { useMapSSCCContext } from "./MapSSCCProvider";
import {
  Selections as Selections,
  pathToSelect,
} from "../constants/MapConstantsSSCC";
import MapLegendSSCC from "./MapLegendSSCC";
import { splitString } from "../utils/auxUtils";

/*
MAPA DE SECCIONES CENSAL
*/

const COLORS_MAP = {
  teal: {
    1: "#5498a9",
    2: "#42899b",
    3: "#3d7685",
  },
};

const styleLayer = {
  start: {
    fillColor: COLORS_MAP.teal[1],
    stroke: true,
    color: COLORS_MAP.teal[2],
    weight: 0.3,
    opacity: 1,
    fillOpacity: 0.7,
  },
  default: {
    stroke: true,
    weight: 0.7,
    opacity: 1,
    fillOpacity: 0.7,
  },
  highlight: {
    stroke: true,
    weight: 0.7,
    opacity: 1,
    fillOpacity: 0.9,
  },
};

function heatMapGeneric(select, value) {
  select = pathToSelect(select);
  value = parseFloat(value);
  //if value is 0 or invalid, return gray color
  if (value === 0 || value === null || isNaN(value)) {
    return "#bababa";
  }

  //if value is greater than the first value, return the first gradient color
  if (value > Selections[select].legend.values[0]) {
    return Selections[select].legend.gradient[0];
  }

  let length = Selections[select].legend.values.length;
  //compare values and get gradient color
  for (let i = 1; i < length; i++) {
    //range 2 is added by 0.01 to avoid overlapping ranges
    let range1 = Selections[select].legend.values[i - 1];
    let range2 = Selections[select].legend.values[i] + 0.01;
    if (value <= range1 && value >= range2) {
      return Selections[select].legend.gradient[i];
    }
  }
}

const VIEW_SSCC = [40.305, -3.665];

function Map({ mapRef, geojson }) {
  const [info, setInfo] = useState({});
  const { selectionValue, updateInfo } = useMapSSCCContext();
  const [tooltipValue, setTooltipValue] = useState("");

  useEffect(() => {
    console.log("selectionValue", selectionValue);
  }, [selectionValue]);

  function onEachFeature(feature, layer) {
    // console.log("feature props", feature.properties);
    // console.log("layer", layer);

    let tooltipLabel = Selections[pathToSelect(selectionValue)].label;
    let tooltipValue = eval(selectionValue);

    if (tooltipValue === null) {
      tooltipValue = "No disponible";
    }

    const tooltipContent = `
      <div style="text-align: center;">
        <h7 style="margin: 0; padding: 0;"><strong>${splitString(
          tooltipLabel,
          25
        ).replace(/\n/g, "<br>")}</strong></h7>
        <p style="margin: 0; padding: 0;">${tooltipValue}</p>
      </div>
    `;

    layer.bindTooltip(tooltipContent, {
      permanent: false,
      sticky: true,
      direction: "right",
      opacity: 0.8,
    });

    layer.setTooltipContent(tooltipContent);

    layer.on({
      click: (e) => {
        setInfo(feature.properties);
        updateInfo(feature.properties);
        console.log(feature.properties);
      },
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  }

  function highlightFeature(e) {
    let feature = e.target.feature;
    setTooltipValue(eval(selectionValue));
    let layer = e.target;
    layer.setStyle(styleLayer.highlight);
  }

  function resetHighlight(e) {
    let layer = e.target;
    layer.setStyle(styleLayer.default);
  }

  function mapStyleOptions(select, value) {
    //other cases can be added here
    //for categorical values
    switch (select) {
      case "other cases":
        return heatMapGeneric(select, value);
      default:
        return heatMapGeneric(select, value);
    }
  }

  function mapStyle1(feature) {
    return {
      fillColor: mapStyleOptions(selectionValue, eval(selectionValue)),
      fillOpacity: 0.7,
      color: mapStyleOptions(selectionValue, eval(selectionValue)),
      weight: 1,
    };
  }

  function DynamicGeoJSON({
    geojsonData,
    selectionValue,
    onEachFeature,
    mapStyle,
  }) {
    // Use useMemo to conditionally render the GeoJSON component when selectionValue changes
    const geoJSONComponent = useMemo(() => {
      return (
        <GeoJSON
          data={geojsonData}
          onEachFeature={onEachFeature}
          style={mapStyle}
        />
      );
    }, [geojsonData, onEachFeature, mapStyle, selectionValue]);

    return geoJSONComponent;
  }

  return (
    <MapContainer
      center={VIEW_SSCC}
      zoom={13}
      ref={mapRef}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        url="https://api.maptiler.com/maps/basic-v2-light/256/{z}/{x}/{y}.png?key=BLmB8erci1WE7XYWuf5R"
      />
      <ZoomControl position="bottomright" />
      <DynamicGeoJSON
        geojsonData={geojson.features}
        selectionValue={selectionValue}
        onEachFeature={onEachFeature}
        mapStyle={mapStyle1}
      />
      <MapLegendSSCC position={"bottomleft"} selection={selectionValue} />
    </MapContainer>
  );
}

export default Map;
