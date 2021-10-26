//node package manager (npm) dependencies
const express = require('express')
const fs = require('fs')
const router = express.Router()

// Internal file dependencies
const midFun = require('./utilities/middlewareFun')
const {
    checkTable, 
    createRecordInTable, 
    doesFileExist,
    checkTableExist,fileName
} = require('./utilities/middlewareFun')
const {
    createFile,
    deleteFile,
}= require('./utilities/fileioHelper')
const {readFileIo,writeFileIo}= require('./utilities/jsonioHelper')

// constants for this application
const port = 7000

// Initializing express to app variable
const app = express()

// Enabling access to the body params
app.use(express.urlencoded({extended: true}))
app.use(express.json())

/**
 * Implementation of the route path /create_table/:table_name
 * @param {string} table_name
 * Returns 201 'Created' status if table creation is successfull
 * Returns 404 Not Found in case of failure to create a table
 * Returns 406 Not Acceptable if table already exists
 */
 router.post('/create_table/:table_name', checkTable, (req, res) => {
    let table_name = req.params.table_name
    //writing the new data from postman and appending it with existing data in file
    if(createFile(table_name)){
        res
            .status(201) // Created sucessfully
            .send("Table Named " + table_name + " created sucessfully") //logging file
    }
    

})

/**
 * Implementation of the route path /create_record/:table_name
 * @param {string} table_name
 * Returns 200 Ok status if record creation is successfull
 * Returns 404 Not Found in case of failure to create a record
 */
router.post('/create_record/:table_name', createRecordInTable, (req, res) => {
    let table_name = req.params.table_name
    var id
    
    let data=readFileIo(table_name)
       
        let len = data.length
        if (len === 0) {
            identity = 1
        } else {
            identity = len + 1
        }
        if (Object.keys(req.body).length > 0) {
            req.body.id = identity // setting the old id to it
            data.push(req.body) // pushing users record into data
            data = JSON.stringify(data)
            if(writeFileIo(table_name,data)){
                res.status(200) // sucess
                        .send('table written successfully\n' + data) // record created sucessfully
            }
            else{
                res.status(404).send(err) // failed to fetch the record

            }
           
        } else {
            res.status(406) //Not acceptable
                .send("Please insert Some data")
        }
   

})

/**
 * Implementation of the route path /delete_table/:table_name
 * @param {string} table_name
 * Returns 200 Ok status if table creation is successfull
 * Returns 404 Not Found in case of failure to create a table
 * Returns 406 Not Acceptable if table already exists
 */
router.delete('/delete_table/:table_name', (req, res) => {
    let table_name = req.params.table_name

    if(doesFileExist(fileName(table_name)) === true){
        deleteFile(table_name)
        res
            .status(202) // Accepted to delete the file
            .send("Table Named " + table_name + " deleted successfully")
    }else{
        res
            .status(403) //Forbidden to delete a non existing table
            .send("Table Named " + table_name + " does not exist")
    }
})

/**
 * Implementation of the route path /delete_record/:table_name/:key
 * @param {string} table_name
 * @param {string} key It is the ID from the object
 * Returns 200 Ok status if table creation is successfull
 * Returns 404 Not Found in case of failure to create a table
 */
router.delete('/delete_record/:table_name/:key', checkTableExist, (req, res) => {
    let table_name = req.params.table_name
    let val = req.params.key
    let data=readFileIo(table_name)
        let obj = data.filter(a => a.id != val)
        obj = JSON.stringify(obj)
        if(writeFileIo(table_name,obj)){
             res.status(200) // status ok
                    .send("table written successfully\n" + obj) // table created
           
        }else{
                            res.status(404).send(err) // failed to acess the table

        }
        
    
})

/**
 * Implementation of the route path /delete_record/:table_name/:key
 * @param {string} table_name
 * @param {string} val It will provide the id val to be deleted
 * Returns 200 Ok status if table creation is successfull
 * Returns 404 Not Found in case of failure to create a table
 */
