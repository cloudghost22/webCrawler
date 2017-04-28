/**
 * Created by lwy on 2017-04-17.
 */

/*let getLinkTasks = require('./6vhao/6vhao').getLinkTasks;
let getPageLinkTasks = require('./6vhao/6vhao').getPageLinkTasks;
let getBaidu = require('./6vhao/6vhao').getBaidu;*/

// getLinkTasks('http://www.6vhao.com/dy/');
/*
getPageLinkTasks('http://www.6vhao.com/dy/').then((res)=>{
    "use strict";
    console.log(res);
});*/

/*
getBaidu('http://www.6vhao.com/dy/2017-04-14/JGL3SSYZ.html').then((res)=>{
    "use strict";
    // console.log(res);
});*/

let getTasks = require('./57fx/57fx.js').getTasks;
let getMessage = require('./57fx/57fx.js').getMessage;
let saveUser = require('./DB/save').saveUser;
let async = require('async');
let sleeptime = require('sleep-time');

// console.log(getTasks('share'));
/*
getMessage('http://www.57fx.com/user-drfans-daren-2/')
.then((data)=>{
    // console.log(data);
    saveUser(data);
});*/
// let shareTasks = getTasks('share');
let fansTasks = getTasks('new');
let followTasks = getTasks('update');
let allTaks = [...fansTasks,...followTasks];

async.mapLimit(allTaks,1,(url,callback)=>{
    console.log(url);
    sleeptime(500 + Math.round(Math.random() * 1500));
    getMessage(url).then((data)=>{
        saveUser(data);
        callback(null,null);
    })
},(err,results)=>{
    if(err) throw err;
});