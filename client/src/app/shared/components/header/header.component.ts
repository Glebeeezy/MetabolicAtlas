import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { LocaleSwitcherComponent } from '../locale-switcher/locale-switcher.component';
import { SidebarService } from '../../../core/services/sidebar.service';
import { LocaleService } from '../../../core/services/locale.service';
import { AtlasStateService } from '../../../core/services/atlas-state.service';

/**
 * Top application header containing sidebar toggle, quick pathway selector in the center
 * with horizontal scroll arrows, and language / animated theme controls on the right.
 */
@Component({
  selector: 'ma-header',
  standalone: true,
  imports: [ThemeSwitcherComponent, LocaleSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  protected readonly sidebarService = inject(SidebarService);
  protected readonly localeService = inject(LocaleService);
  protected readonly atlasStateService = inject(AtlasStateService);
  private readonly router = inject(Router);

  @ViewChild('navScrollContainer') navScrollContainer?: ElementRef<HTMLDivElement>;

  readonly canScrollLeft = signal<boolean>(false);
  readonly canScrollRight = signal<boolean>(false);

  private resizeObserver?: ResizeObserver;

  get pathwayPills() {
    return this.atlasStateService.pathways();
  }

  ngAfterViewInit(): void {
    this.updateScrollState();

    if (typeof window !== 'undefined' && 'ResizeObserver' in window && this.navScrollContainer) {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateScrollState();
      });
      this.resizeObserver.observe(this.navScrollContainer.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  onSelectPathway(id: string): void {
    this.atlasStateService.selectPathway(id);
    if (!this.router.url.startsWith('/atlas')) {
      this.router.navigate(['/atlas']);
    }
  }

  updateScrollState(): void {
    const el = this.navScrollContainer?.nativeElement;
    if (!el) return;

    const left = el.scrollLeft > 2;
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 2;

    this.canScrollLeft.set(left);
    this.canScrollRight.set(right);
  }

  scrollLeft(): void {
    const el = this.navScrollContainer?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: -180, behavior: 'smooth' });
    setTimeout(() => this.updateScrollState(), 250);
  }

  scrollRight(): void {
    const el = this.navScrollContainer?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: 180, behavior: 'smooth' });
    setTimeout(() => this.updateScrollState(), 250);
  }
}
