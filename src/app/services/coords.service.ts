import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class CoordsService {
  location = null;

  private locationSource = new BehaviorSubject<any>(null);
  currentLocation = this.locationSource.asObservable();

  constructor(private http: HttpClient) {}

  getCityLocation(lat, lon) {
    return this.http
      .get(
        `http://dataservice.accuweather.com//locations/v1/cities/geoposition/search?apikey=rcpEvtoLANBcKRiT9ZwL2mEBWfBN5GLO&q=${lat},${lon}`
      )
      .pipe(catchError(this.eh));
  }
  eh(error: HttpErrorResponse) {
    return throwError(error || "server error heare");
  }
  gotLocation(location) {
    this.locationSource.next(location);
  }
}
