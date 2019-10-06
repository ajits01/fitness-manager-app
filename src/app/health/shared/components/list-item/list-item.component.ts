import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'fma-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent implements OnInit {
  @Input()
  item: any;

  @Output()
  remove = new EventEmitter<any>();

  toggled = false;
  constructor() {}

  ngOnInit() {}

  getRoute(item: any) {
    return [`../${item.ingredients ? 'meals' : 'workouts'}`, this.item.id];
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  removeItem() {
    this.remove.emit(this.item);
  }
}
