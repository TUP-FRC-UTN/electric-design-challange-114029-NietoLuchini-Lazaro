import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModuleType, Zone } from '../models/budget';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.css',
})
export class BudgetFormComponent  implements OnInit {
  /* ADDITIONAL DOCS:
    - https://angular.dev/guide/forms/typed-forms#formarray-dynamic-homogenous-collections
    - https://dev.to/chintanonweb/angular-reactive-forms-mastering-dynamic-form-validation-and-user-interaction-32pe
  */


    formPresupuesto?:FormGroup;

    constructor(private formBuilder:FormBuilder,private budgetService:BudgetService){}

    listTipoModulos:ModuleType[]=[];
    listAmbientes = Object.values(Zone);
    
  ngOnInit(): void {
    

    this.budgetService.getTiposModulos()
      .subscribe(arg => this.listTipoModulos = arg);
    

    this.formPresupuesto=this.formBuilder.group({
      nombre:['',Validators.required],
      fecha:[''],
      modulos:this.formBuilder.array([])
    })

  }


  get modulos():FormArray{
    return this.formPresupuesto?.get('modulos') as FormArray;
  }

  agregarModulo(){

    const moduloform= this.formBuilder.group({
      tipoModulo:[''],
      ambiente:[''],
      precio:[''],
      lugares:['']
    })

    this.modulos.push(moduloform);
  }


  eliminarModulo(index:number){
      this.modulos.removeAt(index);
  }


  guardar(){

  }


}
