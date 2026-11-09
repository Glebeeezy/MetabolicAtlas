import { Injectable, effect, signal } from '@angular/core';
import { Locale } from '../types/locale.type';

/**
 * Service managing user-selected language locale with local storage persistence.
 */
@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private static readonly STORAGE_KEY = 'ma_locale';
  readonly locale = signal<Locale>(this.loadInitialLocale());

  constructor() {
    effect(() => {
      const current = this.locale();
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.setAttribute('lang', current);
      }
      this.safeSave(current);
    });
  }

  setLocale(locale: Locale): void {
    this.locale.set(locale);
  }

  toggleLocale(): void {
    this.locale.update((prev) => (prev === 'ru' ? 'en' : 'ru'));
  }

  private loadInitialLocale(): Locale {
    try {
      if (typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function') {
        const saved = localStorage.getItem(LocaleService.STORAGE_KEY) as Locale | null;
        if (saved === 'ru' || saved === 'en') {
          return saved;
        }
      }
    } catch {
      // Storage access restricted or unavailable
    }
    return 'ru';
  }

  private safeSave(locale: Locale): void {
    try {
      if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
        localStorage.setItem(LocaleService.STORAGE_KEY, locale);
      }
    } catch {
      // Storage access restricted or unavailable
    }
  }
}
