const express = require("express");
const cors = require("cors");
var XLSX = require("xlsx");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const PORT = require("./ip_constants.js");

const app = express();

app.use(cors());
app.use(bodyParser.json());

//this line makes it incompatible with server
// const { PATHKEYS } = require("./resources/ohs/pathKeys");

const geoBuildingPath = path.join(
  __dirname,
  "resources/map/BuildingSSCC.geojson"
);
const geoSSCCPath = path.join(__dirname, "resources/map/SSCC.geojson");
const geoEPIUPath = path.join(__dirname, "resources/map/BuildingEPIU.geojson");
const geoEPIULimitesPath = path.join(
  __dirname,
  "resources/map/LimitesEPIU.geojson"
);
const geoBarrioPath = path.join(__dirname, "resources/map/Barrio.geojson");

const dataPathExcel_dashboard = "resources/data_dashboard.xlsx";
const dataPathExcel_analisis = "resources/data_analisis.xlsx";
const dataPathExcel_formacion = "resources/data_formacion.xlsx";
const dataPathExcel_derivacion = "resources/data_derivacion.xlsx";
const dataPathExcel_concienciacion = "resources/data_awareness.xlsx";
const dataPathExcel_intervenciones = "resources/data_intervenciones.xlsx";
const dataPathJSON_ohs = "resources/ohs/ohs_rawdata.json";

const colors = [
  "#9a031e",
  "#0074D9",
  "#3D9970",
  "#001f3f",
  "#e27429",
  "#3F51B5",
  "#85144b",
  "#006d77",
  "#FFD700",
  "#207d7d",
  "#2ECC40",
  "#e8b02c",
  "#7FDBFF",
  "#9C27B0",
  "#39CCCC",
  "#e04abd",
];

const colorsSunBurst0 = [
  "#3485b9",
  "#d13f3f",
  "#5a9f5b",
  "#cc8e38",
  "#67a3cb",
  "#a35fa5",
  "#e8b02c",
];

const colorsSunBurst1 = {
  Goteras: "#cd5c5c",
  "Humedad en pared": "#68804d",
  "Humedad en suelo": "#67a3cb",
  Podredumbre: "#8f5fa4",
  Moho: "#3e647c",
  "Aire por las ventanas/puertas": "#FF851B",
};

const colorsSunBurst1Array = [
  "#cd5c5c",
  "#68804d",
  "#67a3cb",
  "#8f5fa4",
  "#3e647c",
  "#FF851B",
];

const colorsSunBurst2 = {
  "Hábito invierno ap.": "#4a6da7",
  "Hábito invierno conduct.": "#d13f3f",
  "Hábito verano ap.": "#5a9f5b",
  "Hábito verano conduct.": "#e8b02c",
};

const colorsBlue = [
  "#9ac2dc",
  "#85b6d5",
  "#71aace",
  "#5d9dc7",
  "#4891c0",
  "#3485b9",
  "#2f78a7",
  "#245d82",
  "#1f4f77",
  "#1a446b",
  "#163a5f",
  "#123054",
  "#0d2648",
];

/*
Function to load data from excel file.
Parameters:
dataPath - path to excel file
isRow - true to load the file by rows, false for columns
sheetN - sheet page to load, starting from 0
*/
function loadExcelData(dataPath, isRow, sheetN) {
  //Loading data
  var wb = XLSX.readFile(dataPath);
  var sheetName = wb.SheetNames[sheetN];
  var sheetValue = wb.Sheets[sheetName];
  const rowMajor = XLSX.utils.sheet_to_json(sheetValue, { header: 1 });
  var result = [];
  if (isRow) {
    result = rowMajor;
  } else {
    for (let i = 0; i < rowMajor.length; i++) {
      for (let j = 0; j < rowMajor[i].length; j++) {
        if (!result[j]) result[j] = [];
        result[j][i] = rowMajor[i][j];
      }
    }
  }
  return result;
}

function getDateFromExcelNumber(excelNumber) {
  const excelEpoch = new Date(Date.UTC(1900, 0, 0));
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const offsetDays = Math.floor(excelNumber) - 1;
  const offsetMilliseconds = offsetDays * millisecondsPerDay;
  const date = new Date(excelEpoch.getTime() + offsetMilliseconds);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

//data has to be with no headers
function createBarChart(data, isPercentage) {
  const barChart = [];
  for (let i = 0; i < data.length; i++) {
    let obj = {};
    obj["id"] = data[i][0];
    if (isPercentage) {
      obj["valor"] = data[i][1] * 100;
    } else {
      obj["valor"] = data[i][1];
    }
    barChart.push(obj);
  }
  for (let i = 0; i < barChart.length; i++) {
    barChart[i]["valorColor"] = colors[i];
  }
  return barChart;
}

// Function to read a geojson file and return a promise
function readJsonFile(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const geojson = JSON.parse(data);
      resolve(geojson);
    });
  });
}

function resetCounters(obj) {
  for (const key in obj) {
    if (typeof obj[key] === "number") {
      obj[key] = 0;
    }
  }
}

//percentage values that aren't multiplied by 100
//there are some percentages that are already multiplied by 100
const porcSSCC = [
  "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION",
  "porc motivo OPTIMIZACION_FACTURA barrio",
  "porc motivo INFORMACION_GENERAL",
  "porc motivo TRAMITACION_BONO_SOCIAL",
  "porc motivo OTROS_MOTIVOS",
  "porc A través de una persona conocida",
  "porc Comunicaciones del Ayuntamiento",
  "porc Otros departamentos (SAV y otros)",
  "porc SS.SS",
  "porc Directamente",
  "porc Administrador de fincas",
  "porc Entidades EPIU",
  "porc Asociaciones y ONG's",
  "porc pob menor de 14 años (INE 22)",
  "porc pob de 65 y más años (INE 22)",
  "Educación primaria e inferior",
  "Primera etapa de Educación Secundaria y similar",
  "Segunda etapa de Educación Secundaria y Educación Postsecundaria no Superior",
  "Educación Superior",
  "porc dependencia - discapacidad SSCC",
  "Índice de dependencia infantil (%)",
  "Índice de dependencia de mayores (%)",
  "Índice de dependencia total (%)",
  "porc disconfort inv",
  "porc disconfort ver",
  // "porc hogares unipersonales (INE 20)", //this one is already multiplied by 100
  "porc retraso pago facturas",
];

//no se hacen medias en vez de sumatorios
const sumatoriosSSCC = ["n exptes SSCC", "pob total (INE 22)"];

//"SSCC Getafe_pob total (INE 22)" no queremos media, sino sumatorio
const mediasGlobalesKeysSSCC = {
  "n viviendas": 0,
  "ano constru SSCC": 0,
  "n exptes SSCC": 0,
  "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION": 0,
  "porc motivo OPTIMIZACION_FACTURA barrio": 0,
  "porc motivo INFORMACION_GENERAL": 0,
  "porc motivo TRAMITACION_BONO_SOCIAL": 0,
  "porc motivo OTROS_MOTIVOS": 0,
  "porc A través de una persona conocida": 0,
  "porc Comunicaciones del Ayuntamiento": 0,
  "porc Otros departamentos (SAV y otros)": 0,
  "porc SS.SS": 0,
  "porc Directamente": 0,
  "porc Administrador de fincas": 0,
  "porc Entidades EPIU": 0,
  "porc Asociaciones y ONG's": 0,
  "Edad media pob (INE 20)": 0,
  "porc pob menor de 14 años (INE 22)": 0,
  "porc pob de 65 y más años (INE 22)": 0,
  "pob total (INE 22)": 0,
  "Educación primaria e inferior": 0,
  "Primera etapa de Educación Secundaria y similar": 0,
  "Segunda etapa de Educación Secundaria y Educación Postsecundaria no Superior": 0,
  "Educación Superior": 0,
  "porc dependencia - discapacidad SSCC": 0,
  "Índice de dependencia infantil (%)": 0,
  "Índice de dependencia de mayores (%)": 0,
  "Índice de dependencia total (%)": 0,
  "porc disconfort inv": 0,
  "porc disconfort ver": 0,
  "renta media hogar": 0,
  "tamaño medio hogar (INE 20)": 0,
  "porc hogares unipersonales (INE 20)": 0,
  "porc retraso pago facturas": 0,
  "Intervalo de confianza (%)": 0,
};

let isProcessingSSCC = false;

app.get("/api/visor-sscc", async (req, res) => {
  //avoid multiple requests at the same time
  if (isProcessingSSCC) {
    res.status(429).send("Request in progress. Try again later.");
    return;
  }

  isProcessingSSCC = true;
  resetCounters(mediasGlobalesKeysSSCC);

  // Create an array of promises to read both geojson files
  const readGeojsonPromises = [readJsonFile(geoSSCCPath)];

  // Use Promise.all to read both files asynchronously
  Promise.all(readGeojsonPromises)
    .then(([geoSSCC]) => {
      geoSSCC["features"].forEach((feature) => {
        for (const key in feature.properties) {
          if (key === "Intervalo de confianza (%)") {
            const value = feature.properties[key];
            //just parsing, no need to multiply by 100
            let parsed = parseFloat(parseFloat(value).toFixed(2));
            if (!isNaN(parsed)) {
              feature.properties[key] = parsed;
            }
          } else if (porcSSCC.includes(key)) {
            const value = feature.properties[key];
            //toFixed converts it to string, so we need to convert it back to number
            let parsed = parseFloat((parseFloat(value) * 100).toFixed(2));
            if (!isNaN(parsed) && parsed !== 0) {
              feature.properties[key] = parsed;
            }
          }
        }
      });

      //sum all the values of the keys
      const globalesSSCC = {};
      geoSSCC["features"].forEach((feature) => {
        for (const key in feature.properties) {
          if (Object.keys(mediasGlobalesKeysSSCC).includes(key)) {
            const value = feature.properties[key];
            // console.log("key", key);
            // console.log("value", value);
            if (!isNaN(value) && value !== null && value !== 0) {
              //add to the accumulator
              globalesSSCC[key] = (globalesSSCC[key] ?? 0) + parseFloat(value);
              //increment the counter
              mediasGlobalesKeysSSCC[key]++;
            }
          }
        }
      });

      //counter of instances is to not count the nulls
      for (const key in globalesSSCC) {
        if (
          mediasGlobalesKeysSSCC[key] !== 0 &&
          !sumatoriosSSCC.includes(key)
        ) {
          globalesSSCC[key] = parseFloat(
            (globalesSSCC[key] / mediasGlobalesKeysSSCC[key]).toFixed(2)
          );
        }
      }

      // console.log("globalesSSCC", globalesSSCC);

      // Send the modified geojson data as the response
      res.json({ geoSSCC, globalesSSCC });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error reading file");
    })
    .finally(() => {
      isProcessingSSCC = false;
    });
});

