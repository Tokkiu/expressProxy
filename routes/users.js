var express = require('express');
var router = express.Router();
var request = require("request");
/* GET users listing. */
router.get('/', function(req, res, next) {
  var url = "http://10.19.248.20:8088/cluster/nodes";
  req.pipe(request(url)).pipe(res);
  // res.send('respond with a resource');

});

module.exports = router;
