
export class Planrepas {
    numeroplan: number;
    categorie: string;
    frequence: number;
    nbrpersonnes: number;
    nbrcalories: number;
    prix: number;
    numerofournisseur: number;
    public getInvalidité(): string{
            // init erreur messege
        let errors = '';

        // Tests
        if (!this.categorie || this.categorie.length == 0) 
          errors+= 'CATÉGORIE NE DOIT PAS ÊTRE VIDE \n';
        if (!this.prix || this.prix <= 0) 
          errors+= 'LE PRIX DOIT ÊTRE SUPÉRIEUR À 0 \n';
        if (!this.frequence || this.frequence  <= 0) 
          errors+= 'LA FRÉQUENCE DOIT ÊTRE SUPÉRIEUR À 0 \n';
        if (!this.nbrcalories || this.nbrcalories <= 0) 
          errors+= 'LES CALORIES DOIVENT ÊTRE SUPÉRIEUR À 0 \n';
        if (!this.nbrpersonnes || this.nbrpersonnes <= 0) 
          errors+= 'LE NOMBRE DE PERSONNES DOIT ÊTRE SUPÉRIEUR À 0 \n';
        if (this.numerofournisseur === undefined ) {
          errors+= 'VOUS DEVIEZ ASSIGNER UN FOURNISSEUR \n';
          }
          return errors;
    }
    public getValues(): string[]{
      const values: string[] = [
        this.numeroplan.toString(),
        this.categorie,
        this.frequence.toString(),
        this.nbrpersonnes.toString(),
        this.nbrcalories.toString(),
        this.prix.toString(),
        this.numerofournisseur.toString()
      ];
      return values
    }
}   