const COLORMAP = {
  primary: ["#a63564", "#8a4d85", "#48669c", "#4a86a8", "#63a7b8"],
};

export const Selections = {
  "n viviendas": {
    key: "n viviendas",
    path: `feature.properties["n viviendas"]`,
    label: "Número de viviendas",
    legend: {
      values: [16000, 10000, 7500, 5000, 0],
      gradient: COLORMAP.primary,
    },
  },
  "ano constru barrio": {
    key: "ano constru barrio",
    path: `feature.properties["ano constru barrio"]`,
    label: "Año de construcción del barrio",
    legend: {
      values: [1990, 1985, 1975, 1970, 0],
      gradient: COLORMAP.primary,
    },
  },
  "porc exptes": {
    key: "porc exptes",
    path: `feature.properties["porc exptes"]`,
    label: "Porcentaje de expedientes",
    legend: {
      values: [20, 15, 10, 3, 0],
      gradient: COLORMAP.primary,
    },
  },
  "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION": {
    key: "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION",
    path: `feature.properties["porc motivo TRAMITACION_AYUDAS_A_REHABILITACION"]`,
    label: "Porcentaje de expedientes por ayudas a la rehabilitación",
    legend: {
      values: [30, 20, 15, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc motivo INFORMACION_GENERAL": {
    key: "porc motivo INFORMACION_GENERAL",
    path: `feature.properties["porc motivo INFORMACION_GENERAL"]`,
    label: "Porcentaje de expedientes por información general",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc motivo TRAMITACION_BONO_SOCIAL": {
    key: "porc motivo TRAMITACION_BONO_SOCIAL",
    path: `feature.properties["porc motivo TRAMITACION_BONO_SOCIAL"]`,
    label: "Porcentaje de expedientes por bono social",
    legend: {
      values: [20, 10, 5, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc motivo OPTIMIZACION_FACTURA barrio": {
    key: "porc motivo OPTIMIZACION_FACTURA barrio",
    path: `feature.properties["porc motivo OPTIMIZACION_FACTURA barrio"]`,
    label: "Porcentaje de expedientes por optimización de factura",
    legend: {
      values: [40, 35, 30, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc A través de una persona conocida": {
    key: "porc A través de una persona conocida",
    path: `feature.properties["porc A través de una persona conocida"]`,
    label: "Porcentaje de expedientes por recomendación",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc Comunicaciones del Ayuntamiento": {
    key: "porc Comunicaciones del Ayuntamiento",
    path: `feature.properties["porc Comunicaciones del Ayuntamiento"]`,
    label: "Porcentaje de expedientes por comunicaciones del ayuntamiento",
    legend: {
      values: [40, 25, 20, 10, 0],
      gradient: COLORMAP.primary,
    },
  },
  "porc Otros departamentos (SAV y otros)": {
    key: "porc Otros departamentos (SAV y otros)",
    path: `feature.properties["porc Otros departamentos (SAV y otros)"]`,
    label: "Porcentaje de expedientes por otros departamentos",
    legend: {
      values: [30, 20, 10, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc SS.SS": {
    key: "porc SS.SS",
    path: `feature.properties["porc SS.SS"]`,
    label: "Porcentaje de expedientes por servicios sociales",
    legend: {
      values: [20, 10, 5, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc Asociaciones y ONG's": {
    key: "porc Asociaciones y ONG's",
    path: `feature.properties["porc Asociaciones y ONG's"]`,
    label: "Porcentaje de expedientes por asociaciones y ONG's",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Intervalo de confianza (%)": {
    key: "Intervalo de confianza (%)",
    path: `feature.properties["Intervalo de confianza (%)"]`,
    label: "Intervalo de confianza",
    legend: {
      values: [10, 7, 4, 2, 0],
      gradient: COLORMAP.primary,
    },
  },
  "pob total (INE 22)": {
    key: "pob total (INE 22)",
    path: `feature.properties["pob total (INE 22)"]`,
    label: "Población total",
    legend: {
      values: [35000, 25000, 10000, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc pob menor de 14 años (INE 22)": {
    key: "porc pob menor de 14 años (INE 22)",
    path: `feature.properties["porc pob menor de 14 años (INE 22)"]`,
    label: "Porcentaje de población menor de 14 años",
    legend: {
      values: [20, 15, 10, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc pob de 65 y más años (INE 22)": {
    key: "porc pob de 65 y más años (INE 22)",
    path: `feature.properties["porc pob de 65 y más años (INE 22)"]`,
    label: "Porcentaje de población mayor de 65 años",
    legend: {
      values: [30, 25, 20, 15, 0],
      gradient: COLORMAP.primary,
    },
  },
  "edad media pob (INE 20)": {
    key: "edad media pob (INE 20)",
    path: `feature.properties["edad media pob (INE 20)"]`,
    label: "Edad media de la población",
    legend: {
      values: [45, 43, 40, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Educación primaria e inferior": {
    key: "Educación primaria e inferior",
    path: `feature.properties["Educación primaria e inferior"]`,
    label: "Educación primaria e inferior",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Primera etapa de Educación Secundaria y similar": {
    key: "Primera etapa de Educación Secundaria y similar",
    path: `feature.properties["Primera etapa de Educación Secundaria y similar"]`,
    label: "Primera etapa de Educación Secundaria y similar",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Segunda etapa de Educación Secundaria y Educación Postsecundaria no Superior":
    {
      key: "Segunda etapa de Educación Secundaria y Educación Postsecundaria no Superior",
      path: `feature.properties["Segunda etapa de Educación Secundaria y Educación Postsecundaria no Superior"]`,
      label:
        "Segunda etapa de Educación Secundaria y Educación Postsecundaria no Superior",
      legend: {
        values: [75, 50, 25, 0],
        gradient: COLORMAP.primary.slice(0, 4),
      },
    },
  "Educación Superior": {
    key: "Educación Superior",
    path: `feature.properties["Educación Superior"]`,
    label: "Educación Superior",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Índice de dependencia infantil (%)": {
    key: "Índice de dependencia infantil (%)",
    path: `feature.properties["Índice de dependencia infantil (%)"]`,
    label: "Índice de dependencia infantil",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Índice de dependencia de mayores (%)": {
    key: "Índice de dependencia de mayores (%)",
    path: `feature.properties["Índice de dependencia de mayores (%)"]`,
    label: "Índice de dependencia de mayores",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Índice de dependencia total (%)": {
    key: "Índice de dependencia total (%)",
    path: `feature.properties["Índice de dependencia total (%)"]`,
    label: "Índice de dependencia total",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "renta media hogar": {
    key: "renta media hogar",
    path: `feature.properties["renta media hogar"]`,
    label: "Renta media del hogar",
    legend: {
      values: [45000, 40000, 30000, 27000, 0],
      gradient: COLORMAP.primary,
    },
  },
  "tamaño medio hogar (INE 20)": {
    key: "tamaño medio hogar (INE 20)",
    path: `feature.properties["tamaño medio hogar (INE 20)"]`,
    label: "Tamaño medio del hogar",
    legend: {
      values: [3, 2.7, 2.5, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc hogares unipersonales (INE 20)": {
    key: "porc hogares unipersonales (INE 20)",
    path: `feature.properties["porc hogares unipersonales (INE 20)"]`,
    label: "Porcentaje de hogares unipersonales",
    legend: {
      values: [28, 20, 17.5, 15, 0],
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
