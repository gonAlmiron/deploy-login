import dotenv from 'dotenv';

dotenv.config();

export default {
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL || 'mongodb+srv://gonAlmiron:1234@cluster0.ohn3xaw.mongodb.net/?retryWrites=true&w=majority',
    PUERTO: process.env.PUERTO || 8080
}