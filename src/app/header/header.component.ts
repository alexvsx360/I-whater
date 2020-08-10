import { Component, OnInit } from "@angular/core";
import { CoordsService } from "../services/coords.service";
import * as _ from "lodash";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  lat = null;
  lon = null;
  messageDanger = null;
  constructor(private coordsService: CoordsService) {}

  ngOnInit() {
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
