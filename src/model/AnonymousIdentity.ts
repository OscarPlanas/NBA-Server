import { Schema, model } from 'mongoose';

const AnonymousIdentity = new Schema({
    

    anonymousid: String,
    
});

export default model('AnonymousIdentity', AnonymousIdentity);

