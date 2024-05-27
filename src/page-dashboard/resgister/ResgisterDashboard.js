import { Button, Col, Form, Input, Row } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import request from '../../share/request'

export default function ResgisterDashboard() {

  const navigate = useNavigate()

  const [file,setFile] = useState(null);
  const [form] = Form.useForm();
  

  const onFinish = (values) => {
    console.log(values)
    var formData = new FormData();
    formData.append('firstname',values.firstname)
    formData.append('lastname',values.lastname)
    formData.append('tel',values.tel)
    formData.append('password',values.password)
    formData.append('email',values.email)
    formData.append('base_salary',values.base_salary)
    formData.append('address',values.address)
    formData.append('image_empl',file,file.filename)
    request("employee","post",formData,{
      headears : {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      if(res){
        form.resetFields()
        navigate('/dashboard/login')
      }
    })
  }

  const onChnageFile = (e) => {
    var file = e.target.files[0]
    setFile(file)
  }

  return (
    <main className='max-w-3xl mx-auto shadow border rounded-xl p-10'>
            <div className='max-w-lg mx-auto shadow py-6 p-4 border rounded-md'>
                <h1 className='Manrope text-xl font-bold text-center uppercase'>Please Register Here <i class="fa-regular fa-registered"></i> </h1>
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout='vertical'
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    >
                    
                    <Row gutter={10}>
                      <Col span={12}>
                      <Form.Item
                        className='Manrope'
                        label="Firstname"
                        name="firstname"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your username!',
                            },
                        ]}
                        >
                        <Input className='rounded Manrope'/>
                      </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          className='Manrope'
                          label="Lastname"
                          name="lastname"
                          rules={[
                              {
                              required: true,
                              message: 'Please input your lastname!',
                              },
                          ]}
                          >
                          <Input className='rounded Manrope'/>
                          </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={10}>
                      <Col span={12}>
                      <Form.Item
                        className='Manrope'
                        label="TelePhone"
                        name="tel"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your telephone!',
                            },
                        ]}
                        >
                        <Input type='number' className='rounded Manrope'/>
                      </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                            className='Manrope'
                            label="Password"
                            name="password"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your password!',
                                },
                            ]}
                            >
                            <Input.Password size='large' className='Manrope' />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={10}>
                        <Col span={14}>
                          <Form.Item
                            className='Manrope'
                            label="Email"
                            name="email"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your email!',
                                },
                            ]}
                            >
                            <Input type='email' className='rounded Manrope'/>
                          </Form.Item>
                        </Col>

                        <Col span={10}>
                          <Form.Item
                            className='Manrope'
                            label="Base Salary"
                            name="base_salary"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your salary!',
                                },
                            ]}
                            >
                            <Input type='number' className='rounded Manrope'/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        className='Manrope'
                        label="Address"
                        name="address"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your address!',
                            },
                        ]}
                        >
                        <Input.TextArea className='rounded Manrope'/>
                    </Form.Item>
                    
                    <Col span={14}>
                      <Form.Item
                        className='Manrope'
                        label="Choose Profile Image"
                        name="image"
                        rules={[
                            {
                            required: true,
                            message: 'Please choose image!',
                            },
                        ]}
                        >
                        <Input  onChange={onChnageFile} type='file' className='rounded-md border Manrope'/>
                      </Form.Item>
                    </Col>

                    <div className='mt-3 Manrope text-center' >
                    Already have an account?   
                    <a onClick={()=> navigate('/dashboard/login')} className='text-blue-400'> Login</a>
                    </div>
        
                    
                    <Button size='large' type="primary" className='shadow w-full mt-3 bg-blue-400 Manrope' htmlType="submit">
                      Register
                    </Button>
                </Form>
            </div>
        </main>
  )
}
