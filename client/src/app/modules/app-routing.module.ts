import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TablePlanrepasComponent } from "../components/table-planrepas/table-planrepas.component";
import { EditPlanrepasComponent } from "../components/edit-planrepas/edit-planrepas.component";

const routes: Routes = [
  { path: 'planrepas', component: TablePlanrepasComponent},
  { path: 'new-planrepas', component: EditPlanrepasComponent},
  { path: 'edit-planrepas', component: EditPlanrepasComponent },
  { path: '**', redirectTo: 'planrepas', pathMatch: 'full'},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
