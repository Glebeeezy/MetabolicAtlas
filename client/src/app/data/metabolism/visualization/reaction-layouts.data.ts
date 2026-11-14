import { ReactionLayout } from '../../../core/metabolism/models';

export const REACTION_LAYOUTS: ReactionLayout[] = [
  {
    "reactionId": "d0000002-0000-0000-0000-000000000001",
    "pathData": "M 1600 -200 L 1600 -114",
    "tooltipX": 1600,
    "tooltipY": -157,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1495 -178 C 1552 -172, 1586 -160, 1600 -157 C 1586 -154, 1552 -142, 1495 -136",
      "inCofactor": "Аденозинтрифосфат",
      "inCofactorEn": "ATP",
      "inText": "+ АТФ",
      "inTextRu": "+ АТФ",
      "inTextEn": "+ ATP",
      "inX": 1460,
      "inY": -178,
      "outCofactor": "Аденозиндифосфат",
      "outCofactorEn": "ADP",
      "outText": "АДФ + H⁺",
      "outTextRu": "АДФ + H⁺",
      "outTextEn": "ADP + H⁺",
      "outX": 1448,
      "outY": -136,
      "inItems": [
        {
          "name": "Аденозинтрифосфат",
          "nameEn": "ATP",
          "text": "+ АТФ",
          "textRu": "+ АТФ",
          "textEn": "+ ATP",
          "isEnergy": true
        }
      ],
      "outItems": [
        {
          "name": "Аденозиндифосфат",
          "nameEn": "ADP",
          "text": "АДФ",
          "textRu": "АДФ",
          "textEn": "ADP"
        }
      ]
    }
  },
  {
    "reactionId": "d0000002-0000-0000-0000-000000000002",
    "pathData": "M 1600 -40 L 1600 46",
    "tooltipX": 1600,
    "tooltipY": 3
  },
  {
    "reactionId": "d0000002-0000-0000-0000-000000000003",
    "pathData": "M 1600 120 L 1600 206",
    "tooltipX": 1600,
    "tooltipY": 163,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1495 142 C 1552 148, 1586 160, 1600 163 C 1586 166, 1552 178, 1495 184",
      "inCofactor": "Аденозинтрифосфат",
      "inCofactorEn": "ATP",
      "inText": "+ АТФ",
      "inTextRu": "+ АТФ",
      "inTextEn": "+ ATP",
      "inX": 1460,
      "inY": 142,
      "outCofactor": "Аденозиндифосфат",
      "outCofactorEn": "ADP",
      "outText": "АДФ + H⁺",
      "outTextRu": "АДФ + H⁺",
      "outTextEn": "ADP + H⁺",
      "outX": 1448,
      "outY": 184,
      "inItems": [
        {
          "name": "Аденозинтрифосфат",
          "nameEn": "ATP",
          "text": "+ АТФ",
          "textRu": "+ АТФ",
          "textEn": "+ ATP",
          "isEnergy": true
        }
      ],
      "outItems": [
        {
          "name": "Аденозиндифосфат",
          "nameEn": "ADP",
          "text": "АДФ",
          "textRu": "АДФ",
          "textEn": "ADP"
        }
      ]
    }
  },
  {
    "reactionId": "d0000002-0000-0000-0000-000000000004",
    "pathData": "M 1600 280 L 1600 366",
    "secondaryPathData": "M 1600 280 C 1745 296, 1895 315, 1935 366",
    "tooltipX": 1600,
    "tooltipY": 323,
    "junction": {
      "x": 1600,
      "y": 323,
      "label": "ALDOA",
      "labelRu": "АЛДО-A",
      "width": 56,
      "height": 20
    },
    "branches": [
      {
        "id": "in",
        "role": "in",
        "metaboliteId": "b0000002-0000-0000-0000-000000000004",
        "pathData": "M 1600 280 L 1600 313",
        "showArrow": true,
        "isReversible": true
      },
      {
        "id": "out-gap",
        "role": "out",
        "metaboliteId": "b0000002-0000-0000-0000-000000000006",
        "pathData": "M 1600 333 L 1600 366",
        "showArrow": true,
        "isReversible": true
      },
      {
        "id": "out-dhap",
        "role": "out",
        "metaboliteId": "b0000002-0000-0000-0000-000000000005",
        "pathData": "M 1628 323 C 1745 323, 1890 326, 1935 366",
        "showArrow": true,
        "isReversible": true
      }
    ]
  },
  {
    "reactionId": "d0000002-0000-0000-0000-000000000005",
    "pathData": "M 1885 403 L 1680 403",
    "tooltipX": 1782,
    "tooltipY": 388
  },
  {
    "reactionId": "d0000002-0000-0000-0000-000000000006",
    "pathData": "M 1600 440 L 1600 526",
    "tooltipX": 1600,
    "tooltipY": 483,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1495 462 C 1552 468, 1586 480, 1600 483 C 1586 486, 1552 498, 1495 504",
      "inCofactor": "НАД⁺",
      "inCofactorEn": "NAD⁺",
      "inText": "+ Фᵢ + НАД⁺",
      "inTextRu": "+ Фᵢ + НАД⁺",
      "inTextEn": "+ Pi + NAD⁺",
      "inX": 1436,
      "inY": 462,
      "outCofactor": "НАДН",
      "outCofactorEn": "NADH",
      "outText": "НАДН + H⁺",
      "outTextRu": "НАДН + H⁺",
      "outTextEn": "NADH + H⁺",
      "outX": 1444,
      "outY": 504,
      "isEnergy": true,
      "inItems": [
        {
          "name": "НАД⁺",
          "nameEn": "NAD⁺",
          "text": "+ НАД⁺",
          "textRu": "+ НАД⁺",
          "textEn": "+ NAD⁺"
        }
      ],
      "outItems": [
        {
          "name": "НАДН",
          "nameEn": "NADH",
          "text": "НАДН",
          "textRu": "НАДН",
          "textEn": "NADH",
          "isEnergy": true
        }
      ]
    }
  },
  {
    "reactionId": "d0000002-0000-0000-0000-000000000007",
    "pathData": "M 1600 600 L 1600 686",
    "tooltipX": 1600,
    "tooltipY": 643,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1495 622 C 1552 628, 1586 640, 1600 643 C 1586 646, 1552 658, 1495 664",
      "inCofactor": "Аденозиндифосфат",
      "inCofactorEn": "ADP",
      "inText": "+ АДФ",
      "inTextRu": "+ АДФ",
      "inTextEn": "+ ADP",
      "inX": 1460,
      "inY": 622,
      "outCofactor": "Аденозинтрифосфат",
      "outCofactorEn": "ATP",
      "outText": "⚡ АТФ (2x)",
      "outTextRu": "⚡ АТФ (2x)",
      "outTextEn": "⚡ ATP (2x)",
      "outX": 1440,
      "outY": 664,
      "isEnergy": true,
      "inItems": [
        {
          "name": "Аденозиндифосфат",
          "nameEn": "ADP",
          "text": "+ АДФ",
          "textRu": "+ АДФ",
          "textEn": "+ ADP"
        }
      ],
      "outItems": [
        {
          "name": "Аденозинтрифосфат",
          "nameEn": "ATP",
          "text": "⚡ АТФ",
          "textRu": "⚡ АТФ",
          "textEn": "⚡ ATP",
          "isEnergy": true
        }
      ]
    }
  },
  {
    "reactionId": "d0000002-0000-0000-0000-000000000008",
    "pathData": "M 1600 760 L 1600 846",
    "tooltipX": 1600,
    "tooltipY": 803
  },
  {
    "reactionId": "d0000002-0000-0000-0000-000000000009",
    "pathData": "M 1600 920 L 1600 1006",
    "tooltipX": 1600,
    "tooltipY": 963,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1600 963 C 1565 963, 1530 963, 1495 963",
      "outCofactor": "Вода (H₂O)",
      "outCofactorEn": "Water (H₂O)",
      "outText": "- H₂O",
      "outTextRu": "- H₂O",
      "outTextEn": "- H₂O",
      "outX": 1460,
      "outY": 963,
      "outItems": [
        {
          "name": "Вода (H₂O)",
          "nameEn": "Water (H₂O)",
          "text": "- H₂O",
          "textRu": "- H₂O",
          "textEn": "- H₂O"
        }
      ]
    }
  },
  {
    "reactionId": "d0000002-0000-0000-0000-000000000010",
    "pathData": "M 1600 1080 L 1600 1166",
    "tooltipX": 1600,
    "tooltipY": 1123,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1495 1102 C 1552 1108, 1586 1120, 1600 1123 C 1586 1126, 1552 1138, 1495 1144",
      "inCofactor": "Аденозиндифосфат",
      "inCofactorEn": "ADP",
      "inText": "+ АДФ",
      "inTextRu": "+ АДФ",
      "inTextEn": "+ ADP",
      "inX": 1460,
      "inY": 1102,
      "outCofactor": "Аденозинтрифосфат",
      "outCofactorEn": "ATP",
      "outText": "⚡ АТФ (2x)",
      "outTextRu": "⚡ АТФ (2x)",
      "outTextEn": "⚡ ATP (2x)",
      "outX": 1440,
      "outY": 1144,
      "isEnergy": true,
      "inItems": [
        {
          "name": "Аденозиндифосфат",
          "nameEn": "ADP",
          "text": "+ АДФ",
          "textRu": "+ АДФ",
          "textEn": "+ ADP"
        }
      ],
      "outItems": [
        {
          "name": "Аденозинтрифосфат",
          "nameEn": "ATP",
          "text": "⚡ АТФ",
          "textRu": "⚡ АТФ",
          "textEn": "⚡ ATP",
          "isEnergy": true
        }
      ]
    }
  },
  {
    "reactionId": "d0000002-0000-0000-0000-000000000011",
    "pathData": "M 1600 1240 L 1600 1356",
    "tooltipX": 1600,
    "tooltipY": 1298
  },
  {
    "reactionId": "d0000002-0000-0000-0000-000000000012",
    "pathData": "M 1600 1430 L 1600 1560",
    "tooltipX": 1600,
    "tooltipY": 1495,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1500 1468 C 1555 1476, 1588 1490, 1600 1495 C 1588 1500, 1555 1514, 1500 1522",
      "inCofactor": "НАД⁺",
      "inCofactorEn": "NAD⁺",
      "inText": "+ КоА-SH + НАД⁺",
      "inTextRu": "+ КоА-SH + НАД⁺",
      "inTextEn": "+ CoA-SH + NAD⁺",
      "inX": 1395,
      "inY": 1468,
      "outCofactor": "НАДН",
      "outCofactorEn": "NADH",
      "outText": "НАДН + CO₂ ↑",
      "outTextRu": "НАДН + CO₂ ↑",
      "outTextEn": "NADH + CO₂ ↑",
      "outX": 1395,
      "outY": 1522,
      "isEnergy": true,
      "inItems": [
        {
          "name": "Кофермент A (КоА-SH)",
          "nameEn": "Coenzyme A (CoA-SH)",
          "text": "+ КоА-SH",
          "textRu": "+ КоА-SH",
          "textEn": "+ CoA-SH",
          "dx": -38
        },
        {
          "name": "НАД⁺",
          "nameEn": "NAD⁺",
          "text": "+ НАД⁺",
          "textRu": "+ НАД⁺",
          "textEn": "+ NAD⁺",
          "dx": 30
        }
      ],
      "outItems": [
        {
          "name": "НАДН",
          "nameEn": "NADH",
          "text": "НАДН",
          "textRu": "НАДН",
          "textEn": "NADH",
          "dx": -34,
          "isEnergy": true
        },
        {
          "name": "Диоксид углерода (CO₂)",
          "nameEn": "Carbon dioxide (CO₂)",
          "text": "+ CO₂ ↑",
          "textRu": "+ CO₂ ↑",
          "textEn": "+ CO₂ ↑",
          "dx": 30
        }
      ]
    }
  },
  {
    "reactionId": "d0000003-0000-0000-0000-000000000001",
    "pathData": "M 780 -200 L 780 -114",
    "tooltipX": 780,
    "tooltipY": -157,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 675 -178 C 732 -172, 766 -160, 780 -157 C 766 -154, 732 -142, 675 -136",
      "inCofactor": "Аденозинтрифосфат",
      "inCofactorEn": "ATP",
      "inText": "+ АТФ",
      "inTextRu": "+ АТФ",
      "inTextEn": "+ ATP",
      "inX": 640,
      "inY": -178,
      "outCofactor": "Аденозиндифосфат",
      "outCofactorEn": "ADP",
      "outText": "АДФ + H⁺",
      "outTextRu": "АДФ + H⁺",
      "outTextEn": "ADP + H⁺",
      "outX": 632,
      "outY": -136,
      "inItems": [
        {
          "name": "Аденозинтрифосфат",
          "nameEn": "ATP",
          "text": "+ АТФ",
          "textRu": "+ АТФ",
          "textEn": "+ ATP",
          "isEnergy": true
        }
      ],
      "outItems": [
        {
          "name": "Аденозиндифосфат",
          "nameEn": "ADP",
          "text": "АДФ",
          "textRu": "АДФ",
          "textEn": "ADP"
        }
      ]
    }
  },
  {
    "reactionId": "d0000003-0000-0000-0000-000000000002",
    "pathData": "M 860 -77 L 1175 -77",
    "secondaryPathData": "M 1175 -218 C 1135 -145, 1055 -110, 1018 -77 C 990 -115, 995 -150, 1007 -200",
    "tooltipX": 1018,
    "tooltipY": -56,
    "junction": {
      "x": 1018,
      "y": -124,
      "label": "GALT",
      "labelRu": "ГАЛТ",
      "width": 54,
      "height": 22
    },
    "branches": [
      {
        "id": "in-gal1p",
        "role": "in",
        "metaboliteId": "b0000003-0000-0000-0000-000000000002",
        "pathData": "M 860 -77 C 920 -77, 945 -124, 991 -124",
        "showArrow": true,
        "isReversible": true
      },
      {
        "id": "in-udpglc",
        "role": "in",
        "metaboliteId": "b0000003-0000-0000-0000-000000000005",
        "pathData": "M 1230 -200 C 1230 -165, 1045 -170, 1032 -135",
        "showArrow": true,
        "isReversible": true
      },
      {
        "id": "out-g1p",
        "role": "out",
        "metaboliteId": "b0000003-0000-0000-0000-000000000003",
        "pathData": "M 1045 -124 C 1090 -124, 1115 -77, 1175 -77",
        "showArrow": true,
        "isReversible": true
      },
      {
        "id": "out-udpgal",
        "role": "out",
        "metaboliteId": "b0000003-0000-0000-0000-000000000004",
        "pathData": "M 1004 -135 C 1004 -165, 1008 -175, 1008 -200",
        "showArrow": true,
        "isReversible": true
      }
    ]
  },
  {
    "reactionId": "d0000003-0000-0000-0000-000000000003",
    "pathData": "M 1085 -237 L 1175 -237",
    "tooltipX": 1130,
    "tooltipY": -254
  },
  {
    "reactionId": "d0000003-0000-0000-0000-000000000004",
    "pathData": "M 1330 -77 L 1520 -77",
    "tooltipX": 1425,
    "tooltipY": -92
  },
  {
    "reactionId": "d0000004-0000-0000-0000-000000000001",
    "pathData": "M 2240 120 L 2240 206",
    "tooltipX": 2240,
    "tooltipY": 163,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 2345 142 C 2288 148, 2254 160, 2240 163 C 2254 166, 2288 178, 2345 184",
      "inCofactor": "Аденозинтрифосфат",
      "inCofactorEn": "ATP",
      "inText": "+ АТФ",
      "inTextRu": "+ АТФ",
      "inTextEn": "+ ATP",
      "inX": 2385,
      "inY": 142,
      "outCofactor": "Аденозиндифосфат",
      "outCofactorEn": "ADP",
      "outText": "АДФ + H⁺",
      "outTextRu": "АДФ + H⁺",
      "outTextEn": "ADP + H⁺",
      "outX": 2392,
      "outY": 184,
      "inItems": [
        {
          "name": "Аденозинтрифосфат",
          "nameEn": "ATP",
          "text": "+ АТФ",
          "textRu": "+ АТФ",
          "textEn": "+ ATP",
          "isEnergy": true
        }
      ],
      "outItems": [
        {
          "name": "Аденозиндифосфат",
          "nameEn": "ADP",
          "text": "АДФ",
          "textRu": "АДФ",
          "textEn": "ADP"
        }
      ]
    }
  },
  {
    "reactionId": "d0000004-0000-0000-0000-000000000002",
    "pathData": "M 2240 280 L 2240 366",
    "secondaryPathData": "M 2240 280 C 2135 296, 2020 315, 1990 366",
    "tooltipX": 2240,
    "tooltipY": 323,
    "junction": {
      "x": 2240,
      "y": 323,
      "label": "ALDOB",
      "labelRu": "АЛДО-B",
      "width": 56,
      "height": 20
    },
    "branches": [
      {
        "id": "in",
        "role": "in",
        "metaboliteId": "b0000004-0000-0000-0000-000000000002",
        "pathData": "M 2240 280 L 2240 313",
        "showArrow": true,
        "isReversible": true
      },
      {
        "id": "out-ga",
        "role": "out",
        "metaboliteId": "b0000004-0000-0000-0000-000000000003",
        "pathData": "M 2240 333 L 2240 366",
        "showArrow": true,
        "isReversible": true
      },
      {
        "id": "out-dhap",
        "role": "out",
        "metaboliteId": "b0000002-0000-0000-0000-000000000005",
        "pathData": "M 2212 323 C 2125 323, 2025 326, 1990 366",
        "showArrow": true,
        "isReversible": true
      }
    ]
  },
  {
    "reactionId": "d0000004-0000-0000-0000-000000000003",
    "pathData": "M 2240 440 C 2240 520, 1860 520, 1680 425",
    "tooltipX": 2028,
    "tooltipY": 482,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1990 550 C 2006 522, 2022 501, 2028 498 C 2034 501, 2050 522, 2066 550",
      "inCofactor": "Аденозинтрифосфат",
      "inCofactorEn": "ATP",
      "inText": "+ АТФ",
      "inTextRu": "+ АТФ",
      "inTextEn": "+ ATP",
      "inX": 1966,
      "inY": 564,
      "outCofactor": "Аденозиндифосфат",
      "outCofactorEn": "ADP",
      "outText": "АДФ + H⁺",
      "outTextRu": "АДФ + H⁺",
      "outTextEn": "ADP + H⁺",
      "outX": 2092,
      "outY": 564,
      "inItems": [
        {
          "name": "Аденозинтрифосфат",
          "nameEn": "ATP",
          "text": "+ АТФ",
          "textRu": "+ АТФ",
          "textEn": "+ ATP",
          "isEnergy": true
        }
      ],
      "outItems": [
        {
          "name": "Аденозиндифосфат",
          "nameEn": "ADP",
          "text": "АДФ",
          "textRu": "АДФ",
          "textEn": "ADP"
        }
      ]
    }
  },
  {
    "reactionId": "d0000004-0000-0000-0000-000000000004",
    "pathData": "M 2160 83 L 1680 83",
    "tooltipX": 1920,
    "tooltipY": 66,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1885 135 C 1900 106, 1914 86, 1920 83 C 1926 86, 1940 106, 1955 135",
      "inCofactor": "Аденозинтрифосфат",
      "inCofactorEn": "ATP",
      "inText": "+ АТФ",
      "inTextRu": "+ АТФ",
      "inTextEn": "+ ATP",
      "inX": 1870,
      "inY": 148,
      "outCofactor": "Аденозиндифосфат",
      "outCofactorEn": "ADP",
      "outText": "АДФ + H⁺",
      "outTextRu": "АДФ + H⁺",
      "outTextEn": "ADP + H⁺",
      "outX": 1974,
      "outY": 148,
      "inItems": [
        {
          "name": "Аденозинтрифосфат",
          "nameEn": "ATP",
          "text": "+ АТФ",
          "textRu": "+ АТФ",
          "textEn": "+ ATP",
          "isEnergy": true
        }
      ],
      "outItems": [
        {
          "name": "Аденозиндифосфат",
          "nameEn": "ADP",
          "text": "АДФ",
          "textRu": "АДФ",
          "textEn": "ADP"
        }
      ]
    }
  },
  {
    "reactionId": "d0000001-0000-0000-0000-000000000001",
    "pathData": "M 1516 1778 A 420 420 0 0 1 1689 1779",
    "secondaryPathData": "M 1600 1634 L 1600 1768",
    "tooltipX": 1602,
    "tooltipY": 1806,
    "junction": {
      "x": 1600,
      "y": 1770,
      "label": "CS",
      "labelRu": "ЦС",
      "width": 38,
      "height": 20
    },
    "branches": [
      {
        "id": "in-oaa",
        "role": "in",
        "metaboliteId": "b0000001-0000-0000-0000-000000000003",
        "pathData": "M 1516 1778 A 420 420 0 0 1 1581 1770",
        "showArrow": true,
        "isReversible": false
      },
      {
        "id": "in-accoa",
        "role": "in",
        "metaboliteId": "b0000001-0000-0000-0000-000000000002",
        "pathData": "M 1600 1634 L 1600 1760",
        "showArrow": true,
        "isReversible": false
      },
      {
        "id": "out-cit",
        "role": "out",
        "metaboliteId": "b0000001-0000-0000-0000-000000000004",
        "pathData": "M 1619 1770 A 420 420 0 0 1 1689 1779",
        "showArrow": true,
        "isReversible": false
      }
    ],
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1542 1692 C 1568 1726, 1592 1764, 1600 1770 C 1608 1764, 1632 1726, 1658 1692",
      "inCofactor": "Вода (H₂O)",
      "inCofactorEn": "Water (H₂O)",
      "inText": "+ H₂O",
      "inTextRu": "+ H₂O",
      "inTextEn": "+ H₂O",
      "inX": 1525,
      "inY": 1684,
      "inAnchor": "middle",
      "outCofactor": "Кофермент A (КоА-SH)",
      "outCofactorEn": "Coenzyme A (CoA-SH)",
      "outText": "КоА-SH",
      "outTextRu": "КоА-SH",
      "outTextEn": "CoA-SH",
      "outX": 1678,
      "outY": 1684,
      "inItems": [
        {
          "name": "Вода (H₂O)",
          "nameEn": "Water (H₂O)",
          "text": "+ H₂O",
          "textRu": "+ H₂O",
          "textEn": "+ H₂O"
        }
      ],
      "outItems": [
        {
          "name": "Кофермент A (КоА-SH)",
          "nameEn": "Coenzyme A (CoA-SH)",
          "text": "КоА-SH",
          "textRu": "КоА-SH",
          "textEn": "CoA-SH"
        }
      ]
    }
  },
  {
    "reactionId": "d0000001-0000-0000-0000-000000000002",
    "pathData": "M 1832 1840 A 420 420 0 0 1 1970 1991",
    "tooltipX": 1892,
    "tooltipY": 1924,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1904 1808 C 1898 1855, 1913 1904, 1910 1907 C 1913 1904, 1961 1924, 2008 1923",
      "inCofactor": "Вода (H₂O)",
      "inCofactorEn": "Water (H₂O)",
      "inText": "− H₂O",
      "inTextRu": "− H₂O",
      "inTextEn": "− H₂O",
      "inX": 1911,
      "inY": 1773,
      "outCofactor": "Вода (H₂O)",
      "outCofactorEn": "Water (H₂O)",
      "outText": "+ H₂O",
      "outTextRu": "+ H₂O",
      "outTextEn": "+ H₂O",
      "outX": 2043,
      "outY": 1918,
      "inItems": [
        {
          "name": "Вода (H₂O)",
          "nameEn": "Water (H₂O)",
          "text": "− H₂O",
          "textRu": "− H₂O",
          "textEn": "− H₂O"
        }
      ],
      "outItems": [
        {
          "name": "Вода (H₂O)",
          "nameEn": "Water (H₂O)",
          "text": "+ H₂O",
          "textRu": "+ H₂O",
          "textEn": "+ H₂O"
        }
      ]
    }
  },
  {
    "reactionId": "d0000001-0000-0000-0000-000000000003",
    "pathData": "M 2002 2067 A 420 420 0 0 1 2002 2313",
    "tooltipX": 1995,
    "tooltipY": 2190,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 2082 2112 C 2046 2143, 2024 2190, 2020 2190 C 2024 2190, 2046 2237, 2082 2255",
      "inCofactor": "НАД⁺",
      "inCofactorEn": "NAD⁺",
      "inText": "НАД⁺",
      "inTextRu": "НАД⁺",
      "inTextEn": "NAD⁺",
      "inX": 2111,
      "inY": 2098,
      "outCofactor": "НАДН",
      "outCofactorEn": "NADH",
      "outText": "НАДН + CO₂ ↑",
      "outTextRu": "НАДН + CO₂ ↑",
      "outTextEn": "NADH + CO₂ ↑",
      "outX": 2135,
      "outY": 2255,
      "isEnergy": true,
      "inItems": [
        {
          "name": "НАД⁺",
          "nameEn": "NAD⁺",
          "text": "НАД⁺",
          "textRu": "НАД⁺",
          "textEn": "NAD⁺"
        }
      ],
      "outItems": [
        {
          "name": "НАДН",
          "nameEn": "NADH",
          "text": "НАДН",
          "textRu": "НАДН",
          "textEn": "NADH",
          "dx": -36,
          "isEnergy": true
        },
        {
          "name": "Протон (H⁺)",
          "nameEn": "Proton (H⁺)",
          "text": "+ H⁺",
          "textRu": "+ H⁺",
          "textEn": "+ H⁺",
          "dx": 12
        },
        {
          "name": "Диоксид углерода (CO₂)",
          "nameEn": "Carbon dioxide (CO₂)",
          "text": "+ CO₂ ↑",
          "textRu": "+ CO₂ ↑",
          "textEn": "+ CO₂ ↑",
          "dx": 64
        }
      ]
    }
  },
  {
    "reactionId": "d0000001-0000-0000-0000-000000000004",
    "pathData": "M 1970 2389 A 420 420 0 0 1 1832 2540",
    "tooltipX": 1892,
    "tooltipY": 2456,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 2008 2457 C 1961 2456, 1913 2476, 1910 2473 C 1913 2476, 1898 2525, 1904 2572",
      "inCofactor": "НАД⁺",
      "inCofactorEn": "NAD⁺",
      "inText": "НАД⁺ + КоА-SH",
      "inTextRu": "НАД⁺ + КоА-SH",
      "inTextEn": "NAD⁺ + CoA-SH",
      "inX": 2043,
      "inY": 2462,
      "outCofactor": "НАДН",
      "outCofactorEn": "NADH",
      "outText": "НАДН + CO₂ ↑",
      "outTextRu": "НАДН + CO₂ ↑",
      "outTextEn": "NADH + CO₂ ↑",
      "outX": 1945,
      "outY": 2595,
      "isEnergy": true,
      "inItems": [
        {
          "name": "НАД⁺",
          "nameEn": "NAD⁺",
          "text": "НАД⁺",
          "textRu": "НАД⁺",
          "textEn": "NAD⁺",
          "dx": -34
        },
        {
          "name": "Кофермент A (КоА-SH)",
          "nameEn": "Coenzyme A (CoA-SH)",
          "text": "+ КоА-SH",
          "textRu": "+ КоА-SH",
          "textEn": "+ CoA-SH",
          "dx": 30
        }
      ],
      "outItems": [
        {
          "name": "НАДН",
          "nameEn": "NADH",
          "text": "НАДН",
          "textRu": "НАДН",
          "textEn": "NADH",
          "dx": -44,
          "isEnergy": true
        },
        {
          "name": "Протон (H⁺)",
          "nameEn": "Proton (H⁺)",
          "text": "+ H⁺",
          "textRu": "+ H⁺",
          "textEn": "+ H⁺",
          "dx": 6
        },
        {
          "name": "Диоксид углерода (CO₂)",
          "nameEn": "Carbon dioxide (CO₂)",
          "text": "+ CO₂ ↑",
          "textRu": "+ CO₂ ↑",
          "textEn": "+ CO₂ ↑",
          "dx": 58
        }
      ]
    }
  },
  {
    "reactionId": "d0000001-0000-0000-0000-000000000005",
    "pathData": "M 1684 2602 A 420 420 0 0 1 1511 2601",
    "tooltipX": 1598,
    "tooltipY": 2585,
    "cofactorArc": {
      "preset": "lateral-loop",
      "path": "M 1675 2672 C 1644 2636, 1597 2614, 1597 2610 C 1597 2614, 1551 2635, 1519 2671",
      "inCofactor": "ГДФ",
      "inCofactorEn": "GDP",
      "inText": "ГДФ + Фᵢ",
      "inTextRu": "ГДФ + Фᵢ",
      "inTextEn": "GDP + Pᵢ",
      "inX": 1715,
      "inY": 2692,
      "outCofactor": "ГТФ",
      "outCofactorEn": "GTP",
      "outText": "ГТФ + КоА-SH",
      "outTextRu": "ГТФ + КоА-SH",
      "outTextEn": "GTP + CoA-SH",
      "outX": 1485,
      "outY": 2692,
      "isGtp": true,
      "inItems": [
        {
          "name": "ГДФ",
          "nameEn": "GDP",
          "text": "ГДФ",
          "textRu": "ГДФ",
          "textEn": "GDP",
          "dx": -26,
          "isGtp": true
        },
        {
          "name": "Неорганический фосфат (Фᵢ)",
          "nameEn": "Inorganic phosphate (Pᵢ)",
          "text": "+ Фᵢ",
          "textRu": "+ Фᵢ",
          "textEn": "+ Pᵢ",
          "dx": 26
        }
      ],
      "outItems": [
        {
          "name": "ГТФ",
          "nameEn": "GTP",
          "text": "ГТФ",
          "textRu": "ГТФ",
          "textEn": "GTP",
          "dx": -30,
          "isGtp": true,
          "isEnergy": true
        },
        {
          "name": "Кофермент A (КоА-SH)",
          "nameEn": "Coenzyme A (CoA-SH)",
          "text": "+ КоА-SH",
          "textRu": "+ КоА-SH",
          "textEn": "+ CoA-SH",
          "dx": 32
        }
      ]
    }
  },
  {
    "reactionId": "d0000001-0000-0000-0000-000000000006",
    "pathData": "M 1368 2540 A 420 420 0 0 1 1230 2389",
    "tooltipX": 1308,
    "tooltipY": 2456,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1296 2572 C 1302 2525, 1287 2476, 1290 2473 C 1287 2476, 1239 2456, 1192 2457",
      "inCofactor": "ФАД",
      "inCofactorEn": "FAD",
      "inText": "ФАД",
      "inTextRu": "ФАД",
      "inTextEn": "FAD",
      "inX": 1289,
      "inY": 2607,
      "outCofactor": "ФАДН₂",
      "outCofactorEn": "FADH₂",
      "outText": "ФАДН₂ ➔ Q₁₀",
      "outTextRu": "ФАДН₂ ➔ Q₁₀",
      "outTextEn": "FADH₂ ➔ Q₁₀",
      "outX": 1157,
      "outY": 2462,
      "isEnergy": true,
      "inItems": [
        {
          "name": "ФАД",
          "nameEn": "FAD",
          "text": "ФАД",
          "textRu": "ФАД",
          "textEn": "FAD",
          "dx": 0
        }
      ],
      "outItems": [
        {
          "name": "ФАДН₂",
          "nameEn": "FADH₂",
          "text": "ФАДН₂",
          "textRu": "ФАДН₂",
          "textEn": "FADH₂",
          "dx": -34,
          "isEnergy": true
        },
        {
          "name": "Кофермент Q₁₀ (Убихинон)",
          "nameEn": "Coenzyme Q₁₀ (Ubiquinone)",
          "text": "➔ Q₁₀",
          "textRu": "➔ Q₁₀",
          "textEn": "➔ Q₁₀",
          "dx": 34
        }
      ]
    }
  },
  {
    "reactionId": "d0000001-0000-0000-0000-000000000007",
    "pathData": "M 1198 2313 A 420 420 0 0 1 1198 2067",
    "tooltipX": 1205,
    "tooltipY": 2190,
    "cofactorArc": {
      "preset": "through-cross",
      "path": "M 1105 2190 C 1135 2190, 1160 2190, 1180 2190",
      "inCofactor": "Вода (H₂O)",
      "inCofactorEn": "Water (H₂O)",
      "inText": "+ H₂O",
      "inTextRu": "+ H₂O",
      "inTextEn": "+ H₂O",
      "inX": 1070,
      "inY": 2190,
      "isEnergy": false,
      "inItems": [
        {
          "name": "Вода (H₂O)",
          "nameEn": "Water (H₂O)",
          "text": "+ H₂O",
          "textRu": "+ H₂O",
          "textEn": "+ H₂O",
          "dx": 0
        }
      ]
    }
  },
  {
    "reactionId": "d0000001-0000-0000-0000-000000000008",
    "pathData": "M 1230 1991 A 420 420 0 0 1 1368 1840",
    "tooltipX": 1308,
    "tooltipY": 1924,
    "cofactorArc": {
      "preset": "perpendicular-dip",
      "path": "M 1192 1923 C 1239 1924, 1287 1904, 1290 1907 C 1287 1904, 1302 1855, 1296 1808",
      "inCofactor": "НАД⁺",
      "inCofactorEn": "NAD⁺",
      "inText": "НАД⁺",
      "inTextRu": "НАД⁺",
      "inTextEn": "NAD⁺",
      "inX": 1157,
      "inY": 1918,
      "outCofactor": "НАДН",
      "outCofactorEn": "NADH",
      "outText": "НАДН + H⁺",
      "outTextRu": "НАДН + H⁺",
      "outTextEn": "NADH + H⁺",
      "outX": 1255,
      "outY": 1785,
      "isEnergy": true,
      "inItems": [
        {
          "name": "НАД⁺",
          "nameEn": "NAD⁺",
          "text": "НАД⁺",
          "textRu": "НАД⁺",
          "textEn": "NAD⁺",
          "dx": 0
        }
      ],
      "outItems": [
        {
          "name": "НАДН",
          "nameEn": "NADH",
          "text": "НАДН",
          "textRu": "НАДН",
          "textEn": "NADH",
          "dx": -28,
          "isEnergy": true
        },
        {
          "name": "Протон (H⁺)",
          "nameEn": "Proton (H⁺)",
          "text": "+ H⁺",
          "textRu": "+ H⁺",
          "textEn": "+ H⁺",
          "dx": 28
        }
      ]
    }
  },
  {
    "reactionId": "d0000005-0000-0000-0000-000000000001",
    "pathData": "M 1280 -114 L 1280 -200",
    "tooltipX": 1280,
    "tooltipY": -157,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1344 -178 C 1306 -172, 1288 -160, 1280 -157 C 1288 -154, 1306 -142, 1344 -136",
      "inCofactor": "Уридинтрифосфат (УТФ)",
      "inCofactorEn": "Uridine triphosphate (UTP)",
      "inText": "+ УТФ",
      "inTextRu": "+ УТФ",
      "inTextEn": "+ UTP",
      "inX": 1368,
      "inY": -178,
      "outCofactor": "Пирофосфат (ФФᵢ)",
      "outCofactorEn": "Pyrophosphate (PPᵢ)",
      "outText": "ФФᵢ",
      "outTextRu": "ФФᵢ",
      "outTextEn": "PPᵢ",
      "outX": 1362,
      "outY": -136,
      "inItems": [
        {
          "name": "Уридинтрифосфат (УТФ)",
          "nameEn": "Uridine triphosphate (UTP)",
          "text": "+ УТФ",
          "textRu": "+ УТФ",
          "textEn": "+ UTP",
          "isEnergy": true
        }
      ],
      "outItems": [
        {
          "name": "Пирофосфат (ФФᵢ)",
          "nameEn": "Pyrophosphate (PPᵢ)",
          "text": "ФФᵢ",
          "textRu": "ФФᵢ",
          "textEn": "PPᵢ"
        }
      ]
    }
  },
  {
    "reactionId": "d0000005-0000-0000-0000-000000000002",
    "pathData": "M 1248 -274 L 1248 -370",
    "tooltipX": 1248,
    "tooltipY": -322,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1248 -322 C 1222 -322, 1200 -322, 1174 -322",
      "outCofactor": "Уридиндифосфат (УДФ)",
      "outCofactorEn": "Uridine diphosphate (UDP)",
      "outText": "УДФ",
      "outTextRu": "УДФ",
      "outTextEn": "UDP",
      "outX": 1144,
      "outY": -322,
      "outItems": [
        {
          "name": "Уридиндифосфат (УДФ)",
          "nameEn": "Uridine diphosphate (UDP)",
          "text": "УДФ",
          "textRu": "УДФ",
          "textEn": "UDP"
        }
      ]
    }
  },
  {
    "reactionId": "d0000005-0000-0000-0000-000000000003",
    "pathData": "M 1335 -402 C 1470 -375, 1470 -125, 1330 -95",
    "tooltipX": 1436,
    "tooltipY": -250,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1450 -342 C 1445 -305, 1440 -275, 1436 -250",
      "inCofactor": "Неорганический фосфат (Фᵢ)",
      "inCofactorEn": "Inorganic phosphate (Pᵢ)",
      "inText": "+ Фᵢ",
      "inTextRu": "+ Фᵢ",
      "inTextEn": "+ Pᵢ",
      "inX": 1458,
      "inY": -358,
      "inItems": [
        {
          "name": "Неорганический фосфат (Фᵢ)",
          "nameEn": "Inorganic phosphate (Pᵢ)",
          "text": "+ Фᵢ",
          "textRu": "+ Фᵢ",
          "textEn": "+ Pᵢ"
        }
      ]
    }
  },
  {
    "reactionId": "d0000003-0000-0000-0000-000000000005",
    "pathData": "M 1190 -546 L 1190 -512",
    "tooltipX": 1190,
    "tooltipY": -512,
    "junction": {
      "x": 1190,
      "y": -512,
      "label": "LCT",
      "labelRu": "Лактаза",
      "width": 68,
      "height": 22
    },
    "branches": [
      {
        "id": "in-lac",
        "role": "in",
        "metaboliteId": "b0000003-0000-0000-0000-000000000006",
        "pathData": "M 1190 -546 L 1190 -523",
        "showArrow": false,
        "isReversible": false
      },
      {
        "id": "out-gal",
        "role": "out",
        "metaboliteId": "b0000003-0000-0000-0000-000000000001",
        "pathData": "M 1156 -512 C 940 -512, 780 -420, 780 -274",
        "showArrow": true,
        "isReversible": false
      },
      {
        "id": "out-glc",
        "role": "out",
        "metaboliteId": "b0000002-0000-0000-0000-000000000001",
        "pathData": "M 1224 -512 C 1440 -512, 1600 -420, 1600 -274",
        "showArrow": true,
        "isReversible": false
      }
    ],
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1250 -534 C 1222 -534, 1204 -534, 1190 -534",
      "inCofactor": "Вода (H₂O)",
      "inCofactorEn": "Water (H₂O)",
      "inText": "+ H₂O",
      "inTextRu": "+ H₂O",
      "inTextEn": "+ H₂O",
      "inX": 1278,
      "inY": -534,
      "inItems": [
        {
          "name": "Вода (H₂O)",
          "nameEn": "Water (H₂O)",
          "text": "+ H₂O",
          "textRu": "+ H₂O",
          "textEn": "+ H₂O"
        }
      ]
    }
  },
  {
    "reactionId": "d0000004-0000-0000-0000-000000000005",
    "pathData": "M 2240 -200 L 2240 -92",
    "tooltipX": 2240,
    "tooltipY": -92,
    "junction": {
      "x": 2240,
      "y": -92,
      "label": "SI",
      "labelRu": "Сахараза",
      "width": 72,
      "height": 22
    },
    "branches": [
      {
        "id": "in-suc",
        "role": "in",
        "metaboliteId": "b0000004-0000-0000-0000-000000000005",
        "pathData": "M 2240 -200 L 2240 -103",
        "showArrow": false,
        "isReversible": false
      },
      {
        "id": "out-fru",
        "role": "out",
        "metaboliteId": "b0000004-0000-0000-0000-000000000001",
        "pathData": "M 2240 -81 L 2240 46",
        "showArrow": true,
        "isReversible": false
      },
      {
        "id": "out-glc",
        "role": "out",
        "metaboliteId": "b0000002-0000-0000-0000-000000000001",
        "pathData": "M 2204 -92 C 1980 -92, 1890 -237, 1680 -237",
        "showArrow": true,
        "isReversible": false
      }
    ],
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 2292 -150 C 2270 -150, 2252 -150, 2240 -150",
      "inCofactor": "Вода (H₂O)",
      "inCofactorEn": "Water (H₂O)",
      "inText": "+ H₂O",
      "inTextRu": "+ H₂O",
      "inTextEn": "+ H₂O",
      "inX": 2324,
      "inY": -150,
      "inItems": [
        {
          "name": "Вода (H₂O)",
          "nameEn": "Water (H₂O)",
          "text": "+ H₂O",
          "textRu": "+ H₂O",
          "textEn": "+ H₂O"
        }
      ]
    }
  },
  {
    "reactionId": "d0000006-0000-0000-0000-000000000001",
    "pathData": "M 1150 2851 L 1350 3057",
    "tooltipX": 1250,
    "tooltipY": 2954,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1090 2980 C 1150 2975, 1215 2965, 1250 2954 C 1220 2900, 1180 2820, 1180 2724",
      "inCofactor": "НАДН",
      "inCofactorEn": "NADH",
      "inText": "+ НАДН",
      "inTextRu": "+ НАДН",
      "inTextEn": "+ NADH",
      "inX": 1080,
      "inY": 2980,
      "outCofactor": "НАД⁺",
      "outCofactorEn": "NAD⁺",
      "outX": 1180,
      "outY": 2724,
      "outItems": [
        {
          "name": "НАД⁺",
          "nameEn": "NAD⁺",
          "text": "НАД⁺",
          "textRu": "НАД⁺",
          "textEn": "NAD⁺",
          "dx": -28
        },
        {
          "name": "Протон (H⁺)",
          "nameEn": "Proton (H⁺)",
          "text": "4H⁺(МП)",
          "textRu": "4H⁺(МП)",
          "textEn": "4H⁺(IMS)",
          "dx": 30,
          "isEnergy": true
        }
      ],
      "isEnergy": true
    }
  },
  {
    "reactionId": "d0000006-0000-0000-0000-000000000002",
    "pathData": "M 1510 3057 L 1630 3057",
    "tooltipX": 1570,
    "tooltipY": 3040,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1520 3110 C 1540 3090, 1555 3070, 1570 3057 C 1580 3040, 1575 2850, 1575 2724",
      "outCofactor": "Протон (H⁺)",
      "outCofactorEn": "Proton (H⁺)",
      "outText": "+ 4H⁺(МП)",
      "outTextRu": "+ 4H⁺(МП)",
      "outTextEn": "+ 4H⁺(IMS)",
      "outX": 1575,
      "outY": 2724,
      "isEnergy": true
    }
  },
  {
    "reactionId": "d0000006-0000-0000-0000-000000000003",
    "pathData": "M 1790 3057 L 1880 3057",
    "secondaryPathData": "M 1955 3094 L 1955 3200",
    "tooltipX": 1835,
    "tooltipY": 3038,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1800 3120 C 1820 3100, 1830 3080, 1835 3057 C 1835 3030, 1830 2850, 1830 2724",
      "outCofactor": "Протон (H⁺)",
      "outCofactorEn": "Proton (H⁺)",
      "outText": "+ 2H⁺(МП)",
      "outTextRu": "+ 2H⁺(МП)",
      "outTextEn": "+ 2H⁺(IMS)",
      "outX": 1830,
      "outY": 2724,
      "isEnergy": true
    }
  },
  {
    "reactionId": "d0000006-0000-0000-0000-000000000004",
    "pathData": "M 2055 2836 L 2055 3100",
    "tooltipX": 2055,
    "tooltipY": 2930,
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1990 3030 C 2010 3030, 2035 3030, 2055 3030 C 2075 3030, 2100 3030, 2120 3030",
      "inCofactor": "Аденозиндифосфат",
      "inCofactorEn": "ADP",
      "inText": "+ АДФ + Фᵢ",
      "inTextRu": "+ АДФ + Фᵢ",
      "inTextEn": "+ ADP + Pᵢ",
      "inX": 1965,
      "inY": 3030,
      "outCofactor": "Аденозинтрифосфат",
      "outCofactorEn": "ATP",
      "outText": "➔ АТФ ⚡",
      "outTextRu": "➔ АТФ ⚡",
      "outTextEn": "➔ ATP ⚡",
      "outX": 2145,
      "outY": 3030,
      "isEnergy": true
    }
  }
];
