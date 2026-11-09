import { Injectable, signal } from '@angular/core';

/**
 * Service managing state (open/closed) of the ChatGPT-style navigation sidebar.
 */
@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private static readonly STORAGE_KEY = 'ma_sidebar_open';

  readonly isOpen = signal<boolean>(this.loadInitialState());

  toggle(): void {
    this.isOpen.update((v) => {
      const next = !v;
      this.safeSave(next);
      return next;
    });
  }

  setOpen(open: boolean): void {
    this.isOpen.set(open);
    this.safeSave(open);
  }

  private loadInitialState(): boolean {
    try {
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        return false;
      }

      if (typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function') {
        const saved = localStorage.getItem(SidebarService.STORAGE_KEY);
        if (saved !== null) {
          return saved === 'true';
        }
      }
    } catch {
      // Storage access unavailable
    }
    return true;
  }

  private safeSave(open: boolean): void {
    try {
      if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
        localStorage.setItem(SidebarService.STORAGE_KEY, String(open));
      }
    } catch {
      // Storage access unavailable
    }
  }
}

