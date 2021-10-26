let fs = require('fs');

/**
 * this function is to create the json file as a database.
 * @param {String}      table_name
 * @returns {String}    Path for the DataBse(JSON FILE)
 */
function fileName(table_name) {
    return ('./database/' + table_name + '.json')
}

/**
 * we are checking if the given file exists in the db or not
 * @param {string} filePath name of table
 * @returns {boolean} true if the file exists
 */
 function doesFileExist(filePath) {
    if(fs.existsSync(filePath)) {
        return true
    }
    else{
        return false
    }
}

/**
 * This is MiddleWare function check wether table is present in Data Base or not.
 * @param {function} next
 * @return {function || status code} it will pass to next function if it works or else it generate status code along with error.
 */
function checkTable(req, res, next) {
    // existSync is useful to chekc wether json file(table) exists or not in our
    // folder
    if (fs.existsSync(fileName(req.params.table_name))) {
        res
            .status(403)
            .send("Table Named "+req.params.table_name + ' already existed')

        //if there is no table exists we are passing to next
    } else {
        next()
    }

}

/**
 * This is function is to check wether given record is present in Table or not.
 * @param {function} next
 * @return {function || status code} it will passes to next function if record exists or else it retruns status code along with error.
 */
function createRecordInTable(req, res, next) {
    // getting id from url
    let id = req.params.id
    let table_name = req.params.table_name
    //reading table to check wether given id is in table(json file) or not
    fs.readFile('./database/' + table_name + '.json', 'utf8', (err, data) => {
        // If error status request will be 404 and we are stopping the function
        if (err) {
            res.status(404).end("Not Found")
            next('route')
            // if there is no error found we arechecking wether the given id is found or not
        } else {
            next()
        }
    })

}

/**
 * Function will check weather table exits or not and
 * if exist it will move to next else provide the 404 status
 * @param {Object} req it will provide the request parameters from the url
 * @param {Object} res It will provide the response parameters
 * @param {Function} next 
 */
function checkTableExist(req, res, next) {
    // existSync is useful to chekc wether json file(table) exists or not in our
    // folder
    if (fs.existsSync(fileName(req.params.table_name))) {
       
            next()

        //if there is no table exists we are passing to next
    } else {
        res
        .status(404)
        .send('Table Named ' + req.params.table_name + ' Not found')
    }

}

module.exports = {
    createRecordInTable,
    checkTable,
    fileName,
    doesFileExist,
    checkTableExist
}