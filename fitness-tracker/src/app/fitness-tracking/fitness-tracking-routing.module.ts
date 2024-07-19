import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddworkoutComponent } from './addworkout/addworkout.component';

const routes: Routes = [
    
    {path:'',component:LoginComponent},
    {path:'side-nav',component:SideNavComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'addworkout',component:AddworkoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FitnessTrackingRoutingModule { }
