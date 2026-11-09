import { Injectable, effect, signal } from '@angular/core';
import { Theme } from '../types/theme.type';

/**
 * Service managing application visual theme (light / dark) with persistence.
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private static readonly STORAGE_KEY = 'ma_theme';
  readonly theme = signal<Theme>(this.loadInitialTheme());

  constructor() {
    effect(() => {
      const current = this.theme();
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.setAttribute('data-theme', current);
      }
      this.safeSave(current);
    });
  }

  toggleTheme(): void {
    this.theme.update((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  private loadInitialTheme(): Theme {
    try {
      if (typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function') {
        const saved = localStorage.getItem(ThemeService.STORAGE_KEY) as Theme | null;
        if (saved === 'light' || saved === 'dark') {
          return saved;
        }
      }
    } catch {
      // Storage access restricted or unavailable
    }

    try {
      if (
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        return 'dark';
      }
    } catch {
      // Media query matching unavailable
    }

    return 'light';
  }

  private safeSave(theme: Theme): void {
    try {
      if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
        localStorage.setItem(ThemeService.STORAGE_KEY, theme);
      }
    } catch {
      // Storage access restricted or unavailable
    }
  }
}
