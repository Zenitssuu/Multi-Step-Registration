import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address:{
    type:String,
    required:true,
    trim:true,
  },
  phoneNumber:{
    type:String,
    required:true
  },
  profilePicture: {
    type: String,
  },
}, { timestamps: true });

export const User =  model('User', userSchema);
