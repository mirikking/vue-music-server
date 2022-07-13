const express = require('express');
const path = require('path');
const cors = require('cors');

const dp = require('../src/music/dataParser')

const app = express();

app.use(cors())

dp.getSongsObject().then((result) => {
    app.get('/api/graphql', (req, res) => {
        res.status('200').json(result)
    })
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`)
})
