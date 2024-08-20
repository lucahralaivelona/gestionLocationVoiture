const Utilisateur = require("../model/utilisateur");
const bcrypt = require("bcryptjs");
const client = require("../bd/connect");

const jwt = require("jsonwebtoken");
const register = async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
      if (err) {
        res.json({
          message: "Une erreur",
        });
      }
      let user = new Utilisateur({
        nom: req.body.nom,
        // adresse: req.body.adresse,
        tel: req.body.tel,
        mail: req.body.mail,
        password: hashedPass,
      });

      let result = client.bd().collection("utilisateur").insertOne(user);
      res.status(200).json({ msg: "ajout réussie" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
    try {
        var nomUtilisateur = req.body.nomUtilisateur
        var password = req.body.password
        let cursor = client.bd().collection("utilisateur").find({ $or: [{ tel: nomUtilisateur }, { mail: nomUtilisateur }] });
        let userFind = await cursor.toArray();
        
        if (userFind.length > 0) { // Vérifier si un utilisateur a été trouvé
            bcrypt.compare(password, userFind[0].password, function (err, result) {
                if (result) {
                    // Playload: informations de l'utilisateur
                    let payload = {
                        id: userFind[0]._id, // Inclure l'ID de l'utilisateur
                        nom: userFind[0].nom,
                        // Ajoutez d'autres informations de l'utilisateur si nécessaire
                    };
                    let token = jwt.sign(payload, 'AzQ,PI)0(', { expiresIn: '1h' });
                    let refreshToken = jwt.sign(payload, 'refreshTokensecret', { expiresIn: '72h' });

                    return res.status(200).json({
                        message: 'Connexion établie !', 
                        token: token,
                        refreshToken: refreshToken,
                        userId: userFind[0]._id // Ajoutez l'ID de l'utilisateur à la réponse
                    });
                } else {
                    res.status(201).json({
                        message: 'Mot de passe incorrect !'
                    });
                }
            });
        } else {
            res.status(203).json({
                message: "Aucun utilisateur trouvé !"
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const refreshToken = (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    console.log(refreshToken);
    jwt.verify(refreshToken, "refreshTokensecret", function (err, decode) {
      if (err) {
        console.log(err);
        // res.status(203).json({
        //     err
        // })
      } else {
        let token = jwt.sign({ name: decode.name }, "AzQ,PI)0(", {
          expiresIn: "72h",
        });
        let refreshToken = req.body.refreshToken;
        return res.status(200).json({
          message: "Token actualisé avec succès !",
          token: token,
          refreshToken: refreshToken,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { register, login, refreshToken };
