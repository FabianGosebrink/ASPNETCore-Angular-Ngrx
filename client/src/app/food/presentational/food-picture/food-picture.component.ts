import { Component, Input, NgZone } from '@angular/core';
import { AbstractCameraService } from '../../../core/services/abstract-camera.service';
import { FoodItem } from '../../../shared/models/foodItem.model';

@Component({
  selector: 'app-food-picture',
  templateUrl: './food-picture.component.html',
  styleUrls: ['./food-picture.component.css']
})
export class FoodPictureComponent {
  @Input() foodItem: FoodItem;

  constructor(
    private cameraService: AbstractCameraService,
    private ngZone: NgZone
  ) {}

  takePicture($event: any, foodItem: FoodItem) {
    $event.preventDefault();
    this.cameraService.getPhoto().subscribe((imageString: string) => {
      this.ngZone.run(() => {
        foodItem.imageString = imageString;
      });
    });
  }
}
