const { User } = require("../model/User");
const client = require("../bd/connect");
const { ObjectId } = require("mongodb");

const ajouterUser = async (req, res) => {
  try {
    let user = new User(
      req.body.nom,
      req.body.adresse,
      req.body.tel,
      req.body.mail,
      req.body.password
    );

    let result = await client.bd().collection("utilisateur").insertOne(user);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getTousUsers = async (req, res) => {
  try {
    let cursor = client.bd().collection("utilisateur").find();
    let result = await cursor.toArray();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({ msg: "Aucun uttilisateur trouvé" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUser = async (req, res) => {
  try {
    let id = new ObjectId(req.params.id);
    let cursor = client.bd().collection("utilisateur").find({ _id: id });
    let result = await cursor.toArray();
    if (result.length > 0) {
      res.status(200).json([result]);
    } else {
      res.status(203).json({ msg: "Cet uttilisateur n'existe pas" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const modifierUser = async (req, res) => {
  try {
    let id = new ObjectId(req.params.id);
    let nNom = req.body.nom;
    let nAdress = req.body.adresse;
    let nTel = req.body.tel;
    let nMail = req.body.mail;
    let nPassword = req.body.password;

    let result = await client
      .bd()
      .collection("utilisateur")
      .updateOne(
        { _id: id },
        {
          $set: {
            nom: nNom,
            adresse: nAdress,
            tel: nTel,
            mail: nMail,
            password: nPassword,
          },
        }
      );
    if (result.modifiedCount == 1) {
      res.status(200).json({ msg: "Modification réussie" });
    } else {
      res.status(404).json({ msg: "Cet uttilisateur n'existe pas" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const supprimerUser = async (req, res) => {
  try {
    let id = new ObjectId(req.params.id);

    let result = await client
      .bd()
      .collection("utilisateur")
      .deleteOne({ _id: id });

    if (result.deletedCount == 1) {
      res.status(200).json({ msg: "suppression réussie" });
    } else {
      res.status(404).json({ msg: "Cet utilisateur n'existe plus" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  ajouterUser,
  getTousUsers,
  getUser,
  modifierUser,
  supprimerUser,
};
