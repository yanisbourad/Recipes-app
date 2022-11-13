import { Component, Input, OnInit } from '@angular/core';
import { Fournisseur } from 'src/app/modules/fournisseur.module';
import { Planrepas } from 'src/app/modules/planrepas.module';

@Component({
  selector: 'app-edit-planrepas',
  templateUrl: './edit-planrepas.component.html',
  styleUrls: ['./edit-planrepas.component.css']
})
export class EditPlanrepasComponent implements OnInit {

  @Input() plan?: Planrepas

  fournisseurs: Fournisseur[]
  
  constructor() { }

  ngOnInit(): void {
    if (!this.plan){
      this.plan = new Planrepas;
    }
  }

}
