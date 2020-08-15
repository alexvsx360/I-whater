import { Action } from "@ngrx/store";
import { Favorite } from "src/app/models/favorite";

export const ADD_TO_FAVORITE = "ADD_TO_FAVORITE";
export const DELETE_FROM_FAVORITE = "DELETE_FROM_FAVORITE";

export class AddToFavorite implements Action {
  readonly type = ADD_TO_FAVORITE;
  constructor(public payload: Favorite) {}
}
export class DeleteFromFavorite implements Action {
  readonly type = DELETE_FROM_FAVORITE;
  constructor(public payload: number) {}
}

export type favoriteActions = AddToFavorite | DeleteFromFavorite;
