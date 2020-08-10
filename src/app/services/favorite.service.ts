import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import * as _ from "lodash";
@Injectable({
  providedIn: "root",
})
export class FavoriteService {
  favoriteArray = [];
  private favoriteSource = new BehaviorSubject<Array<any>>([]);
  currentFavorite = this.favoriteSource.asObservable();

  constructor() {}
  addToFavorite(cityName, cityId, cityW, cityImg, cityStatus, unit) {
    this.favoriteArray.push({
      cityName: cityName,
      cityId: cityId,
      cityW: cityW,
      cityImg: cityImg,
      cityStatus: cityStatus,
      unit: unit,
    });

    this.favoriteSource.next(this.favoriteArray);
  }
  chackFavorit(cityName) {
    if (this.favoriteArray && this.favoriteArray.length) {
      var item = _.find(this.favoriteArray, ["cityName", cityName]);
      if (item == undefined) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  removeFromFavorite(index) {
    this.favoriteArray.splice(index, 1);
    this.favoriteSource.next(this.favoriteArray);
  }
}
