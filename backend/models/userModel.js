const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//Custom static Signup Method on the userSchema
userSchema.statics.signup = async function( email, password ){
    //create a user with that email and password

    const exist = await this.findOne({ email })

    if(exist){
        throw Error('Email Already in use')
    }
    //hashing the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash( password, salt )

    const user = await this.create({  email, password:hash  })
    return user
}

module.exports = mongoose.model('User', userSchema)