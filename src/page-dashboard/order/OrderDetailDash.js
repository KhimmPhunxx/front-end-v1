import React, { useEffect, useState } from 'react'
import request from '../../share/request'
import { formateDateClient } from '../../share/helper'
import { Table } from 'antd'

export default function OrderDetailDash() {
    const [list,setList] = useState([])

    useEffect(() => {
        getList()
    }, [])

    const getList = () => {
        request("order_detail","get").then(res => {
            console.log(res)
            if(!res.error){
                setList(res.data)
            }
        })
    }

  return (
    <>
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
              title: 'Invoice',
              dataIndex: 'invoice_id',
              key: 'invoice_id',
            },
            {
              className: "Manrope",
              title: 'Quantity',
              dataIndex: 'quantity',
              key: `quantity`
            },
            {
              className: "Manrope",
              title: 'Price',
              dataIndex: 'price',
              key: `price`
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
