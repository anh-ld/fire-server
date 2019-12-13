const { db } = require('./initialize')
const fs = require('fs')
const csv = require('csv-parser')
const path = require('path')
const nanoid = require('nanoid')

let data = []

const sendDataToFirestore = (data) => {
    data = data.slice(0, 20) // only populate 20 items --- due to firestore usage limitation: 50k reads / day

    const promises = data.map(async (row) => {
        const id = nanoid(10)
        row.ID = id
        const doc = Object.assign({}, row)
        await db.collection('nba_salary').doc(id).set(doc)
    })

    Promise.all(promises)
        .then(() => console.log('CSV file successfully uploaded.'))
        .catch(e => console.warn(e))
}

fs.createReadStream(path.resolve(__dirname, 'nba_salary.csv'))
    .pipe(csv())
    .on('data', (row) => {
        data = [...data, row]
    })
    .on('end', () => {
        console.log('CSV file successfully processed.')
        sendDataToFirestore(data)
    })