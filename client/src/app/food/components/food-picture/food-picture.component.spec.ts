import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPictureComponent } from './food-picture.component';
import { AbstractCameraService } from '../../../core/services/camera.service';
import { MobileCameraService } from '../../../core/services/mobileCamera.service';

describe('FoodPictureComponent', () => {
  let component: FoodPictureComponent;
  let fixture: ComponentFixture<FoodPictureComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [FoodPictureComponent],
        providers: [
          { provide: AbstractCameraService, useClass: MobileCameraService }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodPictureComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
