// À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";

import { Fournisseur } from "../../../../common/tables/fournisseur.module";
import { Planrepas } from "../../../../common/tables/planrepas.module";

@Injectable()
export class CommunicationService {
  // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private readonly http: HttpClient) {}

  private _listeners: any = new Subject<any>();

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

  public getPlansRepas() : Observable<Planrepas[]> {
    return this.http
      .get<Planrepas[]>(this.BASE_URL + "/tables/planrepas")
      .pipe(catchError(this.handleError<Planrepas[]>("getPlansRepas")));
  }

  public getPlanRepasById(id: number) : Observable<Planrepas[]> {
    return this.http
      .get<Planrepas[]>(this.BASE_URL + "/tables/planrepas/" + id)
      .pipe(catchError(this.handleError<Planrepas[]>("getPlanRepasById")));
  }
  
  public getFournisseurs(): Observable<Fournisseur[]>{
    return this.http
      .get<Fournisseur[]>(this.BASE_URL + "/tables/fournisseur")
      .pipe(catchError(this.handleError<Fournisseur[]>("getFournisseurs")));
  }

  public createPlanrepas(plan: Planrepas): Observable<number>{
    return this.http
      .post<number>(this.BASE_URL + "/planrepas/create", plan)
      .pipe(catchError(this.handleError<number>("createPlanrepas")));
  } 

  public updatePlanrepas(plan: Planrepas): Observable<number>{
    return this.http
      .post<number>(this.BASE_URL + "/planrepas/update", plan)
      .pipe(catchError(this.handleError<number>("updatePlanrepas")));
  } 

  public deletePlanrepas(numberplan: number): Observable<number> {
    return this.http
      .delete<number>(this.BASE_URL + "/planrepas/" + numberplan, {})
      .pipe(catchError(this.handleError<number>("deletePlanrepas")));
  } 

  public getFournisseurById(id: number): Observable<Fournisseur[]>{
    return this.http
    .get<Fournisseur[]>(this.BASE_URL + "/fournisseur/" + id)
    .pipe(catchError(this.handleError<Fournisseur[]>("getFournisseurById")));
 
  }

  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
