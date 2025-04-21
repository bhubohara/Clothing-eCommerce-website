import mongoose from "mongoose";
import colors from 'colors'



const connectDB =async()=>{

    try {
        if(!process.env.MONGO_URL){
            throw new Error("MONGO_URL is not defiend in the enviroment varibale")

        }
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connection successfully to databse ${conn.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(error)
        
    }
  

}

export default connectDB;