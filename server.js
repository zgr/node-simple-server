var express=require('express');
var app =express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var ServerFun = require('./myServer.js');
var sv = new ServerFun();
//设置跨域访问
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   next();
});

//写个接口123
app.get('/getItems',function(req,res){
    let params = req.query;
    sv.queryItems(params,function(r){
        res.status(200),
        res.json(r)
    })
});
app.post('/insertItem',function(req,res){
    let params = req.body;
    console.log(params)
    sv.addItem(params,function(){
        res.status(200),
        res.json({
            code:"200",
            msg:"成功"
        })
    })
});
//配置服务端口
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port)
})