import { Form, Input, message, Modal, Pagination, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import AddEditTransaction from "../Components/AddEditTransaction"
import DefaultLayout from "../Components/DefaultLayout";
import Spinner from "../Components/Spinner.js";
import "../resources/transactions.css";
import axios from "axios"
import {EditOutlined,UnderlineOutlined,AreaChartOutlined, DeleteOutlined} from "@ant-design/icons"
function Home() {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false);

  const [loading,setLoading] = useState(false);

  const [transactionsData,setTransactionsData] = useState([]);

  const [selectedItemForEdit,setSelectedItemForEdit] = useState(null);

 
  
  
    const getTransactions = async () =>{
      try{
         const user = JSON.parse(localStorage.getItem("beymoney-user"));
         setLoading(true)
         const response = await axios.post("/api/transactions/get-all-transactions",{userid:user._id});
         console.log(response.data);
         setTransactionsData(response.data);
         setLoading(false);
      }catch(err){
         setLoading(false);
         message.error("something went wrong!");
      }
    }
     
    const deleteTransaction = async (record) =>{
      try{
         setLoading(true)
         await axios.post("/api/transactions/delete-transaction",{transactionId:record._id});
         setLoading(false);
         message.success("Transaction deleted successfuly!");
         getTransactions()
      }catch(err){
         setLoading(false);
         message.error("something went wrong!");
      }
    }

  useEffect(() => {
    
      getTransactions()

  }, []);

  const columns = [
    {
      title:"Date",
      dataIndex:"date",
    },
    {
      title:"Amount",
      dataIndex:"amount"
    },
    {
      title:"Category",
      dataIndex:"category"
    },
    {
      title:"Reference",
      dataIndex:"reference"
    },
    {
      title:"Actions",
      dataIndex:"actions",
      render:(text,record) =>{
        console.log(record, "this is the record!!!!!!!")
        return <div>
           <EditOutlined onClick = {() => {
              setSelectedItemForEdit(record)
              setShowAddEditTransactionModal(true)
           }}/>
           <DeleteOutlined className='mx-3' onClick = {() => deleteTransaction(record)}/>
        </div>
      }
    }
  ]

  return (
    <DefaultLayout>
      {/* {loading && <Spinner />} */}
      <div className="filter d-flex justify-content-center align-items-center">
        

        <div>
          <button
            className="primary"
            onClick={() => setShowAddEditTransactionModal(true)}
          >
            ADD NEW
          </button>
        </div>
      </div>
      <div className="table-analtics">
         <Table columns = {columns} dataSource={transactionsData} />
         
      </div>
      {showAddEditTransactionModal && (
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          getTransactions = {getTransactions}
          selectedItemForEdit = {selectedItemForEdit}
          setSelectedItemForEdit = {setSelectedItemForEdit}
        />
      )}
    </DefaultLayout>
  );
}

export default Home;
