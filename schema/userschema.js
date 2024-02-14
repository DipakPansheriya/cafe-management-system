const db = require('mongoose')


const registerData  = new db.Schema(

    {
        email : {
            type : String,
            require : true,
            unique : true
        },   
        password : {
            type : String,
            require : true,
            unique : true
        },

    }
)

const doctorModel = db.model('Register List' , registerData)

module.exports = doctorModel