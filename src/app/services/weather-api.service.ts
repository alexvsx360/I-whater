import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class WeatherApiService {
  constructor(private http: HttpClient) {}
  getCity(cityName) {
    return this.http.get(
      `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=rcpEvtoLANBcKRiT9ZwL2mEBWfBN5GLO&q=${cityName}`
    );
  }

  getWeather(cityKey) {
    return this.http
      .get(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=rcpEvtoLANBcKRiT9ZwL2mEBWfBN5GLO&metric=true`
      )
      .pipe(catchError(this.eh));
  }

  completeCityName(name) {
    return this.http
      .get(
        `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=rcpEvtoLANBcKRiT9ZwL2mEBWfBN5GLO&q=${name}`
      )
      .pipe(catchError(this.eh));
  }
  gatImage(name) {
    return this.http
      .get(
        `https://pixabay.com/api/?key=17773179-24edd092d53fd6181cb670dc9&q=${name}`
      )
      .pipe(catchError(this.eh));
  }
  eh(error: HttpErrorResponse) {
    return throwError(error || "server error ");
  }
}
