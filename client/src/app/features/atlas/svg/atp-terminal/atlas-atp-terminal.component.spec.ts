import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AtlasAtpTerminalComponent } from './atlas-atp-terminal.component';

@Component({
  standalone: true,
  imports: [AtlasAtpTerminalComponent],
  template: `
    <svg>
      <g ma-atp-terminal [locale]="'ru'" (terminalClick)="clicked = true"></g>
    </svg>
  `,
})
class TestHostComponent {
  clicked = false;
}

describe('AtlasAtpTerminalComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render ATP terminal badge and emit terminalClick when clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const badge = compiled.querySelector('.atp-terminal-badge') as SVGGElement;
    expect(badge).toBeTruthy();

    badge.dispatchEvent(new MouseEvent('click'));
    expect(fixture.componentInstance.clicked).toBe(true);
  });
});