router.put('/update_record/:table_name/:val', checkTableExist, (req, res) => {
    let table_name = req.params.table_name
    let val = req.params.val

    let data=readFileIo(table_name)
        if (Object.keys(req.body).length === 0) {
            res
                .status(406)
                .send("Please Insert some data")
        } else {
            let obj = data.map(eachObj => {
                if (eachObj.id == val) {
                    let oldObj = eachObj
                    eachObj = {
                        ...oldObj,
                        ...req.body
                    }
                    eachObj.id = parseInt(val)
                }
                return eachObj
            })
            let temp = req.body
            let c = data.filter(each => each.id == val)
            if (c.length === 0) {
                // let len = data.length var identity if(len===0){     identity = 1 } else{
                // identity = len+1 } temp.id = identity
                temp.id = parseInt(val)
                obj.push(temp)
            }
            obj = JSON.stringify(obj)
            if(writeFileIo(table_name,obj)){
 res.status(200) // updated sucessfully
                        .send("table written successfully\n" + obj) //redord updated
              
            }
            else{
                 res.status(404) // cannot get
                        .send(err)
            }
           
        }
    
})

/**
 * Implementation of the route path /:table_name/:id?
 * @param {string} table_name
 * @param {string} id It is the optional id
 * Returns 200 Ok status if table creation is successfull
 * Returns 404 Not Found in case of failure to create a table
 */
router.get('/:table_name/:id?', checkTableExist, (req, res) => {
    let id = req.params.id
    let tableName = req.params.table_name
    if (id === undefined) {
        let data=readFileIo(tableName)
            res.status(200) //status ok
                .send(JSON.stringify(data)) // and sending the data
    } else {
        let data=readFileIo(tableName) // converting json to js object
            res.status(200) // got data sucessfully
                .send(JSON.stringify(data.filter(a => a.id === id))) // data generated
      
    }
})

/**
 * Implementation of the route path /:table_name/lessthan/:key/:val
 * @param {string} table_name
 * @param {string} key It is the optional id
 * @param {string} val it will check the value for the condition
 * Returns 200 Ok status if table creation is successfull
 * Returns 404 Not Found in case of failure to create a table
 */
router.get('/:table_name/lessthan/:key/:val', checkTableExist, (req, res) => {
    let key = req.params.key
    let val = req.params.val
    let tableName = req.params.table_name
    let error = true
    let data=readFileIo(tableName)
        let check = data.filter(each => key in each)
        let temp = check
        if (check.length > 0) {
            temp = check.map(eachObj => {
                if (eachObj[key] < val) {
                    return eachObj
                }
            })
        } else {
            error = false
        }
        if (error === false) {
            res.status(404) // cannot get
                .send("Check you url ") // url not defined
        } else {
            temp = temp.filter(each => each != null)
            res
                .status(200)
                .send(temp)
        }

    
})

/**
 * Implementation of the route path /:table_name/greaterthan/:key/:val
 * @param {string} table_name
 * @param {string} key It is the optional id
 * @param {string} val it will check the value for the condition
 * Returns 200 Ok status if table creation is successfull
 * Returns 404 Not Found in case of failure to create a table
 */
router.get('/:table_name/greaterthan/:key/:val', checkTableExist, (req, res) => {
    let key = req.params.key
    let val = req.params.val
    let tableName = req.params.table_name
    let error = true
    let data=readFileIo(tableName)
        let check = data.filter(each => key in each)
        let temp = check
        if (check.length > 0) {
            temp = check.map(eachObj => {
                if (eachObj[key] > val) {
                    return eachObj
                }
            })
        } else {
            error = false
        }
        if (error === false) {
            res.status(404) // cannot get
                .send("Check you url ") // url not defined
        } else {
            temp = temp.filter(each => each != null)
            res
                .status(200)
                .send(temp)
        }

  
})

// The app.listen() function is used to bind and listen the connections on the
// specified host and port.

app.use(router)
module.exports=router
