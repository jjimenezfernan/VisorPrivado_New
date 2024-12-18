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
  "t18_1": {
    key: "t18_1",
    path: `feature.properties["t18_1"]`,
    label: "Número de viviendas",
    legend: {
      values: [1200, 900, 600, 300, 0],
      gradient: COLORMAP.primary,
    },
  },
  "ano": {
    key: "ano",
    path: `feature.properties["ano"]`,
    label: "Antigüedad media de las viviendas",
    legend: {
      values: [2010, 2000, 1990, 1980, 1970],
      gradient: COLORMAP.primary,
    },
  },
  "n exptes SSCC": {
    key: "n exptes SSCC",
    path: `feature.properties["n exptes SSCC"]`,
    label: "Nº de expedientes",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION": {
    key: "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION",
    path: `feature.properties["porc motivo TRAMITACION_AYUDAS_A_REHABILITACION"]`,
    label: "Solicitud de Ayudas a la rehabilitación (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc motivo INFORMACION_GENERAL": {
    key: "porc motivo INFORMACION_GENERAL",
    path: `feature.properties["porc motivo INFORMACION_GENERAL"]`,
    label: "Solicitud de Información General (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc motivo suministros": {
    key: "porc motivo suministros",
    path: `feature.properties["porc motivo suministros"]`,
    label: "Solicitud de gestión de suministros (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc motivo comunidad energética": {
    key: "porc motivo comunidad energética",
    path: `feature.properties["porc motivo comunidad energética"]`,
    label: "Solicitud de información sobre comunidad energética (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc A través de una persona conocida": {
    key: "porc A través de una persona conocida",
    path: `feature.properties["porc A través de una persona conocida"]`,
    label: "Visita a OHS a través de una persona conocida (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc Comunicaciones del Ayuntamiento": {
    key: "porc Comunicaciones del Ayuntamiento",
    path: `feature.properties["porc Comunicaciones del Ayuntamiento"]`,
    label: "Visita a OHS por Comunicaciones del Ayuntamiento (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc SS.SS": {
    key: "porc SS.SS",
    path: `feature.properties["porc SS.SS"]`,
    label: "Visita a OHS a través de SS.SS (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc ERRP y OTC": {
    key: "porc ERRP y OTC",
    path: `feature.properties["porc ERRP y OTC"]`,
    label: "Visita a OHS a través de ERRP y OTC (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc Eventos/Difusión": {
    key: "porc Eventos/Difusión",
    path: `feature.properties["porc Eventos/Difusión"]`,
    label: "Visita a OHS a través de eventos de difusión (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "Intervalo de confianza (%)": {
    key: "Intervalo de confianza (%)",
    path: `feature.properties["Intervalo de confianza (%)"]`,
    label: "Intervalo de confianza (%)",
    legend: {
      values: [20, 15, 10, 5, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "t1_1": {
    key: "t1_1",
    path: `feature.properties["t1_1"]`,
    label: "Población total",
    legend: {
      values: [2500, 2000, 1500, 1000, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "t4_1": {
    key: "t4_1",
    path: `feature.properties["t4_1"]`,
    label: "Pob. menor de 14 años (%)",
    legend: {
      values: [40, 30, 20, 10, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "t4_3": {
    key: "t4_3",
    path: `feature.properties["t4_3"]`,
    label: "Pob. mayor de 65 años (%)",
    legend: {
      values: [40, 30, 20, 10, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "t3_1": {
    key: "t3_1",
    path: `feature.properties["t3_1"]`,
    label: "Edad media población",
    legend: {
      values: [45, 40, 35, 30, 25],
      gradient: COLORMAP.primary,
    },
  },
  "t31_1di": {
    key: "t31_1di",
    path: `feature.properties["t31_1di"]`,
    label: "Índice de dependencia infantil (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "t31_2dm": {
    key: "t31_2dm",
    path: `feature.properties["t31_2dm"]`,
    label: "Índice de dependencia de mayores (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "t31_3dt": {
    key: "t31_3dt",
    path: `feature.properties["t31_3dt"]`,
    label: "Índice de dependencia total (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "t32_ei": {
    key: "t32_ei",
    path: `feature.properties["t32_ei"]`,
    label: "Pob. con estudios primarios o inferiores (%)",
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
      values: [200, 150, 100, 50, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "precio_alquiler": {
    key: "precio_alquiler",
    path: `feature.properties["precio_alquiler"]`,
    label: "Precio medio alquiler",
    legend: {
      values: [800, 700, 600, 500, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "renta_hogar": {
    key: "renta_hogar",
    path: `feature.properties["renta_hogar"]`,
    label: "Renta media por hogar (€)",
    legend: {
      values: [45000, 40000, 35000, 30000, 25000],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc disconfort inv": {
    key: "porc disconfort inv",
    path: `feature.properties["porc disconfort inv"]`,
    label: "Disconfort invierno (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc disconfort ver": {
    key: "porc disconfort ver",
    path: `feature.properties["porc disconfort ver"]`,
    label: "Disconfort verano (%)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "porc retraso pago facturas": {
    key: "porc retraso pago facturas",
    path: `feature.properties["porc retraso pago facturas"]`,
    label: "Retraso en el pago de facturas (% población)",
    legend: {
      values: [80, 60, 40, 20, 0],
      gradient: COLORMAP.primary.slice(0, 4),
    },
  },
  "t30_th": {
    key: "t30_th",
    path: `feature.properties["t30_th"]`,
    label: "Tamaño medio del hogar",
    legend: {
      values: [4.0, 3.5, 3.0, 2.5, 2.0],
      gradient: COLORMAP.primary,
    },
  },
  "t22_1_porc": {
    key: "t22_1_porc",
    path: `feature.properties["t22_1_porc"]`,
    label: "Hogares unipersonales (%)",
    legend: {
      values: [40, 30, 20, 10, 0],
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
