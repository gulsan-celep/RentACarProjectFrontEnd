import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // apiye ulaşmak için import ediyoruz
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = 'https://localhost:44386/api/colors/getall';

  constructor(private httpClient: HttpClient) { }

  getColors():Observable<ListResponseModel<Color>> { 
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl);
 }
}
