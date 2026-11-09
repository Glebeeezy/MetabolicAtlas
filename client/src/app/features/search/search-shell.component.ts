import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Shell placeholder component for full-text and trigram entity search.
 */
@Component({
  selector: 'ma-search-shell',
  templateUrl: './search-shell.component.html',
  styleUrl: './search-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchShellComponent {}

