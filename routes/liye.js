var express = require('express');
var router = express.Router();
var request = require("request");
var fs = require("fs");
var http = require('http');
var url = require('url');
/* GET users listing. */

var baseUrl = "http://10.19.248.20:8088/cluster/nodes";

router.get('/hadoop', function(req, res, next) {

  var options = url.parse("http://10.19.248.20:8088/cluster/nodes");
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
            console.log(result);
            var reg = /\/\/datanode\d{1,}\:/g;
            var m = result.toString().replace(reg,function(word){
                return '//localhost:3000/liye/hadoop/datanode/'+word.match(/\d{1,}/)[0]+'/';
            });
            res.send(m);
            console.log('Data End');

        });
    });
  htmlReq.end();
});

router.get('/hadoop/a', function(req, res, next) {
  var oUrl = req.originalUrl;
  var nUrl = oUrl.slice(12); 
  req.pipe(request(baseUrl + nUrl)).pipe(res);
});
 
router.get('/hadoop/datanode/*', function(req, res, next) {
  // console.log(req);
  //req.pipe(request(url)).pipe(res);
  res.send(req.originalUrl);

});

module.exports = router;
