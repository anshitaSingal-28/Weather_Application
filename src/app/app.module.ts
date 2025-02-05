import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { FormsModule } from '@angular/forms';  // Import FormsModule for two-way data binding
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  // Add HttpClientModule to imports array
    FormsModule,  // Add FormsModule for two-way binding
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
