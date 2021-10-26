// Importing npm modules
const mongoose = require('mongoose')

/**
 * creating a scheema of record
 * declaring required fields and specifying data type
 */

const UserSchema = new mongoose.Schema({
    id:{        
        type:Number,
        required:true,
    }
},
{
    strict:false,
    collection: 'user'
})

//assigning model to const variable
const User = mongoose.model("User", UserSchema);

//exporting User
module.exports = User;