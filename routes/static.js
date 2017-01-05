var express = require('express');
var router = express.Router();
var request = require('request');

var baseUrl = "http://10.19.248.20:8088";

router.get("*",function(req,res,next){
    var oUrl = req.originalUrl;
    console.log(oUrl);
    req.pipe(request(baseUrl + oUrl)).pipe(res);
});

module.exports = router;