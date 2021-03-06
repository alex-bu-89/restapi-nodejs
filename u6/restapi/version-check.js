/**
 * @author Alexander Buyanov
 * @licence  CC BY-SA 4.0
 *
 * @module restapi/version-check
 * @type {Function}
 */
"use strict";
var logger = require('debug')('me2:version-check');
var codes = require('../restapi/codes');
var router = require('express').Router();

/**
 * The functions checks
 *
 * @param body
 * @param item
 * @return {undefined}
 * @throws Error if requirements not fullfilled.
 */

exports.check = function check(body, item) {

    // get current version of document
    var currentVersion = item['__v'];

    if( body.__v ){

        // check if in req.body only __v
        if(Object.getOwnPropertyNames(body).length == 1){
            throw new Error("You can't edit only __v");
        }

        // check if req.body has __v and __v is equal to document's __v
        if( body.__v !== currentVersion ){
            throw new Error("Versions conflict");
        }

    }

    // increment version
    body.__v = parseInt(item['__v']) + 1;

};