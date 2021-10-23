const express = require('express');
const mongooseUtil = require('../utils/mongoose');

const router = express.Router();

router.get('/:type', (req, res) => {
    let promise;
    switch(req.params.type) {
        case 'events':
            promise = mongooseUtil.retrieveEvents();
            break;
        case 'history':
            promise = mongooseUtil.retrieveHistory();
            break;
        default:
            res.status(400).end();
            return;
    }

    promise.then(result => {
        res.json(result);
    }).catch(err => res.status(500).end());
});

module.exports = router;