import { NgModule,CUSTOM_ELEMENTS_SCHEMA,LOCALE_ID, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {NgbModule,NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'; 
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { AlertModule,AlertConfig  } from 'ngx-bootstrap/alert';
import { BsDatepickerModule, BsDatepickerConfig,BsLocaleService } from 'ngx-bootstrap/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutclienteComponent } from './component/plantilla/cliente/layoutcliente/layoutcliente.component';
import { BodyComponent } from './component/plantilla/body/body.component';
import { FooterComponent } from './component/plantilla/footer/footer.component';
import { HeaderComponent } from './component/plantilla/header/header.component';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { LandingComponent } from './component/landing/landing.component';

//defineLocale('de', deLocale);

@NgModule({
  declarations: [
    AppComponent,
    LayoutclienteComponent,
    BodyComponent,
    FooterComponent,
    HeaderComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    NgbAlertModule ,
    NgSelectModule, 
    FormsModule,
    NgxSpinnerModule,
    TooltipModule.forRoot(),
    ToastrModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AlertConfig, BsDatepickerConfig],
  bootstrap: [AppComponent]
})
export class AppModule { 
constructor(localeService: BsLocaleService){
  defineLocale('es', esLocale);
     localeService.use('es');
}

}
