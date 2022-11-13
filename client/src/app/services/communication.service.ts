// À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
// import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Fournisseur } from "../modules/fournisseur.module";
import { Planrepas } from "../modules/planrepas.module";

@Injectable()
export class CommunicationService {
  // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
  // private readonly BASE_URL: string = "http://localhost:3000/database";
  // public constructor(private readonly http: HttpClient) {}

  private _listeners: any = new Subject<any>();

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

  public getPlanrepas() : Planrepas[] {
    let plan = new Planrepas
    plan.numeroplan= 1;
    plan.categorie= 'test catefgori';
    plan.frequence= 1;
    plan.nbrpersonnes= 1;
    plan.nbrcalories= 1;
    plan.prix= 1;
    plan.numerofournisseur= 1;
    return [plan];
  }
  
  public getFournisseurs(): Fournisseur[]{
    let it = new Fournisseur;
    it.nomfournisseur = 'Walmart';
    return [it];
  }

  public getFournisseur(id: number): Fournisseur{
    let it = new Fournisseur;
    it.numerofournisseur = id;
    it.nomfournisseur = 'Walmart';
    return it;
  }

  // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
  // private handleError<T>(
  //   request: string,
  //   result?: T
  // ): (error: Error) => Observable<T> {
  //   return (error: Error): Observable<T> => {
  //     return of(result as T);
  //   };
  // }
}
