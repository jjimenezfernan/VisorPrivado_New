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
  "n viviendas": {
    key: "n viviendas",
    path: `feature.properties["n viviendas"]`,
    label: "Número de viviendas",
    legend: {
      values: [1000, 800, 600, 400, 0],
      gradient: COLORMAP.primary,
    },
  },
  "ano constru SSCC": {
    key: "ano constru SSCC",
    path: `feature.properties["ano constru SSCC"]`,
    label: "Antigüedad media de las viviendas",
    legend: {
      values: [2010, 1995, 1980, 1955, 0],
      gradient: COLORMAP.primary,
    },
  },
  "n exptes SSCC": {
    key: "n exptes SSCC",
    path: `feature.properties["n exptes SSCC"]`,
    label: "Nº de expedientes",
    legend: {
      values: [30, 20, 10, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION": {
    key: "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION",
    path: `feature.properties["porc motivo TRAMITACION_AYUDAS_A_REHABILITACION"]`,
    label: "Solicitud de Ayudas a la rehabilitación (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc motivo OPTIMIZACION_FACTURA barrio": {
    key: "porc motivo OPTIMIZACION_FACTURA barrio",
    path: `feature.properties["porc motivo OPTIMIZACION_FACTURA barrio"]`,
    label: "Usuarios OHS que solicita Optimización de factura (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc motivo INFORMACION_GENERAL": {
    key: "porc motivo INFORMACION_GENERAL",
    path: `feature.properties["porc motivo INFORMACION_GENERAL"]`,
    label: "Solicitud de Información General (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc motivo TRAMITACION_BONO_SOCIAL": {
    key: "porc motivo TRAMITACION_BONO_SOCIAL",
    path: `feature.properties["porc motivo TRAMITACION_BONO_SOCIAL"]`,
    label: "Solicitud de Tramitación del Bono Social (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc motivo OTROS_MOTIVOS": {
    key: "porc motivo OTROS_MOTIVOS",
    path: `feature.properties["porc motivo OTROS_MOTIVOS"]`,
    label: "Solicitud de Asesoramiento por Otros motivos (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc A través de una persona conocida": {
    key: "porc A través de una persona conocida",
    path: `feature.properties["porc A través de una persona conocida"]`,
    label: "Visita a OHS a través de una persona conocida (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc Comunicaciones del Ayuntamiento": {
    key: "porc Comunicaciones del Ayuntamiento",
    path: `feature.properties["porc Comunicaciones del Ayuntamiento"]`,
    label: "Visita a OHS por Comunicaciones del Ayuntamiento (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc Otros departamentos (SAV y otros)": {
    key: "porc Otros departamentos (SAV y otros)",
    path: `feature.properties["porc Otros departamentos (SAV y otros)"]`,
    label: "Visita a OHS por Otros departamentos (SAV y otros) (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc SS.SS": {
    key: "porc SS.SS",
    path: `feature.properties["porc SS.SS"]`,
    label: "Visita a OHS a través de SS.SS (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc Directamente": {
    key: "porc Directamente",
    path: `feature.properties["porc Directamente"]`,
    label: "Visita a OHS Directamente (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc Administrador de fincas": {
    key: "porc Administrador de fincas",
    path: `feature.properties["porc Administrador de fincas"]`,
    label: "Visita a OHS por Administrador de fincas (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc Entidades EPIU": {
    key: "porc Entidades EPIU",
    path: `feature.properties["porc Entidades EPIU"]`,
    label: "Visita a OHS por Entidades EPIU (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc Asociaciones y ONG's": {
    key: "porc Asociaciones y ONG's",
    path: `feature.properties["porc Asociaciones y ONG's"]`,
    label: "Visita a OHS por Asociaciones y ONG's (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 7),
    },
  },
  "Edad media pob (INE 20)": {
    key: "Edad media pob (INE 20)",
    path: `feature.properties["Edad media pob (INE 20)"]`,
    label: "Edad media población",
    legend: {
      values: [50, 45, 40, 30, 0],
      gradient: COLORMAP.primary,
    },
  },
  "porc pob menor de 14 años (INE 22)": {
    key: "porc pob menor de 14 años (INE 22)",
    path: `feature.properties["porc pob menor de 14 años (INE 22)"]`,
    label: "Pob. menor de 14 años (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc pob de 65 y más años (INE 22)": {
    key: "porc pob de 65 y más años (INE 22)",
    path: `feature.properties["porc pob de 65 y más años (INE 22)"]`,
    label: "Pob. mayor de 65 años (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "pob total (INE 22)": {
    key: "pob total (INE 22)",
    path: `feature.properties["pob total (INE 22)"]`,
    label: "Población total",
    legend: {
      values: [2500, 2000, 1500, 1000, 0],
      gradient: COLORMAP.primary,
    },
  },
  "Educación primaria e inferior": {
    key: "Educación primaria e inferior",
    path: `feature.properties["Educación primaria e inferior"]`,
    label: "Pob. con estudios primarios o inferiores (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Primera etapa de Educación Secundaria y similar": {
    key: "Primera etapa de Educación Secundaria y similar",
    path: `feature.properties["Primera etapa de Educación Secundaria y similar"]`,
    label: "Pob. con estudios secundarios (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Segunda etapa de Educación Secundaria y Educación Postsecundaria no Superior":
    {
      key: "Segunda etapa de Educación Secundaria y Educación Postsecundaria no Superior",
      path: `feature.properties["Segunda etapa de Educación Secundaria y Educación Postsecundaria no Superior"]`,
      label: "Pob. con estudios de bachillerato (%)",
      legend: {
        values: [75, 50, 25, 0],
        gradient: COLORMAP.primary.slice(0, 4),
      },
    },
  "Educación Superior": {
    key: "Educación Superior",
    path: `feature.properties["Educación Superior"]`,
    label: "Pob. con estudios superiores (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc dependencia - discapacidad SSCC": {
    key: "porc dependencia - discapacidad SSCC",
    path: `feature.properties["porc dependencia - discapacidad SSCC"]`,
    label: "Población con dependencia-discapacidad (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Índice de dependencia infantil (%)": {
    key: "Índice de dependencia infantil (%)",
    path: `feature.properties["Índice de dependencia infantil (%)"]`,
    label: "Índice de dependencia infantil (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Índice de dependencia de mayores (%)": {
    key: "Índice de dependencia de mayores (%)",
    path: `feature.properties["Índice de dependencia de mayores (%)"]`,
    label: "Índice de dependencia de mayores (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Índice de dependencia total (%)": {
    key: "Índice de dependencia total (%)",
    path: `feature.properties["Índice de dependencia total (%)"]`,
    label: "Índice de dependencia total (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc disconfort inv": {
    key: "porc disconfort inv",
    path: `feature.properties["porc disconfort inv"]`,
    label: "Disconfort invierno (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc disconfort ver": {
    key: "porc disconfort ver",
    path: `feature.properties["porc disconfort ver"]`,
    label: "Disconfort verano (%)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "renta media hogar": {
    key: "renta media hogar",
    path: `feature.properties["renta media hogar"]`,
    label: "Renta media por hogar (€)",
    legend: {
      values: [50000, 40000, 30000, 23000, 0],
      gradient: COLORMAP.primary,
    },
  },
  "tamaño medio hogar (INE 20)": {
    key: "tamaño medio hogar (INE 20)",
    path: `feature.properties["tamaño medio hogar (INE 20)"]`,
    label: "Tamaño medio del hogar",
    legend: {
      values: [3, 2.5, 2.4, 2.25, 0],
      gradient: COLORMAP.primary,
    },
  },
  "porc hogares unipersonales (INE 20)": {
    key: "porc hogares unipersonales (INE 20)",
    path: `feature.properties["porc hogares unipersonales (INE 20)"]`,
    label: "Hogares unipersonales (%)",
    legend: {
      values: [35, 30, 20, 10, 0],
      gradient: COLORMAP.primary,
    },
  },
  "porc retraso pago facturas": {
    key: "porc retraso pago facturas",
    path: `feature.properties["porc retraso pago facturas"]`,
    label: "Retraso en el pago de facturas (% población)",
    legend: {
      values: [75, 50, 25, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Intervalo de confianza (%)": {
    key: "Intervalo de confianza (%)",
    path: `feature.properties["Intervalo de confianza (%)"]`,
    label: "Intervalo de confianza (%)",
    legend: {
      values: [20, 10, 5, 0],
      gradient: COLORMAP.primary.slice(0, 4),
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
