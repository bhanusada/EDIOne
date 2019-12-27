/*jslint node: true */
"use strict";

var express = require('express');
var request = require('request');
var xmlToJson = require('xml2js').parseString;
var router = express.Router();

module.exports = function (server, config) {

    router.post('/ssoLogin', function (req, res) {
        var url = config.ssoUrl + '/thdLogin';
        var data = req.body;

        data.j_password = Buffer.from(data.j_password, 'base64').toString('ascii');
        data.j_password = decodeURIComponent(data.j_password);
        request.post(url, function (error, response, body) {
            var jsonBody, jsonRaw;
            xmlToJson(body, { explicitArray: false, ignoreAttrs: true }, function (err, jsonResult) {
                jsonRaw = jsonResult;
                jsonBody = JSON.stringify(jsonResult);
            });
            res.statusCode = response.statusCode;
            res.statusMessage = response.statusMessage;
            if (response.statusCode === 200) {
                res.setHeader('Set-Cookie', response.headers['set-cookie']);
            } else {
                jsonBody = JSON.stringify(jsonRaw.THDLogin.Error);
            }
            res.end(jsonBody);
        }).form(data);
    });

    router.get('/getUserProfile', function (req, res) {
        var url = config.ssoUrl + '/getUserProfile?callingProgram=' + config.projectInfo.appName;
        var options = {
            url: url,
            headers: {
                'Cookie': req.headers['cookie']
            }
        };

        request.get(options, function (error, response, body) {
            var jsonBody, jsonRaw;
            xmlToJson(body, { explicitArray: false, ignoreAttrs: true }, function (err, jsonResult) {
                jsonRaw = jsonResult;
                jsonBody = JSON.stringify(jsonResult);
            });
            res.statusCode = response.statusCode;
            res.statusMessage = response.statusMessage;
            if (response.statusCode === 200) {
                jsonBody = JSON.stringify(jsonRaw.GetUserProfile.UserProfile);
            }
            res.end(jsonBody);
        });
    });

    router.get('/isSessionValid', function (req, res) {
        var url = config.ssoUrl + '/isSessionValid?callingProgram=' + config.projectInfo.appName;
        var options = {
            url: url,
            headers: {
                'Cookie': req.headers['cookie']
            }
        };

        request.get(options, function (error, response, body) {
            var jsonBody, jsonRaw;
            xmlToJson(body, { explicitArray: false, ignoreAttrs: true }, function (err, jsonResult) {
                jsonRaw = jsonResult;
                jsonBody = JSON.stringify(jsonResult);
            });
            res.statusCode = response.statusCode;
            res.statusMessage = response.statusMessage;
            if (response.statusCode === 200) {
                jsonBody = JSON.stringify(jsonRaw.IsSessionValid);
            }
            res.end(jsonBody);
        });
    });

    server.use(router);

};
