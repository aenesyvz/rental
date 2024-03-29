
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail'; 
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-cardetaillist',
  templateUrl: './cardetaillist.component.html',
  styleUrls: ['./cardetaillist.component.css']
})
export class CardetaillistComponent implements OnInit {
  cardetails: CarDetail[] = [];
  carDetail: CarDetail;
  colors: Color[] = [];
  color: Color;
  brands: Brand[] = [];
  brand: Brand;
  car: Car;
  cars: Car[] = [];
  colorUpdateForm: FormGroup;
  brandUpdateForm: FormGroup;
  carUpdateForm: FormGroup;

  constructor(
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private carService:CarService
  ) {}

  ngOnInit(): void {
    this.getColors();
    this.getBrands();
    this.getCarDetails();
    this.getCars();
    this.createColorUpdateForm();
    this.createBrandUpdateForm();
    this.createCarforUpdateForm();

  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarDetails() {
    this.carService.getCars().subscribe((response) => {
      this.cardetails = response.data;
      
    });
  }
  getCarDetailByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.carDetail = response.data[0];
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      
    });
  }

  getBrand(brandId: number) {
    this.brandService.getByBrandId(brandId).subscribe((response) => {
     
      this.brand = response.data;
     
    });
  }

  getBrandforUpdate(brand: Brand) {
    this.brand = brand;

    this.brandUpdateForm.patchValue({
      brandId: this.brand.brandId,
    });
  }
  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandId: [''],
      brandName: ['', Validators.required],
    });
  }
  updateBrand() {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      console.log(brandModel);
      this.brandService.updateBrand(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Güncellendi');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          
        },
        (responseError) => {
          this.toastrService.error('Güncellenemedi');
        }
      );
    }
  }

  removeBrand(brand: Brand) {
    console.log(brand);

    this.brandService.deleteBrand(brand).subscribe(
      (response) => {
        this.toastrService.success('gitti');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
      },
      (responseError) => {
        this.toastrService.error(responseError.errors, 'Marka Silinemedi');
      }
    );
  }

  getColor(color: Color) {
    this.color = color;
    this.colorUpdateForm.patchValue({
      colorId: this.color.colorId,
    });
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: [''],
      colorName: ['', Validators.required],
    });
  }

  updateColor() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
   
      this.colorService.updateColor(colorModel).subscribe(
        (response) => {
          
          this.toastrService.success(response.message, 'Güncellendi');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          
        },
        (responseError) => {
          console.log(responseError)
          this.toastrService.error('Güncellenemedi');
        }
      );
    }
  }

  removeColor(color: Color) {
    this.colorService.deleteColor(color).subscribe(
      (response) => {
        this.toastrService.success('Silindi');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
      },
      (responseError) => {
        this.toastrService.error(responseError.errors, 'Renk Silinemedi');
      }
    );
  }

  getCarUpdate(car:Car){
    this.car =car;
    this.carUpdateForm.patchValue({
      carId:this.car.id,
      brandId:this.car.brandId,
      colorId:this.car.colorId
    })
  }

  createCarforUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
     carId: [''],
     brandId:[''],
     colorId:[''],
     carName:['',Validators.required],
     modelYear:['',Validators.required],
     dailyPrice:['',Validators.required],
     description:['',Validators.required],
     findeks:['',Validators.required]
    })
  }

  updateCar(){
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({},this.carUpdateForm.value);
      console.log(this.carUpdateForm.value)

     
       this.carService.updateCar(carModel).subscribe(response=>{
         console.log(response)
        
         this.toastrService.success(response.message,"Güncellendi");
         setTimeout(() => {
          window.location.reload();
        }, 1000);
         
       },responseError=>{
         console.log(responseError)
         this.toastrService.error("Güncellenmedi");
       }
       )
    }
  }

  removeCar(car: Car) {
    this.carService.deleteCar(car).subscribe(
      (response) => {
        this.toastrService.success('Silindi');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
      },
      (responseError) => {
        this.toastrService.error(responseError.errors, 'Arac Silinemedi');
      }
    );
  }

}
