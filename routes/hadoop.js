var express = require('express');
var router = express.Router();
var request = require("request");
var fs = require("fs");
var http = require('http');
var url = require('url');
/* GET users listing. */

var baseUrl = "http://10.19.248.20:8088";

router.get('/', function(req, res, next) {

  var options = url.parse("http://10.19.248.20:8088/cluster/nodes");
  options.method = "get";
  var result = "";
  var htmlReq = http.request(options,(response)=>{
        console.log('STATUS'+response.statusCode);
        response.on('data',(chunk)=>{
            result += chunk;
        });
        response.on('end',()=>{
            // console.log(result);
            var reg = /\/\/datanode\d{1,}\:/g;
            var m = result.toString().replace(reg,function(word){
                return '/datanode/'+word.match(/\d{1,}/)[0]+'/';
            });
            var reg = /href\=\"\/\w[^static]/g;
            var n = m.replace(reg,function(word){
                return word.slice(0,6)+'/hadoop/'+word.slice(7);
            })
            res.send(n);
            console.log('Data End');

        });
    });
  htmlReq.end();
});

router.get('/*', function(req, res, next) {
  var options = url.parse("http://10.19.248.20:8088"+req.originalUrl.slice(7));
  options.method = "get";
  var result = "";
  var htmlReq = http.request(options,(response)=>{
        console.log('STATUS'+response.statusCode);
        response.on('data',(chunk)=>{
            result += chunk;
        });
        response.on('end',()=>{
            fs.writeFile('./a.text',result,function(err){
               if(err) throw err;
               console.log('has finished');              
            });
            // console.log(result);
            var reg = /\/\/datanode\d{1,}\:/g;
            var m = result.toString().replace(reg,function(word){
                return '/datanode/'+word.match(/\d{1,}/)[0]+'/';
            });
            var reg = /href\=\"\/\w[^static]/g;
            var n = m.replace(reg,function(word){
                return word.slice(0,6)+'/hadoop/'+word.slice(7);
            })
            res.send(n);
            console.log('Data End');

        });
    });
  htmlReq.end();
});
 
router.get('/datanode/*', function(req, res, next) {
  // console.log(req);
  //req.pipe(request(url)).pipe(res);
  res.send(req.originalUrl);

});

module.exports = router;
