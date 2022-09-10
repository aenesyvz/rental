import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarComponent } from './components/car/car.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { ColorComponent } from './components/color/color.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ImageAddComponent } from './components/image-add/image-add.component';
import { NaviComponent } from './components/navi/navi.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CardetaillistComponent } from './components/admin/cardetaillist/cardetaillist.component';
import { UserComponent } from './components/admin/user/user.component';
import { RegisterComponent } from './components/register/register.component';
import { BrandPipePipe } from './pipes/brand-pipe.pipe';
import { CardetailPipePipe } from './pipes/cardetail-pipe.pipe';
import { ColorPipePipe } from './pipes/color-pipe.pipe';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';


export function tokenGetter() {
  return localStorage.getItem("access_token");
}


@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    CarComponent,
    CarAddComponent,
    CarDetailComponent,
    ColorComponent,
    ColorAddComponent,
    CustomerComponent,
    ImageAddComponent,
    NaviComponent,
    PaymentComponent,
    RentalComponent,
    BrandAddComponent,
    CardetaillistComponent,
    UserComponent,
    RegisterComponent,
    BrandPipePipe,
    CardetailPipePipe,
    ColorPipePipe,
    LoginComponent
  ],
  imports: [
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://localhost:4200/"]
      },
    }),
  ],
  providers: [
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
