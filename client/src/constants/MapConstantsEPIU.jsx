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
};

export const Selections = {
  numberOfDw: {
    key: "numberOfDw",
    path: `feature.properties["numberOfDw"]`,
    label: "Nº viviendas",
    legend: {
      values: [100, 50, 25, 10, 0],
      gradient: COLORMAP.primary,
    },
  },
  "Building_Getafe_n exptes": {
    key: "Building_Getafe_n exptes",
    path: `feature.properties["Building_Getafe_n exptes"]`,
    label: "Nº expedientes",
    legend: {
      values: [25, 15, 7, 4, 0],
      gradient: COLORMAP.primary,
    },
  },
  ano_constr: {
    key: "ano_constr",
    path: `feature.properties["ano_constr"]`,
    label: "Año construcción",
    legend: {
      values: [2010, 1995, 1980, 1955, 0],
      gradient: COLORMAP.primary,
    },
  },
  "Building_Getafe_cert emision CO2": {
    key: "Building_Getafe_cert emision CO2",
    path: `feature.properties["Building_Getafe_cert emision CO2"]`,
    label: "Certificado emisión CC",
    legend: {
      values: ["A", "B", "C", "D", "E", "F", "G"],
      gradient: COLORMAP.cert,
    },
  },
  "Building_Getafe_cert consumo e primaria": {
    key: "Building_Getafe_cert consumo e primaria",
    path: `feature.properties["Building_Getafe_cert consumo e primaria"]`,
    label: "Certificado consumo energía primaria",
    legend: {
      values: ["A", "B", "C", "D", "E", "F", "G"],
      gradient: COLORMAP.cert,
    },
  },
  "Building_Getafe_porc viv OHS": {
    key: "Building_Getafe_porc viv OHS",
    path: `feature.properties["Building_Getafe_porc viv OHS"]`,
    label: "Viviendas OHS (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Building_Getafe_porc retraso pago facturas": {
    key: "Building_Getafe_porc retraso pago facturas",
    path: `feature.properties["Building_Getafe_porc retraso pago facturas"]`,
    label: "Retraso pago facturas (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Building_Getafe_disconfort inv": {
    key: "Building_Getafe_disconfort inv",
    path: `feature.properties["Building_Getafe_disconfort inv"]`,
    label: "Disconfort invierno (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Building_Getafe_disconfort ver": {
    key: "Building_Getafe_disconfort ver",
    path: `feature.properties["Building_Getafe_disconfort ver"]`,
    label: "Disconfort verano (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Building_Getafe_porc alquiler": {
    key: "Building_Getafe_porc alquiler",
    path: `feature.properties["Building_Getafe_porc alquiler"]`,
    label: "Alquiler (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Building_Getafe_porc prop sin hipoteca": {
    key: "Building_Getafe_porc prop sin hipoteca",
    path: `feature.properties["Building_Getafe_porc prop sin hipoteca"]`,
    label: "Propiedad sin hipoteca (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Building_Getafe_porc prop con hipoteca": {
    key: "Building_Getafe_porc prop con hipoteca",
    path: `feature.properties["Building_Getafe_porc prop con hipoteca"]`,
    label: "Propiedad con hipoteca (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Building_Getafe_porc no calefaccion": {
    key: "Building_Getafe_porc no calefaccion",
    path: `feature.properties["Building_Getafe_porc no calefaccion"]`,
    label: "Sin calefacción (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Building_Getafe_porc no refrigeracion": {
    key: "Building_Getafe_porc no refrigeracion",
    path: `feature.properties["Building_Getafe_porc no refrigeracion"]`,
    label: "Sin refriferación (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  // "Building_Getafe_porc renta antigua": {
  //   key: "Building_Getafe_porc renta antigua",
  //   path: `feature.properties["Building_Getafe_porc renta antigua"]`,
  //   label: "Renta antigua (%)",
  //   legend: {
  //     values: [75, 50, 25, 0],
  //     gradient: COLORMAP.primary.slice(0, 4),
  //   },
  // },
  // "Building_Getafe_porc cesion": {
  //   key: "Building_Getafe_porc cesion",
  //   path: `feature.properties["Building_Getafe_porc cesion"]`,
  //   label: "Cesión (%)",
  //   legend: {
  //     values: [75, 50, 25, 0],
  //     gradient: COLORMAP.primary.slice(0, 4),
  //   },
  // },
  "Building_Getafe_porc patologias exptes": {
    key: "Building_Getafe_porc patologias exptes",
    path: `feature.properties["Building_Getafe_porc patologias exptes"]`,
    label: "Expedientes con patologías (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Building_Getafe_prod fotovol": {
    key: "Building_Getafe_prod fotovol",
    path: `feature.properties["Building_Getafe_prod fotovol"]`,
    label: "Producción fotovoltaica (MWh/año)",
    legend: {
      values: [150, 100, 50, 25, 0],
      gradient: COLORMAP.primary,
    },
  },
  "Building_Getafe_irradiacion anual kwh/m2": {
    key: "Building_Getafe_irradiacion anual kwh/m2",
    path: `feature.properties["Building_Getafe_irradiacion anual kwh/m2"]`,
    label: "Irradiación anual (kWh/m2)",
    legend: {
      values: [15000, 10000, 5000, 2500, 0],
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
};

/*
  "Building_Getafe_Medidas recibidas: Kit de eficiencia energética Cruz Roja",
  "Building_Getafe_Medidas recibidas: Medidas de rehabilitación en vivienda",
  "Building_Getafe_Medidas recibidas: Medidas de rehabilitación en edificio",
*/

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
