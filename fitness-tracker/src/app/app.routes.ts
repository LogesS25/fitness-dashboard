import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'fitness-tracking',loadChildren:()=> import('./fitness-tracking/fitness-tracking.module').then(m=>m.FitnessTrackingModule)}
];
