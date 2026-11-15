import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HumanMetaboliteNode } from '../../../../core/metabolism';

@Component({
  selector: 'g[ma-metabolite-tile]',
  standalone: true,
  templateUrl: './atlas-metabolite-tile.component.html',
  styleUrl: './atlas-metabolite-tile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'metabolite-tile',
    'data-interactive': 'true',
    '[class.is-substrate]': 'isSubstrate()',
    '[class.is-product]': 'isProduct()',
    '[class.is-selected]': 'isSelected()',
    '[class.is-dimmed]': 'isDimmed()',
    '[class.is-hub]': 'met().isHub',
    '[attr.transform]': "'translate(' + met().x + ',' + met().y + ')'",
    'role': 'button',
    'tabindex': '0',
    '[attr.aria-label]': "locale() === 'ru' ? met().nameRu : met().nameEn",
    '(click)': 'onClick($event)',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class AtlasMetaboliteTileComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly met = input.required<HumanMetaboliteNode>();
  readonly isSubstrate = input<boolean>(false);
  readonly isProduct = input<boolean>(false);
  readonly isSelected = input<boolean>(false);
  readonly isDimmed = input<boolean>(false);
  readonly isReversibleReaction = input<boolean>(false);
  readonly lodLevel = input<number>(2);
  readonly locale = input<'ru' | 'en'>('ru');

  readonly metaboliteClick = output<HumanMetaboliteNode>();
  readonly metaboliteHover = output<HumanMetaboliteNode>();
  readonly metaboliteLeave = output<void>();

  readonly safeSvg = computed<SafeHtml>(() => {
    const raw = this.met().skeletalSvg;
    return raw ? this.sanitizer.bypassSecurityTrustHtml(raw) : '';
  });

  onClick(event: MouseEvent): void {
    event.stopPropagation();
    this.metaboliteClick.emit(this.met());
  }

  onMouseEnter(): void {
    this.metaboliteHover.emit(this.met());
  }

  onMouseLeave(): void {
    this.metaboliteLeave.emit();
  }
}
