CREATE DATABASE TP4_Livraison;

CREATE TABLE IF NOT EXISTS Client (
	numeroclient		INTEGER		NOT NULL,
	nomclient			VARCHAR(30) NOT NULL,
	prenomnomclient		VARCHAR(30) NOT NULL,
	/* a revoir*/
	adressecourielclient VARCHAR(50) NOT NULL DEFAULT ('xxx@gmail.com'),
	rueclient			VARCHAR(30) NOT NULL,
	villeclient			VARCHAR(30) NOT NULL,
	codepostalclient	VARCHAR(6) NOT NULL,
	PRIMARY KEY (numeroclient)
	);
	
CREATE TABLE IF NOT EXISTS Fournisseur(
	numerofournisseur	INTEGER		NOT NULL,
	nomfournisseur	    VARCHAR(30) NOT NULL,
	adressefournisseur  VARCHAR(50) NOT NULL,
	PRIMARY KEY (numerofournisseur)
);

CREATE TABLE IF NOT EXISTS Ingredient(
	numeroingredient	INTEGER		NOT NULL,
	nomingredient	    VARCHAR(30) NOT NULL,
	paysingredient	    VARCHAR(50) NOT NULL,
	PRIMARY KEY (numeroingredient)
);

CREATE TABLE IF NOT EXISTS Telephone(
	numerodetelephone	VARCHAR(12)		NOT NULL,
	numeroclient		INTEGER		NOT NULL,
	PRIMARY KEY (numerodetelephone, numeroclient),
	FOREIGN KEY (numeroclient) REFERENCES Client(numeroclient)
);

CREATE TABLE IF NOT EXISTS Planrepas(	
	numeroplan			INTEGER		NOT NULL, serial primary key,
	categorie			VARCHAR(30)	NOT NULL,
	frequence			INTEGER		NOT NULL CHECK (frequence > 0),
	nbrpersonnes		INTEGER		NOT NULL CHECK ( nbrpersonnes > 0),
	nbrcalories			INTEGER		NOT NULL CHECK ( nbrcalories > 0),
	prix				INTEGER		NOT NULL CHECK ( prix > 0),
	numerofournisseur	INTEGER		NOT NULL,
	PRIMARY KEY (numeroplan),
	FOREIGN KEY (numerofournisseur) REFERENCES Fournisseur(numerofournisseur)
);

CREATE TABLE IF NOT EXISTS Famille(
	numeroplan			INTEGER		NOT NULL,
	PRIMARY KEY (numeroplan),
	FOREIGN KEY (numeroplan) REFERENCES Planrepas(numeroplan) 
);

CREATE TABLE IF NOT EXISTS Vegetarien(
	numeroplan			INTEGER		NOT NULL,
	typederepas			VARCHAR(30)	NOT NULL,
	PRIMARY KEY (numeroplan),
	FOREIGN KEY (numeroplan) REFERENCES Planrepas(numeroplan) 
);

CREATE TABLE IF NOT EXISTS Pescetarien(
	numeroplan			INTEGER		NOT NULL,
	typepoisson			VARCHAR(30)	NOT NULL,
	PRIMARY KEY (numeroplan),
	FOREIGN KEY (numeroplan) REFERENCES Planrepas(numeroplan) 
);

CREATE TABLE IF NOT EXISTS Rapide(
	numeroplan			INTEGER		NOT NULL,
	tempsdepreparation	TIME		NOT NULL,
	PRIMARY KEY (numeroplan),
	FOREIGN KEY (numeroplan) REFERENCES Famille(numeroplan) 
);

CREATE TABLE IF NOT EXISTS Facile(
	numeroplan			INTEGER		NOT NULL,
	nbringredients		INTEGER		NOT NULL CHECK (nbringredients > 0),
	PRIMARY KEY (numeroplan),
	FOREIGN KEY (numeroplan) REFERENCES Famille(numeroplan) 
);
/* toujours pas creer a revoir time pour la duree int preference*/
CREATE TABLE IF NOT EXISTS Abonner(
	numeroclient		INTEGER		NOT NULL,
	numeroplan			INTEGER		NOT NULL,
	duree				TIME		NOT NULL,
	PRIMARY KEY (numeroclient, numeroplan),
	FOREIGN KEY (numeroclient) REFERENCES Client(numeroclient),
	FOREIGN KEY (numeroplan) REFERENCES Planrepas(numeroplan)
);

CREATE TABLE IF NOT EXISTS Kitrepas (
	numerokitrepas		INTEGER		NOT NULL,
	description			VARCHAR(100) NOT NULL,
	numeroplan			INTEGER		NOT NULL,
	PRIMARY KEY (numerokitrepas),
	FOREIGN KEY (numeroplan) REFERENCES Planrepas(numeroplan)
);

