// Importing local modules
const fs = require('fs');
const {fileName} = require('./middlewareFun')

/**
 * Reads a file in a relative folder
 * @param {string} tableName  Name of the file to read.
 * @returns {string} returns data of the file
 */
function readFileIo(tableName){
    let data=fs.readFileSync(fileName(tableName),'utf8')
    data = JSON.parse(data)
    return data
}

/**
 * Writes the file in a relative folder with given data
 * @param {string} tableName Name of the file to write
 * @param {object} data object to add into the file
 * @returns {Boolean} Retuns True if written successfully
 */
var writeFileIo = (tableName,data) => {
    var file_full_name = fileName(tableName)
    
 
    fs.writeFileSync(file_full_name,data)
    return true
 }

// fs.writeFile('./database/'+ table_name + '.json', obj, (err) => { //writing the new data from postman and appending it with existing data in file
//             if (err) 
//                 res.status(404).send(err) // failed to acess the table
//             else {
//                 res
//                     .status(200) // status ok
//                     .send("table written successfully\n" + obj) // table create;;;;;;;;;;;;;;;;;;;;;;;;;;///////iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiid
//             }
//         });

module.exports = {readFileIo,writeFileIo}