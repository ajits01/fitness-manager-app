import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'fma-schedule-controls',
  templateUrl: './schedule-controls.component.html',
  styleUrls: ['./schedule-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleControlsComponent implements OnInit {
  offset = 0;
  @Input()
  selected: Date;

  @Output()
  move = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {}

  moveDate(offset: number) {
    this.offset = offset;
    this.move.emit(offset);
  }
}
