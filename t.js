var fs = require('fs');
fs.readFile('./a.txt',function(err,data){
 var reg = /\/\/datanode\d{1,}\:/g;
            var m = data.toString().replace(reg,function(word){
                return '//localhost:3000/datanode/'+word.match(/\d{1,}/)[0]+'/';
            });
var reg = /href\=\"\/\w{1,}[^static]/g;
// var reg = /href\=\"\//g;
            var n = m.replace(reg,function(word){
                return word.slice(0,6)+'/hadoop/'+word.slice(7);
            })

    fs.writeFile('./a1.txt',n);
})