import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../services/communication.service'
import { Fournisseur } from '../../../../../common/tables/fournisseur.module'
import { Planrepas } from '../../../../../common/tables/planrepas.module'
@Component({
  selector: 'app-table-planrepas',
  templateUrl: './table-planrepas.component.html',
  styleUrls: ['./table-planrepas.component.css']
})
export class TablePlanrepasComponent implements OnInit {

  constructor( private planrepasService: CommunicationService ) { }

  planrepas: Planrepas[] ;
  fournisseurs: Fournisseur[] ;

  ngOnInit(): void {
    this.initPlanrepas();
    this.initFournisseurs();
  }

  initPlanrepas():void {
    this.planrepasService.getPlansRepas().subscribe((res: Planrepas[])=>
    {
      this.planrepas = res;
    });
  }

  initFournisseurs():void {
    this.planrepasService.getFournisseurs().subscribe((res: Fournisseur[])=>
    {
      this.fournisseurs = res;
    });
  }

  getFournisseurName(id: number): string {
    let fournisseur = this.fournisseurs.find((it) => {it.numerofournisseur === id})
    if (fournisseur){
      return fournisseur.nomfournisseur;
    }
    return 'undifined';
  }
  deletePlan(numeroplan: number): void{
    const response = confirm(`Ètes vous sur de vouloire supprimer ce Plan Repas?`);
    if (response){
      this.planrepasService.deletePlanrepas(numeroplan).subscribe((res: number)=>{
        alert('Le Plan Repas Est Supprimé Avec Succès');
        this.planrepas = this.planrepas.filter((it)=>{it.numeroplan != numeroplan});
      })
    }
  }
}
