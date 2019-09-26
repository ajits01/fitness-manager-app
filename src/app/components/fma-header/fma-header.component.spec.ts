import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmaHeaderComponent } from './fma-header.component';

describe('FmaHeaderComponent', () => {
  let component: FmaHeaderComponent;
  let fixture: ComponentFixture<FmaHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmaHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
