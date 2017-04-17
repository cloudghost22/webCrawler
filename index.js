/**
 * Created by lwy on 2017-04-17.
 */

let getLinkTasks = require('./6vhao/6vhao').getLinkTasks;
let getPageLinkTasks = require('./6vhao/6vhao').getPageLinkTasks;
let getBaidu = require('./6vhao/6vhao').getBaidu;

// getLinkTasks('http://www.6vhao.com/dy/');
/*
getPageLinkTasks('http://www.6vhao.com/dy/').then((res)=>{
    "use strict";
    console.log(res);
});*/

getBaidu('http://www.6vhao.com/dy/2017-04-14/JGL3SSYZ.html').then((res)=>{
    "use strict";
    // console.log(res);
});