const porcBarrio = [
  "porc exptes",
  "tamaño medio hogar (INE 20)",
  "porc pob menor de 14 años (INE 22)",
  "porc pob de 65 y más años (INE 22)",
  // "porc hogares unipersonales (INE 20)",
  "Educación primaria e inferior",
  "Primera etapa de Educación Secundaria y similar",
  "Segunda etapa de Educación Secundaria y Educación Postsecundaria no Superior",
  "Educación Superior",
  "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION",
  "porc motivo INFORMACION_GENERAL",
  "porc motivo TRAMITACION_BONO_SOCIAL",
  "porc motivo OPTIMIZACION_FACTURA barrio",
  "porc A través de una persona conocida",
  "porc Comunicaciones del Ayuntamiento",
  "porc Otros departamentos (SAV y otros)",
  "porc SS.SS",
  "porc Asociaciones y ONG's",
  "Índice de dependencia infantil (%)",
  "Índice de dependencia de mayores (%)",
  "Índice de dependencia total (%)",
  // "Intervalo de confianza (%)", //this one is already multiplied by 100
];
const sumatoriosBarrio = [
  "n viviendas",
  "n exptes barrio",
  "pob total (INE 22)",
];
const mediasGlobalesKeysBarrio = {
  "n viviendas": 0,
  "n exptes barrio": 0,
  "porc exptes": 0,
  "ano constru barrio": 0,
  "pob total (INE 22)": 0,
  "porc pob menor de 14 años (INE 22)": 0,
  "porc pob de 65 y más años (INE 22)": 0,
  "renta media hogar": 0,
  "edad media pob (INE 20)": 0,
  "tamaño medio hogar (INE 20)": 0,
  "porc hogares unipersonales (INE 20)": 0,
  "Educación primaria e inferior": 0,
  "Primera etapa de Educación Secundaria y similar": 0,
  "Segunda etapa de Educación Secundaria y Educación Postsecundaria no Superior": 0,
  "Educación Superior": 0,
  "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION": 0,
  "porc motivo INFORMACION_GENERAL": 0,
  "porc motivo TRAMITACION_BONO_SOCIAL": 0,
  "porc motivo OPTIMIZACION_FACTURA barrio": 0,
  "porc A través de una persona conocida": 0,
  "porc Comunicaciones del Ayuntamiento": 0,
  "porc Otros departamentos (SAV y otros)": 0,
  "porc SS.SS": 0,
  "porc Asociaciones y ONG's": 0,
  "Índice de dependencia infantil (%)": 0,
  "Índice de dependencia de mayores (%)": 0,
  "Índice de dependencia total (%)": 0,
  "Intervalo de confianza (%)": 0,
};

let isProcessingBarrio = false;

app.get("/api/visor-barrio", async (req, res) => {
  //avoid multiple requests at the same time
  if (isProcessingBarrio) {
    res.status(429).send("Request in progress. Try again later.");
    return;
  }

  isProcessingBarrio = true;
  resetCounters(mediasGlobalesKeysBarrio);

  // Create an array of promises to read both geojson files
  const readGeojsonPromises = [readJsonFile(geoBarrioPath)];

  // Use Promise.all to read both files asynchronously
  Promise.all(readGeojsonPromises)
    .then(([geoBarrio]) => {
      geoBarrio["features"].forEach((feature) => {
        for (const key in feature.properties) {
          if (
            key === "Intervalo de confianza (%)" ||
            key === "renta media hogar" ||
            key === "porc hogares unipersonales (INE 20)" ||
            key === "edad media pob (INE 20)"
          ) {
            const value = feature.properties[key];
            //just parsing, no need to multiply by 100
            let parsed = parseFloat(parseFloat(value).toFixed(2));
            if (!isNaN(parsed)) {
              feature.properties[key] = parsed;
            }
          } else if (porcBarrio.includes(key)) {
            const value = feature.properties[key];
            //toFixed converts it to string, so we need to convert it back to number
            let parsed = parseFloat((parseFloat(value) * 100).toFixed(2));
            if (!isNaN(parsed)) {
              feature.properties[key] = parsed;
            }
          }
        }
      });

      //sum all the values of the keys
      const globalesBarrio = {};
      geoBarrio["features"].forEach((feature) => {
        for (const key in feature.properties) {
          if (Object.keys(mediasGlobalesKeysBarrio).includes(key)) {
            const value = feature.properties[key];
            // console.log("key", key);
            // console.log("value", value);
            if (!isNaN(value) && value !== null && value !== 0) {
              //add to the accumulator
              globalesBarrio[key] =
                (globalesBarrio[key] ?? 0) + parseFloat(value);
              //increment the counter
              mediasGlobalesKeysBarrio[key]++;
            }
          }
        }
      });

      //counter of instances is to not count the nulls
      for (const key in globalesBarrio) {
        if (
          mediasGlobalesKeysBarrio[key] !== 0 &&
          !sumatoriosBarrio.includes(key)
        ) {
          globalesBarrio[key] = parseFloat(
            (globalesBarrio[key] / mediasGlobalesKeysBarrio[key]).toFixed(2)
          );
        }
      }

      // Send the modified geojson data as the response
      res.json({ geoBarrio, globalesBarrio });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error reading file");
    })
    .finally(() => {
      isProcessingBarrio = false;
    });
});

const porcEPIU = [
  "Building_Getafe_porc viv OHS",
  "Building_Getafe_porc retraso pago facturas",
  "Building_Getafe_disconfort inv",
  "Building_Getafe_disconfort ver",
  "Building_Getafe_porc alquiler",
  "Building_Getafe_porc prop sin hipoteca",
  "Building_Getafe_porc prop con hipoteca",
  "Building_Getafe_porc no calefaccion",
  "Building_Getafe_porc patologias exptes",
];

//value represents the nº of instances
const mediasGlobalesKeysEPIU = {
  numberOfDw: 0,
  ano_constr: 0,
  "Building_Getafe_n exptes": 0,
  "Building_Getafe_porc viv OHS": 0,
  "Building_Getafe_porc retraso pago facturas": 0,
  "Building_Getafe_disconfort inv": 0,
  "Building_Getafe_disconfort ver": 0,
  "Building_Getafe_porc alquiler": 0,
  "Building_Getafe_porc prop sin hipoteca": 0,
  "Building_Getafe_porc prop con hipoteca": 0,
  "Building_Getafe_porc no calefaccion": 0,
  "Building_Getafe_porc patologias exptes": 0,
  "Building_Getafe_prod fotovol": 0,
  "Building_Getafe_irradiacion anual kwh/m2": 0,
};

const mediasGlobalesKmediasCertificadosKeysEPIUeysEPIU = {
  "Building_Getafe_cert emision CO2": {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
    G: 0,
  },
  "Building_Getafe_cert consumo e primaria": {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
    G: 0,
  },
};

let isProcessingEPIU = false;

app.get("/api/visor-epiu", async (req, res) => {
  //avoid multiple requests at the same time
  if (isProcessingEPIU) {
    res.status(429).send("Request in progress. Try again later.");
    return;
  }

  isProcessingEPIU = true;
  resetCounters(mediasGlobalesKeysEPIU);
  resetCounters(
    mediasGlobalesKmediasCertificadosKeysEPIUeysEPIU[
    "Building_Getafe_cert emision CO2"
    ]
  );
  resetCounters(
    mediasGlobalesKmediasCertificadosKeysEPIUeysEPIU[
    "Building_Getafe_cert consumo e primaria"
    ]
  );

  // Create an array of promises to read both geojson files
  const readGeojsonPromises = [
    readJsonFile(geoEPIUPath),
    readJsonFile(geoEPIULimitesPath),
  ];

  // Use Promise.all to read both files asynchronously
  Promise.all(readGeojsonPromises)
    .then(([geoEPIU, geoEPIULimites]) => {
      geoEPIU["features"].forEach((feature) => {
        for (const key in feature.properties) {
          if (porcEPIU.includes(key)) {
            const value = feature.properties[key];
            //toFixed converts it to string, so we need to convert it back to number
            let parsed = parseFloat(value) * 100;
            // console.log("key", key);
            // console.log("prior", value);
            // console.log("post", parsed);
            if (!isNaN(parsed) && parsed !== 0) {
              // If it has decimals, round it to two decimal places
              parsed = parseFloat(parsed.toFixed(2));
              feature.properties[key] = parsed;
            }
          }
          // if key is a certificado key
          else if (
            mediasGlobalesKmediasCertificadosKeysEPIUeysEPIU.hasOwnProperty(key)
          ) {
            const value = feature.properties[key];
            if (typeof value === "string") {
              // console.log("key", key);
              // console.log("value", value);
              mediasGlobalesKmediasCertificadosKeysEPIUeysEPIU[key][value]++;
            }
          }
        }
      });

      // console.log("mediasGlobalesKmediasCertificadosKeysEPIUeysEPIU", mediasGlobalesKmediasCertificadosKeysEPIUeysEPIU);

      //sum all the values of the keys
      const globalesEPIU = {};
      geoEPIU["features"].forEach((feature) => {
        for (const key in feature.properties) {
          if (Object.keys(mediasGlobalesKeysEPIU).includes(key)) {
            const value = feature.properties[key];
            // console.log("key", key);
            // console.log("value", value);
            if (!isNaN(value) && value !== null && value !== 0) {
              //add to the accumulator
              globalesEPIU[key] = (globalesEPIU[key] ?? 0) + parseFloat(value);
              //increment the counter
              mediasGlobalesKeysEPIU[key]++;
            }
          }
        }
      });

      // console.log("mediasGlobalesKeysEPIU", mediasGlobalesKeysEPIU);
      console.log("global", globalesEPIU);

      //counter of instances is to not count the nulls
      for (const key in globalesEPIU) {
        if (
          mediasGlobalesKeysEPIU[key] !== 0 &&
          key !== "Building_Getafe_n exptes"
        ) {
          globalesEPIU[key] = parseFloat(
            (globalesEPIU[key] / mediasGlobalesKeysEPIU[key]).toFixed(2)
          );
        }
      }

      Object.entries(mediasGlobalesKmediasCertificadosKeysEPIUeysEPIU).forEach(
        ([certKey, value]) => {
          // console.log(value);
          let maxKey = null;
          let maxValue = -Infinity;

          //get the max value of the certificado
          for (const key in value) {
            if (value[key] > maxValue) {
              maxValue = value[key];
              maxKey = key;
            }
          }
          globalesEPIU[certKey] = maxKey;
        }
      );

      //hard coding since averages dont make sense
      globalesEPIU["Building_Getafe_disconfort inv"] = 33.1;
      globalesEPIU["Building_Getafe_disconfort ver"] = 36.4;
      globalesEPIU["Building_Getafe_porc alquiler"] = 22.5;
      globalesEPIU["Building_Getafe_porc prop sin hipoteca"] = 25.3;
      globalesEPIU["Building_Getafe_porc prop con hipoteca"] = 10.9;
      globalesEPIU["Building_Getafe_porc no calefaccion"] = 10.4;
      globalesEPIU["Building_Getafe_porc patologias exptes"] = 22.5;
      globalesEPIU["Building_Getafe_porc retraso pago facturas"] = 11.1;
      // console.log("globalesEPIU", globalesEPIU);

      // Send the modified geojson data as the response
      res.json({ geoEPIU, globalesEPIU, geoEPIULimites });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error reading file");
    })
    .finally(() => {
      isProcessingEPIU = false;
    });
});

