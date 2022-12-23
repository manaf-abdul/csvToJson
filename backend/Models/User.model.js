import mongoose from 'mongoose'

const userModel = new mongoose.Schema(
    {
        name: {
            type: String,
            default:null,
            required:true
        },
        email: {
            type: String,
            default: null,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            trim: true, 
            lowercase: true
        },
        dateOfBirth: {
            type: String,
            default:null,
            required:true
        },
        address: {
            type: String,
            default:null,
            required:true
        },
        country: {
            type: String,
            default:null,
            required:true
        }
    },{
        timestamps:true
    }
)

const User=mongoose.model("User",userModel)
export default User