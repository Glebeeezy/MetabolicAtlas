import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Shell placeholder component for educational biochemical articles and guides.
 */
@Component({
  selector: 'ma-articles-shell',
  templateUrl: './articles-shell.component.html',
  styleUrl: './articles-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesShellComponent {
  readonly slug = input<string>('');
}
