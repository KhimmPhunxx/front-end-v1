import React, { useEffect, useState } from 'react'
import  request  from '../../share/request';
import { Table } from 'antd'

export default function CartDashoard() {

  const [list, setList] = useState([])

  useEffect(() => {
    getList()
  }, [])

  const getList = () => {
    request("cart", "get" ).then((res) => {
        if(res) {
            setList(res.data)
            console.log(res.data)
        }

    })
  }

  return (
   <>
      <Table 
      columns={[
        {
          title: 'cart_id',
          dataIndex: 'cart_id',
          key: 'cart_id',
        },
        {
          title: 'customer_id',
          dataIndex: 'customer_id',
          key: 'customer_id',
        },
        {
          title: 'product_id',
          dataIndex: 'product_id',
          key: 'product_id',
        },
        {
          title: 'quantity',
          dataIndex: 'quantity',
          key: 'quantity',
        },
      ]}
      dataSource={list}
      />
   
   </>
    
  )
}
