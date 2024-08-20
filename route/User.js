const express = require('express');
const { ajouterUser, getTousUsers, getUser, modifierUser, supprimerUser} = require("../controller/User");
const router = express.Router();

router.route("/Users").post(ajouterUser);
router.route("/Users").get(getTousUsers);
router.route("/Users/:id" ).get(getUser);
router.route("/Users/:id").put(modifierUser);
router.route("/Users/:id").delete(supprimerUser);

module.exports = router;