import { Component, OnInit, Input, NgZone } from '@angular/core';
import { FoodItem } from '../../../shared/models/foodItem.model';
import { AbstractCameraService } from '../../../core/services/camera.service';

@Component({
  selector: 'app-food-picture',
  templateUrl: './food-picture.component.html',
  styleUrls: ['./food-picture.component.css']
})
export class FoodPictureComponent implements OnInit {
  @Input() foodItem: FoodItem;

  constructor(
    private cameraService: AbstractCameraService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {}

  takePicture($event: any, foodItem: FoodItem) {
    $event.preventDefault();
    this.cameraService.getPhoto().subscribe((imageString: string) => {
      this.ngZone.run(() => {
        foodItem.imageString = imageString;
      });
    });
  }
}
