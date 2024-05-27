
import React, { useEffect, useState } from 'react'
import request from '../../share/request'
import { Table } from 'antd'
import { formateDateClient } from '../../share/helper'
import "./order.css"

export default function OrderDashboard() {

  const [list, setList] = useState([])

  useEffect(() => {
    getList()
  }, [])

  const getList = () => {
     request("order","get").then(res => {
          console.log(res)
          if(!res.error){
              setList(res.data)
          }
      }) 
    }

  const onEdite = (record) => {
    console.log(record)
  }

  const onDelete = (record) => {
    console.log(record)
  }

  return (
    <>
        <div>OrderDashboard</div>
        <Table
          className='mt-2'
          columns={[
            { 
              className: "Manrope",
              title: 'No',
              dataIndex: '',
              key: 'no',
              render : (text,record,index) => index+1
            },
            {
              className: "Manrope",
              title: 'Status',
              dataIndex: 'name',
              key: 'name',
            },
            {
              className: "Manrope",
              title: 'Payment',
              dataIndex: 'name_pm',
              key: 'name_pm',
            },
            {
              className: "Manrope",
              title: 'Invoice',
              dataIndex: 'invoice_id',
              key: 'invoice_id',
            },
            {
              className: "Manrope",
              title: 'Total',
              dataIndex: 'order_total',
              key: `order_total`
            },
            {
              className: "Manrope",
              title: 'Comment',
              dataIndex: 'comment',
              key: `comment`
            },
            {
              className: "Manrope",
              title: 'Firstname',
              dataIndex: 'firstname',
              key: `firstname`
            },
            {
              className: "Manrope",
              title: 'Lastname',
              dataIndex: 'lastname',
              key: `lastname`
            },
            {
              className: "Manrope",
              title: 'Tel',
              dataIndex: 'tel',
              key: `tel`
            },
            {
              className: "Manrope",
              title: 'Address',
              dataIndex: 'address_des',
              key: `address_des`
            },
            {
              className: "Manrope",
              title: 'Create At',
              dataIndex: 'create_at',
              key: `create_at`,
              render : (text,record,index) => formateDateClient(text)
            },
            


            // {
            //   title: 'Action',
            //   key: 'update_at',
            //   render : (text, record, index) =>{
            //     return (
            //       <div className='space-x-2 px-2 border-l'>
            //         <button onClick={()=> onEdite(record)} className='bg-blue-400 text-sm uppercase text-white px-2 py-1 rounded-md hover:bg-blue-500 hover:duration-200'><i class="fa-solid fa-pen-to-square"></i></button>
            //         <button onClick={()=> onDelete(record)} className='bg-red-400 text-sm uppercase text-white px-2 py-1 rounded hover:bg-red-500 hover:duration-200'><i class="fa-solid fa-trash-can"></i></button> 
            //       </div>
            //     )
            //   },
            // },
           
          ]}
          dataSource={list}
        />
    </>
  )
}
