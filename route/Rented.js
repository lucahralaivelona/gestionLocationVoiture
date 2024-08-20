const express = require("express");
const {
  ajouterRented,
  getTousRented,
  getRented,
  modifierRented,
  supprimerRented,
  RentedCar,
  UnRentedCar,
} = require("../controller/rented");

const authentification = require("../middleware/authentification");
const router = express.Router();

router.route("/Rented").post(ajouterRented);
router.route("");
router.route("/Rented").get(getTousRented);
router.route("/RentedCar/:id").put(RentedCar);
router.route("/UnRentedCar/:id").put(UnRentedCar);
router.route("/Rented/:id").get(getRented);
router.route("/Rented/:id").put(modifierRented);
router.route("/Rented/:id").delete(supprimerRented);

module.exports = router;
