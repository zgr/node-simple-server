var express=require('express');
var app =express();
//var bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var ServerFun = require('./server/mongodbServer.js');
var sv = new ServerFun();
var fs = require('fs');
//设置跨域访问
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   next();
});

app.get('/',function(req,res){
    let data = fs.readFileSync('./web/index.html');
    res.send(data)
})
//写个接口123
app.get('/getItems',function(req,res){
    let params = req.query;
    sv.queryItems({ status:'1',...params},function(r){
        res.status(200),
        res.json(r)
    })
});
//写个接口123
app.get('/',function(req,res){
    res.status(200),
    res.write('请输入参数')
});

app.post('/insertItem',function(req,res){
    let params = req.body;
    console.log(params)
    sv.addItem({status:'1', ...params},function(){
        res.status(200),
        res.json({
            code:"200",
            msg:"成功"
        })
    })
});

app.post('/deleteItem',function(req,res){ //物理删除
    let params = req.body;
    console.log(params)
    sv.deleteItem(params,function(){
        res.status(200),
        res.json({
            code:"200",
            msg:"成功"
        })
    })
});


app.post('/removeItem',function(req,res){ //逻辑删除
    let params = req.body;
    console.log(params)
    sv.updateItem({uuid:params.uuid, status:'0'},function(){
        res.status(200),
        res.json({
            code:"200",
            msg:"成功"
        })
    })
});

app.post('/updateItem',function(req,res){
    let params = req.body;
    console.log(params)
    sv.updateItem({status:'1', ...params},function(){
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
    console.log('Example app listening at http://127.0.0.1:%s', port)
})