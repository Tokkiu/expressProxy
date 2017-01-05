var express = require('express');
var router = express.Router();
var request = require('request');

var baseUrl = "http://10.19.248.20:8088";

router.get("*",function(req,res,next){
    var oUrl = req.originalUrl;
    console.log(oUrl);
    var arr = oUrl.split('/');
    console.log(arr[0],arr[1]);
    req.pipe(request(arr[1]+arr[2]+':'+arr[3])).pipe(res);
});

module.exports = router;