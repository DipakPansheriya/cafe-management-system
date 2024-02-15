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
        mobileNumber: {
            type: String,
            validate: {
                validator: function (value) {
                    // Validate that the mobile number is exactly 10 digits
                    return /^\d{10}$/.test(value);
                },
                message: props => `${props.value} is not a valid 10-digit mobile number!`
            },
            required: true,
            unique: true
        }

    }
)

const doctorModel = db.model('Register List' , registerData)

module.exports = doctorModel