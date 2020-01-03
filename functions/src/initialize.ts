import * as admin from 'firebase-admin'
import path from 'path'

admin.initializeApp({
    credential: admin.credential.cert(path.resolve(__dirname, 'key.json')),
    databaseURL: "https://firecast-9b264.firebaseio.com"
})

export const db = admin.firestore()