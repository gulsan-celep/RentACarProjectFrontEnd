import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetails: CarDetailDto;
  dataLoaded: boolean = false;
  carImages: CarImage[];
  path= "https://localhost:44386/";
  rentalControl = false;
  rentalMessage = "";

  constructor(private carService:CarService, private carImageService:CarImageService,
    private activatedRoute:ActivatedRoute, private rentalService:RentalService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if(params['carId']){
        this.getCarDetails(params['carId']);
        this.getCarImages(params['carId']);
        this.getRentalCar(params['carId']);
      }
    }) 
  }

  getCarDetails(carId: number) {
    this.carService.getCarDetailsById(carId).subscribe((result) => {
      this.carDetails = result.data;
      this.dataLoaded = true;
    });
  }

  getCarImages(carId: number) {
    this.carImageService.getCarsByImage(carId).subscribe((result) => {
      this.carImages = result.data;
      console.log(result.data);
    });
  }

  getRentalCar(carId: number) {
    this.rentalService.getRentalCar(carId).subscribe((result) => {
        this.rentalControl = result.success;
        this.rentalMessage = result.message;
        console.log(result.message)
    });
  }
}
