// const express = require("express");
// const { connecter } = require("./bd/connect");
// const routesUser = require("./route/User");
// const routesCar = require("./route/Car");
// const routesRented = require("./route/Rented");
// const routesReservation = require("./route/Reservation");
// const AuthRoute = require("./route/auth");

// //
// // const cors = require('cors');
// //
// const app = express();

// // endpoint ou point de terminaison
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// //
// // app.use(cors())
// //

// app.use("/api/v1", routesUser);
// app.use("/api/v1", routesCar);
// app.use("/api/v1", routesRented);
// app.use("/api/v1", routesReservation);
// app.use("/api/v1", AuthRoute);
// connecter("mongodb+srv://lucahralaivelona:KrXf2ex5tkqkMJBM@cluster0.ktqodzn.mongodb.net/", (erreur) => {
//   if (erreur) {
//     console.log("erreur lors de la connexion avec la base de données");
//     process.exit(-1);
//     app.listen(3000);
//     console.log("connection fait et attente de la requette au port 3000");
//   } else {
//     console.log("connexion réussie");
//   }
// });
// app.listen(3000, "0.0.0.0", () => {
//   console.log(`Server is running on http://0.0.0.0:3000`);
// });
const express = require("express");
const { connecter } = require("./bd/connect");
const routesUser = require("./route/User");
const routesCar = require("./route/Car");
const routesRented = require("./route/Rented");
const routesReservation = require("./route/Reservation");
const AuthRoute = require("./route/auth");
const app = express();
require('dotenv').config(); // Charger les variables d'environnement

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/v1", routesUser);
app.use("/api/v1", routesCar);
app.use("/api/v1", routesRented);
app.use("/api/v1", routesReservation);
app.use("/api/v1", AuthRoute);

const PORT = process.env.PORT || 3000; // Utiliser la variable d'environnement PORT
const MONGO_URI = process.env.MONGO_URI; // Utiliser la variable d'environnement MONGO_URI
// connecter(MONGO_URI, (erreur) => {
//   if (erreur) {
//     console.log("Erreur lors de la connexion avec la base de données");
//     process.exit(-1);
//   } else {
//     console.log("Connexion réussie");
//     app.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`);
//     });
//   }
// });
connecter(MONGO_URI, (erreur) => {
  if (erreur) {
    console.log("erreur lors de la connexion avec la base de données");
    process.exit(-1);
    app.listen(3000);
    console.log("connection fait et attente de la requette au port 3000");
  } else {
    console.log("connexion réussie");
  }
});
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
 });
