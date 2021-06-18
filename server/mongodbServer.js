const config = require('../config');
var MongoClient = require('mongodb').MongoClient;
console.log(config)

function MyApi() {
    this.queryItems = function (params, callback) {
            MongoClient.connect(config.mongoUrl, {
                useNewUrlParser: true
            }, function (err, db) {
                if (err) throw err;
                var dbo = db.db("runoob");
                dbo.collection("site").find(params).toArray(function (err, result) { // 返回集合中所有数据
                    if (err) throw err;
                    callback(result);
                    db.close();
                });
            });
        },
        this.addItem = function (params, callback) {
            MongoClient.connect(config.mongoUrl, {
                useNewUrlParser: true
            }, function (err, db) {
                if (err) throw err;
                var dbo = db.db("runoob");
                console.log(params);
                dbo.collection("site").insertOne({
                    ...params,
                    uuid:new Date().getTime()+''
                }, function (err, res) {
                    if (err) throw err;
                    callback(res);
                    console.log("文档插入成功");
                    db.close();
                });
            });
        },
        this.deleteItem = function (params, callback) {
            MongoClient.connect(config.mongoUrl, {
                useNewUrlParser: true
            }, function (err, db) {
                if (err) throw err;
                var dbo = db.db("runoob");
                console.log(params);
                dbo.collection("site").deleteOne(params, function (err, res) {
                    if (err) throw err;
                    callback();
                    console.log("文档删除成功");
                    db.close();
                });
            });
        },
        this.updateItem = function (params, callback) {
            MongoClient.connect(config.mongoUrl, {
                useNewUrlParser: true
            }, function (err, db) {
                if (err) throw err;
                var dbo = db.db("runoob");
                var whereStr = {
                    "uuid": params.uuid
                };
                let updateObj = {...params};
                delete(updateObj.uuid);
                var updateStr = {$set: updateObj};
                dbo.collection("site").updateOne(whereStr, updateStr, function (err, res) {
                    if (err) throw err;
                    callback(res);
                    console.log("文档修改成功");
                    db.close();
                });
            });
        }
}

module.exports = MyApi

// 查看 https://www.runoob.com/nodejs/nodejs-mongodb.html