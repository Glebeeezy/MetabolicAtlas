import { MetabolicCrossroad } from '../../../core/metabolism/models';

export const HUMAN_CROSSROADS: MetabolicCrossroad[] = [
  {
    "id": "cr-g6pc-out",
    "nameRu": "Печень (G6PC1) ➔ D-Глюкоза",
    "nameEn": "Liver (G6PC1) ➔ Blood Glucose",
    "pathwayCode": "PW-GLYCOLISIS",
    "pathwayNameRu": "Печёночный синтез глюкозы",
    "pathwayNameEn": "Hepatic Glucose Release",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "direction": "out",
    "startX": 1680,
    "startY": -77,
    "endX": 1815,
    "endY": -77,
    "textX": 1695,
    "textY": -96
  },
  {
    "id": "cr-pdh-in",
    "nameRu": "Гликолиз ➔ Пируват ➔ ПДХ (3C ➔ 2C)",
    "nameEn": "Glycolysis ➔ Pyruvate ➔ PDH (3C ➔ 2C)",
    "direction": "in",
    "startX": 1920,
    "startY": 1393,
    "endX": 1684,
    "endY": 1393,
    "textX": 1705,
    "textY": 1380
  },
  {
    "id": "cr-cit-out",
    "nameRu": "Выход: Цитратный челнок ➔ Синтез липидов",
    "nameEn": "Exit: Citrate shuttle ➔ Lipid synthesis",
    "direction": "out",
    "startX": 1775,
    "startY": 1766,
    "endX": 1960,
    "endY": 1690,
    "textX": 1860,
    "textY": 1675
  },
  {
    "id": "cr-akg-cross",
    "nameRu": "Обмен аминокислот ⇋ Глутамат",
    "nameEn": "Amino acid exchange ⇋ Glutamate",
    "direction": "out",
    "startX": 2065,
    "startY": 2351,
    "endX": 2235,
    "endY": 2351,
    "textX": 2075,
    "textY": 2338
  },
  {
    "id": "cr-heme-out",
    "nameRu": "Синтез гема (порфиринов / Hb)",
    "nameEn": "Heme synthesis (porphyrins / Hb)",
    "direction": "out",
    "startX": 1761,
    "startY": 2614,
    "endX": 1785,
    "endY": 2740,
    "textX": 1795,
    "textY": 2745
  },
  {
    "id": "cr-gng-out",
    "nameRu": "Выход: ОАО ➔ Глюконеогенез (PEPCK-M)",
    "nameEn": "Exit: OAA ➔ Gluconeogenesis (PEPCK-M)",
    "direction": "out",
    "startX": 1410,
    "startY": 1766,
    "endX": 1270,
    "endY": 1700,
    "textX": 1055,
    "textY": 1686
  }
];
