import { Component, OnInit } from "@angular/core";
import { CoordsService } from "../services/coords.service";
import { Store } from "@ngrx/store";
import { Favorite } from "../models/favorite";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  lat: number;
  lon: number;
  messageDanger: string = null;
  favorites: Array<Favorite[]>;
  constructor(
    private store: Store<{ favorite: { favorite: Favorite[] } }>,
    private coordsService: CoordsService
  ) {}

  ngOnInit() {
    this.store.select("favorite").subscribe((res) => {
      this.favorites = Object.values(res);
    });
    navigator.geolocation.getCurrentPosition(
      (res) => {
        this.lat = res.coords.latitude;
        this.lon = res.coords.longitude;
        this.coordsService.getCityLocation(this.lat, this.lon).subscribe(
          (res) => {
            if (res !== null) {
              this.coordsService.gotLocation(res);
            }
          },
          (err) => {
            let message = err.status + " " + err.statusText;
            this.showDangerMsg(message);
          }
        );
      },
      (err) => {
        let message = err.message;
        this.showDangerMsg(message);
      }
    );
  }
  showDangerMsg(message) {
    this.messageDanger = message;
    setTimeout(() => {
      this.messageDanger = null;
    }, 3400);
  }
}
