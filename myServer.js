var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://47.106.187.58:27017/";
function MyApi(){
    this.queryItems = function(params,callback){
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("runoob");
            dbo.collection("site"). find(params).toArray(function(err, result) { // 返回集合中所有数据
                if (err) throw err;
                callback(result);
                db.close();
            });
        });
    },
    this.addItem = function(params,callback){
        console.log(params)
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("runoob");
            console.log(params);
            dbo.collection("site").insertOne(params, function(err, res) {
                if (err) throw err;
                callback();
                console.log("文档插入成功");
                db.close();
            });
        });
    }
}

module.exports = MyApi
 
