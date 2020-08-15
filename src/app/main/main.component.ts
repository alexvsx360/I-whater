import { Component, OnInit } from "@angular/core";
import { WeatherApiService } from "../services/weather-api.service";
import { FavoriteService } from "../services/favorite.service";
import { CoordsService } from "../services/coords.service";
import { ActivatedRoute } from "@angular/router";
import * as _ from "lodash";
import { Store } from "@ngrx/store";
import { Favorite } from "../models/favorite";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  getCityOnInit = false;
  location = null;
  farOrCel: boolean = true;
  day = true;
  night = false;
  dataForecasts = null;
  cityData = null;
  searchData: any;
  cityImg = null;
  messageDanger = null;
  messageGood = null;
  inFavorite = false;
  favorites;
  constructor(
    private store: Store<{ favorite: { favorite: Favorite[] } }>,
    private coordsService: CoordsService,
    private activatedRoute: ActivatedRoute,
    private weatherApiService: WeatherApiService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    this.store.select("favorite").subscribe((res) => {
      this.favorites = Object.values(res);
    });
    this.coordsService.currentLocation.subscribe((res) => {
      if (!_.isEmpty(res)) {
        this.location = res;
      } else {
        console.log("! No Corrent Location");
      }
    });
    if (this.activatedRoute.snapshot.params["cityKey"]) {
      let rourParam = this.activatedRoute.snapshot.params["cityKey"];
      this.getWeather(rourParam);
    } else if (this.location !== null) {
      this.getWeather(this.location.EnglishName);
    } else {
      this.getWeather("Tel Aviv");
    }
  }
  getWeather(cityName) {
    this.inFavorite = false;
    if (this.favorites[0].length > 0) {
      this.favorites[0].forEach((element) => {
        if (_.includes(element, cityName) == true) {
          this.inFavorite = true;
        }
      });
    }

    this.weatherApiService.getCity(cityName).subscribe(
      (res) => {
        this.cityData = null;
        this.cityData = res;
        var cityKey = parseInt(this.cityData[0].Key);
        this.weatherApiService.getWeather(cityKey, this.farOrCel).subscribe(
          (res) => {
            this.dataForecasts = res;
          },
          (err) => {
            this.messageDanger = err.status + " " + err.statusText;
            setTimeout(() => {
              this.messageDanger = null;
            }, 3400);
          }
        );

        this.weatherApiService.gatImage(cityName).subscribe(
          (res) => {
            var daf =
              "https://cdn.pixabay.com/photo/2014/09/16/18/28/potatoes-448613_960_720.jpg";
            this.cityImg = res;

            if (this.cityImg.total == 0) {
              this.cityImg = daf;
            } else {
              this.cityImg = this.cityImg.hits[0].previewURL;
            }
          },
          (err) => {
            this.messageDanger = err.status + " " + err.statusText;
            setTimeout(() => {
              this.messageDanger = null;
            }, 3400);
          }
        );
      },
      (err) => {
        this.messageDanger = err.status + " " + err.statusText;
        setTimeout(() => {
          this.messageDanger = null;
        }, 3400);
      }
    );
  }

  completeName(search) {
    this.weatherApiService.completeCityName(search).subscribe(
      (res) => {
        this.searchData = res;
      },
      (err) => {
        this.messageDanger = err.status + " " + err.statusText;
        setTimeout(() => {
          this.messageDanger = null;
        }, 3400);
      }
    );
  }
  addToFavorite(cityData: Favorite) {
    this.favoriteService.addToFavorite(cityData);
    this.messageGood = "City Add to Favorit";
    this.inFavorite = true;
    setTimeout(() => {
      this.messageGood = null;
    }, 3100);
  }
  changeDayNight() {
    if (this.day === true) {
      this.day = false;
      this.night = true;
    } else {
      this.day = true;
      this.night = false;
    }
  }
  fahrenheitOrCelsius(cityName) {
    if (this.farOrCel === true) {
      this.farOrCel = false;
      this.getWeather(cityName);
    } else {
      this.farOrCel = true;
      this.getWeather(cityName);
    }
  }
}
