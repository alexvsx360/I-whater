import { Component, OnInit } from "@angular/core";
import { CoordsService } from "../services/coords.service";
import * as _ from "lodash";
import { Store } from "@ngrx/store";
import { Favorite } from "../models/favorite";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  lat = null;
  lon = null;
  messageDanger = null;
  favorites;
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
            if (!_.isEmpty(res)) {
              this.coordsService.gotLocation(res);
            }
          },
          (err) => {
            this.messageDanger = err.status + " " + err.statusText;
          }
        );
      },
      (err) => {
        this.messageDanger = err.message;
        setTimeout(() => {
          setTimeout(() => {
            this.messageDanger = null;
          });
        }, 3000);
      }
    );
  }
}
