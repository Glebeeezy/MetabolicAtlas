import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocaleService } from '../../../../core/services/locale.service';

export type CofactorPreset = 'tangent-swoop' | 'lateral-loop' | 'perpendicular-dip' | 'through-cross';

export interface CofactorParticipant {
  name: string;
  nameEn?: string;
  text: string;
  textRu?: string;
  textEn?: string;
  dx?: number;
  dy?: number;
  isEnergy?: boolean;
  isGtp?: boolean;
}

export interface ReactionCofactorArc {
  preset?: CofactorPreset;
  path: string;
  inCofactor?: string;
  inCofactorEn?: string;
  inText?: string;
  inTextRu?: string;
  inTextEn?: string;
  inX?: number;
  inY?: number;
  inAnchor?: 'start' | 'middle' | 'end';
  outCofactor?: string;
  outCofactorEn?: string;
  outText?: string;
  outTextRu?: string;
  outTextEn?: string;
  outX?: number;
  outY?: number;
  outAnchor?: 'start' | 'middle' | 'end';
  isEnergy?: boolean;
  isGtp?: boolean;
  inItems?: CofactorParticipant[];
  outItems?: CofactorParticipant[];
}

export interface ReactionArrowData {
  id: string;
  stepNumber: number;
  code: string;
  nameRu: string;
  nameEn: string;
  pathwayCode?: string;
  pathwayNameRu?: string;
  pathwayNameEn?: string;
  compartmentRu?: string;
  compartmentEn?: string;
  sourceMetaboliteId: string;
  targetMetaboliteId: string;
  secondarySourceId?: string;
  secondaryTargetId?: string;
  secondaryPathData?: string;
  pathData: string;
  tooltipX: number;
  tooltipY: number;
  enzymeRu: string;
  enzymeEn: string;
  enzymeShort: string;
  ecNumber: string;
  gene: string;
  uniprotId: string;
  isReversible: boolean;
  deltaG0: string;
  substrates: { name: string; nameEn?: string; formula: string; isCo?: boolean }[];
  products: { name: string; nameEn?: string; formula: string; isCo?: boolean }[];
  cofactorArc?: ReactionCofactorArc;
  activatorsRu?: string[];
  activatorsEn?: string[];
  inhibitorsRu?: string[];
  inhibitorsEn?: string[];
  mechanismRu: string;
  mechanismEn?: string;
  energyBalanceRu?: string;
  energyBalanceEn?: string;
  netAtpYieldRu?: string;
  netAtpYieldEn?: string;
  clinicalNoteRu?: string;
  clinicalNoteEn?: string;
}

