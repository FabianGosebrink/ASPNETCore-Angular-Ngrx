import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPictureComponent } from './food-picture.component';

describe('FoodPictureComponent', () => {
  let component: FoodPictureComponent;
  let fixture: ComponentFixture<FoodPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
