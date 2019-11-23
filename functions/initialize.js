const admin = require('firebase-admin')
const serviceAccount = require("./key.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://firecast-9b264.firebaseio.com"
})

exports.db = admin.firestore()