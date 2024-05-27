import React, { useEffect, useState } from 'react'
import request from '../../share/request'
import { Col, Form, Input, Modal, Row, Table } from 'antd'
import { Config } from '../../share/helper'

export default function OrderPaymentDash() {
  const [list,setList] = useState([])
  const [visible,setVisible] = useState(false)
  const [imageUpload,setImageUpload] = useState([])
  const [visibleConfirm,setVisibleConfirm] = useState(false)
  const [item,setItem] = useState({})


  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    const res = await request("payment_method","get")
    if(res){
      setList(res.data)
    }
  }

  const onCloseModal = () => {
    setVisible(false)
  }

  const onFinish = async (values) => {
    var formData = new FormData();
    formData.append('name_pm',values.name_pm)
    formData.append('code',values.code)
    formData.append('image',imageUpload,imageUpload.filename)
    const res = await request("payment_method","post",formData,{
      headers : {
        'Content-Type': 'multipart/form-data'
      }
    })
    if(res){
      getList()
      setVisible(false)
    }
  }

  const [form] = Form.useForm();

  const onChnageFile = (e) => {
    var file = e.target.files[0]
    setImageUpload(file)
  }

  const onDelete = (item) => {
    setVisibleConfirm(true)
    setItem(item)
  }

  const onRemove = async () => {
    setVisibleConfirm(false)
    const res = await request("payment_method","delete",{
      payment_method_id : item.payment_method_id
    })
    if(res){
      getList()
    }
  }


  return (
   <>
        <div className='flex mt-2'>
          <button onClick={()=> setVisible(true)} className='bg-blue-400 Manrope text-sm uppercase text-white px-3 py-2 rounded-md hover:bg-blue-500 hover:duration-200'>New <i class="fa-solid fa-plus"></i></button>
        </div>
      <Table
      className='mt-2'
      columns={[
        {
          className: "Manrope ",
          key: 'no',
          title: 'No',
          dataIndex: '',
          render: (text,record,index) => index+1
        },
        {
          className: "Manrope",
          key: 'name_pm',
          title: 'Name',
          dataIndex: 'name_pm',
        },
        {
          className: "Manrope",
          key: 'code',
          title: 'Code',
          dataIndex: 'code',
        },
        {
          className: "Manrope",
          key: 'image',
          title: 'Image',
          dataIndex: 'image',
          render: (value) => {
            return (
              <div className='w-8 h-8'>
                <img src={Config.image_path+value} className='rounded w-full h-full object-cover'  alt="image"/>
              </div>
            )
          }
        },
        {
          className: "Manrope",
          key: 'action',
          title: 'Action',
          render: (text,record) => {
            return (
              <div className='space-x-2'>
                <button onClick={()=> onDelete(record)} className='bg-red-400 Manrope text-sm uppercase text-white px-3 py-2 rounded-md hover:bg-red-500 hover:duration-200'><i class="fa-solid fa-trash-can"></i></button>
              </div>
            )
          }
        }
      ]}
      dataSource={list}
      />
      <Modal
          maskClosable={false}
          open={visible}
          onCancel={onCloseModal}
          footer={null}
          title={"Create New"}
          className='Manrope'
        >
          <Form onFinish={onFinish}
            layout="vertical" 
            form={form} 
            className='Manrope'
            // onFinish={onFinish}
          >

            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  className='Manrope'
                  label="Name"
                  name="name_pm"
                  rules={[{ required: true, message: 'Please input your name!' }]}
                >
                  <input className='Manrope border w-full px-2 py-1 rounded-md' placeholder='name...' />
                  
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                 
                  label="Code"
                  name="code"
                  rules={[{ required: true, message: 'Please input your code!' }]}
                >
                  <input className='border Manrope w-full px-2 py-1 rounded-md' placeholder='Code..' />                
                </Form.Item>
              </Col>
            </Row>


            <Row>
              <Col span={12}>
                <Form.Item
                  pan={12}
                  className='Manrope'
                  label="Choose Image"
                  name="image"
                >
                  <Input type='file' 
                  allowClear={true} 
                  className='border border-gray-600 p-2 rounded' 
                  onChange={onChnageFile}
                  />
                </Form.Item>
              </Col>
            </Row>

           <Form.Item className='border-t'>
              <div className='space-x-3 mt-3' style={{float: "right"}}>
                <button onClick={onCloseModal} className='border Manrope text-sm uppercase text-gray-600 px-3 py-2 rounded-md hover:bg-blue-100 hover:duration-200'>Cancel</button>
                <button type='submit' className='bg-blue-400 Manrope text-sm uppercase text-white px-3 py-2 rounded-md hover:bg-blue-500 hover:duration-200'> Save </button>
              </div>
           </Form.Item>
          </Form>
      </Modal>
      <Modal
          title="DELETE EMPLOYEE"
          open={visibleConfirm}
          footer={null}
          onCancel={() => setVisibleConfirm(false)}
          onOk={()=> onDelete()}
          

        >
          <p className='border-t pt-3'>Are You Sure to Detete this Employee Now!!</p>

          <Form.Item className='border-t'>
           <div className='space-x-3 mt-3' style={{float: "right"}}>
                <button onClick={()=> setVisibleConfirm(false)} className='border Manrope text-sm uppercase text-gray-600 px-3 py-2 rounded-md hover:bg-blue-100 hover:duration-200'>Cancel</button>
                <button onClick={()=> onRemove()} className='bg-red-400 Manrope text-sm uppercase text-white px-3 py-2 rounded-md hover:bg-red-500 hover:duration-200'> Delete </button>
              </div>
           </Form.Item>
        </Modal>
   
   </>
  )
}
