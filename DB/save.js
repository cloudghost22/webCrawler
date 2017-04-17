/**
 * Created by lwy on 2017-04-17.
 */

let mysql = require("mysql");
let dbConfig = require("../package.json").mysql;
let q = require('q');

let pool = mysql.createPool(dbConfig);