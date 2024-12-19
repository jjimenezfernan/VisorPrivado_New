/**
 * File with the api of the application
 */

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


const geoSSCCPath = path.join(__dirname, "resources/map/SSCC.geojson");
const geoEPIUPath = path.join(__dirname, "resources/map/BuildingEPIU.geojson");
const geoEPIULimitesPath = path.join(
  __dirname,
  "resources/map/LimitesEPIU.geojson"
);
const geoBarrioPath = path.join(__dirname, "resources/map/Barrio.geojson");

const dataPathExcel_dashboard = "resources/data_dashboard.xlsx";
const dataPathExcel_derivacion = "resources/data_derivacion.xlsx";
const dataPathExcel_concienciacion = "resources/data_awareness.xlsx";

const colors_2 = [
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

const colors = [
  "#F53652",
  "#F57036",
  "#A0588E",
  "#F54F36",
  "#f59f36",
  "#e13bb7",
  "#A06E58",
  "#9258A0",
  "#A06258",
  "#F5B0BB",
  "#F57387",
  "#4B4342",
  "#4B4249",
  "#be22e3",
  "#49424B",
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
  "porc motivo INFORMACION_GENERAL",
  "porc motivo suministros",
  "porc motivo comunidad energética",
  "porc A través de una persona conocida",
  "porc Comunicaciones del Ayuntamiento",
  "porc SS.SS",
  "porc ERRP y OTC",
  "porc Eventos/Difusión",
  "t4_1",
  "t4_3",
  "t31_1di",
  "t31_2dm",
  "t31_3dt",
  "t32_ei",
  "porc disconfort inv",
  "porc disconfort ver",
  "porc retraso pago facturas",
  "t22_1_porc",
];

//no se hacen medias en vez de sumatorios
const sumatoriosSSCC = {
  "t18_1": 0,
  "n exptes SSCC": 0, 
  "t1_1": 0,
  "n_alquiler": 0
};

//"SSCC Getafe_pob total (INE 22)" no queremos media, sino sumatorio
const mediasGlobalesKeysSSCC = {
  "ano": 0,
  "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION": 0,
  "porc motivo INFORMACION_GENERAL": 0,
  "porc motivo suministros": 0,
  "porc motivo comunidad energética": 0,
  "porc A través de una persona conocida": 0,
  "porc Comunicaciones del Ayuntamiento": 0,
  "porc SS.SS": 0,
  "porc ERRP y OTC": 0,
  "porc Eventos/Difusión": 0,
  "Intervalo de confianza (%)": 0,
  "t4_1": 0,
  "t4_3": 0,
  "t3_1": 0,
  "t31_1di": 0,
  "t31_2dm": 0,
  "t31_3dt": 0,
  "t32_ei": 0,
  "precio_alquiler": 0,
  "renta_hogar": 0,
  "porc disconfort inv": 0,
  "porc disconfort ver": 0,
  "porc retraso pago facturas": 0,
  "t30_th": 0,
  "t22_1_porc": 0,
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

  // Reniciar todo el dic de los sumatorio
  for(let clave in sumatoriosSSCC){
    sumatoriosSSCC[clave] = 0;
  }

  // Create an array of promises to read both geojson files
  const readGeojsonPromises = [readJsonFile(geoSSCCPath)];

  // Use Promise.all to read both files asynchronously
  Promise.all(readGeojsonPromises)
    .then(([geoSSCC]) => {
      geoSSCC["features"].forEach((feature) => {
        for (const key in feature.properties) {
          if (key === "ano" || key === "t18_1" || key === "t1_1") {
            const value = feature.properties[key];
            let parsed = parseInt(value, 10);
            if (!isNaN(parsed)) {
              feature.properties[key] = parsed;
            }
          }
          else if (key === "t30_th") {
            const value = feature.properties[key];
            let parsed = (parseFloat(value)).toFixed(2);
            if (!isNaN(parsed) && parsed !== 0) {
              feature.properties[key] = parsed;
            }
          }
          else if (porcSSCC.includes(key)) {
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
            if (!isNaN(value) && value !== null && value !== 0) {
              //add to the accumulator
              globalesSSCC[key] = (globalesSSCC[key] ?? 0) + parseFloat(value);
              //increment the counter
              mediasGlobalesKeysSSCC[key]++;
            }
          }
          else if (Object.keys(sumatoriosSSCC).includes(key)){
            const value = feature.properties[key];
            if (!isNaN(value) && value !== null && value !== 0) {
              sumatoriosSSCC[key] = (sumatoriosSSCC[key] ?? 0) + value;
            }
          }
        }
      });

      //counter of instances is to not count the nulls
      for (const key in globalesSSCC) {
        if ( mediasGlobalesKeysSSCC[key] !== 0 && !Object.keys(sumatoriosSSCC).includes(key) ) {
          globalesSSCC[key] = parseFloat(
            (globalesSSCC[key] / mediasGlobalesKeysSSCC[key]).toFixed(2)
          );
        }
      }

      //sumatorios
      globalesSSCC.t18_1 = sumatoriosSSCC.t18_1;
      globalesSSCC["n exptes SSCC"] = sumatoriosSSCC["n exptes SSCC"];
      globalesSSCC.t1_1 = sumatoriosSSCC.t1_1;
      globalesSSCC.n_alquiler = sumatoriosSSCC.n_alquiler;
      
      // parseo de algunas variables
      globalesSSCC.ano = parseInt(globalesSSCC.ano, 10);

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

// Keys que son porcentajes
const porcBarrio = [
  "ac_porc_expedientes",
  "ac_motivo_rehab",
  "ac_motivo_infogeneral",
  "ac_motivo_suminsitros",
  "ac_motivo_comener",
  "ac_origen_ayto",
  "ac_origen_ssss",
  "ac_origen_errp",
  "ac_origen_eventos",
  "ac_origen_conocido",
  "t4_1",
  "t4_3",
  "t31_2dm",
  "t31_3dt",
  "t22_1_porc",
];

// Keys que no se hacen medias en vez de sumatorios
const sumatoriosBarrio = {
  "t18_1": 0,
  "t1_1": 0,
  "n_alquiler": 0,  
};

// Keys de las que se han de hacer medias
const mediasGlobalesKeysBarrio = {
  "t3_1": 0,
  "t4_1": 0,
  "t4_3": 0,
  "t31_2dm": 0,
  "t31_3dt": 0,
  "renta_hogar": 0,
  "ano": 0,
  "precio_alquiler": 0,
  "ac_n_expedientes": 0,
  "ac_porc_expedientes": 0,
  "ac_motivo_rehab": 0,
  "ac_motivo_infogeneral": 0,
  "ac_motivo_suminsitros": 0,
  "ac_motivo_comener": 0,
  "ac_origen_ayto": 0,
  "ac_origen_ssss": 0,
  "ac_origen_conocido": 0,
  "ac_origen_eventos": 0,
  "ac_origen_errp": 0,
  "t22_1_porc": 0,
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

  // Reniciar todo el dic de los sumatorio
  for(let clave in sumatoriosBarrio){
    sumatoriosBarrio[clave] = 0;
  }

  // Create an array of promises to read both geojson files
  const readGeojsonPromises = [readJsonFile(geoBarrioPath)];

  // Parseo de datos del geojson
  Promise.all(readGeojsonPromises)
    .then(([geoBarrio]) => {
      geoBarrio["features"].forEach((feature) => {
        for (const key in feature.properties) {
          if (key === "ano" || key === "t18_1" || key === "t1_1") {
            const value = feature.properties[key];
            let parsed = parseInt(value, 10);
            if (!isNaN(parsed)) {
              feature.properties[key] = parsed;
            }
          } 
          else if ( key === "t3_1" || key === "precio_alquiler") {
            const value = feature.properties[key];
            //just parsing, no need to multiply by 100
            let parsed = parseFloat(parseFloat(value).toFixed(2));
            if (!isNaN(parsed)) {
              feature.properties[key] = parsed;
            }
          }
          else if (porcBarrio.includes(key)) {
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
            if (!isNaN(value) && value !== null && value !== 0) {
              //add to the accumulator
              globalesBarrio[key] = (globalesBarrio[key] ?? 0) + parseFloat(value);
              //increment the counter
              mediasGlobalesKeysBarrio[key]++;
            }
          }
          else if (Object.keys(sumatoriosBarrio).includes(key)){
            const value = feature.properties[key];
            if (!isNaN(value) && value !== null && value !== 0) {
              sumatoriosBarrio[key] = (sumatoriosBarrio[key] ?? 0) + value;
            }
          }
        }
      });

      //counter of instances is to not count the nulls
      for (const key in globalesBarrio) {
        if ( mediasGlobalesKeysBarrio[key] !== 0 && !Object.keys(sumatoriosBarrio).includes(key)) {
          globalesBarrio[key] = parseFloat( 
            (globalesBarrio[key] / mediasGlobalesKeysBarrio[key]).toFixed(2)
          );
        }
      }

      //sumatorios
      globalesBarrio.t18_1 = sumatoriosBarrio.t18_1;
      globalesBarrio.t1_1 = sumatoriosBarrio.t1_1;
      globalesBarrio.n_alquiler = sumatoriosBarrio.n_alquiler;
      
      // parseo de algunas variables
      globalesBarrio.ano = parseInt(globalesBarrio.ano, 10);

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
  "Building_Getafe_porc alquiler",
  "Building_Getafe_porc prop sin hipoteca",
  "Building_Getafe_porc prop con hipoteca",
  "Building_Getafe_porc patologias exptes",
  "Building_Getafe_porc no calefaccion",
];

//value represents the nº of instances
const mediasGlobalesKeysEPIU = {
  "ano_constru": 0,
  "Building_Getafe_porc viv OHS": 0,
  "Building_Getafe_porc retraso pago facturas": 0,
  "Building_Getafe_disconfort inv": 0,
  "Building_Getafe_disconfort ver": 0,
  "Building_Getafe_porc alquiler": 0,
  "Building_Getafe_porc prop sin hipoteca": 0,
  "Building_Getafe_porc prop con hipoteca": 0,
  "Building_Getafe_porc no calefaccion": 0,
  "Building_Getafe_porc patologias exptes": 0,
  "prod_fotovol": 0,
  "irradiacion_anual_kwh/m2": 0,
};

const sumatoriosEPIU = {
  "numero_viviendas": 0,
  "n_exptes": 0, 
};

const mediasGlobalesKmediasCertificadosKeysEPIUeysEPIU = {
  "cert_emision_co2": {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
    G: 0,
  },
  "cert_consumo_e_primaria": {
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
  resetCounters(mediasGlobalesKmediasCertificadosKeysEPIUeysEPIU["cert_emision_co2"]);
  resetCounters(mediasGlobalesKmediasCertificadosKeysEPIUeysEPIU["cert_consumo_e_primaria"]);

    // Reniciar todo el dic de los sumatorio
    for(let clave in sumatoriosEPIU){
      sumatoriosEPIU[clave] = 0;
    }

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
              mediasGlobalesKmediasCertificadosKeysEPIUeysEPIU[key][value]++;
            }
          }
        }
      });

      //sum all the values of the keys
      const globalesEPIU = {};
      geoEPIU["features"].forEach((feature) => {
        for (const key in feature.properties) {
          if (Object.keys(mediasGlobalesKeysEPIU).includes(key)) {
            const value = feature.properties[key];
            if (!isNaN(value) && value !== null && value !== 0) {
              //add to the accumulator
              globalesEPIU[key] = (globalesEPIU[key] ?? 0) + parseFloat(value);
              //increment the counter
              mediasGlobalesKeysEPIU[key]++;
            }
          }
          else if (Object.keys(sumatoriosEPIU).includes(key)){
            const value = feature.properties[key];
            if (!isNaN(value) && value !== null && value !== 0) {
              sumatoriosEPIU[key] = (sumatoriosEPIU[key] ?? 0) + value;
            }
          }
        }
      });

      //counter of instances is to not count the nulls
      for (const key in globalesEPIU) {
        if (
          mediasGlobalesKeysEPIU[key] !== 0 && !Object.keys(sumatoriosEPIU).includes(key) 
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
      //sumatorios
      globalesEPIU.numero_viviendas = sumatoriosEPIU.numero_viviendas;
      globalesEPIU.n_exptes = sumatoriosEPIU.n_exptes;
      
      // parseo de algunas variables
      globalesEPIU.ano_constru = parseInt(globalesEPIU.ano_constru, 10);

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
  let globalDataRaw = loadExcelData(dataPathExcel_dashboard, true, 0);
  let infoSocialEcoDataRaw = loadExcelData(dataPathExcel_dashboard, true, 1);
  let infoEvolDataRaw = loadExcelData(dataPathExcel_dashboard, true, 2);
  let barChart2Data = loadExcelData(dataPathExcel_dashboard, true, 3);
  let barChart3Data = loadExcelData(dataPathExcel_dashboard, true, 4);
  let barChart4Data = loadExcelData(dataPathExcel_dashboard, true, 5);
  let lineChart1Data = loadExcelData(dataPathExcel_dashboard, true, 6);

  //filter out empty arrays
  const globalData = globalDataRaw.filter(
    (item) => Array.isArray(item) && item.length > 0
  );
  const infoSocialEco = infoSocialEcoDataRaw.filter(
    (item) => Array.isArray(item) && item.length > 0
  );
  const infoEvol = infoEvolDataRaw.filter(
    (item) => Array.isArray(item) && item.length > 0
  );

  barChart2Data = barChart2Data.filter((item) => Array.isArray(item) && item.length > 0);
  barChart3Data = barChart3Data.filter((item) => Array.isArray(item) && item.length > 0);
  barChart4Data = barChart4Data.filter((item) => Array.isArray(item) && item.length > 0);
  lineChart1Data = lineChart1Data.filter((item) => Array.isArray(item) && item.length > 0);

  //remove headers
  barChart2Data = barChart2Data.slice(1);
  barChart3Data = barChart3Data.slice(1);
  barChart4Data = barChart4Data.slice(1);

  //barchart
  const barChart2 = createBarChart(barChart2Data, false);
  const barChart3 = createBarChart(barChart3Data, false);
  const barChart4 = createBarChart(barChart4Data, false);

  const lineHeaders = lineChart1Data[0].slice(1);
  const lineRawAxis = lineChart1Data.slice(3, 6);
  const lineData = [];
  const lineAxis = [];

  lineChart1Data = lineChart1Data.slice(1, 3); //remove headers row

  for (let i = 0; i < lineChart1Data.length; i++) {
    let obj = {};
    let data = [];
    obj["id"] = lineChart1Data[i][0];
    obj["color"] = colors[i];
    for (let j = 1; j < lineChart1Data[i].length; j++) {
      data.push({
        x: lineHeaders[j - 1],
        y: lineChart1Data[i][j],
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

  const data = {
    globalData,
    barChart2,
    barChart3,
    barChart4,
    lineChart1: [lineData, lineAxis],
    infoSocialEco,
    infoEvol
  };
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

  let globalData = [];
  let pieChart = [];

  const circlesData = {
    name: "Conciencación",
    color: "#9cc2e5",
    children: [],
  };

  const categories = new Map();

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
        tmpCategoryChildrenObj.push(subcategoryObj);
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

  globalData.push(data2[0]);
  globalData.push(data3[0]);
  globalData.push(data3[1]);
  console.log("globalData", globalData);
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


const dataPathExcel_barrios_dashboard = "resources/dashboard_por_barrio.xlsx";

// Endpoint para pasar los datos de los barrios a la vista
app.get("/api/barrios_dashboard", (req, res) => {
  let globalDataRaw = loadExcelData(dataPathExcel_barrios_dashboard, true, 0);

  // Por si hay elementos vacios
  const globalDataFilter = globalDataRaw.filter(
    (item) => Array.isArray(item) && item.length > 0
  );

  const columnasDatos = globalDataFilter.shift();

  // Para convertir el array de arrays en un array de objetos
  const globalDataObjects = [];
  const array_indices_objetos = ["genero", "barrio", "como_nos_has_conocido", "motivo_de_la_consulta", 
    "atenciones_telefónicas", "atenciones_email", "atenciones_presenciales", "sumatorio_interaciones"];
  globalDataFilter.forEach((value, index) => {
    let objeto = {};
    objeto["id"] = index;
    for(let i = 0; i < array_indices_objetos.length; i++) {
      if(!value[i]){
        objeto[array_indices_objetos[i]] = null;
      }
      else{
        objeto[array_indices_objetos[i]] = value[i];
      }
    }
    globalDataObjects.push(objeto);
    
  });

  // Para sacar los diferentes barrios
  const barrios = [...new Set(globalDataObjects.map(obj => obj.barrio))];

  const data = {
    barrios,
    globalDataObjects,
    columnasDatos
  };
  res.json(data);
});

app.get("/api/descargas/:filename", (req, res) => {
  const { filename } = req.params;
  console.log("filename", filename);
  let fileNameExcel = "";
  switch (filename) {
    case "dashboard":
      fileNameExcel = "data_dashboard.xlsx";
      break;
    case "awareness":
      fileNameExcel = "data_awareness.xlsx";
      break;
    case "derivacion":
      fileNameExcel = "data_derivacion.xlsx";
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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

/*-------- Khora credits --------*/
console.log("Created by Khora Urban Thinkers");
console.log("Contact with us in https://khoraurbanthinkers.es/en/home-en/")
console.log("Our X account https://x.com/khoraurban")
console.log("Our Linkedin account https://www.linkedin.com/company/khora-urban-thinkers/posts/?feedView=all")