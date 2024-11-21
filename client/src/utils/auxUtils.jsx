export function splitString(str, maxChars) {
  if (str.length <= maxChars) {
    return str;
  }
  const spaceIndex = str.lastIndexOf(" ", maxChars);
  if (spaceIndex === -1) {
    return (
      str.slice(0, maxChars) + "\n" + splitString(str.slice(maxChars), maxChars)
    );
  }
  return (
    str.slice(0, spaceIndex) +
    "\n" +
    splitString(str.slice(spaceIndex + 1), maxChars)
  );
}

export function getLastPartOfString(str) {
  const parts = str.split(" - ");
  return parts.pop();
}

//convert value into a more readable format
export function readableValueEPIU(key, value) {
  if (typeof value === "string") {
    if (key === "currentUse") {
      switch (value) {
        case "1_residential":
          return "Residencial";
        case "2_agriculture":
          return "Agricultura";
        case "3_industrial":
          return "Industrial";
        case "4_1_office":
          return "Oficina";
        case "4_2_retail":
          return "Comercial";
        case "4_3_publicServices":
          return "Ed. Públicos";
        default:
          return value;
      }
    } else if (key === "tipo_viv") {
      switch (value) {
        case "edificio viv":
          return "Edificio";
        case "viv unifamiliar":
          return "Unifamiliar";
        case "Oficinas":
          return "Oficinas";
        case "comercial":
          return "Comercial";
        case "Hospitales":
          return "Hospitales";
        case "Centros de enseñanza":
          return "Centros de enseñanza";
        case "Hoteles y restaurantes":
          return "Hoteles y restaurantes";
        case "Instalaciones deportivas":
          return "Instalaciones deportivas";
        case "Otros tipos de edificios":
          return "Otro tipo";
        default:
          return value;
      }
    } else if (key === "Building_Getafe_Barrio") {
      switch (value) {
        case "MARGARITAS":
          return "Las Margaritas";
        case "ALHONDIGA":
          return "La Alhóndiga";
        default:
          return value;
      }
    } else {
      return value;
    }
  } else if (typeof value === "number") {
    if (value % 1 !== 0) {
      // If it has decimals, round it to two decimal places
      return parseFloat(value.toFixed(2));
    } else {
      // If it's an integer, return it as is
      return value;
    }
  }
  return value;
}

const mapEPIUKeys = new Map();
mapEPIUKeys.set("reference", "Referencia");
mapEPIUKeys.set("currentUse", "Uso principal");
mapEPIUKeys.set("numberOfDw", "Número de viviendas");
mapEPIUKeys.set("ano_constr", "Año de construcción");
mapEPIUKeys.set("tipo_viv", "Tipo de vivienda");
mapEPIUKeys.set("Building_Getafe_Barrio", "Barrio");
mapEPIUKeys.set("Building_Getafe_n exptes", "Número de expedientes");
mapEPIUKeys.set("Building_Getafe_porc viv OHS", "Viviendas OHS (%)");
mapEPIUKeys.set(
  "Building_Getafe_porc retraso pago facturas",
  "Retraso pago facturas (%)"
);
mapEPIUKeys.set("Building_Getafe_disconfort inv", "Disconfort invierno (%)");
mapEPIUKeys.set("Building_Getafe_disconfort ver", "Disconfort verano (%)");
mapEPIUKeys.set("Building_Getafe_porc alquiler", "Alquiler (%)");
mapEPIUKeys.set(
  "Building_Getafe_porc prop sin hipoteca",
  "Propiedad sin hipoteca (%)"
);
mapEPIUKeys.set(
  "Building_Getafe_porc prop con hipoteca",
  "Propiedad con hipoteca (%)"
);
mapEPIUKeys.set("Building_Getafe_porc no calefaccion", "Sin calefacción (%)");
mapEPIUKeys.set(
  "Building_Getafe_porc no refrigeracion",
  "Sin refrigeración (%)"
);
// mapEPIUKeys.set("Building_Getafe_porc renta antigua", "Renta antigua (%)");
// mapEPIUKeys.set("Building_Getafe_porc cesion", "Cesión (%)");
mapEPIUKeys.set(
  "Building_Getafe_porc patologias exptes",
  "Expedientes con patologías (%)"
);
mapEPIUKeys.set("Building_Getafe_cert emision CO2", "Cert. emisión CO2");
mapEPIUKeys.set(
  "Building_Getafe_cert consumo e primaria",
  "Cert. consumo energía primaria"
);
mapEPIUKeys.set(
  "Building_Getafe_prod fotovol",
  "Producción fotovoltaica (MWh/año)"
);
mapEPIUKeys.set(
  "Building_Getafe_irradiacion anual kwh/m2",
  "Irradiación anual (kWh/m2)"
);
mapEPIUKeys.set(
  "Building_Getafe_Medidas recibidas: Kit de eficiencia energética Cruz Roja",
  "Kit de eficiencia energética"
);
mapEPIUKeys.set(
  "Building_Getafe_Medidas recibidas: Medidas de rehabilitación en vivienda",
  "Rehabilitación en vivienda"
);
mapEPIUKeys.set(
  "Building_Getafe_Medidas recibidas: Medidas de rehabilitación en edificio",
  "Rehabilitación en edificio"
);

