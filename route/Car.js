// const express = require('express');
// const {getCar, getCarMarque, getCarModel, modifierCar, supprimerCar} = require("../controller/Car");
// const upload = require("../middleware/upload");
// const carController = require("../controller/Car")

// const authentification = require('../middleware/authentification')
// const car = require("../controller/Car")

// const router = express.Router();

// // router.route("/Car", upload.single('img')).post(ajouterCar);
// router.post("/Car", upload.fields([{ name: 'img'},{ name: 'imgC'},{ name: 'img1'},{ name: 'img2'},{ name: 'img3'}]), carController.ajouterCar);
// router.get("/Car", authentification.authentification, car.getTousCar);
// router.route("/Car/:id" ).get(authentification.authentification, getCar);
// router.route("/Car/model/:model" ).get(authentification.authentification, getCarModel);
// router.route("/Car/marque/:marque" ).get(authentification.authentification, getCarMarque);
// router.route("/Car/:id").put(authentification.authentification, modifierCar);
// router.route("/Car/:id").delete(authentification.authentification, supprimerCar);

// module.exports = router;
const express = require("express");
const {
  getCar,
  getCarMarque,
  getCarModel,
  modifierCar,
  supprimerCar,
} = require("../controller/Car");
const upload = require("../middleware/upload");
const carController = require("../controller/Car");

const authentification = require("../middleware/authentification");
const car = require("../controller/Car");

const router = express.Router();

// router.route("/Car", upload.single('img')).post(ajouterCar);
router.post(
  "/Car",
  upload.fields([
    { name: "img" },
    { name: "imgC" },
    { name: "img1" },
    { name: "img2" },
    { name: "img3" },
  ]),
  carController.ajouterCar
);
router.get("/Car", car.getTousCar);
router.route("/Car/:id").get(getCar);
router.route("/Car/model/:model").get(getCarModel);
router.route("/Car/marque/:marque").get(getCarMarque);
router.route("/Car/:id").put(modifierCar);
router.route("/Car/:id").delete(supprimerCar);

module.exports = router;
