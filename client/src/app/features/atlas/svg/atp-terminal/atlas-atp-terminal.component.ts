import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'g[ma-atp-terminal]',
  standalone: true,
  templateUrl: './atlas-atp-terminal.component.html',
  styleUrl: './atlas-atp-terminal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasAtpTerminalComponent {
  readonly x = input<number>(2055);
  readonly y = input<number>(3110);
  readonly locale = input<'ru' | 'en'>('ru');

  readonly terminalClick = output<void>();
}
