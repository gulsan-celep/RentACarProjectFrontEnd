import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // apiye ulaşmak için import ediyoruz
import { ListResponseModel } from '../models/listResponseModel';
import { CarImage } from '../models/carImage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = 'https://localhost:44386/api/';

  constructor(private httpClient: HttpClient) { }

  getCarImage(): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + "carImages/getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getCarsByImage(carId:number): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + "carImages/getimagesbycarid?id="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
