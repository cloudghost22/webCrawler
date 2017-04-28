/**
 * Created by lwy on 2017-04-17.
 */

let superagent = require('superagent');
let chareset = require('superagent-charset');
let cheerio = require('cheerio');
let q = require('q');
let sleepTime = require('sleep-time');

let mainUrl = 'http://www.6vhao.com/';
//###########http header#########
let options = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, sdch',
    'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.6,en;q=0.4',
    'Connection': 'keep-alive',
    'Host': 'www.6vhao.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
};

let getLinkTasks = function (url) {
    let deferred = q.defer();
    let links = [];
    links.push(url);
    getTotalPage(url)
        .then((total) => {
            "use strict";
            for (let i=2;i<=total;i++){
                links.push(`${url}index_${i}.html`);
            }
            console.log(links);
            deferred.resolve(links);
        })
        .catch(err=>console.log(err));
    return deferred.promise;
};

let getPageLinkTasks = function (url) {
    let deferred = q.defer();
    let pageLinks = [];
    chareset(superagent);
    superagent
        .get(url)
        .charset('gb2312')
        .set(options)
        .end((err, res) => {
            "use strict";
            if (err) deferred.reject(err);
            let $ = cheerio.load(res.text);
            // console.log(res.text);
            $('.list li').each((i,ele)=>{
               // console.log($(ele).children().length);
               pageLinks[i] = $(ele).children().eq(1).attr('href');
            });
            // console.log($('.list li').nextAll());
            deferred.resolve(pageLinks);
        });
    return deferred.promise;
};

let getBaidu = function (url) {
    let deferred = q.defer();
    chareset(superagent);
    superagent
        .get(url)
        .charset('gb2312')
        .set(options)
        .end((err,res)=>{
        "use strict";
            if (err) deferred.reject(err);
            let $ = cheerio.load(res.text);
            // console.log(res);
            // console.log($('table').eq(0).find('td'));
            $('table').eq(0).find('td').each((i,ele)=>{
                if($(ele).find('a').attr('href').indexOf('baidu') > 0){
                    console.log($(ele).find('a').attr('href'));
                    let txt = $(ele).text();
                    console.log(txt.substr(txt.indexOf('密码：')+3,4));
                }
            });
            deferred.resolve($('table').eq(0).children().length);
        });
    return deferred.promise;
};

let getTotalPage = function (url) {
    let deferred = q.defer();
    chareset(superagent);
    superagent
        .get(url)
        .charset('gb2312')
        .set(options)
        .end((err, res) => {
            "use strict";
            if (err) deferred.reject(err);
            let $ = cheerio.load(res.text);
            deferred.resolve($('.listpage b').eq(0).text().split('/')[1]);
        });
    return deferred.promise;
};


module.exports.getLinkTasks = getLinkTasks;
module.exports.getPageLinkTasks = getPageLinkTasks;
module.exports.getBaidu = getBaidu;