import { Routes } from '@angular/router';
import { DishesComponent } from './dishes/dishes.component';
import { DishComponent } from './dish/dish.component';

export const routes: Routes = [
    { path: '', component: DishesComponent },
    { path: ':id', component: DishComponent },
    { path: 'ingredient/:id', component: DishComponent },
    { path: '**', redirectTo: '' }
];