const mapSSCCKeys = new Map();
mapSSCCKeys.set("CUSEC", "Nº de SSCC");
mapSSCCKeys.set("barrio", "Barrio");
mapSSCCKeys.set("n viviendas", "Número de viviendas");
mapSSCCKeys.set("ano constru SSCC", "Antigüedad media de las viviendas");
mapSSCCKeys.set("n exptes SSCC", "Nº de expedientes");
mapSSCCKeys.set(
  "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION",
  "Solicitud de Ayudas a la rehabilitación (%)"
);
mapSSCCKeys.set(
  "porc motivo OPTIMIZACION_FACTURA barrio",
  "Usuarios OHS que solicita Optimización de factura (%)"
);
mapSSCCKeys.set(
  "porc motivo INFORMACION_GENERAL",
  "Solicitud de Información General (%)"
);
mapSSCCKeys.set(
  "porc motivo TRAMITACION_BONO_SOCIAL",
  "Solicitud de Tramitación del Bono Social (%)"
);
mapSSCCKeys.set(
  "porc motivo OTROS_MOTIVOS",
  "Solicitud de Asesoramiento por Otros motivos (%)"
);
mapSSCCKeys.set(
  "porc A través de una persona conocida",
  "Visita a OHS a través de una persona conocida (%)"
);
mapSSCCKeys.set(
  "porc Comunicaciones del Ayuntamiento",
  "Visita a OHS por Comunicaciones del Ayuntamiento (%)"
);
mapSSCCKeys.set(
  "porc Otros departamentos (SAV y otros)",
  "Visita a OHS por Otros departamentos (SAV y otros) (%)"
);
mapSSCCKeys.set("porc SS.SS", "Visita a OHS a través de SS.SS (%)");
mapSSCCKeys.set("porc Directamente", "Visita a OHS Directamente (%)");
mapSSCCKeys.set(
  "porc Administrador de fincas",
  "Visita a OHS por Administrador de fincas (%)"
);
mapSSCCKeys.set("porc Entidades EPIU", "Visita a OHS por Entidades EPIU (%)");
mapSSCCKeys.set(
  "porc Asociaciones y ONG's",
  "Visita a OHS por Asociaciones y ONG's (%)"
);
mapSSCCKeys.set("Edad media pob (INE 20)", "Edad media población");
mapSSCCKeys.set(
  "porc pob menor de 14 años (INE 22)",
  "Pob. menor de 14 años (%)"
);
mapSSCCKeys.set(
  "porc pob de 65 y más años (INE 22)",
  "Pob. mayor de 65 años (%)"
);
mapSSCCKeys.set("pob total (INE 22)", "Población total");
mapSSCCKeys.set(
  "Educación primaria e inferior",
  "Pob. con estudios primarios o inferiores (%)"
);
mapSSCCKeys.set(
  "Primera etapa de Educación Secundaria y similar",
  "Pob. con estudios secundarios (%)"
);
mapSSCCKeys.set(
  "Segunda etapa de Educación Secundaria y Educación Postsecundaria no Superior",
  "Pob. con estudios de bachillerato (%)"
);
mapSSCCKeys.set("Educación Superior", "Pob. con estudios superiores (%)");
mapSSCCKeys.set(
  "porc dependencia - discapacidad SSCC",
  "Población con dependencia-discapacidad (%)"
);
mapSSCCKeys.set(
  "Índice de dependencia infantil (%)",
  "Índice de dependencia infantil (%)"
);
mapSSCCKeys.set(
  "Índice de dependencia de mayores (%)",
  "Índice de dependencia de mayores (%)"
);
mapSSCCKeys.set(
  "Índice de dependencia total (%)",
  "Índice de dependencia total (%)"
);
mapSSCCKeys.set("porc disconfort inv", "Disconfort invierno (%)");
mapSSCCKeys.set("porc disconfort ver", "Disconfort verano (%)");
mapSSCCKeys.set("renta media hogar", "Renta media por hogar (€)");
mapSSCCKeys.set("tamaño medio hogar (INE 20)", "Tamaño medio del hogar");
mapSSCCKeys.set(
  "porc hogares unipersonales (INE 20)",
  "Hogares unipersonales (%)"
);
mapSSCCKeys.set(
  "porc retraso pago facturas",
  "Retraso en el pago de facturas (% población)"
);
mapSSCCKeys.set("Intervalo de confianza (%)", "Intervalo de confianza (%)");

