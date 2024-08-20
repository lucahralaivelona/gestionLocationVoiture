const express = require('express');
const { ajouterReservation, getTousReservation, getReservation, modifierReservation, supprimerReservation} = require("../controller/Reservation");

const authentification = require('../middleware/authentification')
const router = express.Router();

router.route("/Reservation").post(ajouterReservation);
router.route("/Reservation").get( getTousReservation);
router.route("/Reservation/:id" ).get(getReservation);
router.route("/Reservation/:id").put( modifierReservation);
router.route("/Reservation/:id").delete( supprimerReservation);

module.exports = router;