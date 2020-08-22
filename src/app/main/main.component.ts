import { Component, OnInit } from "@angular/core";
import { WeatherApiService } from "../services/weather-api.service";
import { FavoriteService } from "../services/favorite.service";
import { CoordsService } from "../services/coords.service";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Favorite } from "../models/favorite";
import { Router } from "@angular/router";
import { promise } from "protractor";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  getCityOnInit = false;
  location = null;
  farOrCel: boolean = true;
  dayNight: boolean = true;
  dataForecasts = null;
  cityData = null;
  searchData: any;
  cityImg: string = null;
  messageDanger: string = null;
  messageGood: string = null;
  inFavorite: boolean = false;
  favorites: Array<Favorite[]>;
  search: string;
  constructor(
    private router: Router,
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

    this.coordsService.currentLocation.subscribe(
      (res) => {
        this.location = res;
      },
      (err) => {
        let message = err.status + " " + err.statusText;
        this.showDangerMsg(message);
      }
    );
    setTimeout(() => {
      if (this.activatedRoute.snapshot.params["cityKey"]) {
        let rourParam = this.activatedRoute.snapshot.params["cityKey"];
        this.getWeather(rourParam);
      } else if (this.location !== null) {
        this.getWeather(this.location.EnglishName);
      } else {
        this.getWeather("Tel Aviv");
      }
    }, 200);
  }

  getWeather(cityName: string) {
    this.inFavorite = false;
    if (this.favorites[0].length > 0) {
      this.favorites[0].forEach((element) => {
        if (element.cityName == cityName) {
          this.inFavorite = true;
        }
      });
    }

    this.weatherApiService.getCity(cityName).subscribe(
      (res) => {
        if (!res[0].length) {
          this.cityData = res;
        } else {
          this.router.navigateByUrl("/main");
        }

        var cityKey = parseInt(this.cityData[0].Key);

        this.weatherApiService.getWeather(cityKey).subscribe(
          (res) => {
            this.dataForecasts = res;
          },
          (err) => {
            let message = err.status + " " + err.statusText;
            this.showDangerMsg(message);
          }
        );

        this.weatherApiService.gatImage(cityName).subscribe(
          (res) => {
            var daf =
              "https://cdn.pixabay.com/photo/2014/09/16/18/28/potatoes-448613_960_720.jpg";
            let img = res;
            if (img["total"] == 0) {
              this.cityImg = daf;
            } else {
              this.cityImg = img["hits"][0].previewURL;
            }
          },
          (err) => {
            let message = err.status + " " + err.statusText;
            this.showDangerMsg(message);
          }
        );
      },
      (err) => {
        let message = err.status + " " + err.statusText;
        this.showDangerMsg(message);
      }
    );
  }

  completeName(search) {
    this.weatherApiService.completeCityName(search).subscribe(
      (res) => {
        this.searchData = res;
      },
      (err) => {
        let message = err.status + " " + err.statusText;
        this.showDangerMsg(message);
      }
    );
  }
  addToFavorite(cityData: Favorite) {
    this.favoriteService.addToFavorite(cityData);
    let message = "City Add to Favorit";
    this.showGoodMsg(message);
    this.inFavorite = true;
  }
  changeDayNight() {
    this.dayNight = !this.dayNight;
  }
  fahrenheitOrCelsius() {
    this.farOrCel = !this.farOrCel;
  }
  showDangerMsg(message) {
    this.messageDanger = message;
    setTimeout(() => {
      this.messageDanger = null;
    }, 3400);
  }
  showGoodMsg(message) {
    this.messageGood = message;
    setTimeout(() => {
      this.messageGood = null;
    }, 3100);
  }
}
