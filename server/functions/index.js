const functions = require("firebase-functions");

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

exports.app = functions.https.onRequest(app);
