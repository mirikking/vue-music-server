const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const dp = require('../src/music/dataParser')

const app = express();

app.use(cors())

dp.getSongsObject().then((result) => {
    app.get('/api/graphql', (req, res) => {
        res.status('200').json(result)
    })
})

dp.getSongsObject().then((result) => {
    result.forEach(element => {
        element = encodeURI(element)
        app.get(`/api/${element.name}`, (req, res) => {
            let readStream = fs.createReadStream(element.path);
            res.status('200')
            readStream.pipe(res);
        })
    })
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`)
})