app.get("/api/dashboard", (req, res) => {
  let data1 = loadExcelData(dataPathExcel_dashboard, true, 0);
  let data2 = loadExcelData(dataPathExcel_dashboard, true, 1);
  let data3 = loadExcelData(dataPathExcel_dashboard, true, 2);
  let data4 = loadExcelData(dataPathExcel_dashboard, true, 3);
  let data5 = loadExcelData(dataPathExcel_dashboard, true, 4);
  let data6 = loadExcelData(dataPathExcel_dashboard, true, 5);

  //filter out empty arrays
  const globalData = data1.filter(
    (item) => Array.isArray(item) && item.length > 0
  );
  data2 = data2.filter((item) => Array.isArray(item) && item.length > 0);
  data3 = data3.filter((item) => Array.isArray(item) && item.length > 0);
  data4 = data4.filter((item) => Array.isArray(item) && item.length > 0);
  data5 = data5.filter((item) => Array.isArray(item) && item.length > 0);
  data6 = data6.filter((item) => Array.isArray(item) && item.length > 0);

  //remove headers
  data3 = data3.slice(1);
  data4 = data4.slice(1);
  data5 = data5.slice(1);

  //grouped barchart
  const barChart1 = [];
  const headers1 = data2[0].slice(1);
  data2 = data2.slice(1);

  // console.log(stacks);
  // console.log(data3);

  for (let i = 0; i < data2.length; i++) {
    let obj = {};
    obj["id"] = data2[i][0];
    for (let j = 0; j < headers1.length; j++) {
      obj[headers1[j]] = data2[i][j + 1];
    }
    barChart1.push(obj);
  }

  //barchart
  const barChart2 = createBarChart(data3, false);
  const barChart3 = createBarChart(data4, false);
  const barChart4 = createBarChart(data5, false);

  const lineHeaders = data6[0].slice(1);
  const lineRawAxis = data6.slice(3, 6);
  const lineData = [];
  const lineAxis = [];

  data6 = data6.slice(1, 3); //remove headers row

  // console.log(lineRawAxis);

  for (let i = 0; i < data6.length; i++) {
    let obj = {};
    let data = [];
    obj["id"] = data6[i][0];
    obj["color"] = colors[i];
    for (let j = 1; j < data6[i].length; j++) {
      data.push({
        x: lineHeaders[j - 1],
        y: data6[i][j],
      });
    }
    obj["data"] = data;
    // console.log("data", data);
    lineData.push(obj);
  }

  for (let i = 0; i < lineRawAxis.length; i++) {
    let obj = {
      axis: "x",
      legend: lineRawAxis[i][0],
      lineStyle: {
        stroke: "#b0413e",
        strokeWidth: 2,
      },
      value: lineRawAxis[i][1],
    };
    lineAxis.push(obj);
  }

  // console.log("lineData", lineData[1]);
  // console.log("lineAxis", lineAxis);

  // Harcode data para informacion socioeconomica e informacion evolutiva
  const infoSocialEco = [
    ["Mujeres(%)", 59.33],
    ["Hombres(%)", 40.67],
    ["Usuarios Propietarios(%)",38.01],
    ["Edad media de los usuarios", 20.60],
    ["Mujeres(años)", 20.60],
    ["Hombres(años)", 20.60],
    ["Usuario Empleados(%)", "S/D"],
    ["Bono Social(%)", 15.04],
    ["Disponibilidad de ascensor(% viviendas)", "S/D"]
  ];

  const infoEvol = [
    ["Poblacion Alcanzada(%)", 100],
    ["Edificios Rehabilitados(nº)", 187]
  ];

  const data = {
    globalData,
    barChart1: [barChart1, headers1],
    barChart2,
    barChart3,
    barChart4,
    lineChart1: [lineData, lineAxis],
    infoSocialEco,
    infoEvol
  };
  res.json(data);
});

//group and count for the analisis sunburst chart
function sunBurstGrouping(data, level1Elements, level2Elements, gPrefix) {
  const result = [];

  for (const element of level1Elements) {
    const level1Obj = {
      id: gPrefix + " - " + element,
      children: [],
      color: colorsSunBurst1[element],
    };

    for (const subElement of level2Elements) {
      let counter = 0;

      for (const obj of data) {
        if (obj[element] === 1 && obj[subElement] === 1) {
          counter++;
        }
      }

      if (counter > 0) {
        level1Obj.children.push({
          id: gPrefix + " - " + element + " - " + subElement,
          value: counter,
          color: colorsSunBurst2[subElement],
        });
      }
    }

    // Add only if there are children
    if (level1Obj.children.length > 0) {
      result.push(level1Obj);
    }
  }
  return result;
}

function getGIndex(gName) {
  let index = 0;
  switch (gName) {
    case "G1":
      index = 0;
      break;
    case "G2":
      index = 1;
      break;
    case "G3A":
      index = 2;
      break;
    case "G3B":
      index = 3;
      break;
    case "G4":
      index = 4;
      break;
    case "G5":
      index = 5;
      break;
    case "G6":
      index = 6;
  }
  return index;
}

app.get("/api/analisis", (req, res) => {
  let data1 = loadExcelData(dataPathExcel_analisis, true, 0);
  let data2 = loadExcelData(dataPathExcel_analisis, true, 1);
  let data3 = loadExcelData(dataPathExcel_analisis, true, 2);
  let data4 = loadExcelData(dataPathExcel_analisis, true, 3);
  //filter out empty arrays
  data1 = data1.filter((item) => Array.isArray(item) && item.length > 0);
  data2 = data2.filter((item) => Array.isArray(item) && item.length > 0);
  data3 = data3.filter((item) => Array.isArray(item) && item.length > 0);
  data4 = data4.filter((item) => Array.isArray(item) && item.length > 0);
  let headers1 = data1[0]; //get headers
  let headers4 = data4[0]; //get headers

  data1 = data1.slice(1); //remove headers row
  data4 = data4.slice(1); //remove headers row

  //Sunburst chart
  let data1_keyval = data1.map((subarray) =>
    headers1.reduce((obj, header, index) => {
      if (index === 0) {
        obj[header] = "G" + subarray[index];
      } else {
        obj[header] = subarray[index];
      }
      return obj;
    }, {})
  );

  const classifiedG = Array.from({ length: 7 }, () => []);

  // Classify objects into arrays based on G value
  for (const obj of data1_keyval) {
    // const gValue = parseInt(obj.G.slice(1));
    // classifiedG[gValue - 1].push(obj);
    classifiedG[getGIndex(obj.G)].push(obj);
  }

  // console.log("classifiedG", classifiedG[2]);
  // console.log("data1_keyval", data1_keyval);

  const level1Elements = headers1.splice(1, 6);
  const level2Elements = headers1.splice(-4);

  // console.log("level1Elements", level1Elements);
  // console.log("level2Elements", level2Elements);

  let sunburstData = {
    id: "G",
    children: [],
  };

  for (let i = 0; i < classifiedG.length; i++) {
    // console.log("classifiedG", classifiedG[i][0].G);
    if (classifiedG[i].length === 0) {
      continue;
    }
    const obj = {
      id: classifiedG[i][0].G,
      children: sunBurstGrouping(
        classifiedG[i],
        level1Elements,
        level2Elements,
        classifiedG[i][0].G
      ),
      color: colorsSunBurst0[i],
    };
    sunburstData.children.push(obj);
  }

  // console.log("sunburstData", sunburstData);

  //Bar chart from Recharts
  const barData = [];
  const barHeaders = data2[0].slice(1);
  data2 = data2.slice(1); //remove headers row

  for (let i = 0; i < barHeaders.length; i++) {
    let obj = {};
    obj["mes"] = barHeaders[i];
    for (let j = 0; j < data2.length; j++) {
      obj[data2[j][0]] = data2[j][i + 1];
    }
    barData.push(obj);
  }

  //Line chart from Recharts
  const lineData = [];
  const lineHeaders = data3[0].slice(1);
  data3 = data3.slice(1); //remove headers row

  for (let i = 0; i < lineHeaders.length; i++) {
    let obj = {};
    obj["mes"] = lineHeaders[i];
    for (let j = 0; j < data3.length; j++) {
      let value = parseFloat((parseFloat(data3[j][i + 1]) * 100).toFixed(2));
      obj[data3[j][0]] = value;
    }
    lineData.push(obj);
  }
  // console.log(lineData);

  // console.log("chordData", chordData);

  //Chord diagram
  let chordData = [];
  let chordDataValues = Array(headers4.length)
    .fill(Array(headers4.length).fill(0))
    .map((a) => a.slice()); // array of NxN filled with zeros

  //counting the number of times each pair of elements appear together
  for (let i = 0; i < headers4.length; i++) {
    for (let j = 0; j <= i; j++) {
      for (let k = 0; k < data4.length; k++) {
        if (data4[k][i] === 1 && data4[k][j] === 1) {
          chordDataValues[i][j]++;
          if (i !== j) {
            chordDataValues[j][i]++;
          }
        }
      }
    }
  }

  chordData.push(headers4);
  chordData.push(chordDataValues);

  const data = [sunburstData, barData, lineData, chordData];
  res.json(data);
});