@Component({
  selector: 'g[ma-reaction-arrow]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Invisible wide hitbox for easy clicking -->
    <svg:path
      [attr.d]="reaction().pathData"
      class="reaction-hitbox"
      fill="none"
      stroke="transparent"
      stroke-width="28"
      (click)="reactionClick.emit(reaction()); $event.stopPropagation()"
      (mouseenter)="reactionHover.emit(reaction())"
      (mouseleave)="reactionLeave.emit()"
    />

    <!-- Visible sleek reaction line -->
    <svg:path
      [attr.d]="reaction().pathData"
      class="reaction-line"
      fill="none"
      [attr.marker-end]="isSelected() ? 'url(#rx-arrowhead-active)' : (isHovered() ? 'url(#rx-arrowhead-hover)' : 'url(#rx-arrowhead)')"
      [class.reaction-line--animated]="isFluxAnimated()"
      (click)="reactionClick.emit(reaction()); $event.stopPropagation()"
      (mouseenter)="reactionHover.emit(reaction())"
      (mouseleave)="reactionLeave.emit()"
    />

    <!-- Animated Flux Pulse Overlay (if enabled) -->
    @if (isFluxAnimated() && !isDimmed()) {
      <svg:path
        [attr.d]="reaction().pathData"
        class="reaction-flux-flow"
        fill="none"
      />
    }

    <!-- Secondary Source Feeder (e.g. Acetyl-CoA feeding down into Citrate Synthase) -->
    @if (reaction().secondaryPathData) {
      <svg:path
        [attr.d]="reaction().secondaryPathData"
        class="reaction-secondary-line"
        [class.reaction-secondary-line--active]="isSelected()"
        [class.reaction-secondary-line--hover]="isHovered()"
        fill="none"
        [attr.marker-end]="isSelected() ? 'url(#rx-arrowhead-active)' : (isHovered() ? 'url(#rx-arrowhead-hover)' : 'url(#rx-arrowhead)')"
      />
    }

    <!-- Cofactor Swoop Arc & Clickable Cofactor Pills -->
    @if (reaction().cofactorArc; as arc) {
      <!-- Arc trajectory touching reaction line smoothly -->
      <svg:path
        [attr.d]="arc.path"
        class="cofactor-arc"
        [class.cofactor-arc--active]="isSelected()"
        [class.cofactor-arc--highlighted]="isArcHighlighted()"
        [class.cofactor-arc--hover]="isHovered()"
        fill="none"
        [attr.marker-end]="(isSelected() || isArcHighlighted()) ? 'url(#cofactor-arrowhead-active)' : 'url(#cofactor-arrowhead)'"
      />

      <!-- Input Cofactors (Entering Reaction) -->
      @if (arc.inItems && arc.inItems.length > 0) {
        <svg:g
          class="cofactor-pill-group"
          [attr.transform]="'translate(' + (arc.inX || 0) + ',' + (arc.inY || 0) + ')'"
        >
          @for (item of arc.inItems; track item.name + (item.textEn || item.text)) {
            @let isItemSel = isCofactorActive(item.name, item.nameEn);
            @let activeText = getItemText(item);
            @let activeName = getItemName(item);
            @let chipW = getChipWidth(activeText);
            <svg:g
              class="cofactor-pill-item"
              [class.is-active]="isItemSel"
              [attr.transform]="'translate(' + (item.dx || 0) + ',' + (item.dy || 0) + ')'"
              (click)="onCofactorClick(item.name, $event)"
              role="button"
              tabindex="0"
              [attr.aria-label]="localeService.locale() === 'ru' ? ('Кофермент: ' + activeText) : ('Coenzyme: ' + activeText)"
            >
              <svg:title>{{ localeService.locale() === 'ru' ? ('Нажмите, чтобы открыть информацию о ' + activeName) : ('Click to open details for ' + activeName) }}</svg:title>
              <svg:rect
                [attr.x]="-chipW / 2"
                y="-10"
                [attr.width]="chipW"
                height="20"
                rx="5"
                class="cofactor-chip-bg"
                [class.cofactor-chip-bg--active]="isItemSel"
              />
              <svg:text
                x="0"
                y="0"
                text-anchor="middle"
                dominant-baseline="central"
                class="cofactor-pill-text cofactor-pill-text--in"
                [class.cofactor-pill-text--active]="isItemSel"
              >
                {{ activeText }}
              </svg:text>
            </svg:g>
          }
        </svg:g>
      } @else if (arc.inText) {
        @let activeText = getArcInText(arc);
        @let activeName = getArcInName(arc);
        @let chipW = getChipWidth(activeText);
        <svg:g
          class="cofactor-pill-group cofactor-pill-item"
          [class.is-active]="isCofactorActive(arc.inCofactor || arc.inText, arc.inCofactorEn)"
          [attr.transform]="'translate(' + (arc.inX || 0) + ',' + (arc.inY || 0) + ')'"
          (click)="onCofactorClick(arc.inCofactor || arc.inText, $event)"
          role="button"
          tabindex="0"
          [attr.aria-label]="localeService.locale() === 'ru' ? ('Кофермент: ' + activeText) : ('Coenzyme: ' + activeText)"
        >
          <svg:title>{{ localeService.locale() === 'ru' ? ('Нажмите, чтобы открыть информацию о ' + activeName) : ('Click to open details for ' + activeName) }}</svg:title>
          <svg:rect
            [attr.x]="-chipW / 2"
            y="-10"
            [attr.width]="chipW"
            height="20"
            rx="5"
            class="cofactor-chip-bg"
            [class.cofactor-chip-bg--active]="isCofactorActive(arc.inCofactor || arc.inText, arc.inCofactorEn)"
          />
          <svg:text
            x="0"
            y="0"
            text-anchor="middle"
            dominant-baseline="central"
            class="cofactor-pill-text cofactor-pill-text--in"
            [class.cofactor-pill-text--active]="isCofactorActive(arc.inCofactor || arc.inText, arc.inCofactorEn)"
          >
            {{ activeText }}
          </svg:text>
        </svg:g>
      }

      <!-- Output Cofactors (Leaving Reaction / Product) -->
      @if (arc.outItems && arc.outItems.length > 0) {
        <svg:g
          class="cofactor-pill-group"
          [attr.transform]="'translate(' + (arc.outX || 0) + ',' + (arc.outY || 0) + ')'"
        >
          @for (item of arc.outItems; track item.name + (item.textEn || item.text)) {
            @let isItemSel = isCofactorActive(item.name, item.nameEn);
            @let activeText = getItemText(item);
            @let activeName = getItemName(item);
            @let chipW = getChipWidth(activeText);
            <svg:g
              class="cofactor-pill-item"
              [class.is-active]="isItemSel"
              [attr.transform]="'translate(' + (item.dx || 0) + ',' + (item.dy || 0) + ')'"
              (click)="onCofactorClick(item.name, $event)"
              role="button"
              tabindex="0"
              [attr.aria-label]="localeService.locale() === 'ru' ? ('Кофермент: ' + activeText) : ('Coenzyme: ' + activeText)"
            >
              <svg:title>{{ localeService.locale() === 'ru' ? ('Нажмите, чтобы открыть информацию о ' + activeName) : ('Click to open details for ' + activeName) }}</svg:title>
              <svg:rect
                [attr.x]="-chipW / 2"
                y="-10"
                [attr.width]="chipW"
                height="20"
                rx="5"
                class="cofactor-chip-bg"
                [class.cofactor-chip-bg--active]="isItemSel"
              />
              <svg:text
                x="0"
                y="0"
                text-anchor="middle"
                dominant-baseline="central"
                class="cofactor-pill-text cofactor-pill-text--out"
                [class.cofactor-pill-text--energy]="item.isEnergy"
                [class.cofactor-pill-text--gtp]="item.isGtp"
                [class.cofactor-pill-text--active]="isItemSel"
              >
                {{ activeText }}
              </svg:text>
            </svg:g>
          }
        </svg:g>
      } @else if (arc.outText) {
        @let activeText = getArcOutText(arc);
        @let activeName = getArcOutName(arc);
        @let chipW = getChipWidth(activeText);
        <svg:g
          class="cofactor-pill-group cofactor-pill-item"
          [class.is-active]="isCofactorActive(arc.outCofactor || arc.outText, arc.outCofactorEn)"
          [attr.transform]="'translate(' + (arc.outX || 0) + ',' + (arc.outY || 0) + ')'"
          (click)="onCofactorClick(arc.outCofactor || arc.outText, $event)"
          role="button"
          tabindex="0"
          [attr.aria-label]="localeService.locale() === 'ru' ? ('Кофермент: ' + activeText) : ('Coenzyme: ' + activeText)"
        >
          <svg:title>{{ localeService.locale() === 'ru' ? ('Нажмите, чтобы открыть информацию о ' + activeName) : ('Click to open details for ' + activeName) }}</svg:title>
          <svg:rect
            [attr.x]="-chipW / 2"
            y="-10"
            [attr.width]="chipW"
            height="20"
            rx="5"
            class="cofactor-chip-bg"
            [class.cofactor-chip-bg--active]="isCofactorActive(arc.outCofactor || arc.outText, arc.outCofactorEn)"
          />
          <svg:text
            x="0"
            y="0"
            text-anchor="middle"
            dominant-baseline="central"
            class="cofactor-pill-text cofactor-pill-text--out"
            [class.cofactor-pill-text--energy]="arc.isEnergy"
            [class.cofactor-pill-text--gtp]="arc.isGtp"
            [class.cofactor-pill-text--active]="isCofactorActive(arc.outCofactor || arc.outText, arc.outCofactorEn)"
          >
            {{ activeText }}
          </svg:text>
        </svg:g>
      }
    }

    <!-- Hover Enzyme Tooltip -->
    @if (isHovered() && !isSelected()) {
      <svg:g
        [attr.transform]="'translate(' + reaction().tooltipX + ',' + reaction().tooltipY + ')'"
        class="reaction-tooltip"
      >
        <svg:rect x="-95" y="-22" width="190" height="24" rx="5" class="tooltip-bg" />
        <svg:text x="0" y="-6" text-anchor="middle" class="tooltip-text">
          {{ reaction().enzymeShort }} • {{ localeService.locale() === 'ru' ? reaction().enzymeRu : reaction().enzymeEn }}
        </svg:text>
      </svg:g>
    }
  `,
  styles: [`
    :host {
      display: contents;
    }

    .reaction-hitbox {
      cursor: pointer;
      pointer-events: stroke;
    }

    .reaction-line {
      cursor: pointer;
      stroke: var(--color-reaction-line, #334155);
      stroke-width: 2.8px;
      stroke-linecap: round;
      transition: stroke 0.18s ease, stroke-width 0.18s ease, filter 0.18s ease;
      pointer-events: stroke;
    }

    .reaction-flux-flow {
      stroke: #38bdf8;
      stroke-width: 2px;
      stroke-dasharray: 6 10;
      stroke-linecap: round;
      animation: fluxFlowAnim 1.2s linear infinite;
      pointer-events: none;
      opacity: 0.85;
    }

    @keyframes fluxFlowAnim {
      from {
        stroke-dashoffset: 32;
      }
      to {
        stroke-dashoffset: 0;
      }
    }

    .reaction-secondary-line {
      stroke: var(--color-reaction-line, #334155);
      stroke-width: 2.2px;
      stroke-dasharray: 4 3;
      stroke-linecap: round;
      pointer-events: none;
      transition: stroke 0.18s ease, stroke-width 0.18s ease;

      &--active {
        stroke: #fb7185;
        stroke-width: 2.6px;
        stroke-dasharray: none;
      }

      &--hover {
        stroke: #38bdf8;
      }
    }

    .cofactor-arc {
      stroke: #64748b;
      stroke-width: 1.8px;
      stroke-dasharray: 4 3;
      stroke-linecap: round;
      transition: stroke 0.18s ease, stroke-width 0.18s ease;
      pointer-events: none;

      &--active {
        stroke: #f8fafc;
        stroke-width: 2.2px;
        stroke-dasharray: none;
      }

      &--highlighted {
        stroke: #38bdf8;
        stroke-width: 2.4px;
        stroke-dasharray: none;
        filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.7));
      }

      &--hover {
        stroke: #38bdf8;
      }
    }

    .cofactor-pill-group {
      cursor: pointer;
      pointer-events: all;
      transition: transform 0.15s ease;
    }

    .cofactor-pill-item {
      cursor: pointer;
      pointer-events: all;
      transition: transform 0.15s ease;

      &:hover {
        .cofactor-chip-bg {
          fill: rgba(56, 189, 248, 0.25);
          stroke: #38bdf8;
        }

        .cofactor-pill-text {
          fill: #38bdf8;
          font-weight: 800;
          filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.8));
        }

        .cofactor-pill-text--energy {
          fill: #fbbf24;
          filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.8));
        }

        .cofactor-pill-text--gtp {
          fill: #34d399;
          filter: drop-shadow(0 0 6px rgba(52, 211, 153, 0.8));
        }
      }
    }

    .cofactor-chip-bg {
      fill: rgba(15, 23, 42, 0.75);
      stroke: rgba(255, 255, 255, 0.1);
      stroke-width: 0.8px;
      transition: fill 0.15s ease, stroke 0.15s ease;

      &--active {
        fill: rgba(56, 189, 248, 0.25);
        stroke: #38bdf8;
        stroke-width: 1.5px;
        filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.7));
      }
    }

    .cofactor-pill-text {
      font-family: var(--font-mono, monospace);
      font-size: 11px;
      font-weight: 700;
      user-select: none;
      transition: fill 0.15s ease;

      &--in {
        fill: #94a3b8;
      }

      &--out {
        fill: #cbd5e1;
      }

      &--energy {
        fill: #f59e0b;
        font-weight: 800;
      }

      &--gtp {
        fill: #10b981;
        font-weight: 800;
      }

      &--active {
        fill: #ffffff !important;
        font-weight: 800 !important;
        filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.9));
      }
    }

    .reaction-tooltip {
      pointer-events: none;
      animation: fadeIn 0.15s ease-out;

      .tooltip-bg {
        fill: #0f172a;
        stroke: var(--color-substrate-accent, #38bdf8);
        stroke-width: 1.2px;
        filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.6));
      }

      .tooltip-text {
        font-size: 9.5px;
        font-weight: 700;
        fill: #f8fafc;
        letter-spacing: -0.01em;
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactionArrowComponent {
  protected readonly localeService = inject(LocaleService);

  readonly reaction = input.required<ReactionArrowData>();
  readonly isSelected = input<boolean>(false);
  readonly isHovered = input<boolean>(false);
  readonly isDimmed = input<boolean>(false);
  readonly isFluxAnimated = input<boolean>(false);
  readonly selectedCofactorName = input<string | null>(null);

  readonly reactionClick = output<ReactionArrowData>();
  readonly reactionHover = output<ReactionArrowData>();
  readonly reactionLeave = output<void>();
  readonly cofactorClick = output<string>();

  getChipWidth(text: string): number {
    return Math.max(28, text.length * 8.2 + 8);
  }

  getItemText(item: CofactorParticipant): string {
    if (this.localeService.locale() === 'en' && item.textEn) {
      return item.textEn;
    }
    return item.textRu || item.text;
  }

  getItemName(item: CofactorParticipant): string {
    if (this.localeService.locale() === 'en' && item.nameEn) {
      return item.nameEn;
    }
    return item.name;
  }

  getArcInText(arc: ReactionCofactorArc): string {
    if (this.localeService.locale() === 'en' && arc.inTextEn) {
      return arc.inTextEn;
    }
    return arc.inTextRu || arc.inText || '';
  }

  getArcInName(arc: ReactionCofactorArc): string {
    if (this.localeService.locale() === 'en' && arc.inCofactorEn) {
      return arc.inCofactorEn;
    }
    return arc.inCofactor || arc.inText || '';
  }

  getArcOutText(arc: ReactionCofactorArc): string {
    if (this.localeService.locale() === 'en' && arc.outTextEn) {
      return arc.outTextEn;
    }
    return arc.outTextRu || arc.outText || '';
  }

  getArcOutName(arc: ReactionCofactorArc): string {
    if (this.localeService.locale() === 'en' && arc.outCofactorEn) {
      return arc.outCofactorEn;
    }
    return arc.outCofactor || arc.outText || '';
  }

  isCofactorActive(name: string, nameEn?: string): boolean {
    const sel = this.selectedCofactorName();
    if (!sel || (!name && !nameEn)) return false;
    const a = sel.trim().toLowerCase();
    const b = name ? name.trim().toLowerCase() : '';
    const c = nameEn ? nameEn.trim().toLowerCase() : '';
    return (
      (b !== '' && (a === b || a.includes(b) || b.includes(a))) ||
      (c !== '' && (a === c || a.includes(c) || c.includes(a)))
    );
  }

  isArcHighlighted(): boolean {
    const sel = this.selectedCofactorName();
    if (!sel) return false;
    const arc = this.reaction().cofactorArc;
    if (!arc) return false;
    if (arc.inItems?.some((i) => this.isCofactorActive(i.name, i.nameEn))) return true;
    if (arc.outItems?.some((i) => this.isCofactorActive(i.name, i.nameEn))) return true;
    if (arc.inCofactor && this.isCofactorActive(arc.inCofactor, arc.inCofactorEn)) return true;
    if (arc.outCofactor && this.isCofactorActive(arc.outCofactor, arc.outCofactorEn)) return true;
    return false;
  }

  onCofactorClick(cofactorName: string, event: MouseEvent): void {
    event.stopPropagation();
    this.cofactorClick.emit(cofactorName);
  }
}

