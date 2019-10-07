import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScheduleItem } from 'src/app/health/shared/services/schedule/schedule.service';

@Component({
  selector: 'fma-schedule-section',
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss']
})
export class ScheduleSectionComponent implements OnInit {
  @Input()
  name: string;

  @Input()
  section: ScheduleItem;

  @Output()
  select = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onSelect(type: string, assigned: any[] = []) {
    const data = this.section;
    this.select.emit({
      type,
      assigned,
      data
    });
  }
}
