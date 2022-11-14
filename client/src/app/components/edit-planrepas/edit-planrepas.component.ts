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
          if (planrepas) 
          {
            this.plan = planrepas
          }
          else alert('Erreur database not responding, Please Try later'); 
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
    if (!this.PlanrepasIsValid()) return;
    this.sourceService.insertPlanrepas(this.plan).subscribe((id: number) =>
    {
      if (id){
        this.plan.numeroplan = id;
        alert('Plan Repas Crée avec Succès');
      }
      else alert('Erreur database not responding'); 
    })

  }

  updatePlan(): void{
    if (!this.PlanrepasIsValid()) return;
    this.sourceService.updatePlanrepas(this.plan).subscribe((res: number) =>
    {
      if (!res) {
        alert('Erreur database not responding'); 
        return;
      }
      this.plan.numeroplan = res;
      alert('Le Plan Repas Est Modifié Avec Succès');
    })
  }

  deletePlan(): void{
    const response = confirm(`Ètes vous sur de vouloire supprimer ce Plan Repas?`);
    if (response){
      this.sourceService.deletePlanrepas(this.plan.numeroplan).subscribe((res: number)=>{
        if (!res){
          alert('Erreur database not responding'); 
          return;
        }
        this.router.navigate(['']);
        alert('Le Plan Repas Est Supprimé Avec Succès');
      })
    }
  }

  PlanrepasIsValid(): boolean{
    // init erreur messege
    let errors = '';

    // Tests
    if (!this.plan.categorie || this.plan.categorie.length == 0) 
      errors+= 'CATÉGORIE NE DOIT PAS ÊTRE VIDE \n';
    if (!this.plan.prix || this.plan.prix <= 0) 
      errors+= 'LE PRIX DOIT ÊTRE SUPÉRIEUR À 0 \n';
    if (!this.plan.frequence || this.plan.frequence  <= 0) 
      errors+= 'LA FRÉQUENCE DOIT ÊTRE SUPÉRIEUR À 0 \n';
    if (!this.plan.nbrcalories || this.plan.nbrcalories <= 0) 
      errors+= 'LES CALORIES DOIVENT ÊTRE SUPÉRIEUR À 0 \n';
    if (!this.plan.nbrpersonnes || this.plan.nbrpersonnes <= 0) 
      errors+= 'LE NOMBRE DE PERSONNES DOIT ÊTRE SUPÉRIEUR À 0 \n';
    if (!this.plan.numerofournisseur || 
      !this.fournisseurs.find((it)=>{it.numerofournisseur === this.plan.numerofournisseur})) {
      errors+= 'VOUS DEVIEZ ASSIGNER UN FOURNISSEUR \n';
      }

    // if we found errors found
    if (errors.length >= 0){
      alert('Veuillez résoudre ces erreurs puis resseyer:\n\n' + errors);
      return false;
    }
    return true;
  }
}