app.get("/api/formacion1", (req, res) => {
  let data1 = loadExcelData(dataPathExcel_formacion, true, 0);
  let data2 = loadExcelData(dataPathExcel_formacion, true, 1);
  let data3 = loadExcelData(dataPathExcel_formacion, true, 2);
  let data4 = loadExcelData(dataPathExcel_formacion, true, 3);

  //filter out empty arrays
  data1 = data1.filter((item) => Array.isArray(item) && item.length > 0);
  data2 = data2.filter((item) => Array.isArray(item) && item.length > 0);
  data3 = data3.filter((item) => Array.isArray(item) && item.length > 0);
  data4 = data4.filter((item) => Array.isArray(item) && item.length > 0);

  let xAxis = data1[0].slice(1); //get headers & remove cell A1
  let yAxis = null;
  let values = null;
  let heatMapData = [];
  let horasForm = data2[0][1];
  let notaMedia = data3[0][1];
  let pieData = [];
  data1 = data1.slice(1); //remove headers row
  data4 = data4.slice(1); //remove headers row

  for (let i = 0; i < data1.length; i++) {
    if (data1[i][0] === "General") {
      general = data1[i].slice(1);
      data1.splice(i, 1); // remove the General from the original array
      break;
    }
  }

  // PROCESSING HEAT MAP DATA
  //grouping by name
  var grouped = data1.reduce((acc, curr) => {
    const name = curr[0];
    const nums = curr.slice(1);
    if (!acc[name]) {
      acc[name] = {
        count: 1,
        sum: nums,
      };
    } else {
      acc[name].count++;
      acc[name].sum = acc[name].sum.map((val, index) => val + nums[index]);
    }
    return acc;
  }, {});

  //removing undefined at the end
  grouped = Object.entries(grouped)
    .filter(([key]) => key !== "undefined")
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

  //getting the averages from the grouped data
  const averages = Object.entries(grouped).map(([name, { count, sum }]) => {
    const avg = sum.map((val) => val / count);
    return [name, ...avg];
  });

  //removing undefines
  for (let i = 0; i < averages.length; i++) {
    if (averages[i][0] === "undefined") {
      averages.splice(i, 1);
      break;
    }
  }

  yAxis = averages.map((item) => item[0]);
  values = averages.map((item) => item.slice(1));

  for (let i = 0; i < yAxis.length; i++) {
    let obj = {};
    let innerXY = [];
    obj["id"] = yAxis[i];
    for (let j = 0; j < xAxis.length; j++) {
      let objInner = {};
      objInner["x"] = xAxis[j];
      objInner["y"] = values[i][j];
      innerXY.push(objInner);
    }
    // console.log(innerXY);
    obj["data"] = innerXY;
    heatMapData.push(obj);
  }

  // processing pie chart data
  for (let i = 0; i < data4.length; i++) {
    let obj = {};
    obj["id"] = data4[i][0];
    obj["label"] = data4[i][0];
    obj["value"] = data4[i][1];
    obj["color"] = colors[i];
    pieData.push(obj);
  }

  const data = [heatMapData, horasForm, notaMedia, pieData];
  // console.log(data);
  res.json(data);
});

app.get("/api/formacion2", (req, res) => {
  let data1 = loadExcelData(dataPathExcel_formacion, true, 4);
  let data2 = loadExcelData(dataPathExcel_formacion, true, 5);
  let data3 = loadExcelData(dataPathExcel_formacion, true, 6);
  let data4 = loadExcelData(dataPathExcel_formacion, true, 7);

  const colors = [
    "#9ac2dc",
    "#85b6d5",
    "#71aace",
    "#5d9dc7",
    "#4891c0",
    "#3485b9",
    "#2f78a7",
    "#245d82",
    "#243b79",
  ];

  //filter out empty arrays
  data1 = data1.filter((item) => Array.isArray(item) && item.length > 0);
  data2 = data2.filter((item) => Array.isArray(item) && item.length > 0);
  data3 = data3.filter((item) => Array.isArray(item) && item.length > 0);
  data4 = data4.filter((item) => Array.isArray(item) && item.length > 0);

  console.log(data1);

  let xAxis = data1[0].slice(2);
  let yAxis = data1.slice(1).map((item) => item[0]);
  let yAxisSocios = data1.slice(1).map((item) => item[1]);
  let values = [];
  let heatMapData = [];
  let globalData = [];
  let barChart = [];

  for (let i = 1; i < data1.length; i++) {
    values.push(data1[i].slice(2));
  }

  for (let i = 0; i < yAxis.length; i++) {
    let obj = {};
    let innerXY = [];
    obj["id"] = yAxis[i];
    for (let j = 0; j < xAxis.length; j++) {
      let objInner = {};
      objInner["x"] = xAxis[j];
      objInner["y"] = values[i][j];
      innerXY.push(objInner);
    }
    // console.log(innerXY);
    obj["data"] = innerXY;
    heatMapData.push(obj);
  }

  globalData.push(data2[0]);
  globalData.push(data2[1]);
  globalData.push(data3[0]);
  globalData.push(data3[1]);

  data4 = data4.slice(1); //remove headers row
  for (let i = 0; i < data4.length; i++) {
    let obj = {};
    obj["id"] = data4[i][0];
    obj["valor"] = data4[i][1];
    barChart.push(obj);
  }
  barChart.sort((a, b) => a.valor - b.valor);
  for (let i = 0; i < barChart.length; i++) {
    barChart[i]["valorColor"] = colors[i];
  }

  // console.log(heatMapData);

  const data = [heatMapData, globalData, barChart];
  res.json(data);
});

app.get("/api/formacion3", (req, res) => {
  let data1 = loadExcelData(dataPathExcel_formacion, true, 8);
  let data2 = loadExcelData(dataPathExcel_formacion, true, 9);
  let data3 = loadExcelData(dataPathExcel_formacion, true, 10);
  let data4 = loadExcelData(dataPathExcel_formacion, true, 11);

  //filter out empty arrays
  data1 = data1.filter((item) => Array.isArray(item) && item.length > 0);
  data2 = data2.filter((item) => Array.isArray(item) && item.length > 0);
  data3 = data3.filter((item) => Array.isArray(item) && item.length > 0);
  data4 = data4.filter((item) => Array.isArray(item) && item.length > 0);

  let xAxis = data1[0].slice(1);
  let yAxis = data1.slice(1).map((item) => item[0]);
  let values = [];
  let heatMapData = [];
  let globalData = [];
  let barChart = [];

  for (let i = 1; i < data1.length; i++) {
    values.push(data1[i].slice(1));
  }

  for (let i = 0; i < yAxis.length; i++) {
    let obj = {};
    let innerXY = [];
    obj["id"] = yAxis[i];
    for (let j = 0; j < xAxis.length; j++) {
      let objInner = {};
      objInner["x"] = xAxis[j];
      objInner["y"] = values[i][j];
      innerXY.push(objInner);
    }
    // console.log(innerXY);
    obj["data"] = innerXY;
    heatMapData.push(obj);
  }

  globalData.push(data2[0]);
  globalData.push(data3[0]);

  data4 = data4.slice(1); //remove headers row
  for (let i = 0; i < data4.length; i++) {
    let obj = {};
    obj["id"] = data4[i][0];
    obj["valor"] = data4[i][1];
    barChart.push(obj);
  }
  barChart.sort((a, b) => a.valor - b.valor);
  for (let i = 0; i < barChart.length; i++) {
    barChart[i]["valorColor"] = colorsBlue[i];
  }

  const data = [heatMapData, globalData, barChart];
  res.json(data);
});

function removeCircularLinks(links) {
  const uniqueLinks = [];
  const processedPairs = new Set();

  for (const link of links) {
    const { source, target } = link;
    const pair = `${source}-${target}`;
    const reversePair = `${target}-${source}`;

    if (!processedPairs.has(reversePair)) {
      uniqueLinks.push(link);
      processedPairs.add(pair);
    }
  }

  return uniqueLinks;
}

