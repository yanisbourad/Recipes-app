import { injectable } from "inversify";
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
    
    public async deletePlanrepas(numeroplan: String): Promise<pg.QueryResult> {
      if (numeroplan.length === 0)
          throw new Error("Invalid delete query");
      const client = await this.pool.connect();
      // erreur dans le query a revoir
      const query = `DELETE FROM Planrepas WHERE numeroplan = '${numeroplan}';`;
      const res = await client.query(query);
      client.release();
      return res;
}
}



// createPlanrepas(planrepas) {
//   return __awaiter(this, void 0, void 0, function* () {
//       const client = yield this.pool.connect();
//       if (!planrepas.numeroplan || !planrepas.categorie || !planrepas.frequence || !planrepas.nbrpersonnes ||
//           !planrepas.nbrcalories || !planrepas.prix || !planrepas.numerofournisseur)
//           throw new Error("Invalid create hotel values");
//       const values = [planrepas.numeroplan, planrepas.categorie, planrepas.frequence, planrepas.nbrpersonnes,
//           planrepas.nbrcalories, planrepas.prix, planrepas.numerofournisseur];
//       const queryText = `INSERT INTO TP4_Livraison.Planrepas VALUES($1, $2, $3, $4, $5, $6, $7);`;
//       const res = yield client.query(queryText, values);
//       client.release();
//       return res;
//   });
// }
//}
