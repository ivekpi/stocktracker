import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from './pages/landing/landing.component';
import {SentimentComponent} from './pages/sentiment/sentiment.component';

const routes: Routes = [
  {
    path: 'sentiment/:symbol',
    component: SentimentComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: LandingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
