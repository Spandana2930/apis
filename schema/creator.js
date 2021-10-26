//Importing npm modules
const mongoose = require('mongoose')
var MongoClient = require('mongodb').MongoClient;

/**
 * Creation of table with scheema
 * declaring required fields and specifying data types
 * @param {String} table_name //to create table
 * @return {Boolean} success if db is created else false
 */
async function createTableInDb(table_name, request, response){
    /**
     * creating a scheema of record\
     * declaring required fields and specifying data type
     */
     var url = "mongodb+srv://siva:siva@cluster0.cabsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
     await MongoClient.connect(url, function(err, data) { 
     if (err){
        response
                .status(500)
                .send(err)
     }
     else{
        var dbase = data.db("myFirstDatabase");
        // console.log(dbase.listCollections())
        dbase.createCollection(table_name, function(err, res) {  
        if (err){
            response
                    .status(403)
                    .send("Table named " + table_name +" already in db")
        }else{
            response
                    .status(201)
                    .send("Table named "+ table_name +" created")
        }
        data.close()
        });
    }
     }); 
}

/**
 * add record to table
 * @param {String} table_name
 * @returns it will add record to table and returns the status.
 */
async function addDataToTable(table_name,request,response){
    let dataBody = request.body;
    var url = "mongodb+srv://siva:siva@cluster0.cabsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
     await MongoClient.connect(url, async function(err, data) { 
        if (err){
            response.status(500)
        }else{
            var db = data.db("myFirstDatabase");
            await db.collection(table_name).insertOne(dataBody, function(err, res) {  
            if (err){
                console.log("Err -> " +err)
                response.status(403).send(err)
            }
            else{
                console.log(res)
                response.status(201).send("data created")
            }
            });
        }
        data.close();
    })
}

/**
 * Updates the existed data in table
 * @param {String} table_name
 * @param {Number} idVal
 * @returns the updated record to db and it will sends the status
 */
async function updateDataToTable(table_name,idVal,request,response){
    var url = "mongodb+srv://siva:siva@cluster0.cabsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
     await MongoClient.connect(url, async function(err, data) { 
        if (err){
            response.status(500)
        }else{
            var db = data.db("myFirstDatabase"); 
            var myquery = { id: parseInt(idVal) };
            var newvalues = { $set: request.body };  
            await db.collection(table_name).updateOne(myquery, newvalues, function(err, res) {
                if (err) response.status(403).send(err)
                else{
                    response.status(201).send(res.modifiedCount +" document updated")
                }
               
              });
            
        }
        data.close();
    })
}


/**
 * Deletes the perticular record from db
 * @param {String} table_name
 * @param {Number} idVal
 * @returns deletes the record and sends the status code if cannot delete it will send an error
 */
async function deleteDataToTable(table_name,idVal,request,response){
    var url = "mongodb+srv://siva:siva@cluster0.cabsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
     await MongoClient.connect(url, async function(err, data) { 
        if (err){
            response.status(500)
        }else{
            var db = data.db("myFirstDatabase");   
            await db.collection(table_name).deleteMany({id:parseInt(idVal)}, function(err, res) {  
            if (err){
                console.log("Err -> " +err) 
                response.status(403).send(err)
            }
            else{
                
                console.log(res)
                response.status(200).send("delete data success")
            }
            });
        }
        data.close();
    })
}


/**
 * Gets all data from table
 * @param {String} table_name
 * @returns the all data from the given table_name else returns error
 */
async function getDataFromTable(table_name,id_val,request,response){
    var url = "mongodb+srv://siva:siva@cluster0.cabsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
     await MongoClient.connect(url, async function(err, data) { 
        if (err){
            response.status(500)
        }else{
            var db = data.db("myFirstDatabase");
            if(id_val){
                let data = await db.collection(table_name).findOne({id:id_val})
                
                    if(data!==null){ 
                        response.status(200).send(data)
                    }else{
                        response.status(404).send("No data available")
                    }
                
            }   else{
                await db.collection(table_name).find({}).toArray(function(err, result) {
                if (err) response.status(403).send(err)
                else{
                    response.status(200).send(result)
                }
           
              });
            }
            
           
        }
        data.close();
    })
}


//Exporting modules
module.exports = {
    createTableInDb,
    addDataToTable,updateDataToTable,deleteDataToTable,
    getDataFromTable
}