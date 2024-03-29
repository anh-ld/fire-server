## Simple REST server using Firebase Functions and Firestore

[Sample Server](https://us-central1-fir-as-server.cloudfunctions.net/api/)

### Routes

    GET     /players
    GET     /players?search={search_query}
    GET     /players?sort={player_asc || player_desc || salary_asc || salary_desc}
    POST    /players
    GET     /players/{id}
    PUT     /players/{id}
    DELETE  /players/{id}

## Populate data to Firestore

 1. Get your **Firebase private key** from  *`Your Firebase Project / Settings / Service accounts / Generate new private key`*

 2. Rename it to *`key.json`*

 3. Move it into *`functions/src`*

4. Update database rules at *`Your Firebase Project / Database / Rules`*

```
allow read, write, update, delete: if true;
```

 5. Run commands

```
cd functions
npm run build
npm run populate
```
