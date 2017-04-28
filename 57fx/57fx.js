/**
 * Created by linweiyun on 2017/4/28.
 */
let superagent = require('superagent');
let chareset = require('superagent-charset');
let cheerio = require('cheerio');
let q = require('q');
let sleepTime = require('sleep-time');


//###########http header#########
let options = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, sdch',
    'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.6,en;q=0.4',
    'Connection': 'keep-alive',
    'Host': 'www.57fx.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
};

let getTasks = function (type) {
    //fans,share,attention
  let url = `http://www.57fx.com/user-dr${type}-daren/`;
  let tasksArr = [];
  tasksArr.push(url);
  let tempUrl;
  for(let i=1;i<100;i++){
      tempUrl = `http://www.57fx.com/user-dr${type}-daren-${i}/`;
      tasksArr.push(tempUrl);
  }
  // console.log(tasksArr[99]);
  return tasksArr;
};

let getMessage = function (url) {
    let deferred = q.defer();
    let usersArr = [];
    let userInfo = {};
    //chareset(superagent);

    superagent
        .get(url)
        //.charset('gb2312')
        .set(options)
        .end((err,res)=>{
            "use strict";
            if (err) {
                console.log('error url:' + url);
                deferred.resolve(err);
            }
            let $ = cheerio.load(res.text);
            $('.content_user ul li').each((i,ele)=>{
                userInfo.uk = $(ele).find($('.user-name')).attr('href').split('-')[1].replace('\/','');
                userInfo.username = $(ele).find($('.user-name')).text();
                $(ele).find($('.user-msg a')).each((j,e)=>{
                    if(j==0){
                        userInfo.shareCount = $(e).find('b').text();
                    }else if(j==1){
                        userInfo.followCount = $(e).find('b').text();
                    }else {
                        userInfo.fansCount = $(e).find('b').text();
                    }

                });
                usersArr[i]=userInfo;
                userInfo={};
            });
            // console.log(usersArr);
            deferred.resolve(usersArr);
        });
    return deferred.promise;
};

module.exports.getMessage = getMessage;
module.exports.getTasks = getTasks;