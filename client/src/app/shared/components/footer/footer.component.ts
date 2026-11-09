import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Bottom application footer displaying attribution, MIT license, and version info.
 */
@Component({
  selector: 'ma-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();
}
