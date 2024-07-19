import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',loadChildren:()=> import('./fitness-tracking/fitness-tracking.module').then(m=>m.FitnessTrackingModule)}
];
