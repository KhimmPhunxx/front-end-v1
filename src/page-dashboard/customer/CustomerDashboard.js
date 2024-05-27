import React, { useEffect, useState } from 'react'
import request from '../../share/request'
import { Col, Form, Input, Modal, Row, Select, Table, Tag, message } from 'antd'
import './CustomerDashboard.css'
import { formateDateClient } from '../../share/helper'


export default function CustomerDashboard() {
  const [list, setList] = useState([])
  const [listProvince, setListProvince] =useState([])
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const [visibleConfirm, setVisibleConfirm] = useState(false)
  const [customerID,setCustomerID] = useState(null)

  const {Option} = Select

  useEffect(() => {
    getlist()
  }, [])

  const getlist = () => {
    request("customer", "get",).then((res) => {
      if(res){
        setList(res.data)
        setListProvince(res.data_Province)
      }
    })
  }



  const onEditClick = (item) => {
    setVisible(true)
    form.setFieldsValue(item)
  }

  const onDelete = (row) => {
    // console.log(row)
    // request("customer/"+row.customer_id,"delete",).then((res) => {
    //   if(res){
    //     getlist()
    //   }
    // })
    setCustomerID(row.customer_id)
    setVisibleConfirm(true)
  }

  const removeData = () => {
    // console.log(row)
    request("customer/"+customerID,"delete",).then((res) => {
      if(res){
        getlist()
        setVisibleConfirm(false)
      }else{
        message.error("Something went wrong")
      }
    })
  }

  const onCloseModal = () => {
    setVisible(false)
    form.resetFields()
  }

  const onFinish = (values) => {
    var data = values
    request("customer", "post", data).then((res) => {
      if(res){
        onCloseModal()
        getlist()
      }else{
        message.error("Something went wrong")
      }
    })
    // var formData = new FormData();
    // formData.append('firstname', values.firstname)
    // formData.append('lastname', values.lastname)
    // formData.append('username', values.username)
    // formData.append('password', values.password)
    
  }

  return (
    <>
   
        <div className='flex mt-2'>
          <button onClick={() => setVisible(true)} className='bg-blue-400 Manrope text-sm uppercase text-white px-3 py-2 rounded-md hover:bg-blue-500 hover:duration-200'>New <i class="fa-solid fa-plus"></i></button>
        </div>
        <Table 
         className='mt-3'
          columns={[
            {
              className:"Manrope",
              key: "no",
              title: "No",
              render: (text, record, index) => index + 1,
              
            },
            {
              className:"Manrope",
              key: "firstname",
              title: "Firstname",
              dataIndex: "firstname",
            },
            {
              className:"Manrope",
              key: "lastname",
              title: "Lastname",
              dataIndex: "lastname",
            },
            // {
            //   className:"Manrope",
            //   key: "username",
            //   title: "Telephone",
            //   dataIndex: "username",
            // },
            {
              className:"Manrope",
              key: "gender",
              title: "Gender",
              dataIndex: "gender",
              render:(item)=> item == 1 ? "Male" : " Female"
            },
            {
              className:"Manrope",
              key: "cus_image",
              title: "Image",
              dataIndex: "cus_image",
          
            },
            {
              className:"Manrope",
              key: "is_active",
              title:"Active",
              dataIndex:"is_active",
              render : (text )=>{
                return (
                  <Tag className="Manrope" color={text == 1 ? "green" : "red" } key={1}>
                    {text == 1 ? "Active" : "Disable"}
                  </Tag>
                )
              }

            },
            {
              className:"Manrope",
              key: "create_at",
              title: "Create At",
              dataIndex: "create_at",
              render : (text, record, index) =>{
                return formateDateClient(text)
              },
            },
            {
              className:"Manrope",
              key: "action",
              title: "Action",
              render : (text, record, index) =>{
                return (
                  <div className='space-x-2 px-2 border-l'>
                    <button onClick={() => onEditClick(record)} className='bg-blue-400 text-sm uppercase text-white px-3 py-1 rounded-md hover:bg-blue-500 hover:duration-200'><i class="fa-solid fa-pen-to-square"></i></button>
                    <button onClick={() => onDelete(record)} className='bg-red-400 text-sm uppercase text-white px-3 py-1 rounded hover:bg-red-500 hover:duration-200'><i class="fa-solid fa-right-to-bracket"></i></button> 
                  </div>
                )
              },
             
            }
          ]}
        
        dataSource={list}
        />

        <Modal
          maskClosable={false}
          open={visible}
          onCancel={onCloseModal}
          footer={null}
          title="New Customer"
          className='Manriope'
        >
          <Form
            layout="vertical" 
            form={form} 
            onFinish={onFinish}
          >

            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  
                  label="Firstname"
                  name="firstname"
                  rules={[{ required: true, message: 'Please input your firstname!' }]}
                >
                  <input className='border w-full px-2 py-1 rounded-md' placeholder='Firstname' />
                  
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                 
                  label="Lastname"
                  name="lastname"
                  rules={[{ required: true, message: 'Please input your lastname!' }]}
                >
                  <input className='border w-full px-2 py-1 rounded-md' placeholder='Lastname' />
                
                </Form.Item>
              </Col>

            </Row>

            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  
                  label="Telephone"
                  name="username"
                  rules={[{ required: true, message: 'Please input your telephone!' }]}
                >
                  <input className='border w-full px-2 py-1 rounded-md' placeholder='telephone' />
                  
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                
                  label="Password"
                  name="password"
                >
                  <Input.Password className='border w-full px-2 py-1 rounded-md' placeholder='Password' />
                
                </Form.Item>
              </Col>

            </Row>

          
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: 'Please select your gender!' }]}
            >
             <Select placeholder="Gender" allowClear >
                <Option value="1">Male</Option>
                <Option value="2">Female</Option>
             </Select>
                
            </Form.Item>

            <Form.Item
              label="Province"
              name="province_id"
              rules={[{ required: true, message: 'Please select your province!' }]}
            >
             <Select placeholder="Provice" allowClear >
                {
                  listProvince?.map((item) => {
                    return (
                      <Option value={item.province_id}>{item.name}</Option>
                    )
                  })
                }
             </Select>
                
            </Form.Item>

            <Form.Item
            
              label="Address Description"
              name="address_des"
            >
              <textarea rows={3} className='border w-full px-2 py-1 rounded-md' placeholder='Description' />
                
            </Form.Item>

           <Form.Item className='border-t'>
           <div className='space-x-3 mt-3' style={{float: "right"}}>
                <button onClick={onCloseModal} className='border Manrope text-sm uppercase text-gray-600 px-3 py-2 rounded-md hover:bg-blue-100 hover:duration-200'>Cancel</button>
                <button type='submit' className='bg-blue-400 Manrope text-sm uppercase text-white px-3 py-2 rounded-md hover:bg-blue-500 hover:duration-200'> Save </button>
              </div>
           </Form.Item>

          </Form>

        </Modal>

        <Modal
          title="Change Status Customer"
          open={visibleConfirm}
          footer={null}
          onCancel={() => setVisibleConfirm(false)}
          onOk={()=> removeData()}
          

        >
          <p className='border-t pt-3'>Are You Sure to change Status Now!!</p>

          <Form.Item className='border-t'>
           <div className='space-x-3 mt-3' style={{float: "right"}}>
                <button onClick={()=> setVisibleConfirm(false)} className='border Manrope text-sm uppercase text-gray-600 px-3 py-2 rounded-md hover:bg-blue-100 hover:duration-200'>Cancel</button>
                <button onClick={()=> removeData()} className='bg-red-400 Manrope text-sm uppercase text-white px-3 py-2 rounded-md hover:bg-red-500 hover:duration-200'> Change Status </button>
              </div>
           </Form.Item>
        </Modal>
    </>
  )
}
