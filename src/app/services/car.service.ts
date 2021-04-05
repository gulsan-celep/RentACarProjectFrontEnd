import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // apiye ulaşmak için import ediyoruz
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetailDto } from '../models/carDetailDto';
import { Car } from '../models/car';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44386/api/';

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcardetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcarsbybrand?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcarsbycolor?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
 
  getCarDetailsById(carId:number):Observable<SingleResponseModel<CarDetailDto>>{
    let newPath = this.apiUrl + "cars/getbyid?id=" + carId;
    return this.httpClient.get<SingleResponseModel<CarDetailDto>>(newPath);
  }

  getCarsBrandAndColor(brandId:number,colorId:number): Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "getcarsbrandandcolor?brandId=" + brandId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
