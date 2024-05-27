import React from 'react'
import { useState } from 'react'
import request from '../../share/request'
import { useEffect } from 'react'
import { Config, formateDateClient } from '../../share/helper'
import { Input, Form, Modal, Row, Col } from 'antd';

export default function SlideDash() {
    const [list, setList] = useState([])
    const [visible, setVisible] = useState(false)
    const [imageUpload, setImageUpload] = useState([])
    const [form] = Form.useForm();
    const [visibleConfirm, setVisibleConfirm] = useState(false)
    const [item, setItem] = useState({})

    useEffect(() => {
        getList()
    }, [])

    const getList = async () => {
        request('slider', 'get').then(res => {
            if (res) {
                setList(res.data)
                console.log(res.data)
            }
        })
    }

    const onCloseModal = () => {
        setVisible(false)
    }

    const onFinish = async (values) => {
        var formData = new FormData();
        formData.append('slider_name', values.slider_name)
        formData.append('slider_image', imageUpload, imageUpload.name)
        const res = await request("slider", "post", formData, {
            headers : {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (res) {
            getList()
            setVisible(false)
            form.resetFields()
        }
    }

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
        const res = await request("slider", "delete", {
            slider_id: item.slider_id
        })
        if (res) {
            getList()
        }
    }
   
  return (
    <main>
       
        {/* button create  */}
        <div className='flex'>
            <button onClick={()=> setVisible(true)} className='bg-blue-600 Manrope  text-white px-3 py-2 rounded-md' > New Slide <i class="fa-solid fa-plus"></i> </button>
        </div>
        <div className='main-card gap-2 grid grid-cols-3 mt-3'> 
                {
                    list.map((item, index) => {
                        return (
                            <div className='w-96 h-72 bg-gray-300 border rounded-md shadow'>
                            <div className='image w-full h-48 border rounded-md'>
                                <img className='w-full h-full object-cover rounded-md' src={Config.image_path + item.slider_image} alt="" />
                            </div>
                            <div className='p-2 flex justify-between'>
                                <h1 className='text-sm Manrope'> {item.slider_name} </h1>
                                <h1 className='text-sm Manrope'> {formateDateClient(item.create_at)} </h1>    
                            </div>
                            <div className='space-x-2 px-2 float-right'>
                                <button onClick={()=> onDelete(item)} className='bg-red-400 Manrope text-white px-3 py-2 rounded-md w-sm'> <i class="fa-regular fa-trash-can"></i> </button>
                            </div>

                            </div>
                        )
                    })
                }
        </div>
        <Modal
          maskClosable={false}
          open={visible}
          onCancel={onCloseModal}
          footer={null}
          title={"Create New"}
          className='Manrope'
        >
          <Form 
            onFinish={onFinish}
            layout="vertical" 
            form={form} 
            className='Manrope'
          >

            <Row gutter={12}>
              <Col span={24}>
                <Form.Item
                  className='Manrope'
                  label="Name"
                  name="slider_name"
                  rules={[{ required: true, message: 'Please input your name!' }]}
                >
                  <input className='Manrope border w-full px-2 py-1 rounded-md' placeholder='name...' />
                  
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  pan={12}
                  className='Manrope'
                  label="Choose Image"
                  name="slider_image"
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
    </main>
  )
}
