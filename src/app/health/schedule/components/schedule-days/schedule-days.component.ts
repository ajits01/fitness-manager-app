import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'fma-schedule-days',
  templateUrl: './schedule-days.component.html',
  styleUrls: ['./schedule-days.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleDaysComponent implements OnInit {
  days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  @Input()
  selected: number;

  @Output()
  select = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {}

  selectDay(index: number) {
    this.select.emit(index);
  }
}
