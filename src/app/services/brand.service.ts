import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Brand } from '../models/brand';
import { environment } from 'src/environments/environment';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = environment.apiUrl
  constructor( private httpClient :HttpClient ) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl + "brands/getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  getByBrandId(brandId:number):Observable<SingleResponseModel<Brand>>{
    let newPath=this.apiUrl + "brands/getbyid?brandId="+brandId
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath)
  }

  add(brand:Brand):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "brands/add",brand)
  }

  updateBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"brands/update",brand)
  }

  deleteBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'brands/delete',brand)
  }
}
