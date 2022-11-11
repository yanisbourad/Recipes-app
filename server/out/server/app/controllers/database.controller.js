"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseController = void 0;
const express_1 = require("express");
const inversify_1 = require("inversify");
const database_service_1 = require("../services/database.service");
const types_1 = require("../types");
let DatabaseController = class DatabaseController {
    constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    databaseService) {
        this.databaseService = databaseService;
    }
    get router() {
        const router = (0, express_1.Router)();
        // example: http://localhost:3000/database/tables/Planrepas/
        router.get("/tables/:tablename", (req, res) =>{
            console.log("ok marche");
            this.databaseService.getTable(req.params.tablename)
            .then((result) =>{
                res.json(result.rows)
            })
            .catch((e) => {
                console.error(e.stack);
                console.log("erreur");
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
        router.post("/planrepas/", (req, res) =>{
            console.log("ça marche");
            const planrepas = {
                numeroplan: req.body.numeroplan,
                categorie: req.body.categorie,
                frequence: req.body.frequence,
                nbrpersonnes: req.body.nbrpersonnes,
                nbrcalories: req.body.nbrcalories,
                prix: req.body.prix,
                numerofournisseur: req.body.numerofournisseur
            };
            this.databaseService.createPlanrepas(planrepas).then((result) =>{
                res.json(result.rowCount);
            }) .catch((e) => {
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

DatabaseController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.default.DatabaseService)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], DatabaseController);
exports.DatabaseController = DatabaseController;
//# sourceMappingURL=database.controller.js.map