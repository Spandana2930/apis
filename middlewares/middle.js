//importing local modules
const userModel = require("../schema/model");


/**
 * to check wether the user uploading data is already present in DB or not.
 * @param {object} data requesting body into data
 * @return passes to next function if data is not present in DB.
 */
async function isRecordInDbOrNot(request,response,next){
    let data = request.body
    let checkId = data.id
    const checkRecord = userModel.findOne({id:checkId} , (error,data) => {
        if(error){
            next('route')
            response
                    .status(500) //Internal server Error
                    .send(error)
        }
        else if(data){
            next('route')
            response
                    .status(406) //Forbidden
                    .send("Data you are trying to insert is already inside DataBase")
        }
        else{
            next() //proceeding to next function
        }
    })

}

async function isTableInDbOrNot (request,response,next){
    next()
    // let table_name = request.params.table_name
    // { resource: { db: "test", collection: `${table_name}` }, actions: [ "find" ] }
}

//Exporting modules
module.exports = {
    isRecordInDbOrNot,
    isTableInDbOrNot,
}