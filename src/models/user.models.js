import mongoose, { Schema} from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const userSchema = new Schema({
    userName : {
        type : String,
        lowercase : true,
        trim : true,
        required : true,
        index : true
    },
    email : {
        type : String,
        lowercase : true,
        trim : true,
        required : true,
        
    },
    avatar : {
        type : String,
        required : true,
       
    },
    coverImage : {
        type : String,
       
    },
    watchHistory : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Video"
        }
    ],

    password : {
        type : String,
        required : [true, "you need password"]
        
    },
    refreshToken : {
        type : String,
    }
},{timestamps : true});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function() {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.genrateAcessToken = function() {
    return jwt.sign(
        {
            _id : this.id,
            email : this.email,
            userName : this.userName,
            fullName : this.fullName
        },
        process.env.ACESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACESS_TOKEN_EXPIRY
        }

    )
}

userSchema.methods.genrateRefreshToken = function() {
    return jwt.sign(
        {
            _id : this.id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}
export const User = mongoose.model("User", userSchema);