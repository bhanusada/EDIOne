'use strict';

// Require process, so we can mock environment variables
const process = require('process');
const express = require('express');
const router = express.Router();
const db = require('../db/connector');
const vanbacklogs = require('./vanbacklogs');

//db.connect();

router.get('/po', (req, res, next) => {
    /*db.po()
        .then( result => {
            res.json(result);
        })
    ;*/
    res.json(
        [{"crt_ts":"2018-09-23T19:11:28.963Z","type":"PO","sub_type":"SPECIAL","count":10},{"crt_ts":"2018-09-24T19:56:44.288Z","type":"PO","sub_type":"SPECIAL","count":10},{"crt_ts":"2018-09-24T19:56:44.327Z","type":"PO","sub_type":"EFI","count":25},{"crt_ts":"2018-09-24T19:56:44.366Z","type":"PO","sub_type":"OFR","count":5},{"crt_ts":"2018-09-24T19:56:47.610Z","type":"PO","sub_type":"HDCOM","count":30},{"crt_ts":"2018-09-24T19:58:15.457Z","type":"PO","sub_type":"SPECIAL","count":30},{"crt_ts":"2018-09-24T19:58:15.497Z","type":"PO","sub_type":"EFI","count":50},{"crt_ts":"2018-09-24T19:58:15.536Z","type":"PO","sub_type":"OFR","count":15},{"crt_ts":"2018-09-24T19:58:15.576Z","type":"PO","sub_type":"HDCOM","count":40},{"crt_ts":"2018-09-24T19:59:18.789Z","type":"PO","sub_type":"SPECIAL","count":20},{"crt_ts":"2018-09-24T19:59:18.828Z","type":"PO","sub_type":"EFI","count":40},{"crt_ts":"2018-09-24T19:59:18.867Z","type":"PO","sub_type":"OFR","count":10},{"crt_ts":"2018-09-24T19:59:20.565Z","type":"PO","sub_type":"HDCOM","count":35}]
    );
})


module.exports = router;
