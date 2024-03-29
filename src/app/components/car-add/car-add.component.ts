import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators,} from '@angular/forms';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  carAddForm:FormGroup
  brands: Brand[] = [];
  colors: Color[] = [];
  brandFilter: number;
  colorFilter: number;

  constructor(
    private toastrService:ToastrService, 
    private formBuilder:FormBuilder, 
    private carService:CarService, 
    private colorService:ColorService, 
    private brandService:BrandService) { }

  ngOnInit(): void {
    this.createCarAddForm(),
    this.getAllBrands(),
    this.getAllColors()
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      carName:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
      findeks:["",Validators.required]
    })
  }

  getAllColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getAllBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getSelectedBrand(brandId: number) {
    if (this.brandFilter == brandId) return true;
    else return false;
  }

  getSelectedColor(colorId: number) {
    if (this.colorFilter == colorId) return true;
    else return false;
  }

  add(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({}, this.carAddForm.value)
      this.carService.add(carModel).subscribe(response=>{
        setTimeout(() => { 
          window.location.reload();      
        }, 1000);
        this.toastrService.success(response.message,"Başarılı")
      },responsError=>{
        for (let i = 0; i < responsError.error.Errors.length; i++) {
          this.toastrService.error(responsError.error.Errors[i].ErrorMessage,"Hata")
        }
      })
    }else{
      this.toastrService.error("Form eksik.","Dikkat")
    }
  }
}
