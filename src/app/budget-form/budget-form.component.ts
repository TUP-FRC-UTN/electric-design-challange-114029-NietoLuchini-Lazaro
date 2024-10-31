import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Budget, ModuleType, Zone } from '../models/budget';
import { BudgetService } from '../services/budget.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule,HttpClientModule],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.css',
  providers:[BudgetService]
})
export class BudgetFormComponent  implements OnInit {
  /* ADDITIONAL DOCS:
    - https://angular.dev/guide/forms/typed-forms#formarray-dynamic-homogenous-collections
    - https://dev.to/chintanonweb/angular-reactive-forms-mastering-dynamic-form-validation-and-user-interaction-32pe
  */


    formPresupuesto!:FormGroup;

    constructor(private formBuilder:FormBuilder,private budgetService:BudgetService){}

    listTipoModulos:ModuleType[]=[];
    listAmbientes = Object.values(Zone);
    
  ngOnInit() {
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
      precio:[0],
      lugares:['']
    })

    this.modulos.push(moduloform);
this,this.valueChanges(moduloform);

  }


  eliminarModulo(index:number){
      this.modulos.removeAt(index);
  }

  valueChanges(moduloGroup: FormGroup) {
    moduloGroup.get('tipoModulo')?.valueChanges.subscribe((selectedModule: ModuleType) => {
        if (selectedModule) {
            moduloGroup.get('precio')?.setValue(selectedModule.price);
            moduloGroup.get('lugares')?.setValue(selectedModule.slots);
        }
    });

}


  guardar(){
    const numeroModulos= this.modulos.length;
    if(numeroModulos<5){
      alert("La cantidad de modelos debe ser 5 0 mas");
    }
    else if(this.formPresupuesto.valid){
      
      const formData= this.formPresupuesto.value;

      const budget:Budget={
        id:Math.floor(Math.random() * 1000) + 1 + '',
        date:new Date(formData.fecha),
        client:formData.nombre,
        modules: this.formPresupuesto.get('modulos')?.value.map((modulo: { tipoModulo: ModuleType; lugares: number; precio: number; ambiente: string; }) => ({
          name: modulo.tipoModulo.name, // Aquí asumo que 'tipoModulo' es el nombre del módulo
          slots: modulo.lugares, // Número de lugares
          price: modulo.precio, // Precio
          zona: modulo.ambiente // Asegúrate de que este campo esté en tu FormArray
        }))
      }
      this.budgetService.postBudget(budget)
        .subscribe(arg => {
          alert("Cargado correctamente!");
          this.formPresupuesto.reset();
        });
      

    }else
    {
      alert("Ocurrio un error al guardar");
    }
  
  }


  getModuleId(nombre: string): number {
    console.log(`Buscando módulo con nombre: ${nombre}`); // Añade un log
    const modulo: ModuleType | undefined = this.listTipoModulos.find(modulo => modulo.name === nombre);
    if (!modulo) {
        throw new Error(`Módulo con nombre '${nombre}' no encontrado`);
    }
    return modulo.id; 
}



}

