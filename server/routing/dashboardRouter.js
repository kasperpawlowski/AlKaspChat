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
            res.json({error: 'Data type error'});
            return;
    }

    promise.then(result => {
        res.json(result);
    }).catch(err => res.json('Database error'));
});

module.exports = router;