import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmaNavComponent } from './fma-nav.component';

describe('FmaNavComponent', () => {
  let component: FmaNavComponent;
  let fixture: ComponentFixture<FmaNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmaNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmaNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
