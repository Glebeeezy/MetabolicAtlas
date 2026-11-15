import { TestBed } from '@angular/core/testing';
import { AtlasViewportService } from './atlas-viewport.service';
import { HumanMetaboliteNode, SectorLayoutConfig } from '../../../core/metabolism';

describe('AtlasViewportService', () => {
  let service: AtlasViewportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtlasViewportService],
    });
    service = TestBed.inject(AtlasViewportService);
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  it('should be created with initial state', () => {
    expect(service).toBeTruthy();
    expect(service.zoom()).toBe(100);
    expect(service.panX()).toBe(0);
    expect(service.panY()).toBe(0);
    expect(service.lodLevel()).toBe(3);
  });

  it('should compute lodLevel correctly across zoom ranges', () => {
    service.zoom.set(30);
    expect(service.lodLevel()).toBe(1);

    service.zoom.set(60);
    expect(service.lodLevel()).toBe(2);

    service.zoom.set(120);
    expect(service.lodLevel()).toBe(3);
  });

  it('should zoom in and zoom out', () => {
    service.zoomIn();
    expect(service.zoom()).toBe(115);

    service.zoomOut();
    expect(service.zoom()).toBe(100);
  });

  it('should reset zoom to default', () => {
    service.zoom.set(180);
    service.panX.set(200);
    service.panY.set(-150);

    service.resetZoom();
    expect(service.zoom()).toBe(100);
    expect(service.panX()).toBe(0);
    expect(service.panY()).toBe(0);
  });

  it('should zoom to macro view', () => {
    service.zoomToMacro();
    expect(service.zoom()).toBe(38);
    expect(service.panX()).toBe(0);
    expect(service.panY()).toBe(0);
    expect(service.lodLevel()).toBe(1);
  });

  it('should focus on node correctly', () => {
    const node: HumanMetaboliteNode = {
      id: 'test',
      code: 'TEST',
      nameRu: 'Тест',
      nameEn: 'Test',
      abbrevRu: 'Т',
      abbrevEn: 'T',
      formula: 'C',
      carbons: '1C',
      smiles: '',
      chebi: '',
      inchiKey: '',
      descriptionRu: '',
      descriptionEn: '',
      synonymsRu: [],
      synonymsEn: [],
      pathwaysRu: [],
      x: 1000,
      y: 1200,
      width: 140,
      height: 60,
      color: '#fff',
      skeletalSvg: '',
      isHub: false,
    };

    service.focusOnNode(node);
    expect(service.zoom()).toBe(115);
    // centerX = 1070, centerY = 1230
    // panX = Math.round((1600 - 1070) * 1.15) = Math.round(530 * 1.15) = 610
    expect(service.panX()).toBe(610);
    // panY = Math.round((1600 - 1230) * 1.15) = Math.round(370 * 1.15) = 425
    expect(service.panY()).toBe(425);
  });

  it('should focus on TCA cycle', () => {
    service.focusOnTca();
    expect(service.zoom()).toBe(85);
    expect(service.panX()).toBe(0);
    expect(service.panY()).toBe(Math.round((1600 - 2190) * 0.85));
  });

  it('should focus on OxPhos', () => {
    service.focusOnOxphos();
    expect(service.zoom()).toBe(75);
    expect(service.panX()).toBe(0);
    expect(service.panY()).toBe(Math.round((1600 - 3020) * 0.75));
  });

  it('should focus on sector', () => {
    const sector: SectorLayoutConfig = {
      sectorId: 'test-sec',
      nameRu: 'Сектор',
      nameEn: 'Sector',
      categoryRu: '',
      categoryEn: '',
      centerAngleRad: 0,
      radiusMin: 0,
      radiusMax: 0,
      themeColor: '',
      gradientColors: ['', ''],
      centerX: 800,
      centerY: 600,
      boundingPoly: [],
      descriptionRu: '',
      descriptionEn: '',
      targetPathwayId: 'PW-TEST',
    };

    service.focusOnSector(sector);
    expect(service.zoom()).toBe(65);
    expect(service.panX()).toBe(Math.round((1600 - 800) * 0.65));
    expect(service.panY()).toBe(Math.round((1600 - 600) * 0.65));
  });
});
