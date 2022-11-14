import { injectable } from "inversify";
import { Planrepas } from "../../../common/tables/planrepas.module"
import * as pg from "pg";
import "reflect-metadata";

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "admin",
    database: "TP4_Livraison",
    password: "admin",
    port: 5432,          // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "127.0.0.1",
    keepAlive: true
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  public async getTable(tablename: String): Promise<pg.QueryResult>{
    const client = await this.pool.connect();
    const queryText = `SELECT * FROM ${tablename};`;
    const res = await client.query(queryText);
    client.release();
    return res;
  };

  public async getPlanrepasById( id:string): Promise<pg.QueryResult>{
    const client = await this.pool.connect();
    const queryText = `SELECT * FROM planrepas WHERE numeroplan = ${id};`;
    const res = await client.query(queryText);
    client.release();
    return res;
  };
  public async getFournisseurById(id:string): Promise<pg.QueryResult>{
    const client = await this.pool.connect();
    const queryText = `SELECT * FROM fournisseur WHERE numerofournisseur = ${id};`;
    const res = await client.query(queryText);
    client.release();
    return res;
  };


  public async deletePlanrepas(numeroplan: String) {
    if (numeroplan.length === 0) throw new Error("Invalid delete query");
    const client = await this.pool.connect();
    const query = `DELETE FROM planrepas WHERE numeroplan = ${numeroplan};`;

    // erreur dans le query a revoir
    const res = await client.query(query);
    client.release();
    return res;
  }

  public async createPlanrepas(planrepasValues: {}) {
    let thisPlan = new Planrepas(planrepasValues)
    if (!thisPlan.isValid()) throw new Error("Invalid Planrepas query");
    const client = await this.pool.connect();
    // the error here is: numplanrepas n'est pas initier dans le client  
    // normalement c'est le serveur qui determine le id 
    // a trouver la logic plus tard
    const queryText: string = `INSERT INTO planrepas VALUES($1, $2, $3, $4, $5, $6, $7);`;

    const res = await client.query(queryText, thisPlan.getValues());
    client.release();
    return res;
  }

  public async updatePlanrepas(planrepasValues: {}) {
    let thisPlan = new Planrepas(planrepasValues)
    if ( !thisPlan.isValid() ) throw new Error(`This PlanRepas n est pas valide`);
    const client = await this.pool.connect();
    const queryText: string = `update planrepas SET categorie = $2, frequence = $3, nbrpersonnes = $4, nbrcalories = $5, prix = $6, numerofournisseur = $7 WHERE numeroplan = $1`;
    const res = await client.query(queryText, thisPlan.getValues());
    client.release();
    return res;
  }

}


