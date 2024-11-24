import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillboardComponent } from './billboard/billboard.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { Moviepage1Component } from './moviepage1/moviepage1.component';
import { Moviepage2Component } from './moviepage2/moviepage2.component';

@NgModule({
  declarations: [
    AppComponent,
    BillboardComponent,
    FooterComponent,
    HeaderComponent,
    Moviepage1Component,
    Moviepage2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
