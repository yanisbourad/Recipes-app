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
  router.post("/planrepas/", (req, res) =>{
   
    this.databaseService.createPlanrepas(req.body).then((result: pg.QueryResult) =>{
        res.json(result.rows);
    }) .catch((e:Error) => {
        console.error(e.stack);
        res.json("probleme rencontré avec POST").status(400);
    })
  })

  // example: http://localhost:3000/database/Planrepas/1
  router.delete("/planrepas/:numeroplan", (req,res) =>{
      const numplan = req.params.numeroplan;
      this.databaseService.deletePlanrepas(numplan).then(
          (result) => {
              res.json(result.rowCount);
          }) .catch((e) =>{
              console.error(e.stack);
          res.json("probleme rencontré avec DELETE").status(400);
          })
  })
  return router;
};
};