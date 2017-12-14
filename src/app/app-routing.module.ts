/**
 * Created by kelvin on 11/23/16.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { ScorecardExistsGuards } from './guards';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent ,
    pathMatch: 'full'
  },
  {
    path: 'edit/:scorecardid',
    canActivate: [ScorecardExistsGuards],
    component: CreateComponent },
  {
    path: 'create',
    component: CreateComponent },
  {
    path: 'view/:scorecardid',
    canActivate: [ScorecardExistsGuards],
    component: ViewComponent },
  {
    path: '**',
    redirectTo: 'HomeComponent' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})
export class ScoreCardRoutingModule { }