const mapBarrioKeys = new Map();
mapBarrioKeys.set("BARRIO", "Barrio");
mapBarrioKeys.set("n viviendas", "Número de viviendas");
mapBarrioKeys.set("ano constru barrio", "Antigüedad media de las viviendas");
mapBarrioKeys.set("porc exptes", "Expedientes (%)");
mapBarrioKeys.set(
  "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION",
  "Solicitud de Ayudas a la rehabilitación (%)"
);
mapBarrioKeys.set(
  "porc motivo OPTIMIZACION_FACTURA barrio",
  "Solicitud de Optimización de factura (%)"
);
mapBarrioKeys.set(
  "porc motivo INFORMACION_GENERAL",
  "Solicitud de Información General (%)"
);
mapBarrioKeys.set(
  "porc motivo TRAMITACION_BONO_SOCIAL",
  "Solicitud de Tramitación del Bono Social (%)"
);
mapBarrioKeys.set(
  "porc A través de una persona conocida",
  "Visita a OHS a través de una persona conocida (%)"
);
mapBarrioKeys.set(
  "porc Comunicaciones del Ayuntamiento",
  "Visita a OHS por Comunicaciones del Ayuntamiento (%)"
);
mapBarrioKeys.set(
  "porc Otros departamentos (SAV y otros)",
  "Visita a OHS por Otros departamentos (SAV y otros) (%)"
);
mapBarrioKeys.set("porc SS.SS", "Visita a OHS a través de SS.SS (%)");
mapBarrioKeys.set(
  "porc Asociaciones y ONG's",
  "Visita a OHS por Asociaciones y ONG's (%)"
);
mapBarrioKeys.set("Intervalo de confianza (%)", "Intervalo de confianza (%)");
mapBarrioKeys.set("edad media pob (INE 20)", "Edad media población");
mapBarrioKeys.set(
  "porc pob menor de 14 años (INE 22)",
  "Pob. menor de 14 años (%)"
);
mapBarrioKeys.set(
  "porc pob de 65 y más años (INE 22)",
  "Pob. mayor de 65 años (%)"
);
mapBarrioKeys.set("pob total (INE 22)", "Población total");
mapBarrioKeys.set(
  "Educación primaria e inferior",
  "Pob. con estudios primarios o inferiores (%)"
);
mapBarrioKeys.set(
  "Primera etapa de Educación Secundaria y similar",
  "Pob. con estudios secundarios (%)"
);
mapBarrioKeys.set(
  "Segunda etapa de Educación Secundaria y Educación Postsecundaria no Superior",
  "Pob. con estudios de bachillerato (%)"
);
mapBarrioKeys.set("Educación Superior", "Pob. con estudios superiores (%)");
mapBarrioKeys.set(
  "Índice de dependencia infantil (%)",
  "Índice de dependencia infantil (%)"
);
mapBarrioKeys.set(
  "Índice de dependencia de mayores (%)",
  "Índice de dependencia de mayores (%)"
);
mapBarrioKeys.set(
  "Índice de dependencia total (%)",
  "Índice de dependencia total (%)"
);
mapBarrioKeys.set("renta media hogar", "Renta media por hogar (€)");
mapBarrioKeys.set(
  "tamaño medio hogar (INE 20)",
  "Tamaño medio del hogar (hab.)"
);
mapBarrioKeys.set(
  "porc hogares unipersonales (INE 20)",
  "Hogares unipersonales (%)"
);

export { mapEPIUKeys, mapSSCCKeys, mapBarrioKeys };
