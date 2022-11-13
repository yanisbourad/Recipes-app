import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../services/communication.service'
import { Fournisseur } from 'src/app/modules/fournisseur.module';
import { Planrepas } from 'src/app/modules/planrepas.module';
@Component({
  selector: 'app-table-planrepas',
  templateUrl: './table-planrepas.component.html',
  styleUrls: ['./table-planrepas.component.css']
})
export class TablePlanrepasComponent implements OnInit {

  constructor( private planrepasService: CommunicationService ) { }

  planrepas: Planrepas[] ;
  planToEdit?: Planrepas;
  ngOnInit(): void {
      this.planrepas = this.planrepasService.getPlanrepas();
  }

  getFournisseurName(id: number): string {
      let fournisseur:Fournisseur;
      fournisseur = this.planrepasService.getFournisseur(id);
      return fournisseur.nomfournisseur;
  }

  initPlan(): void {
    this.planToEdit = new Planrepas
  }
}
