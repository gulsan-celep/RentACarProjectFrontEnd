import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[] = [];
  carDetail:CarDetailDto[]= [];
  carImages: CarImage[];
  dataLoaded = false;
  path= "https://localhost:44386/";
  filterText ="";

  constructor(private carService:CarService, private activetedRoute:ActivatedRoute, 
    private carImageService:CarImageService) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"]);
      }else if(params["brandId"] && params["colorId"]){
        this.getCarsBrandAndColor(params["brandId"],params["colorId"])
      }
      else{
        this.getCars();
        this.getImages();
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe(response =>{
      this.cars = response.data
      this.dataLoaded = true;
    })
  }

  getCarsBrandAndColor(brandId:number, colorId:number) {
    this.carService.getCarsBrandAndColor(brandId, colorId).subscribe(response =>{
      this.cars = response.data
      this.dataLoaded = true;
    })
  }

  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe(response =>{
      this.cars = response.data
      this.dataLoaded = true;
    })
  }

  getCarsByColor(colorId:number) {
    this.carService.getCarsByColor(colorId).subscribe(response =>{
      this.cars = response.data
      this.dataLoaded = true;
    })
  }

  getImages(){
    this.carImageService.getCarImage().subscribe(response =>{
      this.carImages = response.data
      this.dataLoaded = true;
    })
  }
}
