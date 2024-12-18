const COLORMAP = {
  primary: ["#a63564", "#8a4d85", "#48669c", "#4a86a8", "#63a7b8"],
};

export const Selections = {
  "t18_1": {
    key: "t18_1",
    path: `feature.properties["t18_1"]`,
    label: "Número de viviendas",
    legend: {
      values: [12000, 9000, 6000, 3000, 0],
      gradient: COLORMAP.primary,
    },
  },
  "ano": {
    key: "ano",
    path: `feature.properties["ano"]`,
    label: "Año de construcción del barrio",
    legend: {
      values: [2010, 2000, 1990, 1980, 1970],
      gradient: COLORMAP.primary,
    },
  },
  "ac_porc_expedientes": {
    key: "ac_porc_expedientes",
    path: `feature.properties["ac_porc_expedientes"]`,
    label: "Porcentaje de expedientes",
    legend: {
      values: [20, 15, 10, 5, 0],
      gradient: COLORMAP.primary,
    },
  },
  "ac_motivo_rehab": {
    key: "ac_motivo_rehab",
    path: `feature.properties["ac_motivo_rehab"]`,
    label: "Solicitud de Ayudas a la rehabilitación (%)",
    legend: {
      values: [40, 30, 20, 10, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "ac_motivo_infogeneral": {
    key: "ac_motivo_infogeneral",
    path: `feature.properties["ac_motivo_infogeneral"]`,
    label: "Solicitud de información general (%)",
    legend: {
      values: [40, 30, 20, 10, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "ac_motivo_suminsitros": {
    key: "ac_motivo_suminsitros",
    path: `feature.properties["ac_motivo_suminsitros"]`,
    label: "Solicitud de gestión de suministros (%)",
    legend: {
      values: [40, 30, 20, 10, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "ac_motivo_comener": {
    key: "ac_motivo_comener",
    path: `feature.properties["ac_motivo_comener"]`,
    label: "Solicitud de información sobre comunidad energética (%)",
    legend: {
      values: [40, 30, 20, 10, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "ac_origen_ayto": {
    key: "ac_origen_ayto",
    path: `feature.properties["ac_origen_ayto"]`,
    label: "Visita a OHS por Comunicaciones del Ayuntamiento (%)",
    legend: {
      values: [40, 30, 20, 10, 0],
      gradient: COLORMAP.primary,
    },
  },
  "ac_origen_ssss": {
    key: "ac_origen_ssss",
    path: `feature.properties["ac_origen_ssss"]`,
    label: "Visita a OHS a través de SS.SS (%)",
    legend: {
      values: [40, 30, 20, 10, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "ac_origen_errp": {
    key: "ac_origen_errp",
    path: `feature.properties["ac_origen_errp"]`,
    label: "Visita a OHS a través de ERRP y OTC (%)",
    legend: {
      values: [40, 30, 20, 10, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "ac_origen_eventos": {
    key: "ac_origen_eventos",
    path: `feature.properties["ac_origen_eventos"]`,
    label: "Visita a OHS a través de eventos de difusión (%)",
    legend: {
      values: [40, 30, 20, 10, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "ac_origen_conocido": {
    key: "ac_origen_conocido",
    path: `feature.properties["ac_origen_conocido"]`,
    label: "Visita a OHS a través de una persona conocida (%)",
    legend: {
      values: [40, 30, 20, 10, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "t1_1": {
    key: "t1_1",
    path: `feature.properties["t1_1"]`,
    label: "Población total",
    legend: {
      values: [25000, 20000, 15000, 10000, 5000],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "t4_1": {
    key: "t4_1",
    path: `feature.properties["t4_1"]`,
    label: "Porcentaje de población menor de 14 años",
    legend: {
      values: [40, 30, 20, 10, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "t4_3": {
    key: "t4_3",
    path: `feature.properties["t4_3"]`,
    label: "Porcentaje de población mayor de 65 años",
    legend: {
      values: [40, 30, 20, 10, 0],
      gradient: COLORMAP.primary,
    },
  },
  "t3_1": {
    key: "t3_1",
    path: `feature.properties["t3_1"]`,
    label: "Edad media de la población",
    legend: {
      values: [45, 40, 35, 30, 25],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "t31_2dm": {
    key: "t31_2dm",
    path: `feature.properties["t31_2dm"]`,
    label: "Índice de dependencia de mayores",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "t31_3dt": {
    key: "t31_3dt",
    path: `feature.properties["t31_3dt"]`,
    label: "Índice de dependencia total",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "n_alquiler": {
    key: "n_alquiler",
    path: `feature.properties["n_alquiler"]`,
    label: "Viviendas en alquiler",
    legend: {
      values: [20000, 15000, 10000, 500, 0],
      gradient: COLORMAP.primary,
    },
  },
  "precio_alquiler": {
    key: "precio_alquiler",
    path: `feature.properties["precio_alquiler"]`,
    label: "Precio medio alquiler",
    legend: {
      values: [800, 700, 600, 500, 0],
      gradient: COLORMAP.primary,
    },
  },
  "renta_hogar": {
    key: "renta_hogar",
    path: `feature.properties["renta_hogar"]`,
    label: "Renta media por hogar (€)",
    legend: {
      values: [45000, 40000, 35000, 30000, 20000],
      gradient: COLORMAP.primary,
    },
  },
  "t22_1_porc": {
    key: "t22_1_porc",
    path: `feature.properties["t22_1_porc"]`,
    label: "Hogares unipersonales (%)",
    legend: {
      values: [30, 25, 20, 15, 10],
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
