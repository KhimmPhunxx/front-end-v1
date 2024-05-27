import React, { useEffect, useState } from 'react'
import request from '../../share/request'
import { Table } from 'antd'
import { formateDateClient } from '../../share/helper'

export default function ProvinceDash() {
  const [list,setList] = useState([])

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    const res = await request("province","get")
    if(res){
      setList(res.data)
    }
  }
  return (
    <>
    <div className='Manrope text-xl font-bold'>Province</div>
   <Table
    className='mt-2'
    columns={[
      {
        className: "Manrope font-bold",
        key: 'no',
        title: 'No',
        dataIndex: '',
        render: (text,record,index) => index+1
      },
      {
        className: "Manrope font-bold",
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
      },
      {
        className: "Manrope font-bold",
        key: 'description',
        title: 'Description',
        dataIndex: 'description',
      },
      {
        className: "Manrope font-bold",
        key: 'date_added',
        title: 'Date Added',
        dataIndex: 'date_added',
        render: (text) => {
          return formateDateClient(text)
        }
      }
    ]}

   dataSource={list}
   />
    
    </>
  )
}
