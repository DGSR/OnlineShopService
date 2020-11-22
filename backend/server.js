const  {MongoClient}=require('mongodb');

const http = require ('http');
const  url = require('url');
const urlL = "mongodb://localhost:27017/";
const client =new MongoClient(urlL);

http.createServer(function(req,res){

   console.log(req.method);
   if(req.method==="GET") {
      res.writeHead(200,{
         'Content-Type':'text/json',
         'Access-Control-Allow-Origin': '*'
      });
      let promise;
      console.log(req.url)
      switch (req.url) {
         case "/all":
            promise = new Promise((resolve, _) => {
               resolve(GetAll());
            });
            promise.then(success => {
               res.write(JSON.stringify(success));
               res.end();
            });
            break;
         default:
            res.end();
      }
   }
   else if(req.method==="POST"){
      res.writeHead(200,{
         'Content-Type':'text/json',
         'Access-Control-Allow-Origin': '*'
      });
      if(req.url==="/add") {
         let body = '';
         req.on('data', function (data) {
            body += data;
         });
         req.on('end', function () {
            let d = JSON.parse(body);
            console.log(d)
            let promise = new Promise((resolve, _) => {
               resolve(Add(d));
            });
            promise.then(success => {
               res.write(JSON.stringify(success));
               res.end();
            });
         });
      }

   }
   else if(req.method==="OPTIONS") {
      res.writeHead(200, {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
         'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
         'Access-Control-Max-Age': '86400'
      });
      res.end();
   }
}).listen(8080);


GetAll=async ()=> {
   await client.connect();
   const cursor=client.db("shop").collection("goods").find({});
   return cursor.toArray();
};

Add=async (param)=> {
   await client.connect();
   return client.db("shop").collection("goods").insertOne(
       {
          name:param.name,
          description:param.description,
          amount:parseInt(param.amount)
       });
};