app.get("/api/derivacion", (req, res) => {
  let data1 = loadExcelData(dataPathExcel_derivacion, true, 0);
  let data2 = loadExcelData(dataPathExcel_derivacion, true, 1);
  let data3 = loadExcelData(dataPathExcel_derivacion, true, 2);
  let data4 = loadExcelData(dataPathExcel_derivacion, true, 3);

  //filter out empty arrays
  data1 = data1.filter((item) => Array.isArray(item) && item.length > 0);
  data2 = data2.filter((item) => Array.isArray(item) && item.length > 0);
  data3 = data3.filter((item) => Array.isArray(item) && item.length > 0);
  data4 = data4.filter((item) => Array.isArray(item) && item.length > 0);

  data1 = data1.slice(1); //remove headers row
  // console.log(data1);

  // const colorsSankey = [
  //   "#FF4C4C", // Coral Red
  //   "#85144b", // Dark Red
  //   "#FF6384", // Blush Pink
  //   "#e8b02c", // Mustard Yellow
  //   "#FFD700", // Gold
  //   "#FF851B", // Bright Orange
  //   "#e04abd", // Magenta
  //   "#39CCCC", // Teal
  //   "#207d7d", // Dark Teal
  //   "#3D9970", // Seaweed Green
  //   "#2ECC40", // Lime Green
  //   "#0074D9", // Royal Blue
  //   "#001f3f", // Navy Blue
  //   "#7FDBFF", // Sky Blue
  //   "#3F51B5", // Indigo
  //   "#9C27B0", // Purple
  // ];

  let nodes = [];
  let links = [];
  const countMap = new Map();
  let sankeyData = {
    nodes: [],
    links: [],
  };
  let globalData1 = [];
  let barChart = [];
  let pieChart = [];

  nodes = Array.from(new Set(data1.flat())).map((item, index) => ({
    id: item,
    nodeColor: colors[index % colors.length],
  }));

  // Iterate over data1 to count the occurrences of source-target pairs
  for (const [source, target] of data1) {
    //ensures that both source and target are defined
    if (source && target && source !== target) {
      const pair = `${source}-${target}`;
      const count = countMap.get(pair) || 0;
      countMap.set(pair, count + 1);
    }
  }

  // Convert the count map to an array of objects (links)
  links = Array.from(countMap, ([pair, value]) => {
    const [source, target] = pair.split("-");
    return { source, target, value };
  });

  sankeyData.nodes = nodes;
  sankeyData.links = removeCircularLinks(links);

  console.log(sankeyData);

  globalData1.push(data2[0]);

  data3 = data3.slice(1); //remove headers row
  // processing bar chart data
  for (let i = 0; i < data3.length; i++) {
    let obj = {};
    obj["id"] = data3[i][0];
    obj["valor"] = data3[i][1];
    barChart.push(obj);
  }
  barChart.sort((a, b) => a.valor - b.valor);
  for (let i = 0; i < barChart.length; i++) {
    // Find the corresponding node
    const node = nodes.find((node) => node.id === barChart[i].id);
    if (node) {
      barChart[i]["valorColor"] = node.nodeColor;
    } else {
      barChart[i]["valorColor"] = "#808080";
    }
  }

  data4 = data4.slice(1); //remove headers row
  // processing pie chart data
  for (let i = 0; i < data4.length; i++) {
    let obj = {};
    obj["id"] = data4[i][0];
    obj["label"] = data4[i][0];
    obj["value"] = data4[i][1];

    // Find the corresponding node
    const node = nodes.find((node) => node.id === data4[i][0]);
    if (node) {
      obj["color"] = node.nodeColor;
    } else {
      obj["color"] = "#808080";
    }
    pieChart.push(obj);
  }

  const data = [sankeyData, globalData1, pieChart, barChart];
  res.json(data);
});

app.get("/api/concienciacion", (req, res) => {
  let data1 = loadExcelData(dataPathExcel_concienciacion, true, 0);
  let data2 = loadExcelData(dataPathExcel_concienciacion, true, 1);
  let data3 = loadExcelData(dataPathExcel_concienciacion, true, 2);
  let data4 = loadExcelData(dataPathExcel_concienciacion, true, 3);

  //filter out empty arrays
  data1 = data1.filter((item) => Array.isArray(item) && item.length > 0);
  data2 = data2.filter((item) => Array.isArray(item) && item.length > 0);
  data3 = data3.filter((item) => Array.isArray(item) && item.length > 0);
  data4 = data4.filter((item) => Array.isArray(item) && item.length > 0);

  data1 = data1.slice(1); //remove headers row
  data4 = data4.slice(1); //remove headers row

  // console.log(data1);

  let globalData = [];
  let pieChart = [];

  const circlesData = {
    name: "Conciencación",
    color: "#9cc2e5",
    children: [],
  };

  const categories = new Map();
  // const subcategories = new Map();

  data1.forEach((props) => {
    //3 levels of data
    if (props.length === 3) {
      const [category, name, valor] = props;
      //if new, add category to circlesData
      if (!categories.has(category)) {
        const categoryObj = {
          name: category,
          color: "#487aa9",
          children: [],
        };
        categories.set(category, categoryObj);
        circlesData.children.push(categoryObj);
      }
      const categoryObj = categories.get(category);
      const childName = category === name ? `- ${name}` : name;
      const childObj = {
        name: childName,
        color: "#243d54",
        valor,
      };

      categoryObj.children.push(childObj);
    }
    //4 levels of data
    else {
      const [category, subcategory, name, valor] = props;
      //if new, add category to circlesData
      if (!categories.has(category)) {
        const categoryObj = {
          name: category,
          color: "#487aa9",
          children: [],
        };
        categories.set(category, categoryObj);
        circlesData.children.push(categoryObj);
      }
      const lastChild = {
        name: `${subcategory} - ${name}`,
        color: "#243d54",
        valor,
      };

      const categoryObj = categories.get(category);
      if (!categoryObj.children.some((child) => child.name === subcategory)) {
        //subcategory does not exist
        const subcategoryObj = {
          name: subcategory,
          color: "#71aace",
          children: [],
        };
        subcategoryObj.children.push(lastChild);
        categoryObj.children.push(subcategoryObj);
      } else {
        //subcategory exists already
        const subcategoryObj = categoryObj.children.find(
          (child) => child.name === subcategory
        );
        subcategoryObj.children.push(lastChild);

        const tmpCategoryChildrenObj = categoryObj.children.filter(
          (child) => child.name !== subcategory
        );
        // console.log("tmp", tmpCategoryObj);
        tmpCategoryChildrenObj.push(subcategoryObj);
        // const newCategoryObj = {
        //   name: category,
        //   color: "#487aa9",
        //   children: tmpCategoryChildrenObj,
        // };
        categoryObj.children = tmpCategoryChildrenObj;
        categories.delete(category);
        categories.set(category, categoryObj);
      }
      const tmpCirclesChildrenObj = circlesData.children.filter(
        (child) => child.name !== category
      );
      tmpCirclesChildrenObj.push(categoryObj);
      circlesData.children = tmpCirclesChildrenObj;
    }
  });

  // console.log(categories.get("Acciones CC").children[0].children);
  // console.log(categories.entries());
  console.log(circlesData.children[0].children[0]);
  // console.log(circlesData.children[0].children[0]);
  // console.log(circlesData.children[0].children[1]);

  globalData.push(data2[0]);
  globalData.push(data3[0]);
  globalData.push(data3[1]);

  // processing pie chart data
  for (let i = 0; i < data4.length; i++) {
    let obj = {};
    obj["id"] = data4[i][0];
    obj["label"] = data4[i][0];
    obj["value"] = data4[i][1];
    obj["color"] = colors[i];
    pieChart.push(obj);
  }

  const data = [circlesData, globalData, pieChart];
  res.json(data);
});

app.get("/api/intervenciones", (req, res) => {
  let data1 = loadExcelData(dataPathExcel_intervenciones, true, 0);
  let data2 = loadExcelData(dataPathExcel_intervenciones, true, 1);
  let data3 = loadExcelData(dataPathExcel_intervenciones, true, 2);

  //filter out empty arrays
  data1 = data1.filter((item) => Array.isArray(item) && item.length > 0);
  data2 = data2.filter((item) => Array.isArray(item) && item.length > 0);
  data3 = data3.filter((item) => Array.isArray(item) && item.length > 0);

  // console.log(data3);

  //heatmap
  let xAxis = data1[0].slice(1);
  let yAxis = data1.slice(1).map((item) => item[0]);
  let values = [];
  let heatMapData1 = [];
  let heatMapData2 = [];

  for (let i = 1; i < data1.length; i++) {
    values.push(data1[i].slice(1));
  }

  //get only first 2 columns for heatmap 1
  for (let i = 0; i < yAxis.length; i++) {
    let obj = {};
    let innerXY = [];
    obj["id"] = yAxis[i];
    for (let j = 0; j < 2; j++) {
      let objInner = {};
      objInner["x"] = xAxis[j];
      objInner["y"] = values[i][j];
      objInner["color"] = colors[i];
      innerXY.push(objInner);
    }
    // console.log(innerXY);
    obj["data"] = innerXY;
    heatMapData1.push(obj);
  }

  //get the rest of the columns for heatmap2
  for (let i = 0; i < yAxis.length; i++) {
    let obj = {};
    let innerXY = [];
    obj["id"] = yAxis[i];
    for (let j = 2; j < xAxis.length; j++) {
      let objInner = {};
      objInner["x"] = xAxis[j];
      objInner["y"] = values[i][j];
      objInner["color"] = colors[i];
      innerXY.push(objInner);
    }
    // console.log(innerXY);
    obj["data"] = innerXY;
    heatMapData2.push(obj);
  }

  //barchart1
  const barChart = [];
  // const headers = [];
  for (let i = 0; i < data2.length; i++) {
    let obj = {};
    obj["id"] = data2[i][0];
    obj["valor"] = data2[i][1];
    // headers.push(data2[i][0]);
    barChart.push(obj);
  }
  for (let i = 0; i < barChart.length; i++) {
    // barChart[i]["valorColor"] = colors[i];
    barChart[i]["valorColor"] = "#e27429";
  }

  // console.log(headers);

  //barchart2
  const barChart2 = [];
  const headers2 = data3[0].slice(1);
  data3 = data3.slice(1);

  // console.log(stacks);
  // console.log(data3);

  for (let i = 0; i < data3.length; i++) {
    let obj = {};
    obj["id"] = data3[i][0];
    for (let j = 0; j < headers2.length; j++) {
      obj[headers2[j]] = data3[i][j + 1];
    }
    barChart2.push(obj);
  }

  // console.log(headers2);

  const data = { heatMapData1, heatMapData2, barChart, barChart2, headers2 };
  res.json(data);
});

