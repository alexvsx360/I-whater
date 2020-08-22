import { Favorite } from "../../models/favorite";
import * as FavoriteActions from "./favorite.actions";

const initialState: { favorite: Favorite[] } = {
  favorite: [],
};

export function favoriteReducer(
  state = initialState,
  action: FavoriteActions.favoriteActions
) {
  switch (action.type) {
    case FavoriteActions.ADD_TO_FAVORITE:
      return {
        ...state,
        favorite: [...state.favorite, action.payload],
      };
    case FavoriteActions.DELETE_FROM_FAVORITE:
      return {
        ...state,
        favorite: state.favorite.filter((fav, favIndex) => {
          return favIndex !== action.payload;
        }),
      };
    default:
      return state;
  }
}
