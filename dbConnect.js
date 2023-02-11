import mongoose from "mongoose"

mongoose.connect("mongodb+srv://nader:nader@cluster0.r5rohpu.mongodb.net/beymoney2", {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const connection = mongoose.connection;

connection.on("error", err => console.log(err));
connection.on("connected",()=>console.log("connected to mongoDB successfuly!!"));