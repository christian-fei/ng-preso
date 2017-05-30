import {
  ChangeDetectorRef,
  Component,
  trigger,
  transition,
  style,
  animate
} from '@angular/core';

@Component({
  selector: 'app-slide',
  template: `
    <div *ngIf="active" [@enterAnimation]="reverse">
      <div style="display: block;">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./slide.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition('void => reverse', [
          style({ transform: 'translateX(100%)' }),
          animate('500ms', style({ transform: 'translateX(0)' }))
        ]),
        transition('reverse => void', [
          animate('500ms', style({ transform: 'translateX(-100%)' }))
        ]),
        transition('void => forward', [
          style({ transform: 'translateX(-100%)' }),
          animate('500ms', style({ transform: 'translateX(0)' }))
        ]),
        transition('forward => void', [
          animate('500ms', style({ transform: 'translateX(100%)' }))
        ]),
      ]
    )
  ]
})
export class SlideComponent {
  public changeDetectorRef: ChangeDetectorRef;
  public active: boolean;
  public reverse: string;
  constructor(changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;
  }
}
