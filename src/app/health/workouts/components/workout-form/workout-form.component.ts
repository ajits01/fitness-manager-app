import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import {
  Workout,
  Workout_FSDoc
} from 'src/app/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'fma-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutFormComponent implements OnInit, OnChanges {
  toggled = false;
  exists = false;

  @Input()
  workout: Workout_FSDoc;

  @Output()
  create = new EventEmitter<Workout>();

  @Output()
  update = new EventEmitter<Workout>();

  @Output()
  remove = new EventEmitter<Workout>();

  form = this.fb.group({
    name: ['', Validators.required],
    type: ['strength'],
    strength: this.fb.group({
      reps: 0,
      sets: 0,
      weight: 0
    }),
    endurance: this.fb.group({
      distance: 0,
      duration: 0
    })
  });
  constructor(private fb: FormBuilder) {}

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  get required() {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    );
  }

  get placeholder() {
    return `e.g. ${
      this.form.get('type').value === 'strength' ? 'Benchpress' : 'Treadmill'
    }`;
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.workout && this.workout.name) {
      this.exists = true;
      const value = this.workout;
      this.form.patchValue(value);
    }
  }

  createWorkout() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateWorkout() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeWorkout() {
    this.remove.emit(this.form.value);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
