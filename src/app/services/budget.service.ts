import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Budget, ModuleType } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http:HttpClient) { }


  getTiposModulos():Observable<ModuleType[]>{
    return this.http.get<ModuleType[]>('http://localhost:3000/module-types');
  }

  postBudget(budget:any){
    return this.http.post<any>('http://localhost:3000/budgets',budget);
  }

  getAll():Observable<Budget[]>
  {
    return this.http.get<Budget[]>('http://localhost:3000/budgets');
  }

  getById(id:number):Observable<Budget>{
    return this.http.get<Budget>('http://localhost:3000/budgets'+'/'+id);
  }

}
