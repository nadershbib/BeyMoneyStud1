import { Form, Input, message, Modal, Select } from "antd";
import React, { useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";

function AddEditTransaction({showAddEditTransactionModal,setShowAddEditTransactionModal,getTransactions,selectedItemForEdit,setSelectedItemForEdit}) {

  const [loading,setLoading] = useState(false);


    const onFinish = async (values) => {
        try{
            const user =  JSON.parse(localStorage.getItem("beymoney-user"));
            setLoading(true)
            if(selectedItemForEdit){
              await axios.post("/api/transactions/edit-transaction", {
                payload:{
                  ...values,
                  userId:user._id,
                },
                transactionId:selectedItemForEdit._id
              })
              setLoading(false);
              getTransactions()
              message.success('Transaction updated successfuly');
             
            } else{
              await axios.post("/api/transactions/add-transaction",{...values,userid:user._id});
              setLoading(false);
              getTransactions()
              message.success('Transaction successfuly added');
              
            }
            setShowAddEditTransactionModal(false);
            setSelectedItemForEdit(null);

        } catch(err){
            setLoading(false);
            message.error("something went wrong!");
        }
     }

  return (
    
      <Modal
      title={selectedItemForEdit ? "Edit Transaction" : "Add Transaction"}
      open={showAddEditTransactionModal}
      setOpen={setShowAddEditTransactionModal}
      onCancel={() => setShowAddEditTransactionModal(false)}
      footer={false}
    >
      {/* {loading && <Spinner /> } */}
      <Form layout="vertical" className="transaction-form" onFinish={onFinish} initialValues = {selectedItemForEdit}>
        <Form.Item label="Amount" name="amount">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Select>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="medical">Medical</Select.Option>
            <Select.Option value="tax">Tax</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Reference" name="reference">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input type="text" />
        </Form.Item>

        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </Modal>
    
  );
}

export default AddEditTransaction;
