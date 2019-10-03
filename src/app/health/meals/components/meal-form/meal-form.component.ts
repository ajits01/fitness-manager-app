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
  Meal,
  Meal_FSDoc
} from 'src/app/health/shared/services/meals/meals.service';

@Component({
  selector: 'fma-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealFormComponent implements OnInit, OnChanges {
  toggled = false;
  exists = false;

  @Input()
  meal: Meal_FSDoc;

  @Output()
  create = new EventEmitter<Meal>();

  @Output()
  update = new EventEmitter<Meal>();

  @Output()
  remove = new EventEmitter<Meal>();

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
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
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.meal && this.meal.name) {
      this.exists = true;
      this.emptyIngredients();

      const value = this.meal;
      this.form.patchValue(value);

      if (value.ingredients) {
        for (const item of value.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
    }
  }

  emptyIngredients() {
    while (this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }

  addIngredient() {
    this.ingredients.push(new FormControl(['']));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeMeal() {
    this.remove.emit(this.form.value);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
