const { Car } = require("../model/Car")
const client = require("../bd/connect");
const { ObjectId } = require("mongodb");
const path = require('path')

const ajouterCar = async (req, res)=>{
    try{
        const { model,
                marque,
                type,
                about,
                prix,
                nombreDePlace,
                consommation,
                couleur,
                boiteDeVitesse,
                status,
                note } = req.body;
        let  newCar = {
            model,
            marque,
            type,
            about,
            prix,
            nombreDePlace,
            consommation,
            couleur,
            boiteDeVitesse,
            status,
            note,
            img: req.files['img'][0].path,
            imgC: req.files['imgC'][0].path,
            img1: req.files['img1'][0].path,
            img2: req.files['img2'][0].path,
            img3: req.files['img3'][0].path

        };

        let result = await client.bd().collection("car").insertOne(newCar);
        

        res.status(200).json({
            msg: "Ajout réussi !"
        });

    }catch(error){
        console.log(error);
        res.status(500).json(error);

}
};

const getTousCar = async (req, res) => {
    try {
        let cursor  = client.bd().collection("car" ).find();
        let result = await cursor.toArray();
        if(result.length > 0) {
            res.status(200).json(result);
        }
        else{
            res.status(204).json({msg: "Aucune voiture trouvée"})
        }
        
    } catch (error) {
        console.log(error) ;
        res.status(500).json(error);
    }
};

const getCar = async (req, res) => {
    try {
        let id  = new ObjectId(req.params.id);  
        let cursor  = client.bd().collection("car").find({_id: id});
        let result = await cursor.toArray();
        if(result.length > 0) {
            res.status(200).json([result]);
        }
        else{
            res.status(203).json({msg: "Cette voiture n'existe plus"});
        }
        
    } catch (error) {
        console.log(error) ;
        res.status(500).json(error);
    }
};

const getCarModel = async (req, res) => {
    try {
        let model  = req.params.model;  
        let cursor  = client.bd().collection("car").find({model: model});
        let result = await cursor.toArray();
        if(result.length > 0) {
            res.status(200).json([result]);
        }
        else{
            console.log(error);
            res.status(203).json({msg: "Cette voiture n'existe pas"});
        }
        
    } catch (error) {
        console.log(error) ;
        res.status(500).json(error);
    }
};

const getCarMarque = async (req, res) => {
    try {
        let marque  = req.params.marque;  
        let cursor  = client.bd().collection("car").find({marque: marque});
        let result = await cursor.toArray();
        if(result.length > 0) {
            res.status(200).json([result]);
        }
        else{
            console.log(error);
            res.status(203).json({msg: "Cette voiture n'existe pas"});
        }
        
    } catch (error) {
        console.log(error) ;
        res.status(500).json(error);
    }
};

const modifierCar = async (req, res)=>{
     try {
        let id = new ObjectId(req.params.id);
        let nModel = req.body.model
        let nMarque = req.body.marque
        let nType = req.body.type;
        let nAbout = req.body.about;
        let nPrix = req.body.prix;
        let nNombreDePlace = req.body.nombreDePlace;
        let nConsommation = req.body.consommation;
        let nCouleur = req.body.couleur;
        let nBoiteDeVitesse = req.body.boiteDeVitesse;
        let nStatus = req.body.status;
        let nNote = req.body.note;

        let result = await client.bd().collection("car").updateOne({_id : id}, {$set : {model : nModel, marque : nMarque, type : nType, about : nAbout, prix : nPrix, nombreDePlace : nNombreDePlace, consommation : nConsommation, couleur : nCouleur,boiteDeVitesse : nBoiteDeVitesse, status : nStatus, note: nNote}});
        if(result.modifiedCount==1){
            res.status(200).json({msg : "Modification réussie"});
        }
        else{
            res.status(404).json({msg: "Cette voiture a été modifiée"});
        }
        
     } catch (error) {
        console.log(error) ;
        res.status(500).json(error);
     }
};

const supprimerCar = async (req, res)=>{
    try {
       let id = new ObjectId(req.params.id);

       let result = await client.bd().collection("car").deleteOne({_id : id});

       if(result.deletedCount==1){
        res.status(200).json({msg : "suppression réussie"});
       }
       else{
        res.status(404).json({msg: "Cette voiture n'existe plus"});
       }
       
       
    } catch (error) {
       console.log(error) ;
       res.status(500).json(error);
    }
};

module.exports = {ajouterCar, getTousCar, getCar, getCarModel, getCarMarque, modifierCar, supprimerCar};