CREATE TABLE IF NOT EXISTS Contenir(
	numerokitrepas		INTEGER		NOT NULL,
	numeroingredient	INTEGER		NOT NULL,
	PRIMARY KEY (numerokitrepas, numeroingredient),
	FOREIGN KEY (numerokitrepas) REFERENCES Kitrepas(numerokitrepas),
	FOREIGN KEY (numeroingredient) REFERENCES Ingredient(numeroingredient)	
);

/* A revoir variable donnees*/
CREATE TABLE IF NOT EXISTS Image(
	numeroimage			INTEGER		NOT NULL,
	donnees				VARCHAR(100)		NOT NULL,
	numerokitrepas		INTEGER		NOT NULL,
	PRIMARY KEY (numeroimage),
	FOREIGN KEY (numerokitrepas) REFERENCES Kitrepas(numerokitrepas)
);

CREATE TABLE IF NOT EXISTS Etape(
	numerokitrepas		INTEGER		NOT NULL,
	descriptionetape	VARCHAR(100) NOT NULL,
	dureeetape			TIME		NOT NULL,
	numerokitrepasetrecompose	INTEGER		NOT NULL,
	PRIMARY KEY (numerokitrepas),
	FOREIGN KEY (numerokitrepas) REFERENCES Kitrepas(numerokitrepas)
);

-- Populate
-- Client START
INSERT INTO Client VALUES (0, 'Bourad', 'Yanis', 'yanisbourad@hotmail.fr',
						   '123 rue polytechnique', 'Montreal', 'H1T2N4');
						   
INSERT INTO Client VALUES (1, 'Berrada', 'Hamza', 'hamzaberrada@hotmail.fr',
						   '124 rue polytechnique', 'Montreal', 'H1T2N3');
SELECT * FROM Client;
-- Client END

-- Fournisseur START
INSERT INTO Fournisseur VALUES (0, 'Costco', '183 rue costco');
INSERT INTO Fournisseur VALUES (1, 'Walmart', '234 rue walmart');
SELECT * FROM Fournisseur;
-- Fournisseur END

--Ingredient START
INSERT INTO Ingredient VALUES (0, 'oeuf', 'Canada');
INSERT INTO Ingredient VALUES (1, 'carotte', 'Perou');
SELECT * FROM Ingredient;
-- Ingredient END

--Telephone START

INSERT INTO Telephone VALUES ('5141234567', 0);
INSERT INTO Telephone VALUES ('4380000000', 1);
SELECT * FROM Telephone;
-- Telephone END

-- Planrepas START
INSERT INTO Planrepas VALUES (0,'halal', 3, 5, 1000, 3, 0);
INSERT INTO Planrepas VALUES (1,'vegetarien', 2, 4, 400, 10, 1);
SELECT * FROM Planrepas;
-- Planrepas END

-- Famille START
INSERT INTO Famille VALUES(0);
INSERT INTO Famille VALUES(1);
SELECT * FROM Famille;
-- Famille END
		
--Vegetarien START
INSERT INTO Vegetarien VALUES(0, 'salade de riz');
INSERT INTO Vegetarien VALUES(1, 'poulet vegetarien');
SELECT * FROM Vegetarien;
--Vegetarien END	

--Pescetarien START
INSERT INTO Pescetarien VALUES(0, 'Saumon');
INSERT INTO Pescetarien VALUES(1, 'sardine');
SELECT * FROM Pescetarien;
--Pescetarien END

--Rapide START
INSERT INTO Rapide VALUES(0, '01:20');
INSERT INTO Rapide VALUES(1, '00:30');
SELECT * FROM Rapide;
--Rapide END	

--Abonner START
INSERT INTO Abonner VALUES(0, 0, '10:00');
INSERT INTO Abonner VALUES(1, 1, '8:00');
SELECT * FROM Abonner;
--Abonner END	

--Kitrepas START
INSERT INTO Kitrepas VALUES(0,'essayez ce kit repas 1' , 0);
INSERT INTO Kitrepas VALUES(1, 'essayez ce kit repas 2', 1);
SELECT * FROM Kitrepas;
--Kitrepas END	   

--Contenir START
INSERT INTO Contenir VALUES(0, 0);
INSERT INTO Contenir VALUES(1, 1);
SELECT * FROM Contenir;
--Contenir END

--Image START
INSERT INTO Image VALUES(0,'donnée image 1', 0);
INSERT INTO Image VALUES(1,'donnée image 2' ,1);
SELECT * FROM Image;
--Image END

--Etape START
INSERT INTO Etape VALUES(0,'battre les oeufs', '00:05', 0);
INSERT INTO Etape VALUES(1,'verser 250ml de lait', '00:02' ,1);
SELECT * FROM Etape;
--Etape END
