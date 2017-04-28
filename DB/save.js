/**
 * Created by lwy on 2017-04-17.
 */

let mysql = require("mysql");
let dbConfig = require("../package.json").mysql;
let q = require('q');

let pool = mysql.createPool(dbConfig);

let saveUser = function (data) {
    let deferred = q.defer();
    let saveSql = 'insert into otherUsers(uk,userName,followCount,fansCount,pubShareCount) values';
    let updateStr = '';
    for (let i of data) {
        let temp = '\'' + i.uk + '\',\'' + (i.username.replace(/\'/g, '').replace(/\\/g, '')).substr(0, 255) + '\',\'' + i.followCount + '\',\'' + i.fansCount + '\',\'' + i.shareCount + '\'';
        temp = '(' + temp + ')';
        if (updateStr) {
            updateStr += ',' + temp;
        } else {
            updateStr += temp;
        }
    }
    saveSql += updateStr + ';';
    pool.getConnection((err, conn) => {
        "use strict";
        conn.release();
        if (err) deferred.reject(err);
        conn.query(saveSql, (err, result) => {
            if (err) throw err;
            deferred.resolve(result.affectedRows);
        });
    });
    return deferred.promise;
};

module.exports.saveUser = saveUser;