function getPathFromTxt(path) {
  let code = "";
  // Split the path string into individual segments
  const segments = path.split("/");
  // Iterate over the segments and build the code string
  for (const segment of segments) {
    // Skip empty segments
    if (segment.trim() === "") continue;
    // Add the segment to the baseCode string
    code += `['${segment}']`;
  }
  return code;
}

function getCodeFromPath(baseCode, path) {
  // Split the path string into individual segments
  const segments = path.split("/");
  // Iterate over the segments and build the code string
  for (const segment of segments) {
    // Skip empty segments
    if (segment.trim() === "") continue;
    // Add the segment to the baseCode string
    baseCode += `['${segment}']`;
  }
  // Close the baseCode string
  // baseCode += ");";

  return baseCode;
}

function getValueFromPath(obj, path) {
  const segments = path.split("/");
  return segments.reduce((acc, segment) => {
    if (segment.trim() === "") return acc; // Skip empty segments
    return acc ? acc[segment] : undefined;
  }, obj);
}

function extractKeyValue(data) {
  const result = {};

  for (const [key, value] of Object.entries(data)) {
    if (key === "Otros") continue;

    if (value && typeof value === "object" && value.hasOwnProperty("Value")) {
      result[key] = value.Value;
    } else {
      result[key] = value;
    }
  }

  return result;
}

function saveAsJson(data, filePath) {
  // Convert the data to JSON format
  const jsonData = JSON.stringify(data, null, 2);

  // Write the JSON data to the file
  fs.writeFileSync(filePath, jsonData, "utf8");
}

function extractMonthFromID(str) {
  const monthStr = str.substring(2, 4);
  const num = parseInt(monthStr, 10);
  //if month is invalid, it's february
  if (num > 0 && num < 13) {
    return num;
  } else {
    return 2;
  }
}

function extractExpeFromID(str) {
  return parseInt(str.split("/")[1]);
}

function flattenObject(obj, prefix = "") {
  const flattened = {};

  for (const key in obj) {
    const value = obj[key];

    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const nested = flattenObject(value[i], `${prefix}${key}/${i}/`);
        Object.assign(flattened, nested);
      }
    } else if (
      typeof value === "object" &&
      value !== null &&
      Object.keys(value).length > 0
    ) {
      const nested = flattenObject(value, `${prefix}${key}/`);
      Object.assign(flattened, nested);
    } else {
      flattened[`${prefix}${key}`] = value;
    }
  }

  return flattened;
}

