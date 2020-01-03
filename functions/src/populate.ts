import {db} from './initialize'
import nanoid from 'nanoid'
import path from 'path'
import fs from 'fs'
import csv from 'csv-parser'

type Row = any
type Data = Array<Row>

let data: Data = []

const sendDataToFirestore = (data: Data) => {
    data = data.slice(0, 20) // only populate 20 items --- due to firestore usage limitation: 50k reads / day

    const promises = data.map(async (row: Row) => {
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
    .on('data', (row: Row) => {
        data = [...data, row]
    })
    .on('end', () => {
        console.log('CSV file successfully processed.')
        sendDataToFirestore(data)
    })