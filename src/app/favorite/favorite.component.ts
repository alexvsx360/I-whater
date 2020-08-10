import { Component, OnInit } from "@angular/core";
import { FavoriteService } from "../services/favorite.service";

@Component({
  selector: "app-favorite",
  templateUrl: "./favorite.component.html",
  styleUrls: ["./favorite.component.css"],
})
export class FavoriteComponent implements OnInit {
  favorite = null;
  constructor(public favoriteService: FavoriteService) {}

  ngOnInit() {
    this.favoriteService.currentFavorite.subscribe((res) => {
      this.favorite = res;
    });
  }
  removeFromFavorite(index) {
    this.favoriteService.removeFromFavorite(index);
  }
}