//gets the value of "Value" from the object keys
function getKeyValueOfValue(obj) {
  const result = {};
  for (const key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      typeof obj[key] === "object" &&
      "Value" in obj[key]
    ) {
      result[key] = obj[key].Value;
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}

function exportToExcel(data, filePath) {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  // Convert JSON to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  // Write the workbook to a file
  XLSX.writeFile(workbook, filePath);
}

// app.get("/api/ohs", (req, res) => {
//   //reading json file
//   fs.readFile(dataPathJSON_ohs, "utf8", (err, jsonData) => {
//     if (err) {
//       console.error("Error reading the JSON file:", err);
//       res.status(500).json({ error: "Internal server error" });
//       return;
//     }

//     try {
//       // Parse the JSON data
//       const data = JSON.parse(jsonData).rows.slice(2);
//       const result = [];
//       let templateForm = {};

//       for (let i = 0; i < data.length; i++) {
//         let obj = {};
//         //loop to add all properties to obj
//         for (let j = 0; j < PATHKEYS.length; j++) {
//           const key = PATHKEYS[j][1];
//           let value = undefined;
//           //if value is an array
//           if (
//             key === "EDAD FAM" ||
//             key === "NACION FAM" ||
//             key === "DEPENDENCIA PARRILLA" ||
//             key === "INGRESOS MENSUALES PARRILLA" ||
//             key === "DISCAPACIDAD FAM" ||
//             key === "TIPO AYUDA" ||
//             key === "SUBSIDIO" ||
//             key === "OBSERVACIONES CUANDO" ||
//             key === "ATENCION LUGAR" ||
//             key === "DET ENVOLV ID" ||
//             key === "DET ENVOLV FISURA O GRIETAS" ||
//             key === "DET ENVOLV HUMEDAD CAPIL" ||
//             key === "DET ENVOLV HUMEDAD CONDENS" ||
//             key === "DET ENVOLV HUMEDAD INFILTR" ||
//             key === "DET ENVOLV MOHO" ||
//             key === "DET ENVOLV EXISTE INCIDENCIA" ||
//             key === "DET ENVOLV OTROS" ||
//             key === "VENTANAS ID" ||
//             key === "VENTANAS ANYO INSTALACION" ||
//             key === "VENTANAS DIMENSIONES" ||
//             key === "VENTANAS ES DOBLE VENTANA" ||
//             key === "VENTANAS ESTADO CONSERVACION" ||
//             key === "VENTANAS MATERIAL" ||
//             key === "VENTANAS ORIENTACION" ||
//             key === "VENTANAS PRESENCIA PROTECCION SOLAR" ||
//             key === "VENTANAS ROTURA PUENTE TERMICO" ||
//             key === "VENTANAS SEGUN PROYECTO" ||
//             key === "VENTANAS TIPO APERTURA" ||
//             key === "VENTANAS TIPO VIDRIO" ||
//             key === "VENTANAS CONTRAVENTANAS" ||
//             key === "VENTANAS CONTRAVENTANAS ESTADO CONSERVACION" ||
//             key === "VENTANAS PERSINAS" ||
//             key === "VENTANAS PERSINAS ESTADO CONSERVACION" ||
//             key === "VENTANAS PERSINAS TIPO CAJA" ||
//             key === "VENTANAS TOLDO" ||
//             key === "VENTANAS TOLDO ESTADO CONSERVACION" ||
//             key === "VENTANAS OTRAS CUESTIONES HAY CONDENSACIONES" ||
//             key ===
//               "VENTANAS OTRAS CUESTIONES HAY FILTRACION AGUA O HUMEDADES MARCO" ||
//             key === "VENTANAS OTRAS CUESTIONES HAY FILTRACION AIRE" ||
//             key ===
//               "VENTANAS OTRAS CUESTIONES SE HAN REALIZADO MEJORAS PARCIALES" ||
//             key ===
//               "VENTANAS OTRAS CUESTIONES SE HAN REALIZADO MEJORAS PARCIALES DETALLES" ||
//             key === "CLIMA INVIERNO PRESENCIA EN EL HOGAR PERFIL PERSONAS" ||
//             key ===
//               "CLIMA INVIERNO PRESENCIA EN EL HOGAR HORARIO 0800 A 0759" ||
//             key ===
//               "CLIMA INVIERNO PRESENCIA EN EL HOGAR HORARIO 1500 A 1959" ||
//             key ===
//               "CLIMA INVIERNO PRESENCIA EN EL HOGAR HORARIO 2000 A 2359" ||
//             key === "CLIMA INVIERNO PRESENCIA EN EL HOGAR OTROS" ||
//             key === "CLIMA VERANO PRESENCIA EN EL HOGAR PERFIL PERSONAS" ||
//             key === "CLIMA VERANO PRESENCIA EN EL HOGAR HORARIO 0800 A 1459" ||
//             key === "CLIMA VERANO PRESENCIA EN EL HOGAR HORARIO 1500 A 1959" ||
//             key === "CLIMA VERANO PRESENCIA EN EL HOGAR HORARIO 2000 A 2359" ||
//             key === "CLIMA VERANO PRESENCIA EN EL HOGAR HORARIO 0000 A 0759" ||
//             key === "ATENCION FECHA" ||
//             key === "ATENCION HORAS" ||
//             key === "ATENCION MODO CONTACTO"
//           ) {
//             value = {};
//             let items = getValueFromPath(data[i], PATHKEYS[j][0]);

//             // Ensure value has a minimum number of entries (e.g., 10)
//             const minimumEntries = 10;
//             for (let k = 0; k < minimumEntries; k++) {
//               value[`${k}`] = undefined;
//             }

//             // Process the existing items
//             for (let k = 0; k < items.length; k++) {
//               if (k >= minimumEntries) break;
//               value[`${k}`] = getValueFromPath(items[k], PATHKEYS[j][2]);
//             }
//           }
//           // if value is an object + cleaning
//           else if (
//             key === "HABITOS INVIERNO" ||
//             key === "HABITOS VERANO" ||
//             key === "PATOLOGÍAS" ||
//             key === "PREST Y SUBSIDIOS" ||
//             key === "ESTADO VIVIENDA" ||
//             key === "VIVIENDA INCOMODA" ||
//             key === "SUM ELECT CUENTA" ||
//             key === "INDICADORES"
//           ) {
//             value = {};
//             let items = getValueFromPath(data[i], PATHKEYS[j][0]);
//             value = extractKeyValue(items);
//             if (key === "PREST Y SUBSIDIOS") {
//               value["OtrasPrestaciones"] =
//                 value?.["OtrasPrestaciones"]?.["ActiveBranch"]?.["Fields"]?.[
//                   "OtrasPrestacionesDetalle"
//                 ];
//             } else if (key === "ESTADO VIVIENDA") {
//               value["DisponeCertificacionEnergetica"] =
//                 value?.["DisponeCertificacionEnergetica"]?.["ConditionField"]?.[
//                   "DisponeCertificacionEnergetica"
//                 ]?.["Value"];
//             } else if (key === "SUM ELECT CUENTA") {
//               //TODO make it fixed even if for example Potencia doesnt exist. it should be undefined
//               for (const [innerKey, innerValue] of Object.entries(value)) {
//                 value[innerKey] =
//                   innerValue?.["ConditionField"]?.[innerKey]?.["Value"];

//                 //electrico tiene mas niveles
//                 if (innerKey === "UsaSuministroElectrico") {
//                   value["UsaSuministroElectricoComercializadora"] =
//                     innerValue?.["ActiveBranch"]?.["Fields"]?.[
//                       "DetallesSuministroElectrico"
//                     ]?.["Fields"]?.["Comercializadora"]?.["ConditionField"]?.[
//                       "Comercializadora"
//                     ]?.["Value"] || undefined;

//                   value["UsaSuministroElectricoDistribuidora"] =
//                     innerValue?.["ActiveBranch"]?.["Fields"]?.[
//                       "DetallesSuministroElectrico"
//                     ]?.["Fields"]?.["Distribuidora"]?.["ConditionField"]?.[
//                       "Distribuidora"
//                     ]?.["Value"] || undefined;

//                   value["UsaSuministroElectricoPotencia"] =
//                     innerValue?.["ActiveBranch"]?.["Fields"]?.[
//                       "DetallesSuministroElectrico"
//                     ]?.["Fields"]?.["Potencia"]?.["Label"] || undefined;

//                   value["UsaSuministroElectricoServiciosIncluidos"] =
//                     innerValue?.["ActiveBranch"]?.["Fields"]?.[
//                       "DetallesSuministroElectrico"
//                     ]?.["Fields"]?.["ServiciosIncluidos"]?.["Value"] ||
//                     undefined;

//                   value["UsaSuministroElectricoTipoContrato"] =
//                     innerValue?.["ActiveBranch"]?.["Fields"]?.[
//                       "DetallesSuministroElectrico"
//                     ]?.["Fields"]?.["TipoContrato"]?.["Value"] || undefined;

//                   value["UsaSuministroElectricoTipoTarifa"] =
//                     innerValue?.["ActiveBranch"]?.["Fields"]?.[
//                       "DetallesSuministroElectrico"
//                     ]?.["Fields"]?.["TipoTarifa"]?.["Value"] || undefined;
//                 }
//               }
//             } else if (key === "INDICADORES") {
//               for (const [innerKey, innerValue] of Object.entries(value)) {
//                 let obj = {};
//                 for (const [innerKey2, innerValue2] of Object.entries(
//                   innerValue["Fields"]
//                 )) {
//                   // value[innerKey][innerKey2] = innerValue2?.["Value"];
//                   obj[innerKey2] = innerValue2?.["Value"] || undefined;
//                 }
//                 value[innerKey] = obj;
//               }
//             }
//           }
//           // //if value is an object and has one more level + cleaning
//           else if (
//             key === "CONSUMO € MENSUAL" ||
//             key === "CONSUMO KwH MENSUAL" ||
//             key === "DETALLE CONS € MES"
//           ) {
//             value = {};
//             let items = getValueFromPath(data[i], PATHKEYS[j][0]);
//             // console.log("items", items);

//             // Ensure value has a minimum number of entries (e.g., 10)
//             const minimumEntries = 20;
//             for (let k = 0; k < minimumEntries; k++) {
//               value[`${k}`] = undefined;
//             }

//             for (let k = 0; k < items.length; k++) {
//               if (k >= minimumEntries) break;
//               value[`${k}`] = extractKeyValue(
//                 getValueFromPath(items[k], PATHKEYS[j][2])
//               );
//             }
//             value = flattenObject(value);
//             // console.log("value", value);
//           } else if (key === "ID") {
//             value = getValueFromPath(data[i], PATHKEYS[j][0]);
//             if (value) {
//               obj["MES"] = extractMonthFromID(value) || undefined;
//               obj["EXPE"] = extractExpeFromID(value) || 0;
//             }
//           } else {
//             value = getValueFromPath(data[i], PATHKEYS[j][0]);
//           }
//           // insert value in the object
//           obj[key] = value;
//         }

//         //exclude the template form from the result
//         if (obj["ID"] === "0000/00000" || !obj["ID"]) {
//           templateForm = obj;
//           continue;
//         }
//         result.push(obj);
//       }

//       //sort by EXPE descending
//       result.sort((a, b) => b.EXPE - a.EXPE);
//       // save result as json
//       result.unshift(templateForm);
//       saveAsJson(result, "ohs_data.json");

//       const subSetResult = [];
//       const subSetTemplate = {};
//       const subSetKeys = [
//         "ID",
//         "MES",
//         "EXPE",
//         "REF CATASTRAL",
//         "CUPS",
//         "BARRIO",
//         "NACION FAM",
//         "DEPENDENCIA PARRILLA",
//         "INGRESOS MENSUALES PARRILLA",
//         "DISCAPACIDAD FAM",
//         "TIPO AYUDA",
//         "SUBSIDIO",
//         "PREST Y SUBSIDIOS",
//       ];
//       for (let i = 0; i < subSetKeys.length; i++) {
//         subSetTemplate[subSetKeys[i]] = templateForm[subSetKeys[i]];
//       }

//       for (let i = 0; i < result.length; i++) {
//         let obj = {};
//         for (let j = 0; j < subSetKeys.length; j++) {
//           obj[subSetKeys[j]] = result[i][subSetKeys[j]];
//         }
//         subSetResult.push(obj);
//       }
//       //sort by EXPE descending
//       subSetResult.sort((a, b) => a.EXPE - b.EXPE);

//       // console.log("subset", subSetResult);
//       // console.log("subset template", subSetTemplate);

//       //flatten data and save as excel
//       // const flatTemplateForm = flattenObject(templateForm);
//       const flatData = [];
//       for (let i = 0; i < subSetResult.length; i++) {
//         flatData.push(flattenObject(subSetResult[i]));
//       }
//       //put the template form at the beginning of the array
//       flatData.unshift(flattenObject(subSetTemplate));
//       // console.log("template form", flatData[0]["ID"]);
//       // console.log(flatData.length);

//       // exportToExcel(flatData, "ohs_data.xlsx");

//       // Send the JSON data as the response
//       // console.log("result", result[1]);
//       res.json(result);
//       // res.json(templateForm);
//     } catch (error) {
//       console.error("Error parsing the JSON data:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   });
// });

async function getDatadisToken() {
  const loginEndpoint = "https://datadis.es/nikola-auth/tokens/login";
  const username = "78908947H";
  const password = "Khora!2023";

  return fetch(loginEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username: username,
      password: password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    })
    .then((token) => {
      return token;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

app.get("/api/descargas/:filename", (req, res) => {
  const { filename } = req.params;
  console.log("filename", filename);
  let fileNameExcel = "";
  switch (filename) {
    case "dashboard":
      fileNameExcel = "data_dashboard.xlsx";
      break;
    case "analisis":
      fileNameExcel = "data_analisis.xlsx";
      break;
    case "awareness":
      fileNameExcel = "data_awareness.xlsx";
      break;
    case "derivacion":
      fileNameExcel = "data_derivacion.xlsx";
      break;
    case "formacion":
      fileNameExcel = "data_formacion.xlsx";
      break;
    case "intervencion":
      fileNameExcel = "data_awareness.xlsx";
      break;
    case "geojson":
      fileNameExcel = "map_data.geojson";
      break;
    default:
      fileNameExcel = "data_dashboard.xlsx";
  }
  const filePath = path.join(__dirname, "resources", fileNameExcel);
  res.download(filePath, fileNameExcel, (err) => {
    if (err) {
      // Handle any error that occurred during the file download
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

// P2806500A

app.get("/api/datadis", async (req, res) => {
  try {
    const token = await getDatadisToken();
    const data_url = "https://datadis.es/api-private/api/get-consumption-data";
    // Configuración de la solicitud HTTP
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const params = new URLSearchParams({
      cups: "ES0022000009092897AH1P",
      distributorCode: "5",
      startDate: "2022/02",
      endDate: "2022/03",
      measurementType: "0",
      pointType: "4",
      authorizedNif: "P2806500A",
    });

    const urlWithParams = `${data_url}?${params.toString()}`;

    console.log("Token:", token);
    console.log("Headers:", headers);
    console.log("urlWithParams:", urlWithParams);

    const response = await fetch(urlWithParams, {
      method: "GET",
      headers,
    });

    if (response.ok) {
      const data = await response.text();
      const dataJSON = JSON.parse(data);
      console.log(data);
      // Create a new workbook
      const workbook = XLSX.utils.book_new();
      // Convert JSON to worksheet
      const worksheet = XLSX.utils.json_to_sheet(dataJSON);
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      // Write the workbook to a file
      const filePath = "consum.xlsx";
      XLSX.writeFile(workbook, filePath);
      res.json(dataJSON);
    } else {
      throw new Error("Request failed with status " + response.status);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

app.get("/api/datadistest", async (req, res) => {
  // const data = [
  //   {
  //     cups: "ES0022000009092897AH1P",
  //     date: "2023/05/31",
  //     time: "18:00",
  //     consumptionKWh: 0.572,
  //     obtainMethod: "Real",
  //     surplusEnergyKWh: 0.0,
  //   },
  //   {
  //     cups: "ES0022000009092897AH1P",
  //     date: "2023/05/31",
  //     time: "19:00",
  //     consumptionKWh: 1.361,
  //     obtainMethod: "Real",
  //     surplusEnergyKWh: 0.0,
  //   },
  //   {
  //     cups: "ES0022000009092897AH1P",
  //     date: "2023/05/31",
  //     time: "24:00",
  //     consumptionKWh: 8.995,
  //     obtainMethod: "Real",
  //     surplusEnergyKWh: 0.0,
  //   },
  // ];

  // // Create a new workbook
  // const workbook = XLSX.utils.book_new();
  // // Convert JSON to worksheet
  // const worksheet = XLSX.utils.json_to_sheet(data);
  // // Add the worksheet to the workbook
  // XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  // // Write the workbook to a file
  // const filePath = "consum.xlsx";
  // XLSX.writeFile(workbook, filePath);

  const responseString =
    '[{"cups":"ES0022000009092897AH1P","date":"2022/01/01","time":"01:00","consumptionKWh":9.001,"obtainMethod":"Real","surplusEnergyKWh":0.0},{"cups":"ES0022000009092897AH1P","date":"2022/01/01","time":"01:00","consumptionKWh":9.001,"obtainMethod":"Real","surplusEnergyKWh":0.0}]';

  const jsonArray = JSON.parse(responseString);

  console.log(jsonArray);

  res.json("done");
});

app.get("/api/getPathsArray", async (req, res) => {
  const lines = [
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Bombillas/Fields/BombillasUtilizadasEnVivienda/Fields/BombillasBajoConsumo/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Bombillas/Fields/BombillasUtilizadasEnVivienda/Fields/BombillasIncandescentes/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Bombillas/Fields/BombillasUtilizadasEnVivienda/Fields/BombillasLed/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Bombillas/Fields/BombillasUtilizadasEnVivienda/Fields/LucesAlojenas/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Bombillas/Fields/BombillasUtilizadasEnVivienda/Fields/NoSabeNoContesta/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Bombillas/Fields/BombillasUtilizadasEnVivienda/Fields/VariosTiposMezcladas/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Bombillas/Fields/BombillasUtilizadasEnVivienda/Fields/VelasOLinternas/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Bombillas/Fields/SobreLasBombillasNoLed/Fields/CuantasBombillasNoLedHalogenas/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Bombillas/Fields/SobreLasBombillasNoLed/Fields/CuantasBombillasNoLedTipoE14/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Bombillas/Fields/SobreLasBombillasNoLed/Fields/CuantasBombillasNoLedTipoE27/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Bombillas/Fields/SobreLasBombillasNoLed/Fields/CuantasBombillasNoLedTuboFluorescente/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Bombillas/Fields/SobreNumeroBombillasInstaldas/Fields/NumeroBombillasEnCasa/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Bombillas/Fields/SobreNumeroBombillasInstaldas/Fields/NumeroBombillasEnCasaQueSonLed/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/CocinarEnElDomicilio/Fields/CocinaHabitualmenteEnSuVivienda/Fields/Frecuencia/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/CocinarEnElDomicilio/Fields/NoCocinaEnDomicilio/Fields/Motivos/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/CocinarEnElDomicilio/Fields/QueUtilizaParaCocinar/Fields/Otros/ConditionField/Otros/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/CocinarEnElDomicilio/Fields/QueUtilizaParaCocinar/Fields/QueUtilizaParaCocinarCocinaGas/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/CocinarEnElDomicilio/Fields/QueUtilizaParaCocinar/Fields/QueUtilizaParaCocinarHornoElectrico/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/CocinarEnElDomicilio/Fields/QueUtilizaParaCocinar/Fields/QueUtilizaParaCocinarHornoGas/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/CocinarEnElDomicilio/Fields/QueUtilizaParaCocinar/Fields/QueUtilizaParaCocinarPlacaInduccion/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/CocinarEnElDomicilio/Fields/QueUtilizaParaCocinar/Fields/QueUtilizaParaCocinarPlacaVitroceramica/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/CocinarEnElDomicilio/Fields/SiNoHaCocinadoQueTipoComidaConsumen/Fields/ADomicilio/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/CocinarEnElDomicilio/Fields/SiNoHaCocinadoQueTipoComidaConsumen/Fields/DeRestaurante/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/CocinarEnElDomicilio/Fields/SiNoHaCocinadoQueTipoComidaConsumen/Fields/MenuAyudaPublica/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/CocinarEnElDomicilio/Fields/SiNoHaCocinadoQueTipoComidaConsumen/Fields/Otros/ConditionField/Otros/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/CocinarEnElDomicilio/Fields/SiNoHaCocinadoQueTipoComidaConsumen/Fields/PrecocinadosMicroondas/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeCampanaExtractora/ConditionField/DisponeDeCampanaExtractora/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeCampanaExtractora/ActiveBranch/Fields/DetallesDisponeCampanaExtractora/Fields/Estado/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeCocinaDeButano/ConditionField/DisponeDeCocinaDeButano/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeCocinaDeButano/ActiveBranch/Fields/DetallesDisponeCocinaDeButano/Fields/Estado/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeCocinaDeGas/ConditionField/DisponeDeCocinaDeGas/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeCocinaDeGas/ActiveBranch/Fields/DetallesDisponeCocinaDeGas/Fields/Estado/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeCocinaDeInduccion/ConditionField/DisponeDeCocinaDeInduccion/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeCocinaDeInduccion/ActiveBranch/Fields/DetallesDisponeCocinaDeInduccion/Fields/Estado/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeCongelador/ConditionField/DisponeDeCongelador/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeCongelador/ActiveBranch/Fields/DetallesDisponeCongelador/Fields/Estado/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeFrigorificoCongelador/ConditionField/DisponeDeFrigorificoCongelador/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeFrigorificoCongelador/ActiveBranch/Fields/DetallesDisponeFrigorificoCongelador/Fields/Estado/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeFrigorificoSinCongelador/ConditionField/DisponeDeFrigorificoSinCongelador/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeFrigorificoSinCongelador/ActiveBranch/Fields/DetallesDisponeFrigorificoSinCongelador/Fields/Estado/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeHervidorAgua/ConditionField/DisponeDeHervidorAgua/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeHervidorAgua/ActiveBranch/Fields/DetallesDisponeHervidorAgua/Fields/Estado/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeHornoDeGas/ConditionField/DisponeDeHornoDeGas/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeHornoDeGas/ActiveBranch/Fields/DetallesDisponeHornoDeGas/Fields/Estado/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeHornoElectrico/ConditionField/DisponeDeHornoElectrico/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeHornoElectrico/ActiveBranch/Fields/DetallesDisponeHornoElectrico/Fields/Estado/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeLavadora/ConditionField/DisponeDeLavadora/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeLavadora/ActiveBranch/Fields/DetallesDisponeLavadora/Fields/EstadoConservacion/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeLavavajillas/ConditionField/DisponeDeLavavajillas/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeLavavajillas/ActiveBranch/Fields/DetallesDisponeLavavajillas/Fields/EstadoConservacion/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeMicroondas/ConditionField/DisponeDeMicroondas/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeMicroondas/ActiveBranch/Fields/DetallesDisponeMicroondas/Fields/Estado/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDePlacaVitroceramica/ConditionField/DisponeDePlacaVitroceramica/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDePlacaVitroceramica/ActiveBranch/Fields/DetallesDisponePlacaVitroceramica/Fields/Estado/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeSecadora/ConditionField/DisponeDeSecadora/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/Electrodomesticos/Fields/DisponibilidadEnElHogar/Fields/DisponeDeSecadora/ActiveBranch/Fields/DetallesDisponeSecadora/Fields/EstadoConservacion/Type",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/OtrosAparatosElectronicos/Fields/DisponenEnVivienda/Fields/DisponeDeImpresora/ConditionField/DisponeDeImpresora/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/OtrosAparatosElectronicos/Fields/DisponenEnVivienda/Fields/DisponeDeImpresora/ActiveBranch/Fields/EnStandByImpresora/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/OtrosAparatosElectronicos/Fields/DisponenEnVivienda/Fields/DisponeDeMonitorPC/ConditionField/DisponeDeMonitorPC/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/OtrosAparatosElectronicos/Fields/DisponenEnVivienda/Fields/DisponeDeMonitorPC/ActiveBranch/Fields/EnStandByMonitorPC/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/OtrosAparatosElectronicos/Fields/DisponenEnVivienda/Fields/DisponeDeOrdenador/ConditionField/DisponeDeOrdenador/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/OtrosAparatosElectronicos/Fields/DisponenEnVivienda/Fields/DisponeDeOrdenador/ActiveBranch/Fields/EnStandByOrdenador/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/OtrosAparatosElectronicos/Fields/DisponenEnVivienda/Fields/DisponeDeOtros/ConditionField/DisponeDeOtros/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/OtrosAparatosElectronicos/Fields/DisponenEnVivienda/Fields/DisponeDeOtros/ActiveBranch/Fields/EnStandByOtros/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/OtrosAparatosElectronicos/Fields/DisponenEnVivienda/Fields/DisponeDeRouter/ConditionField/DisponeDeRouter/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/OtrosAparatosElectronicos/Fields/DisponenEnVivienda/Fields/DisponeDeRouter/ActiveBranch/Fields/EnStandByRouter/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/OtrosAparatosElectronicos/Fields/DisponenEnVivienda/Fields/DisponeDeTablet/ConditionField/DisponeDeTablet/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/OtrosAparatosElectronicos/Fields/DisponenEnVivienda/Fields/DisponeDeTablet/ActiveBranch/Fields/EnStandByTablet/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/OtrosAparatosElectronicos/Fields/DisponenEnVivienda/Fields/DisponeDeTelefonosMoviles/ConditionField/DisponeDeTelefonosMoviles/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/OtrosAparatosElectronicos/Fields/DisponenEnVivienda/Fields/DisponeDeTelevisor/ConditionField/DisponeDeTelevisor/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/OtrosAparatosElectronicos/Fields/DisponenEnVivienda/Fields/DisponeDeTelevisor/ActiveBranch/Fields/EnStandByTelevisor/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/OtrosAparatosElectronicos/Fields/EstadoOtrosComponentesInstalacionElectrica/Fields/Cableado/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/OtrosAparatosElectronicos/Fields/EstadoOtrosComponentesInstalacionElectrica/Fields/Enchufes/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/OtrosAparatosElectronicos/Fields/EstadoOtrosComponentesInstalacionElectrica/Fields/EstadoCuadroElectrico/Value",
    "doc/Submission/Pages/v05_VH_elec/Elec/Fields/OtrosAparatosElectronicos/Fields/EstadoOtrosComponentesInstalacionElectrica/Fields/Interruptores/Value",
  ];

  const data = [];
  for (let i = 0; i < lines.length; i++) {
    data.push([lines[i], "ELECT"]);
  }
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

/*-------- Khora credits --------*/
console.log("Created by Khora Urban Thinkers");
console.log("Contact with us in https://khoraurbanthinkers.es/en/home-en/")
console.log("Our X account https://x.com/khoraurban")
console.log("Our Linkedin account https://www.linkedin.com/company/khora-urban-thinkers/posts/?feedView=all")