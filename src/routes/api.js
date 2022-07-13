const express = require('express');
const dp = require('../music/dataParser')

const router = new Router()

dp.getSongsObject().then((res) => {
    console.log('done')
})

router.get('/id:')

module.exports = router;
