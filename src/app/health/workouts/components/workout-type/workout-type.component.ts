import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  forwardRef
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true
};

@Component({
  selector: 'fma-workout-type',
  providers: [TYPE_CONTROL_ACCESSOR],
  templateUrl: './workout-type.component.html',
  styleUrls: ['./workout-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutTypeComponent implements ControlValueAccessor, OnInit {
  selectors = ['strength', 'endurance'];
  value: string;

  private onTouch: Function;
  private onModelChange: Function;

  constructor() {}

  ngOnInit() {}

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }
  writeValue(value: string) {
    this.value = value;
  }
  setSelected(value: string) {
    this.value = value;
    this.onModelChange(value);
    this.onTouch();
  }
}
