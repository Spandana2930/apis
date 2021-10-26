// Importing npm modules
const express = require("express");

//importing local modules
const userModel = require("../schema/model");
const {
  createTableInDb,
   addDataToTable,
   updateDataToTable,
   deleteDataToTable,
   getDataFromTable
  } = require("../schema/creator");
     

// Initializing app to express
const app = express();


//Importing MiddleWare functions
const {isRecordInDbOrNot} = require("../middlewares/middle")

//just to check
function isTableInDbOrNot(request,response,next){
  next()
}

/**
 * Implementation of the route ''/add_table
 * @param {string} add_table //requesting table_name from user
 * returns 201 if table created sucessfully
 * returns 500 if there is an error in connecting to db
 * returns 406 if data is already in the database
 */
app.post("/create_table/:add_table", isTableInDbOrNot, async(request, response) => {
  var table_name = request.params.add_table
  createTableInDb(table_name, request, response)
})

/**
 * Implementaiton of the route /add_user
 * @param {object} user // requesting data from user
 * returns 201 if record created sucessfully
 * returns 500 if there is an error in connecting to db
 * returns 406 if data is already in the database
 */
app.post("/create_user/:table_name/add_record", async (request,response) => {
  // let modelScheema=getScheema(request.parama)
  let table_name = request.params.table_name
    // var user = new userModel(request.body)
    addDataToTable(table_name,request,response)
})


/**
 * Implementaiton of the route /:table_name/:id
 * @param {object} user // requesting data from user
 * returns 201 if record updated sucessfully
 * returns 500 if there is an error in connecting to db
 */
app.put("/update/:table_name/:id", async (request,response) => {
  // let modelScheema=getScheema(request.parama)
  let table_name = request.params.table_name
  let id=request.params.id
    // var user = new userModel(request.body)
    updateDataToTable(table_name,id,request,response)
})

/**
 * Implementaiton of the route /:table_name/:id
 * @param {String} tableName // requesting data from user
 * returns 200 if record generated sucessfully
 * returns 500 if there is an error in connecting to db
 * returns 406 if data cannot be retrived
 */
app.get("/:table_name/:id?", async (request, response) => {
  let tableName=request.params.table_name
  let id_val=parseInt(request.params.id)
    const users = await userModel.find({});
    getDataFromTable(tableName,id_val,request,response)
  
  });

/**
 * 
 * Implementaiton of the route /delete
 * @param {object} user // requesting data from user
 * returns 201 if record deleted sucessfully
 * returns 500 if there is an error in connecting to db
 * returns 406 if data cannot be deleted
 */
app.delete("/delete/:table_name/:id", async (request,response) => {
  // let modelScheema=getScheema(request.parama)
  let table_name = request.params.table_name
  let id=request.params.id
    // var user = new userModel(request.body)
    deleteDataToTable(table_name,id,request,response)
})

// exporting modules
module.exports = app;