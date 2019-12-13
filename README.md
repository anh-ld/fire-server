## Simple REST server using Firestore

[Sample Server](https://us-central1-firecast-9b264.cloudfunctions.net/api/)

### Route

**GET**

    /players

**POST**

    /players
**GET, PUT, DELETE**

    /players/:id

## Populate data to Firestore

 1. Get your **Firebase private key** from 

> *Your Firebase Project* / Settings / Service accounts / Generate new private key

 2. Rename key file to 

> key.json

 3. Move it into this folder

> functions

 4. Run command

>     cd functions
>     npm run populate
