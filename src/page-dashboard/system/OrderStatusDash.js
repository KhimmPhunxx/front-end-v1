import React, { useEffect, useState } from 'react'
import  request  from '../../share/request';
import { Table } from 'antd';
import "./System.css"

export default function OrderStatusDash() {

  const [list,setList] = useState([])

  useEffect(() => {
    gerList()
  }, [])

  const gerList = async () => {
    const res = await request("order_status","get")
    if(res){
      setList(res.data)
    }
  }

  return (
   <>
         <div className='Manrope text-xl font-bold'>Order Status</div>
         <Table
          className='mt-2'
          columns={[
          {
            className: "Manrope",
            key: 'no',
            title: 'No',
            dataIndex: '',
            render: (text,record,index) => index+1
          },
          {
            className: "Manrope",
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
          },
          {
            className: "Manrope",
            key: 'message',
            title: 'Message',
            dataIndex: 'message',
          },
         ]}
         dataSource={list}
         />
   </>
  )
}
