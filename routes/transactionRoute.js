import express from "express";

import "../models/Transaction.js";
import Transaction from "../models/Transaction.js";

const router = express.Router();

router.post("/add-transaction", async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.send("TRANSACTION ADDED SUCCESSFULY!");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/get-all-transactions", async (req, res) => {
  try {
    console.log(req.body)
    const transactions = await Transaction.find({userid:req.body.userid});
    console.log(transactions)
    res.send(transactions);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});

// edit transaction

router.post("/edit-transaction",async (req,res) =>{
  try{
     await Transaction.findOneAndUpdate({_id:req.body.transactionId},req.body.payload)
     console.log("SUCCESSFULY UPDATED THE TRANSACTION!!!!");
     res.send("Transaction Updated Successfully!");
  }catch(err){
     console.log(err);
     res.status(500).json(err);
  }
})
// delete transaction

router.post("/delete-transaction",async (req,res) =>{
  try{
     await Transaction.findOneAndDelete({_id:req.body.transactionId})
     console.log("SUCCESSFULY Deleted THE TRANSACTION!!!!");
     res.send("Transaction Deleted Successfully!");
  }catch(err){
     console.log(err);
     res.status(500).json(err);
  }
});



export default router;
