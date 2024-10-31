import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { Budget } from '../models/budget';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css',
  providers:[BudgetService]
})
export class BudgetListComponent implements OnInit{

  constructor(private budgetService:BudgetService,private router:Router){}


  listBudgets:Budget[]=[];

  ngOnInit(): void {
    this.budgetService.getAll()
      .subscribe(arg => this.listBudgets = arg); 
  }
 

  view(id:string){
    this.router.navigate(['/update',id]);
  }

  



}
