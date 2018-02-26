import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DishesService } from '../services/dishes.service';
import { IngredientsService } from '../services/ingredients.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})

export class DishComponent implements OnInit {
  dish: any;
  ingred: any;
  defQty:number=1;
  dishId:string;
  constructor(private route: ActivatedRoute, private dishesS: DishesService, private ingredientsS: IngredientsService) {
    //assigning value toingred class property; PLUS assing qty key:value on constructor to obj returned from db => look at the .map!
    this.ingredientsS.getIngredients().subscribe(ingred => this.ingred = ingred.map(e => {e.qty=1;return e;}));
  }
  //get params on init
  ngOnInit() { 
    
    this.route.params.subscribe(params => {
      this.dishId = params['id'];
      this.getDish(this.dishId)
    }) 
  }
  //get dish from db
  getDish(id) { this.dishesS.get(id).subscribe(dish => this.dish = dish) }
  //get ingredient from db
  getIngredient(id) { this.ingredientsS.get(id).subscribe(ingred => this.ingred = ingred) }

  addIngredient(ing_id,dish_id,qty) {
    this.dishesS.assign(ing_id, dish_id, qty).subscribe(res => this.getDish(this.dishId))
  }
  reloadIngredients(){
    this.ingredientsS.getIngredients().subscribe(ingred => this.ingred = ingred.map(e => { e.qty = 1; return e; }));
  }
}
