export const chordData = [
  [100, 300, 200], //user1
  [300, 100, 200], //user2
  [200, 200, 100], //user3
];

export const mockSunburstData = {
  name: "nivo",
  color: "hsl(15, 70%, 50%)",
  children: [
    {
      name: "viz",
      color: "hsl(10, 70%, 50%)",
      children: [
        {
          name: "stack",
          color: "hsl(257, 70%, 50%)",
          children: [
            {
              name: "cchart",
              color: "hsl(86, 70%, 50%)",
              loc: 115420,
            },
            {
              name: "xAxis",
              color: "hsl(156, 70%, 50%)",
              loc: 183856,
            },
            {
              name: "yAxis",
              color: "hsl(5, 70%, 50%)",
              loc: 196336,
            },
            {
              name: "layers",
              color: "hsl(114, 70%, 50%)",
              loc: 51856,
            },
          ],
        },
        {
          name: "ppie",
          color: "hsl(143, 70%, 50%)",
          children: [
            {
              name: "chart",
              color: "hsl(25, 70%, 50%)",
              children: [
                {
                  name: "pie",
                  color: "hsl(278, 70%, 50%)",
                  children: [
                    {
                      name: "outline",
                      color: "hsl(347, 70%, 50%)",
                      loc: 32946,
                    },
                    {
                      name: "slices",
                      color: "hsl(165, 70%, 50%)",
                      loc: 47108,
                    },
                    {
                      name: "bbox",
                      color: "hsl(26, 70%, 50%)",
                      loc: 43908,
                    },
                  ],
                },
                {
                  name: "donut",
                  color: "hsl(97, 70%, 50%)",
                  loc: 102654,
                },
                {
                  name: "gauge",
                  color: "hsl(253, 70%, 50%)",
                  loc: 32261,
                },
              ],
            },
            {
              name: "legends",
              color: "hsl(171, 70%, 50%)",
              loc: 30701,
            },
          ],
        },
      ],
    },
    {
      name: "colors",
      color: "hsl(306, 70%, 50%)",
      children: [
        {
          name: "rgb",
          color: "hsl(110, 70%, 50%)",
          loc: 106677,
        },
        {
          name: "hsl",
          color: "hsl(288, 70%, 50%)",
          loc: 197419,
        },
      ],
    },
    {
      name: "utils",
      color: "hsl(323, 70%, 50%)",
      children: [
        {
          name: "randomize",
          color: "hsl(333, 70%, 50%)",
          loc: 56585,
        },
        {
          name: "resetClock",
          color: "hsl(359, 70%, 50%)",
          loc: 124197,
        },
        {
          name: "noop",
          color: "hsl(49, 70%, 50%)",
          loc: 6701,
        },
        {
          name: "tick",
          color: "hsl(252, 70%, 50%)",
          loc: 191091,
        },
        {
          name: "forceGC",
          color: "hsl(245, 70%, 50%)",
          loc: 71264,
        },
        {
          name: "stackTrace",
          color: "hsl(163, 70%, 50%)",
          loc: 66699,
        },
        {
          name: "dbg",
          color: "hsl(18, 70%, 50%)",
          loc: 197168,
        },
      ],
    },
    {
      name: "generators",
      color: "hsl(341, 70%, 50%)",
      children: [
        {
          name: "address",
          color: "hsl(334, 70%, 50%)",
          loc: 72597,
        },
        {
          name: "city",
          color: "hsl(3, 70%, 50%)",
          loc: 165816,
        },
        {
          name: "animal",
          color: "hsl(214, 70%, 50%)",
          loc: 139236,
        },
        {
          name: "movie",
          color: "hsl(354, 70%, 50%)",
          loc: 196568,
        },
        {
          name: "user",
          color: "hsl(237, 70%, 50%)",
          loc: 44231,
        },
      ],
    },
    {
      name: "set",
      color: "hsl(333, 70%, 50%)",
      children: [
        {
          name: "clone",
          color: "hsl(279, 70%, 50%)",
          loc: 176320,
        },
        {
          name: "intersect",
          color: "hsl(349, 70%, 50%)",
          loc: 153184,
        },
        {
          name: "merge",
          color: "hsl(351, 70%, 50%)",
          loc: 70447,
        },
        {
          name: "reverse",
          color: "hsl(26, 70%, 50%)",
          loc: 39124,
        },
        {
          name: "toArray",
          color: "hsl(269, 70%, 50%)",
          loc: 148284,
        },
        {
          name: "toObject",
          color: "hsl(96, 70%, 50%)",
          loc: 83683,
        },
        {
          name: "fromCSV",
          color: "hsl(210, 70%, 50%)",
          loc: 56657,
        },
        {
          name: "slice",
          color: "hsl(343, 70%, 50%)",
          loc: 193195,
        },
        {
          name: "append",
          color: "hsl(174, 70%, 50%)",
          loc: 116263,
        },
        {
          name: "prepend",
          color: "hsl(140, 70%, 50%)",
          loc: 68392,
        },
        {
          name: "shuffle",
          color: "hsl(21, 70%, 50%)",
          loc: 156515,
        },
        {
          name: "pick",
          color: "hsl(173, 70%, 50%)",
          loc: 142031,
        },
        {
          name: "plouc",
          color: "hsl(160, 70%, 50%)",
          loc: 154887,
        },
      ],
    },
    {
      name: "text",
      color: "hsl(280, 70%, 50%)",
      children: [
        {
          name: "trim",
          color: "hsl(264, 70%, 50%)",
          loc: 51883,
        },
        {
          name: "slugify",
          color: "hsl(153, 70%, 50%)",
          loc: 13095,
        },
        {
          name: "snakeCase",
          color: "hsl(222, 70%, 50%)",
          loc: 9130,
        },
        {
          name: "camelCase",
          color: "hsl(338, 70%, 50%)",
          loc: 2089,
        },
        {
          name: "repeat",
          color: "hsl(337, 70%, 50%)",
          loc: 182659,
        },
        {
          name: "padLeft",
          color: "hsl(114, 70%, 50%)",
          loc: 183271,
        },
        {
          name: "padRight",
          color: "hsl(345, 70%, 50%)",
          loc: 100583,
        },
        {
          name: "sanitize",
          color: "hsl(205, 70%, 50%)",
          loc: 179083,
        },
        {
          name: "ploucify",
          color: "hsl(186, 70%, 50%)",
          loc: 169973,
        },
      ],
    },
    {
      name: "misc",
      color: "hsl(349, 70%, 50%)",
      children: [
        {
          name: "greetings",
          color: "hsl(323, 70%, 50%)",
          children: [
            {
              name: "hey",
              color: "hsl(179, 70%, 50%)",
              loc: 21453,
            },
            {
              name: "HOWDY",
              color: "hsl(58, 70%, 50%)",
              loc: 98071,
            },
            {
              name: "aloha",
              color: "hsl(195, 70%, 50%)",
              loc: 30324,
            },
            {
              name: "AHOY",
              color: "hsl(317, 70%, 50%)",
              loc: 17418,
            },
          ],
        },
        {
          name: "other",
          color: "hsl(208, 70%, 50%)",
          loc: 185197,
        },
        {
          name: "path",
          color: "hsl(181, 70%, 50%)",
          children: [
            {
              name: "pathA",
              color: "hsl(180, 70%, 50%)",
              loc: 43844,
            },
            {
              name: "pathB",
              color: "hsl(114, 70%, 50%)",
              children: [
                {
                  name: "pathB1",
                  color: "hsl(27, 70%, 50%)",
                  loc: 34402,
                },
                {
                  name: "donut",
                  color: "hsl(5, 70%, 50%)",
                  loc: 131294,
                },
                {
                  name: "pathB3",
                  color: "hsl(196, 70%, 50%)",
                  loc: 25513,
                },
                {
                  name: "donut",
                  color: "hsl(144, 70%, 50%)",
                  loc: 91267,
                },
              ],
            },
            {
              name: "pathC",
              color: "hsl(141, 70%, 50%)",
              children: [
                {
                  name: "pathC1",
                  color: "hsl(214, 70%, 50%)",
                  loc: 187231,
                },
                {
                  name: "pathC2",
                  color: "hsl(108, 70%, 50%)",
                  loc: 61170,
                },
                {
                  name: "pathC3",
                  color: "hsl(54, 70%, 50%)",
                  loc: 151451,
                },
                {
                  name: "pathC4",
                  color: "hsl(319, 70%, 50%)",
                  loc: 66940,
                },
                {
                  name: "pathC5",
                  color: "hsl(18, 70%, 50%)",
                  loc: 171241,
                },
                {
                  name: "pathC6",
                  color: "hsl(197, 70%, 50%)",
                  loc: 1253,
                },
                {
                  name: "pathC7",
                  color: "hsl(251, 70%, 50%)",
                  loc: 93354,
                },
                {
                  name: "pathC8",
                  color: "hsl(279, 70%, 50%)",
                  loc: 71155,
                },
                {
                  name: "pathC9",
                  color: "hsl(236, 70%, 50%)",
                  loc: 52635,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const mockCircleData = {
  name: "Conciencación",
  color: "hsl(111, 70%, 50%)",
  children: [
    {
      name: "Acciones CC",
      color: "hsl(160, 70%, 50%)",
      children: [
        {
          name: "PUI",
          color: "hsl(160, 70%, 50%)",
          valor: 267,
        },
        {
          name: "Taller",
          color: "hsl(160, 70%, 50%)",
          valor: 65,
        },
        {
          name: "Concienciación Centros Cívicos",
          color: "hsl(160, 70%, 50%)",
          valor: 55,
        },
      ],
    },
    {
      name: "Actividades espacio público",
      color: "hsl(160, 70%, 50%)",
      children: [
        {
          name: "Mural contra la Pobreza Energética",
          color: "hsl(160, 70%, 50%)",
          valor: 18,
        },
        {
          name: "Asesoramiento zonas públicas",
          color: "hsl(160, 70%, 50%)",
          valor: 168,
        },
        {
          name: "Taller Centro Educativo",
          color: "hsl(160, 70%, 50%)",
          valor: 54,
        },
      ],
    },
    {
      name: "Formaciones",
      color: "hsl(160, 70%, 50%)",
      valor: 122,
    },
    {
      name: "Usuarios OHS",
      color: "hsl(160, 70%, 50%)",
      valor: 1204,
    },
  ],
};

export const mockSankeyData = {
  nodes: [
    {
      id: "John",
      nodeColor: "hsl(104, 70%, 50%)",
    },
    {
      id: "Raoul",
      nodeColor: "hsl(136, 70%, 50%)",
    },
    {
      id: "Jane",
      nodeColor: "hsl(232, 70%, 50%)",
    },
    {
      id: "Marcel",
      nodeColor: "hsl(318, 70%, 50%)",
    },
    {
      id: "Ibrahim",
      nodeColor: "hsl(322, 70%, 50%)",
    },
    {
      id: "Junko",
      nodeColor: "hsl(282, 70%, 50%)",
    },
  ],
  links: [
    {
      source: "Ibrahim",
      target: "Junko",
      value: 79,
    },
    {
      source: "Ibrahim",
      target: "Jane",
      value: 73,
    },
    {
      source: "Ibrahim",
      target: "Raoul",
      value: 113,
    },
    {
      source: "Ibrahim",
      target: "Marcel",
      value: 14,
    },
    {
      source: "Ibrahim",
      target: "John",
      value: 184,
    },
    {
      source: "Jane",
      target: "Raoul",
      value: 95,
    },
    {
      source: "Jane",
      target: "Marcel",
      value: 112,
    },
    {
      source: "Jane",
      target: "John",
      value: 27,
    },
    {
      source: "Jane",
      target: "Junko",
      value: 106,
    },
    {
      source: "John",
      target: "Raoul",
      value: 111,
    },
    {
      source: "John",
      target: "Marcel",
      value: 38,
    },
    {
      source: "Raoul",
      target: "Marcel",
      value: 40,
    },
    {
      source: "Junko",
      target: "Marcel",
      value: 106,
    },
    {
      source: "Junko",
      target: "Raoul",
      value: 78,
    },
  ],
};

/*
export const mockSankeyData = {
  nodes: [
    { id: "Comunicaciones oficiales" },
    { id: "Bono Social" },
    { id: "Info. Ayuntamiento" },
    { id: "Ayudas a rehab." },
    { id: "Directamente" },
    { id: "Optimización factura" },
    { id: "SS.SS" },
    { id: "Entidades EPIU" },
    { id: "Info. general" },
    { id: "Derivadores" },
    { id: "Persona conocida" },
    { id: "RR.SS Ayuntamiento" },
    { id: "Asoc. locales" },
    { id: "Administrador de fincas" },
    { id: "PUI FNaturgy" },
  ],
  links: [
    {
      source: "Comunicaciones oficiales",
      target: "Bono Social",
      value: 43,
    },
    {
      source: "Info. Ayuntamiento",
      target: "Ayudas a rehab.",
      value: 38,
    },
    {
      source: "Comunicaciones oficiales",
      target: "Ayudas a rehab.",
      value: 231,
    },
    { source: "Directamente", target: "Ayudas a rehab.", value: 8 },
    {
      source: "Comunicaciones oficiales",
      target: "Optimización factura",
      value: 159,
    },
    { source: "SS.SS", target: "Bono Social", value: 98 },
    {
      source: "Entidades EPIU",
      target: "Optimización factura",
      value: 30,
    },
    {
      source: "Comunicaciones oficiales",
      target: "Info. general",
      value: 76,
    },
    { source: "Info. Ayuntamiento", target: "Bono Social", value: 8 },
    { source: "SS.SS", target: "Optimización factura", value: 111 },
    { source: "Entidades EPIU", target: "Bono Social", value: 6 },
    {
      source: "Info. Ayuntamiento",
      target: "Optimización factura",
      value: 42,
    },
    { source: "Derivadores", target: "Bono Social", value: 3 },
    { source: "Directamente", target: "Bono Social", value: 6 },
    {
      source: "Directamente",
      target: "Optimización factura",
      value: 12,
    },
    { source: "SS.SS", target: "Ayudas a rehab.", value: 21 },
    { source: "SS.SS", target: "Info. general", value: 28 },
    { source: "Persona conocida", target: "Bono Social", value: 8 },
    { source: "Entidades EPIU", target: "Ayudas a rehab.", value: 22 },
    { source: "Persona conocida", target: "Info. general", value: 8 },
    {
      source: "Info. Ayuntamiento",
      target: "Info. general",
      value: 18,
    },
    {
      source: "RR.SS Ayuntamiento",
      target: "Ayudas a rehab.",
      value: 4,
    },
    { source: "Directamente", target: "Info. general", value: 5 },
    {
      source: "Persona conocida",
      target: "Optimización factura",
      value: 33,
    },
    {
      source: "Asoc. locales",
      target: "Optimización factura",
      value: 7,
    },
    {
      source: "Administrador de fincas",
      target: "Ayudas a rehab.",
      value: 5,
    },
    { source: "Asoc. locales", target: "Info. general", value: 7 },
    {
      source: "Persona conocida",
      target: "Ayudas a rehab.",
      value: 35,
    },
    {
      source: "RR.SS Ayuntamiento",
      target: "Optimización factura",
      value: 3,
    },
    { source: "Entidades EPIU", target: "Info. general", value: 30 },
    { source: "RR.SS Ayuntamiento", target: "Bono Social", value: 1 },
    {
      source: "Derivadores",
      target: "Optimización factura",
      value: 36,
    },
    { source: "Derivadores", target: "Ayudas a rehab.", value: 6 },
    { source: "RR.SS Ayuntamiento", target: "Info. general", value: 2 },
    { source: "Asoc. locales", target: "Bono Social", value: 5 },
    {
      source: "Administrador de fincas",
      target: "Bono Social",
      value: 1,
    },
    {
      source: "Administrador de fincas",
      target: "Info. general",
      value: 1,
    },
    { source: "Derivadores", target: "Info. general", value: 1 },
    { source: "PUI FNaturgy", target: "Bono Social", value: 1 },
    { source: "PUI FNaturgy", target: "Info. general", value: 16 },
  ],
};
*/

export const mockDataTeam = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    access: "admin",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    access: "manager",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    access: "user",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    access: "admin",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    access: "user",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(232)545-6483",
    access: "manager",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "(543)124-0123",
    access: "user",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    access: "user",
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
];

export const mockDataHeatMap = [
  {
    id: "Japan",
    data: [
      {
        x: "Train",
        y: 96723,
      },
      {
        x: "Subway",
        y: 26235,
      },
      {
        x: "Bus",
        y: 93468,
      },
      {
        x: "Car",
        y: -6022,
      },
      {
        x: "Boat",
        y: 81264,
      },
      {
        x: "Moto",
        y: 49164,
      },
      {
        x: "Moped",
        y: -14394,
      },
      {
        x: "Bicycle",
        y: 47488,
      },
      {
        x: "Others",
        y: -31322,
      },
    ],
  },
  {
    id: "France",
    data: [
      {
        x: "Train",
        y: -61296,
      },
      {
        x: "Subway",
        y: -80010,
      },
      {
        x: "Bus",
        y: -5305,
      },
      {
        x: "Car",
        y: -10385,
      },
      {
        x: "Boat",
        y: -19698,
      },
      {
        x: "Moto",
        y: -95246,
      },
      {
        x: "Moped",
        y: -58370,
      },
      {
        x: "Bicycle",
        y: -96872,
      },
      {
        x: "Others",
        y: 40892,
      },
    ],
  },
  {
    id: "US",
    data: [
      {
        x: "Train",
        y: 5612,
      },
      {
        x: "Subway",
        y: -44817,
      },
      {
        x: "Bus",
        y: -43416,
      },
      {
        x: "Car",
        y: -79732,
      },
      {
        x: "Boat",
        y: -75860,
      },
      {
        x: "Moto",
        y: 85803,
      },
      {
        x: "Moped",
        y: -62229,
      },
      {
        x: "Bicycle",
        y: -34878,
      },
      {
        x: "Others",
        y: -27967,
      },
    ],
  },
  {
    id: "Germany",
    data: [
      {
        x: "Train",
        y: -11142,
      },
      {
        x: "Subway",
        y: -32642,
      },
      {
        x: "Bus",
        y: 53734,
      },
      {
        x: "Car",
        y: 73796,
      },
      {
        x: "Boat",
        y: -99886,
      },
      {
        x: "Moto",
        y: -91433,
      },
      {
        x: "Moped",
        y: 84945,
      },
      {
        x: "Bicycle",
        y: -20796,
      },
      {
        x: "Others",
        y: 6931,
      },
    ],
  },
  {
    id: "Norway",
    data: [
      {
        x: "Train",
        y: 57154,
      },
      {
        x: "Subway",
        y: 86591,
      },
      {
        x: "Bus",
        y: 68313,
      },
      {
        x: "Car",
        y: -82898,
      },
      {
        x: "Boat",
        y: 20542,
      },
      {
        x: "Moto",
        y: -85397,
      },
      {
        x: "Moped",
        y: -7485,
      },
      {
        x: "Bicycle",
        y: 17,
      },
      {
        x: "Others",
        y: -53257,
      },
    ],
  },
  {
    id: "Iceland",
    data: [
      {
        x: "Train",
        y: -22079,
      },
      {
        x: "Subway",
        y: 45702,
      },
      {
        x: "Bus",
        y: -53378,
      },
      {
        x: "Car",
        y: -97897,
      },
      {
        x: "Boat",
        y: -7105,
      },
      {
        x: "Moto",
        y: 26366,
      },
      {
        x: "Moped",
        y: 51390,
      },
      {
        x: "Bicycle",
        y: 16895,
      },
      {
        x: "Others",
        y: 85073,
      },
    ],
  },
  {
    id: "UK",
    data: [
      {
        x: "Train",
        y: -8970,
      },
      {
        x: "Subway",
        y: -68086,
      },
      {
        x: "Bus",
        y: -4850,
      },
      {
        x: "Car",
        y: 18747,
      },
      {
        x: "Boat",
        y: 90271,
      },
      {
        x: "Moto",
        y: -51418,
      },
      {
        x: "Moped",
        y: -13088,
      },
      {
        x: "Bicycle",
        y: 59985,
      },
      {
        x: "Others",
        y: -15672,
      },
    ],
  },
  {
    id: "Vietnam",
    data: [
      {
        x: "Train",
        y: -55215,
      },
      {
        x: "Subway",
        y: -75159,
      },
      {
        x: "Bus",
        y: -26634,
      },
      {
        x: "Car",
        y: 53359,
      },
      {
        x: "Boat",
        y: 18520,
      },
      {
        x: "Moto",
        y: 22554,
      },
      {
        x: "Moped",
        y: -93357,
      },
      {
        x: "Bicycle",
        y: 26017,
      },
      {
        x: "Others",
        y: 84795,
      },
    ],
  },
];

// export const mockBarData = [
//   { id: "Murialdo", valor: 3.9878787878787887, valorColor: "#cce0ee" },
//   { id: "BS (I)", valor: 4.074380165289256, valorColor: "#99c2dc" },
//   { id: "SAV (II)", valor: -4.424242424242424, valorColor: "#67a3cb" },
//   { id: "BS (II)", valor: 4.533057851239668, valorColor: "#3485b9" },
//   { id: "SAV (I)", valor: -4.573863636363637, valorColor: "#0166a8" },
//   { id: "GISA", valor: -4.618181818181818, valorColor: "#015286" },
//   { id: "BS (III)", valor: 4.65909090909091, valorColor: "#013d65" },
//   { id: "APANID", valor: 4.703557312252965, valorColor: "#002943" },
//   { id: "EMSV", valor: -4.833333333333334, valorColor: "#001422" },
// ];

export const mockBarData = [
  {
    id: "M1",
    Confort: 300,
    ConfortColor: "#3485b9",
    Disconfort: 450,
    DisconfortColor: "#67a3cb",
    "Gasto Energético": -250,
    "Gasto EnergéticoColor": "#d13f3f",
  },
  {
    id: "M2",
    Confort: 100,
    ConfortColor: "#3485b9",
    Disconfort: 550,
    DisconfortColor: "#67a3cb",
    "Gasto Energético": -350,
    "Gasto EnergéticoColor": "#d13f3f",
  },
  {
    id: "M3",
    Confort: 200,
    ConfortColor: "#3485b9",
    Disconfort: 350,
    DisconfortColor: "#67a3cb",
    "Gasto Energético": -150,
    "Gasto EnergéticoColor": "#d13f3f",
  },
  {
    id: "M4",
    Confort: 400,
    ConfortColor: "#3485b9",
    Disconfort: 600,
    DisconfortColor: "#67a3cb",
    "Gasto Energético": -450,
    "Gasto EnergéticoColor": "#d13f3f",
  },
  {
    id: "M5",
    Confort: 250,
    ConfortColor: "#3485b9",
    Disconfort: 500,
    DisconfortColor: "#67a3cb",
    "Gasto Energético": -300,
    "Gasto EnergéticoColor": "#d13f3f",
  },
  {
    id: "M6",
    Confort: 350,
    ConfortColor: "#3485b9",
    Disconfort: 550,
    DisconfortColor: "#67a3cb",
    "Gasto Energético": -250,
    "Gasto EnergéticoColor": "#d13f3f",
  },
  {
    id: "M7",
    Confort: 150,
    ConfortColor: "#3485b9",
    Disconfort: 400,
    DisconfortColor: "#67a3cb",
    "Gasto Energético": -200,
    "Gasto EnergéticoColor": "#d13f3f",
  },
  {
    id: "M8",
    Confort: 250,
    ConfortColor: "#3485b9",
    Disconfort: 550,
    DisconfortColor: "#67a3cb",
    "Gasto Energético": -350,
    "Gasto EnergéticoColor": "#d13f3f",
  },
  {
    id: "M9",
    Confort: 300,
    ConfortColor: "#3485b9",
    Disconfort: 400,
    DisconfortColor: "#67a3cb",
    "Gasto Energético": -200,
    "Gasto EnergéticoColor": "#d13f3f",
  },
  {
    id: "M10",
    Confort: 200,
    ConfortColor: "#3485b9",
    Disconfort: 500,
    DisconfortColor: "#67a3cb",
    "Gasto Energético": -300,
    "Gasto EnergéticoColor": "#d13f3f",
  },
  {
    id: "M11",
    Confort: 400,
    ConfortColor: "#3485b9",
    Disconfort: 600,
    DisconfortColor: "#67a3cb",
    "Gasto Energético": -450,
    "Gasto EnergéticoColor": "#d13f3f",
  },
  {
    id: "M12",
    Confort: 350,
    ConfortColor: "#3485b9",
    Disconfort: 550,
    DisconfortColor: "#67a3cb",
    "Gasto Energético": -250,
    "Gasto EnergéticoColor": "#d13f3f",
  },
];

// export const mockBarData = [
//   {
//     country: "AD",
//     "hot dog": 137,
//     "hot dogColor": "hsl(229, 70%, 50%)",
//     burger: 96,
//     burgerColor: "hsl(296, 70%, 50%)",
//     kebab: 72,
//     kebabColor: "hsl(97, 70%, 50%)",
//     donut: 140,
//     donutColor: "hsl(340, 70%, 50%)",
//   },
//   {
//     country: "AE",
//     "hot dog": 55,
//     "hot dogColor": "hsl(307, 70%, 50%)",
//     burger: 28,
//     burgerColor: "hsl(111, 70%, 50%)",
//     kebab: 58,
//     kebabColor: "hsl(273, 70%, 50%)",
//     donut: 29,
//     donutColor: "hsl(275, 70%, 50%)",
//   },
//   {
//     country: "AF",
//     "hot dog": 109,
//     "hot dogColor": "hsl(72, 70%, 50%)",
//     burger: 23,
//     burgerColor: "hsl(96, 70%, 50%)",
//     kebab: 34,
//     kebabColor: "hsl(106, 70%, 50%)",
//     donut: 152,
//     donutColor: "hsl(256, 70%, 50%)",
//   },
//   {
//     country: "AG",
//     "hot dog": 133,
//     "hot dogColor": "hsl(257, 70%, 50%)",
//     burger: 52,
//     burgerColor: "hsl(326, 70%, 50%)",
//     kebab: 43,
//     kebabColor: "hsl(110, 70%, 50%)",
//     donut: 83,
//     donutColor: "hsl(9, 70%, 50%)",
//   },
//   {
//     country: "AI",
//     "hot dog": 81,
//     "hot dogColor": "hsl(190, 70%, 50%)",
//     burger: 80,
//     burgerColor: "hsl(325, 70%, 50%)",
//     kebab: 112,
//     kebabColor: "hsl(54, 70%, 50%)",
//     donut: 35,
//     donutColor: "hsl(285, 70%, 50%)",
//   },
//   {
//     country: "AL",
//     "hot dog": 66,
//     "hot dogColor": "hsl(208, 70%, 50%)",
//     burger: 111,
//     burgerColor: "hsl(334, 70%, 50%)",
//     kebab: 167,
//     kebabColor: "hsl(182, 70%, 50%)",
//     donut: 18,
//     donutColor: "hsl(76, 70%, 50%)",
//   },
//   {
//     country: "AM",
//     "hot dog": 80,
//     "hot dogColor": "hsl(87, 70%, 50%)",
//     burger: 47,
//     burgerColor: "hsl(141, 70%, 50%)",
//     kebab: 158,
//     kebabColor: "hsl(224, 70%, 50%)",
//     donut: 49,
//     donutColor: "hsl(274, 70%, 50%)",
//   },
// ];

export const mockPieData = [
  {
    id: "hackk",
    label: "hackuu",
    value: 239,
    // color: "hsl(104, 70%, 50%)",
  },
  {
    id: "make",
    label: "make",
    value: 170,
    // color: "hsl(162, 70%, 50%)",
  },
  {
    id: "go",
    label: "go",
    value: 322,
    // color: "hsl(291, 70%, 50%)",
  },
  {
    id: "lisp",
    label: "lisp",
    value: 503,
    // color: "hsl(229, 70%, 50%)",
  },
  {
    id: "scala",
    label: "scala",
    value: 584,
    // color: "hsl(344, 70%, 50%)",
  },
];

export const mockLineData = [
  {
    id: "japan",
    color: "hsl(116, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 236,
      },
      {
        x: "helicopter",
        y: 5,
      },
      {
        x: "boat",
        y: 40,
      },
      {
        x: "train",
        y: 203,
      },
      {
        x: "subway",
        y: 233,
      },
      {
        x: "bus",
        y: 142,
      },
      {
        x: "car",
        y: 87,
      },
      {
        x: "moto",
        y: 28,
      },
      {
        x: "bicycle",
        y: 9,
      },
      {
        x: "horse",
        y: 104,
      },
      {
        x: "skateboard",
        y: 149,
      },
      {
        x: "others",
        y: 295,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(44, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 68,
      },
      {
        x: "helicopter",
        y: 288,
      },
      {
        x: "boat",
        y: 256,
      },
      {
        x: "train",
        y: 187,
      },
      {
        x: "subway",
        y: 254,
      },
      {
        x: "bus",
        y: 36,
      },
      {
        x: "car",
        y: 73,
      },
      {
        x: "moto",
        y: 184,
      },
      {
        x: "bicycle",
        y: 73,
      },
      {
        x: "horse",
        y: 48,
      },
      {
        x: "skateboard",
        y: 288,
      },
      {
        x: "others",
        y: 288,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(204, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 234,
      },
      {
        x: "helicopter",
        y: 214,
      },
      {
        x: "boat",
        y: 66,
      },
      {
        x: "train",
        y: 120,
      },
      {
        x: "subway",
        y: 210,
      },
      {
        x: "bus",
        y: 61,
      },
      {
        x: "car",
        y: 263,
      },
      {
        x: "moto",
        y: 184,
      },
      {
        x: "bicycle",
        y: 280,
      },
      {
        x: "horse",
        y: 182,
      },
      {
        x: "skateboard",
        y: 297,
      },
      {
        x: "others",
        y: 153,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(3, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 267,
      },
      {
        x: "helicopter",
        y: 138,
      },
      {
        x: "boat",
        y: 149,
      },
      {
        x: "train",
        y: 201,
      },
      {
        x: "subway",
        y: 99,
      },
      {
        x: "bus",
        y: 89,
      },
      {
        x: "car",
        y: 293,
      },
      {
        x: "moto",
        y: 293,
      },
      {
        x: "bicycle",
        y: 102,
      },
      {
        x: "horse",
        y: 145,
      },
      {
        x: "skateboard",
        y: 167,
      },
      {
        x: "others",
        y: 185,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(62, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 139,
      },
      {
        x: "helicopter",
        y: 250,
      },
      {
        x: "boat",
        y: 34,
      },
      {
        x: "train",
        y: 136,
      },
      {
        x: "subway",
        y: 254,
      },
      {
        x: "bus",
        y: 56,
      },
      {
        x: "car",
        y: 29,
      },
      {
        x: "moto",
        y: 237,
      },
      {
        x: "bicycle",
        y: 241,
      },
      {
        x: "horse",
        y: 96,
      },
      {
        x: "skateboard",
        y: 57,
      },
      {
        x: "others",
        y: 122,
      },
    ],
  },
];
