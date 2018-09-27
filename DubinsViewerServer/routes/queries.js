"use strict";

var express = require('express');
var router = express.Router();
var HttpError = require('http-error-constructor');

var connectedIPC = require('../ipc/ipc').getConnectedIPC();

let store = require('../store/store');


/* POST database query. */
router.post('/', function (req, res, next) {
    let type = req.body.type;
    let result;

    switch (type) {
        case 'GET_LAST_POSITION':
            result = store.getPosition();
            res.json(result);
            break;
        case 'GET_CIRCLE_STATE':
            result = store.getCircleData();
            res.json(result);
            break;
        case 'GET_DUBINS_PATH':
            result = store.getDubinsPath();
            res.json(result);
            break;
        case 'GET_ELF_POSITION':
            result = store.getElfPosition();
            res.json(result);
            break;
        case 'GET_PATH_TRACKING_STATS':
            result = store.getpathTrackingStats();
            res.json(result);
            break;
        case 'GET_DUBINS_PATH_BLOWN':
            result = store.getDubinsPathBlown();
            res.json(result);
            break;
        //TODO
        // connectedIPC.emit('GET_POSITION', req.body.data)
        //     .then( result => {
        //         res.json(result);
        //     })
        //     .catch( error => {
        //         console.log(error);
        //         throw new HttpError(400, 'illegal request:', error);
        //     });
        // let getRandomFloat = (min, max) => {
        //     return Math.random() * (max - min) + min;
        // };
        //
        // result = {latitude:48.116667+getRandomFloat(-0.1, 0.1),
        //     longitude:11.7333  +getRandomFloat(-0.1, 0.1),  // that's around Haar
        //     altitude: 100+getRandomFloat(-50, 50),
        //     heading: getRandomFloat(0, 360),
        //     valid: false,
        // };
        // res.json(result);
        // break;
        default:
            console.log("cannot understand request: ", req.body);
            throw new HttpError(400, 'illegal request:', req.body);
    }

});

module.exports = router;
