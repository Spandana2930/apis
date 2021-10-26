

var MongoClient = require('mongodb').MongoClient;  


    var url = "mongodb+srv://siva:siva@cluster0.cabsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, data) { 
    if (err){
       console.log(err)
    }
    else{
       var db = data.db("myFirstDatabase");
      
       
   }
    }); 
   

//using mongoose to connect to mongo db atlas


