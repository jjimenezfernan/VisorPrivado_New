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

// Keys for the EPIU dataset
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

// Keys for the SSCC dataset
const mapSSCCKeys = new Map();
mapSSCCKeys.set("cusec", "Nº de SSCC");
mapSSCCKeys.set("barrio", "Barrio");
mapSSCCKeys.set("t18_1", "Número de viviendas");
mapSSCCKeys.set("ano", "Antigüedad media de las viviendas");
mapSSCCKeys.set("n exptes SSCC", "Nº de expedientes");
mapSSCCKeys.set("porc motivo TRAMITACION_AYUDAS_A_REHABILITACION", "Solicitud de Ayudas a la rehabilitación (%)");
mapSSCCKeys.set("porc motivo INFORMACION_GENERAL", "Solicitud de Información General (%)");
mapSSCCKeys.set("porc motivo suministros", "Solicitud de gestión de suministros (%)");
mapSSCCKeys.set("porc motivo comunidad energética", "Solicitud de información sobre comunidad energética (%)");
mapSSCCKeys.set("porc A través de una persona conocida", "Visita a OHS a través de una persona conocida (%)");
mapSSCCKeys.set("porc Comunicaciones del Ayuntamiento", "Visita a OHS por Comunicaciones del Ayuntamiento (%)");
mapSSCCKeys.set("porc SS.SS", "Visita a OHS a través de SS.SS (%)");
mapSSCCKeys.set("porc ERRP y OTC","Visita a OHS a través de ERRP y OTC (%)");
mapSSCCKeys.set("porc Eventos/Difusión","Visita a OHS a través de eventos de difusión (%)");
mapSSCCKeys.set("Intervalo de confianza (%)","Intervalo de confianza (%)");
mapSSCCKeys.set("t1_1","Población total");
mapSSCCKeys.set("t4_1","Pob. menor de 14 años (%)");
mapSSCCKeys.set("t4_3","Pob. mayor de 65 años (%)");
mapSSCCKeys.set("t3_1","Edad media población");
mapSSCCKeys.set("t31_1di","Índice de dependencia infantil (%)");
mapSSCCKeys.set("t31_2dm","Índice de dependencia de mayores (%)");
mapSSCCKeys.set("t31_3dt","Índice de dependencia total (%)");
mapSSCCKeys.set("t32_ei","Pob. con estudios primarios o inferiores (%)");
mapSSCCKeys.set("n_alquiler","Viviendas en alquiler");
mapSSCCKeys.set("precio_alquiler","Precio medio alquiler");
mapSSCCKeys.set("renta_hogar","Renta media por hogar (€)");
mapSSCCKeys.set("porc disconfort inv","Disconfort invierno (%)");
mapSSCCKeys.set("porc disconfort ver","Disconfort verano (%)");
mapSSCCKeys.set("porc retraso pago facturas", "Retraso en el pago de facturas (% población)");
mapSSCCKeys.set("t30_th","Tamaño medio del hogar");
mapSSCCKeys.set("t22_1_porc","Hogares unipersonales (%)");

// Keys for the Barrio dataset
const mapBarrioKeys = new Map();
mapBarrioKeys.set("barrio", "Barrio");
mapBarrioKeys.set("t18_1", "Número de viviendas");
mapBarrioKeys.set("ano", "Antigüedad media de las viviendas");
mapBarrioKeys.set("ac_porc_expedientes", "Expedientes (%)");
mapBarrioKeys.set("ac_motivo_rehab", "Solicitud de Ayudas a la rehabilitación (%)");
mapBarrioKeys.set("ac_motivo_infogeneral", "Solicitud de información general (%)");
mapBarrioKeys.set("ac_motivo_suminsitros", "Solicitud de gestión de suministros (%)");
mapBarrioKeys.set("ac_motivo_comener", "Solicitud de información sobre comunidad energética (%)");
mapBarrioKeys.set("ac_origen_ayto", "Visita a OHS por Comunicaciones del Ayuntamiento (%)");
mapBarrioKeys.set("ac_origen_ssss", "Visita a OHS a través de SS.SS (%)");
mapBarrioKeys.set("porc SS.SS", "Visita a OHS a través de SS.SS (%)");
mapBarrioKeys.set("ac_origen_errp", "Visita a OHS a través de ERRP y OTC (%)");
mapBarrioKeys.set("ac_origen_eventos", "Visita a OHS a través de eventos de difusión (%)");
mapBarrioKeys.set("ac_origen_conocido", "Visita a OHS a través de una persona conocida (%)");
mapBarrioKeys.set("t1_1", "Población total");
mapBarrioKeys.set("t4_1", "Pob. menor de 14 años (%)");
mapBarrioKeys.set("t4_3", "Pob. mayor de 65 años (%)");
mapBarrioKeys.set("t3_1", "Edad media población");
mapBarrioKeys.set("t31_2dm", "Índice de dependencia de mayores (%)");
mapBarrioKeys.set("t31_3dt", "Índice de dependencia total (%)");
mapBarrioKeys.set("n_alquiler", "Viviendas en alquiler");
mapBarrioKeys.set("precio_alquiler", "Precio medio alquiler");
mapBarrioKeys.set("renta_hogar", "Renta media por hogar (€)");
mapBarrioKeys.set("t22_1_porc", "Hogares unipersonales (%)");

export { mapEPIUKeys, mapSSCCKeys, mapBarrioKeys };
