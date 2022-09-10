import { ListResponseModel } from './../models/listResponseModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  private apiUrl = environment.apiUrl
  constructor(private httpClient: HttpClient) { }

  getImagePath(imagePath: string) {
    return this.apiUrl + imagePath
  }

  getCarImage(carId:number){
    let newPath = this.apiUrl +"carImages/getallbycarid?carId=" + carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  addCarImage(carImage:CarImage):Observable<ResponseModel>{
    let newPath = this.apiUrl + "carImages/add"
    return this.httpClient.post<ResponseModel>(newPath,carImage)
  }
}
