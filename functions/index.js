const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const {getPlayers, getPlayer, addPlayer, updatePlayer, deletePlayer, home} = require('./handle')

const app = express()
app.set('view engine', 'pug')
app.use(cors({ origin: true }))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', home)
app.get('/players', getPlayers)
app.get('/players/:id', getPlayer)
app.post('/players', addPlayer)
app.put('/players/:id', updatePlayer)
app.delete('/players/:id', deletePlayer)

exports.api = functions.https.onRequest(app)