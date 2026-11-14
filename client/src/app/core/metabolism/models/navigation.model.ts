export interface MetabolicCrossroad {
  id: string;
  nameRu: string;
  nameEn: string;
  pathwayCode?: string;
  pathwayNameRu?: string;
  pathwayNameEn?: string;
  compartmentRu?: string;
  compartmentEn?: string;
  direction: 'in' | 'out';
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  textX: number;
  textY: number;
}

export interface SectorLayoutConfig {
  sectorId: string;
  nameRu: string;
  nameEn: string;
  categoryRu: string;
  categoryEn: string;
  centerAngleRad: number;
  radiusMin: number;
  radiusMax: number;
  themeColor: string;
  gradientColors: [string, string];
  iconSvg?: string;
  centerX: number;
  centerY: number;
  boundingPoly: { x: number; y: number }[];
  descriptionRu: string;
  descriptionEn: string;
  connectedHubCode?: string;
  targetPathwayId: string;
}

export interface PathwaySuperHighway {
  id: string;
  sourcePathwayId: string;
  targetPathwayId: string;
  sourceMetaboliteCode: string;
  targetMetaboliteCode: string;
  nameRu: string;
  nameEn: string;
  pathData: string;
  carbonFlux: string;
  isAnabolic: boolean;
  isCatabolic: boolean;
  themeColor: string;
}

export interface GlobalMetabolicCanvasState {
  lodLevel: 1 | 2 | 3;
  activeSectorId: string | 'ALL';
  focusMetaboliteCode: string | null;
  camera: { x: number; y: number; zoom: number };
}
