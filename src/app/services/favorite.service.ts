import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Favorite } from "../models/favorite";

import { Store } from "@ngrx/store";
import * as FavoriteActions from "../favorite/store/favorite.actions";
@Injectable({
  providedIn: "root",
})
export class FavoriteService {
  favoriteArray: Observable<{ favorite: Favorite[] }>;

  constructor(private store: Store<{ favorite: { favorite: Favorite[] } }>) {}
  addToFavorite(cityData: Favorite) {
    const newFavorite = cityData;
    this.store.dispatch(new FavoriteActions.AddToFavorite(newFavorite));
  }
  removeFromFavorite(index) {
    this.store.dispatch(new FavoriteActions.DeleteFromFavorite(index));
  }
}
