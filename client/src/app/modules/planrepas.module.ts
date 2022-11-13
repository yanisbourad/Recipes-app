export class Planrepas {
    numeroplan?: number;
    categorie= '';
    frequence: number;
    nbrpersonnes: number;
    nbrcalories: number;
    prix: number;
    numerofournisseur: number;
}
//  numeroplan			INTEGER		NOT NULL,
// 	categorie			VARCHAR(30)	NOT NULL,
// 	frequence			INTEGER		NOT NULL CHECK (frequence > 0),
// 	nbrpersonnes		INTEGER		NOT NULL CHECK ( nbrpersonnes > 0),
// 	nbrcalories			INTEGER		NOT NULL CHECK ( nbrcalories > 0),
// 	prix				INTEGER		NOT NULL CHECK ( prix > 0),
// 	numerofournisseur	INTEGER		NOT NULL,
// 	PRIMARY KEY (numeroplan),
// 	FOREIGN KEY (numerofournisseur) REFERENCES Fournisseur(numerofournisseur)