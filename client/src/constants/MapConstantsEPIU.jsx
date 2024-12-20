const COLORMAP = {
  primary: ["#a63564", "#8a4d85", "#48669c", "#4a86a8", "#63a7b8"],
  cert: [
    "#047331",
    "#388C04",
    "#5498A9",
    "#508CAE",
    "#607CAC",
    "#8C5788",
    "#CA0300",
  ],
  especif_conj_homo : [
    "#c693f0", "#FFC0CB", "#B0E0E6", "#5F9EA0",  
    "#a8dea8", "#FFDAB9", "#D8BFD8", "#D2B48C", 
    "#FFFACD", "#4682B4", "#008080", "#B0C4DE", 
    "#9DC183", "#556B2F", "#F5DEB3", "#F08080", 
    "#A0522D", "#afafe8", "#AEEEEE", "#7D7098", 
    "#FF9A8A", "#8F9779", "#FFD1DC", "#DC143C" 
  ],
};

export const Selections = {
  numero_viviendas: {
    key: "numero_viviendas",
    path: `feature.properties["numero_viviendas"]`,
    label: "Nº viviendas",
    legend: {
      values: [100, 50, 25, 10, 0],
      gradient: COLORMAP.primary,
    },
  },
  ano_constru: {
    key: "ano_constru",
    path: `feature.properties["ano_constru"]`,
    label: "Año construcción",
    legend: {
      values: [2000, 1975, 1950, 1925, 0],
      gradient: COLORMAP.primary,
    },
  },
  "n_exptes": {
    key: "n_exptes",
    path: `feature.properties["n_exptes"]`,
    label: "Nº expedientes",
    legend: {
      values: [40, 30, 20, 10, 0],
      gradient: COLORMAP.primary,
    },
  },
  "Building_Getafe_porc viv OHS": {
    key: "Building_Getafe_porc viv OHS",
    path: `feature.properties["Building_Getafe_porc viv OHS"]`,
    label: "Viviendas OHS (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary,
    },
  },
  "Building_Getafe_Medidas recibidas: Kit de eficiencia energética Cruz Roja": {
    key: "Building_Getafe_Medidas recibidas: Kit de eficiencia energética Cruz Roja",
    path: `feature.properties["Building_Getafe_Medidas recibidas: Kit de eficiencia energética Cruz Roja"]`,
    label: "Kit de eficiencia energética Cruz Roja",
    legend: {
      value: "Sí",
      color: "#4a86a8",
    },
  },
  "Building_Getafe_Medidas recibidas: Medidas de rehabilitación en vivienda": {
    key: "Building_Getafe_Medidas recibidas: Medidas de rehabilitación en vivienda",
    path: `feature.properties["Building_Getafe_Medidas recibidas: Medidas de rehabilitación en vivienda"]`,
    label: "Medidas de rehabilitación en vivienda",
    legend: {
      value: "Sí",
      color: "#4a86a8",
    },
  },
  "Building_Getafe_Medidas recibidas: Medidas de rehabilitación en edificio": {
    key: "Building_Getafe_Medidas recibidas: Medidas de rehabilitación en edificio",
    path: `feature.properties["Building_Getafe_Medidas recibidas: Medidas de rehabilitación en edificio"]`,
    label: "Medidas de rehabilitación en edificio",
    legend: {
      value: "Sí",
      color: "#4a86a8",
    },
  },
  "Building_Getafe_porc retraso pago facturas": {
    key: "Building_Getafe_porc retraso pago facturas",
    path: `feature.properties["Building_Getafe_porc retraso pago facturas"]`,
    label: "Retraso pago facturas (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary,
    },
  },
  "Building_Getafe_porc alquiler": {
    key: "Building_Getafe_porc alquiler",
    path: `feature.properties["Building_Getafe_porc alquiler"]`,
    label: "Alquiler (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary,
    },
  },
  "Building_Getafe_porc prop sin hipoteca": {
    key: "Building_Getafe_porc prop sin hipoteca",
    path: `feature.properties["Building_Getafe_porc prop sin hipoteca"]`,
    label: "Propiedad sin hipoteca (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary,
    },
  },
  "Building_Getafe_porc prop con hipoteca": {
    key: "Building_Getafe_porc prop con hipoteca",
    path: `feature.properties["Building_Getafe_porc prop con hipoteca"]`,
    label: "Propiedad con hipoteca (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary,
    },
  },
  "Building_Getafe_disconfort inv": {
    key: "Building_Getafe_disconfort inv",
    path: `feature.properties["Building_Getafe_disconfort inv"]`,
    label: "Disconfort invierno (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary,
    },
  },
  "Building_Getafe_disconfort ver": {
    key: "Building_Getafe_disconfort ver",
    path: `feature.properties["Building_Getafe_disconfort ver"]`,
    label: "Disconfort verano (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary,
    },
  },
  "Building_Getafe_porc patologias exptes": {
    key: "Building_Getafe_porc patologias exptes",
    path: `feature.properties["Building_Getafe_porc patologias exptes"]`,
    label: "Expedientes con patologías (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary,
    },
  },
  "Building_Getafe_porc no calefaccion": {
    key: "Building_Getafe_porc no calefaccion",
    path: `feature.properties["Building_Getafe_porc no calefaccion"]`,
    label: "Sin calefacción (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary,
    },
  },
  "cert_emision_co2": {
    key: "cert_emision_co2",
    path: `feature.properties["cert_emision_co2"]`,
    label: "Certificado emisión CC",
    legend: {
      values: ["A", "B", "C", "D", "E", "F", "G"],
      gradient: COLORMAP.cert,
    },
  },
  "cert_consumo_e_primaria": {
    key: "cert_consumo_e_primaria",
    path: `feature.properties["cert_consumo_e_primaria"]`,
    label: "Certificado consumo energía primaria",
    legend: {
      values: ["A", "B", "C", "D", "E", "F", "G"],
      gradient: COLORMAP.cert,
    },
  },
  "prod_fotovol": {
    key: "prod_fotovol",
    path: `feature.properties["prod_fotovol"]`,
    label: "Año construcción",
    legend: {
      values: [6000, 4500, 3000, 1500, 0],
      gradient: COLORMAP.primary,
    },
  },
  "irradiacion_anual_kwh/m2": {
    key: "irradiacion_anual_kwh/m2",
    path: `feature.properties["irradiacion_anual_kwh/m2"]`,
    label: "Año construcción",
    legend: {
      values: [20000, 15000, 10000, 5000, 0],
      gradient: COLORMAP.primary,
    },
  },
  "demanda_calefaccion": {
    key: "demanda_calefaccion",
    path: `feature.properties["demanda_calefaccion"]`,
    label: "Demanda de Calecfacción Actual",
    legend: {
      values: [200, 150, 100, 50, 0],
      gradient: COLORMAP.primary,
    },
  },
};

function extractKeyFromPath(input) {
  // Define a regular expression to match the pattern "feature.properties["..."]"
  const regex = /feature\.properties\["([^"]+)"\]/;

  // Use the regular expression to extract the string inside the properties[]
  const match = input.match(regex);

  // Check if a match was found
  if (match) {
    // The extracted string will be in the first capturing group (index 1)
    return match[1];
  } else {
    // Return null or any default value if no match was found
    return null;
  }
}

export const pathToSelect = (path) => {
  const key = extractKeyFromPath(path);
  if (key === null) {
    console.error("No key found for path: ", path);
    return null;
  }
  return key;
};
