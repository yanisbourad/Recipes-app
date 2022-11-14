import { Router, Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { inject, injectable } from "inversify";
//import pg = require("pg-promise/typescript/pg-subset");
import * as pg from "pg";
import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
  public constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();
    // example: http://localhost:3000/database/tables/planrepas/
    router.get("/tables/:tablename", (req: Request, res: Response, _: NextFunction) =>{
      let tablename = req.params.tablename
      if (tablename !='planrepas' && tablename !='fournisseur' ) 
      {
        console.error(new Error('Non autorised')); 
        console.log("erreur");
      }
      this.databaseService.getTable(tablename)
      .then((result: pg.QueryResult) =>{
          res.json(result.rows);
      })
      .catch((e: Error) => {
          console.error(e.stack);
          console.log("erreur");
      })
    })

    router.get("/tables/planrepas/:id", (req: Request, res: Response, _: NextFunction) =>{
      this.databaseService.getPlanrepasById(req.params.id)
      .then((result: pg.QueryResult) =>{
        res.json(result.rows);
      })
      .catch((e: Error) => {
          console.error(e.stack);
          console.log("erreur");
      })
    })
    router.get("/tables/fournisseur/:id", (req: Request, res: Response, _: NextFunction) =>{
      this.databaseService.getFournisseurById(req.params.id)
      .then((result: pg.QueryResult) =>{
        res.json(result.rows);
      })
      .catch((e: Error) => {
          console.error(e.stack);
          console.log("erreur");
      })
    })
 
    //example: http://localhost:3000/database/Planrepas/
    router.post("/planrepas/create", (req: Request, res: Response, _: NextFunction) =>{
      this.databaseService.createPlanrepas(req.body).then((result: pg.QueryResult) =>{
        res.json(result).status(200);
      }) .catch((e:Error) => {
        console.error(e.stack);
        res.json("probleme rencontré avec POST").status(400);
      })
    })

    router.post("/planrepas/update",(req: Request, res: Response, _: NextFunction) =>{
      this.databaseService.updatePlanrepas(req.body).then((result: pg.QueryResult) =>{
        res.json('true').status(200);
      }) .catch((e:Error) => {
          console.error(e.stack);
          res.json("probleme rencontré avec POST"+ e.message).status(400);
      })
    })

      // example: http://localhost:3000/database/Planrepas/1 pas encore fonctionnel
    router.delete("/planrepas/:numeroplan", (req: Request, res: Response, _: NextFunction) =>{
      this.databaseService.deletePlanrepas(req.params.numeroplan).then(
        (result: pg.QueryResult) => {
            res.json('true').status(200);
          }) .catch((e: Error) =>{
            console.error(e.stack);
          res.json("probleme rencontré avec DELETE").status(400);
          })
  })

  // router.get("planrepas/", (req, res) =>{
  //     const numeroplan = req.query.numeroplan ? req.query.numeroplan : "";
  //     const categorie = req.query.categorie ? req.query.categorie : "";
  //     const frequence = req.query.frequence ? req.query.frequence : "";
  //     const nbrpersonnes = req.query.nbrpersonnes ? req.query.nbrpersonnes : "";
  //     const nbrcalories = req.query.nbrcalories ? req.query.nbrcalories : "";
  //     const prix = req.query.prix ? req.query.prix : "";
  //     const numerofournisseur = req.query.numerofournisseur ? req.query.numerofournisseur : "";

  //     this.databaseService.filterPlanrepas(numeroplan,categorie,frequence,nbrpersonnes
  //         , nbrcalories, prix, numerofournisseur).then((result) =>{
  //             const planrepas = result.rows.map((room) => ({
                  
  //             }));
  //             res.json(planrepas);
  //         })
  // });
  // example: http://localhost:3000/database/Planrepas/
  // router.post("/planrepas/", (req, res) =>{
  //     console.log("ça marche");
  //     const planrepas = {
  //         numeroplan: req.body.numeroplan,
  //         categorie: req.body.categorie,
  //         frequence: req.body.frequence,
  //         nbrpersonnes: req.body.nbrpersonnes,
  //         nbrcalories: req.body.nbrcalories,
  //         prix: req.body.prix,
  //         numerofournisseur: req.body.numerofournisseur
  //     };
  //     this.databaseService.createPlanrepas(planrepas).then((result) =>{
  //         res.json(result.rowCount);
  //     }) .catch((e) => {
  //         console.error(e.stack);
  //         res.json("probleme rencontré avec POST").status(400);
  //     })
  // })

  return router;
};
};
