import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'ma-chemical-structure',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="molecule-structure-container"
      [attr.aria-label]="altText() || 'Химическая 2D-структура'"
      role="img"
      [innerHTML]="safeSvg()"
    ></div>
  `,
  styles: [
    `
      ma-chemical-structure {
        display: block;
        width: 100%;
      }

      .molecule-structure-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 90px;
        padding: 4px 0;
      }

      .molecule-structure-container svg {
        width: 100%;
        max-width: 270px;
        height: 95px;
        overflow: visible;
        display: block;
        margin: 0 auto;
      }

      /* Chemical bonds */
      .molecule-structure-container .chem-bond {
        stroke: #94a3b8 !important;
        stroke-width: 2.2px !important;
        stroke-linecap: round !important;
      }

      .molecule-structure-container .chem-bond-double-1,
      .molecule-structure-container .chem-bond-double-2 {
        stroke: #94a3b8 !important;
        stroke-width: 1.8px !important;
        stroke-linecap: round !important;
      }

      /* Atoms (CPK standard coloring) */
      .molecule-structure-container .atom-o {
        fill: #ef4444 !important;
        font-family: var(--font-mono, 'JetBrains Mono', 'Fira Code', monospace) !important;
        font-size: 13px !important;
        font-weight: 700 !important;
        text-anchor: middle !important;
        dominant-baseline: central !important;
      }

      .molecule-structure-container .atom-n {
        fill: #38bdf8 !important;
        font-family: var(--font-mono, 'JetBrains Mono', 'Fira Code', monospace) !important;
        font-size: 13px !important;
        font-weight: 700 !important;
        text-anchor: middle !important;
        dominant-baseline: central !important;
      }

      .molecule-structure-container .atom-s {
        fill: #f59e0b !important;
        font-family: var(--font-mono, 'JetBrains Mono', 'Fira Code', monospace) !important;
        font-size: 13px !important;
        font-weight: 700 !important;
        text-anchor: middle !important;
        dominant-baseline: central !important;
      }

      .molecule-structure-container .atom-p {
        fill: #c084fc !important;
        font-family: var(--font-mono, 'JetBrains Mono', 'Fira Code', monospace) !important;
        font-size: 13px !important;
        font-weight: 700 !important;
        text-anchor: middle !important;
        dominant-baseline: central !important;
      }

      .molecule-structure-container .atom-c {
        fill: #cbd5e1 !important;
        font-family: var(--font-mono, 'JetBrains Mono', 'Fira Code', monospace) !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        text-anchor: middle !important;
        dominant-baseline: central !important;
      }

      .molecule-structure-container .chem-angle {
        fill: #64748b !important;
        font-family: var(--font-mono, monospace) !important;
        font-size: 11px !important;
        text-anchor: middle !important;
        dominant-baseline: central !important;
      }
    `,
  ],
})
export class ChemicalStructureComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly svgContent = input.required<string>();
  readonly altText = input<string>();

  readonly safeSvg = computed<SafeHtml>(() => {
    const raw = this.svgContent();
    if (!raw) {
      return '';
    }
    return this.sanitizer.bypassSecurityTrustHtml(raw);
  });
}
