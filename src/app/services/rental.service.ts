import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; // apiye ulaşmak için import ediyoruz
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetailDto } from '../models/rentalDetailDto';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = 'https://localhost:44386/api';

  constructor(private httpClient: HttpClient) { }

  getRental():Observable<ListResponseModel<RentalDetailDto>> { 
    let newPath = this.apiUrl + "/rentals/getrentaldetails";
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(newPath);
 }

 getRentalCar(carId:number): Observable<ListResponseModel<RentalDetailDto>> {
  let newPath = this.apiUrl + "/rentals/getrentalbycar?id="+ carId;
  return this.httpClient.get<ListResponseModel<RentalDetailDto>>(newPath);
}
}
