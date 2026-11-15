import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { AtlasMetaboliteTileComponent } from './atlas-metabolite-tile.component';
import { HumanMetaboliteNode } from '../../../../core/metabolism';

const mockMetabolite: HumanMetaboliteNode = {
  id: 'b0000001-0000-0000-0000-000000000001',
  code: 'MET_CITRATE',
  nameRu: 'Цитрат',
  nameEn: 'Citrate',
  abbrevRu: 'Цит',
  abbrevEn: 'Cit',
  formula: 'C6H5O7',
  carbons: '6C',
  smiles: 'C(C(=O)[O-])C(CC(=O)[O-])(C(=O)[O-])O',
  chebi: 'CHEBI:16947',
  inchiKey: 'KRKNYBCHXYNGOX-UHFFFAOYSA-K',
  descriptionRu: 'Лимонная кислота',
  descriptionEn: 'Citric acid',
  synonymsRu: [],
  synonymsEn: [],
  compartmentRu: 'Матрикс',
  compartmentEn: 'Matrix',
  pathwaysRu: [
    {
      pathwayCode: 'PW-TCA-CYCLE',
      pathwayNameRu: 'ЦТК',
      pathwayNameEn: 'TCA',
      isCurrentPathway: true,
      role: 'intermediate',
      detailsRu: 'Стадия 1',
    },
  ],
  x: 1600,
  y: 1800,
  width: 140,
  height: 60,
  color: '#10b981',
  skeletalSvg: '<circle cx="15" cy="15" r="10"/>',
  isHub: false,
};

@Component({
  standalone: true,
  imports: [AtlasMetaboliteTileComponent],
  template: `
    <svg>
      <g
        ma-metabolite-tile
        [met]="met()"
        [isSubstrate]="isSub()"
        [isProduct]="isProd()"
        [isSelected]="isSel()"
        [isDimmed]="isDim()"
        [lodLevel]="lod()"
        [locale]="loc()"
        (metaboliteClick)="clicked = $event"
        (metaboliteHover)="hovered = $event"
        (metaboliteLeave)="left = true"
      ></g>
    </svg>
  `,
})
class TestHostComponent {
  readonly met = signal(mockMetabolite);
  readonly isSub = signal(false);
  readonly isProd = signal(false);
  readonly isSel = signal(false);
  readonly isDim = signal(false);
  readonly lod = signal(2);
  readonly loc = signal<'ru' | 'en'>('ru');

  clicked: HumanMetaboliteNode | null = null;
  hovered: HumanMetaboliteNode | null = null;
  left = false;
}

describe('AtlasMetaboliteTileComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render card background, border, title, formula, and micro structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const bg = compiled.querySelector('.metabolite-tile__bg');
    const border = compiled.querySelector('.metabolite-tile__border');
    const title = compiled.querySelector('.metabolite-tile__title');
    const formula = compiled.querySelector('.metabolite-tile__formula');

    expect(bg).toBeTruthy();
    expect(border).toBeTruthy();
    expect(title?.textContent).toContain('Цитрат');
    expect(formula?.textContent).toContain('C6H5O7');
  });

  it('should render abbreviation when lodLevel === 1', () => {
    component.lod.set(1);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const abbrev = compiled.querySelector('.metabolite-tile__abbrev');
    expect(abbrev).toBeTruthy();
    expect(abbrev?.textContent).toContain('Цит');
  });

  it('should emit click event when clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tile = compiled.querySelector('.metabolite-tile') as SVGGElement;
    expect(tile.getAttribute('transform')).toBe('translate(1600,1800)');
    tile.dispatchEvent(new MouseEvent('click'));

    expect(component.clicked).toEqual(mockMetabolite);
  });

  it('should render substrate role badge when isSubstrate is true', () => {
    component.isSub.set(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const subBadge = compiled.querySelector('.role-badge-bg--sub');
    expect(subBadge).toBeTruthy();
  });

  it('should render product role badge when isProduct is true', () => {
    component.isProd.set(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const prodBadge = compiled.querySelector('.role-badge-bg--prod');
    expect(prodBadge).toBeTruthy();
  });
});
