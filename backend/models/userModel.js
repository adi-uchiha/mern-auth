const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


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

    if(!email || !password){
        throw Error("All fields must be filled")
    }
    if (!validator.isEmail(email)){
        throw Error('Enter a valid email')
    }
    if (!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    const exist = await this.findOne({ email })

    if(exist){
        throw Error('Email Already registered')
    }
    //hashing the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash( password, salt )

    const user = await this.create({  email, password:hash  })
    return user
}

//Static method for login
userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('Provide email and password')
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error('Email not registered')
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){throw Error('Incorrect password')}

    return user
}

module.exports = mongoose.model('User', userSchema)