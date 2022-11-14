import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';
import { Fournisseur } from '../../../../../common/tables/fournisseur.module';
import { Planrepas } from '../../../../../common/tables/planrepas.module';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-planrepas',
  templateUrl: './edit-planrepas.component.html',
  styleUrls: ['./edit-planrepas.component.css']
})
export class EditPlanrepasComponent implements OnInit {

  plan: Planrepas

  fournisseurs: Fournisseur[]
  
  constructor(private router: Router, private route: ActivatedRoute, private sourceService: CommunicationService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.targetPlan){
        this.sourceService.getPlanRepasById(params.targetPlan).subscribe((planrepas: Planrepas) =>
        {
          this.plan = planrepas;
        });
      }
      if (!this.plan){
        this.plan = new Planrepas;
      }
    });
    this.sourceService.getFournisseurs().subscribe((res: Fournisseur[])=>
    {
      this.fournisseurs = res;
    })
  }

  createPlan(): void{
    console.log(this.plan);
    this.sourceService.insertPlanrepas(this.plan).subscribe((id: number) =>
    {
      this.plan.numeroplan = id;
      alert('Plan Repas Crée avec Succès');
    })

  }

  updatePlan(): void{
    this.sourceService.updatePlanrepas(this.plan).subscribe((id: number) =>
    {
      this.plan.numeroplan = id;
      alert('Le Plan Repas Est Modifié Avec Succès');
    })
  }

  deletePlan(): void{
    const response = confirm(`Ètes vous sur de vouloire supprimer ce Plan Repas?`);
    if (response){
      this.sourceService.deletePlanrepas(this.plan.numeroplan).subscribe((res:any)=>{
        this.router.navigate(['']);
        alert('Le Plan Repas Est Supprimé Avec Succès');
      })
    }
  }
}
