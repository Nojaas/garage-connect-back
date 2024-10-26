/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.createRepair = functions.https.onRequest(async (req, res) => {
  const {clientId, vehicleId, description, status} = req.body;

  if (!clientId || !vehicleId || !description || !status) {
    return res.status(400).send("Missing parameters");
  }

  try {
    await admin.firestore().collection("Repairs").add({
      clientId,
      vehicleId,
      description,
      status,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return res.status(201).send("Repair created successfully");
  } catch (error) {
    console.error("Error creating repair:", error);
    return res.status(500).send("Internal Server Error");
  }
});
