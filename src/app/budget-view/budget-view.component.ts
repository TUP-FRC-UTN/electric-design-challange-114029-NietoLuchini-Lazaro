import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { Budget, modules } from '../models/budget';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-budget-view',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule],
  templateUrl: './budget-view.component.html',
  styleUrl: './budget-view.component.css',
  providers:[BudgetService]
})
export class BudgetViewComponent implements OnInit {

constructor(private budgetService:BudgetService,private activateRoute:ActivatedRoute){}


id:number=0;

budgetView?:Budget;

  ngOnInit(): void {
   this.id=this.activateRoute.snapshot.params['id'];

   this.cargarbudged();
  
  }
 
  cargarbudged() {
    this.budgetService.getById(this.id)
      .subscribe(arg => {
        this.budgetView = arg;
        this.calcularCajas(); 
        this.agruparAmbientes(); 
        
      });
  }
  

  totalCajas: number = 0;
  totalPrecio: number = 0;
calcularCajas() {
  let cantidadCajas = 0;
  let precio = 0;
  this.budgetView?.modules.forEach(module => {
    cantidadCajas += module.slots;
    precio+=module.price
  });

  this.totalCajas = Math.ceil(cantidadCajas / 3);
  this.totalPrecio=precio;
}



 hashmap:{[key:string]:modules[]}={};

agruparAmbientes(){

this.budgetView?.modules.forEach(module => {

if(!this.hashmap[module.zona]){
  this.hashmap[module.zona] = [];
}

this.hashmap[module.zona].push(module);

});


}



}
