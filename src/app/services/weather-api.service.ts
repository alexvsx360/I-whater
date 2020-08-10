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
      `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=0EaIU0suqEyWJtFFS6qC7DavWg6GSofL&q=${cityName}`
    );
  }

  getWeather(cityKey, metric) {
    return this.http
      .get(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=0EaIU0suqEyWJtFFS6qC7DavWg6GSofL&metric=${metric}`
      )
      .pipe(catchError(this.eh));
  }

  completeCityName(name) {
    return this.http
      .get(
        `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=0EaIU0suqEyWJtFFS6qC7DavWg6GSofL&q=${name}`
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
    return throwError(error || "server error heare");
  }
}
