const { urlencoded } = require("express");
var express=require("express");
const path = require('path');
var mysql=require("mysql");
var app=express();
app.listen(2006,function()
{
    console.log("server started");
})
var dbCtrlfigKuch=
{
    host:"localhost",
    user:"root",
    password:"",
    database:"internproject"
}

var dbCtrl=mysql.createConnection(dbCtrlfigKuch);
dbCtrl.connect(function(err)
{
    if(err)
        console.log(err);
        else
        console.log("** Connnecccttteeddddd.....");
})

app.use(express.static("public"));
//url. hand.
app.get("/",function(req,resp)
{
    resp.sendFile(__dirname+"/public/index2.html");
})
app.use(express.urlencoded({'extended':true}));

app.get("/doSearching",function(req,resp)
{
    var datAry1 = [req.query.options];
    dbCtrl.query("select * from intern where options=?",datAry1,function(err,result){
        if(err)
            resp.send(err);
        else
            resp.send(result);
    })
});
app.get("/dofetchoptions",function(req,resp)
{
    dbCtrl.query("select distinct options from intern",function(err,result){
        if(err)
            resp.send(err);
        else
            resp.send(result);
    })
})
