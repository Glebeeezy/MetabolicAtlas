import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type CofactorPreset = 'tangent-swoop' | 'lateral-loop' | 'perpendicular-dip' | 'through-cross';

export interface ReactionCofactorArc {
  preset?: CofactorPreset;
  path: string;
  inCofactor?: string;
  inText?: string;
  inX?: number;
  inY?: number;
  inAnchor?: 'start' | 'middle' | 'end';
  outCofactor?: string;
  outText?: string;
  outX?: number;
  outY?: number;
  outAnchor?: 'start' | 'middle' | 'end';
  isEnergy?: boolean;
  isGtp?: boolean;
}

export interface ReactionArrowData {
  id: string;
  stepNumber: number;
  code: string;
  nameRu: string;
  nameEn: string;
  sourceMetaboliteId: string;
  targetMetaboliteId: string;
  secondarySourceId?: string;
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
  substrates: { name: string; formula: string; isCo?: boolean }[];
  products: { name: string; formula: string; isCo?: boolean }[];
  cofactorArc?: ReactionCofactorArc;
  activatorsRu?: string[];
  inhibitorsRu?: string[];
  mechanismRu: string;
  clinicalNoteRu?: string;
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

    <!-- Cofactor Swoop Arc & Clickable Cofactor Pills -->
    @if (reaction().cofactorArc; as arc) {
      <!-- Arc trajectory touching reaction line smoothly -->
      <svg:path
        [attr.d]="arc.path"
        class="cofactor-arc"
        [class.cofactor-arc--active]="isSelected()"
        [class.cofactor-arc--hover]="isHovered()"
        fill="none"
        [attr.marker-end]="isSelected() ? 'url(#cofactor-arrowhead-active)' : 'url(#cofactor-arrowhead)'"
      />

      <!-- Input Cofactor (Entering Reaction) -->
      @if (arc.inText) {
        <svg:g
          class="cofactor-pill-group"
          [attr.transform]="'translate(' + (arc.inX || 0) + ',' + (arc.inY || 0) + ')'"
          (click)="onCofactorClick(arc.inCofactor || arc.inText, $event)"
          role="button"
          tabindex="0"
          [attr.aria-label]="'Кофермент: ' + arc.inText"
        >
          <svg:title>Нажмите, чтобы открыть информацию о {{ arc.inCofactor || arc.inText }}</svg:title>
          <svg:text
            x="0"
            y="0"
            [attr.text-anchor]="arc.inAnchor || 'middle'"
            class="cofactor-pill-text cofactor-pill-text--in"
          >
            {{ arc.inText }}
          </svg:text>
        </svg:g>
      }

      <!-- Output Cofactor (Leaving Reaction / Product) -->
      @if (arc.outText) {
        <svg:g
          class="cofactor-pill-group"
          [attr.transform]="'translate(' + (arc.outX || 0) + ',' + (arc.outY || 0) + ')'"
          (click)="onCofactorClick(arc.outCofactor || arc.outText, $event)"
          role="button"
          tabindex="0"
          [attr.aria-label]="'Кофермент: ' + arc.outText"
        >
          <svg:title>Нажмите, чтобы открыть информацию о {{ arc.outCofactor || arc.outText }}</svg:title>
          <svg:text
            x="0"
            y="0"
            [attr.text-anchor]="arc.outAnchor || 'middle'"
            class="cofactor-pill-text cofactor-pill-text--out"
            [class.cofactor-pill-text--energy]="arc.isEnergy"
            [class.cofactor-pill-text--gtp]="arc.isGtp"
          >
            {{ arc.outText }}
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
        <svg:rect x="-85" y="-22" width="170" height="24" rx="5" class="tooltip-bg" />
        <svg:text x="0" y="-6" text-anchor="middle" class="tooltip-text">
          {{ reaction().enzymeShort }} • {{ reaction().enzymeRu }}
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

      &--hover {
        stroke: #38bdf8;
      }
    }

    .cofactor-pill-group {
      cursor: pointer;
      pointer-events: all;
      transition: transform 0.15s ease;

      &:hover {
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
  readonly reaction = input.required<ReactionArrowData>();
  readonly isSelected = input<boolean>(false);
  readonly isHovered = input<boolean>(false);
  readonly isDimmed = input<boolean>(false);
  readonly isFluxAnimated = input<boolean>(false);

  readonly reactionClick = output<ReactionArrowData>();
  readonly reactionHover = output<ReactionArrowData>();
  readonly reactionLeave = output<void>();
  readonly cofactorClick = output<string>();

  onCofactorClick(cofactorName: string, event: MouseEvent): void {
    event.stopPropagation();
    this.cofactorClick.emit(cofactorName);
  }
}
