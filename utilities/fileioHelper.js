// importing the fs module from npm to do file io
const { json } = require('express')
const fs = require('fs')

const {fileName} = require('../utilities/middlewareFun')


/**
* Creates a new file in the relative folder
* @param  {String}     tablename    Name of the file to create
* @return Directly creates the file
*/
var createFile = (tableName) => {

   var file_full_name = fileName(tableName)

   fs.writeFileSync(file_full_name, '[]')
   return true
}

/**
 * Deletes a file in the relative folder
 * @param {string} tablename Name of the file to delete
 * @return Directly delets the file
 */
var deleteFile = (tableName) => {

    var file_full_name = fileName(tableName)

    fs.unlink(file_full_name , (err) => {
        if(err){
            throw err
        }
    })
}


module.exports = {
   createFile,
   deleteFile
}