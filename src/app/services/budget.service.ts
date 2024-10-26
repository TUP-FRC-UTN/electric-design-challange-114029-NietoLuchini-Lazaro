import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleType } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http:HttpClient) { }


  getTiposModulos():Observable<ModuleType[]>{
    return this.http.get<ModuleType[]>('http://localhost:3000/module-types');
  }

}
