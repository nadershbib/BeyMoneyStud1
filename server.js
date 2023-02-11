import express from "express"

import "./dbConnect.js";

import userRoute from "./routes/userRoute.js"
import transactionRoute from "./routes/transactionRoute.js"

import path from "path"

const app = express()
const port = process.env.PORT || 5000;

if(process.env.NODE_ENV === "production"){
    app.use("/",express.static('client/build'));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(_dirname,'client/build/index.html'))
    })
} 




app.use(express.json())
// routes

app.use("/api/users/",userRoute)
app.use("/api/transactions",transactionRoute)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`SERVER STARTED AT PORT ${port}!`))