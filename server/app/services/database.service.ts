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

  // get_${req.params.tablename}_ByPrimeryKey
  // the issue is i dont know the names of the id columne
  // if we could do a where serche without knowing the name of the colmne => getElementById(id)
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

    const res = await client.query(query);
    client.release();
    return res;
  }

  public async createPlanrepas(planrepas: Planrepas) {
    
    if (planrepas.getInvalidité() != '') throw new Error("Invalid Planrepas query");

    const client = await this.pool.connect();
    
    const queryText: string = `INSERT INTO planrepas VALUES($1, $2, $3, $4, $5, $6, $7);`;

    const res = await client.query(queryText, planrepas.getValues());
    client.release();
    return res;
  }
}
