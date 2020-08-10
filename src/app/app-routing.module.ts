import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { FavoriteComponent } from "./favorite/favorite.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { WelcomeComponent } from "./welcome/welcome.component";

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "main", component: MainComponent },
  { path: "location/:cityKey", component: MainComponent },
  { path: "favorites", component: FavoriteComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
