// 
import React, { useEffect, useState } from 'react'
import  request  from '../../share/request';
import { Col, Form, Input, Modal, Row, Table, message } from 'antd';
import './EmployeeDashboard.css'
import { Config, formateDateClient } from '../../share/helper';


export default function EmployeeDashboard() {

  const [list,setList] = useState([]);
  const [form] = Form.useForm();
  const [visible,setVisible] = useState(false);
  const [file,setFile] = useState(null);
  const [visibleConfirm, setVisibleConfirm] = useState(false)
  const [employeeId, setEmployeeId] = useState(null)
  const [employeeIdEdit, setEmployeeIdEdit] = useState(null)

  useEffect(() => {
    getList();
  }, [])

  const getList = () => {
    request("employee","get").then(res => {
      if(res){
        setList(res.list_employee)
      }
    })
  }

  const onFinish = (values) => {
   if(employeeIdEdit == null){
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
          getList()
          setVisible(false)
          form.resetFields()
        }
      })
    }else{
      var formData = new FormData();
      formData.append('employee_id',employeeIdEdit)
      formData.append('firstname',values.firstname)
      formData.append('lastname',values.lastname)
      formData.append('tel',values.tel)
      formData.append('password',values.password)
      formData.append('email',values.email)
      formData.append('base_salary',values.base_salary)
      formData.append('address',values.address)
      formData.append('image_empl',file,file.filename)
      request("employee","put",formData,{
        headears : {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        if(res){
          message.success(res.message)
          getList()
          setVisible(false)
          form.resetFields()
        }
      })
    }
  }

  const onEdite = (value) => {
    setVisible(true)
    setEmployeeIdEdit(value.employee_id)
    form.setFieldsValue({
      firstname : value.firstname,
      lastname : value.lastname,
      tel : value.tel,
      email : value.email,
      base_salary : value.base_salary,
      address : value.address,
      image_empl : value.image_empl
    })
  }
  const onCloseModal = () => {
    setVisible(false)
    form.resetFields()
  }

  const onChnageFile = (e) => {
    console.log(e.target.files[0])
    var file = e.target.files[0]
    setFile(file)
  }

  const onDelete = (param) => {
    setEmployeeId(param.employee_id)
    setVisibleConfirm(true)
  }

  const onRemove = () => {
    request("employee/"+employeeId,"delete").then(res => {
      if(res){
        getList()
        setVisibleConfirm(false)
      }
    })
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
              className: "Manrope",
              title: 'No',
              dataIndex: '',
              key: 'no',
              render : (text,record,index) => index+1
            },
            {
              className: "Manrope",
              title: 'First Name',
              dataIndex: 'firstname',
              key: 'firstname',
            },
            {
              className: "Manrope",
              title: 'Last Name',
              dataIndex: 'lastname',
              key: 'lastname',
            },
            {
              className: "Manrope",
              title: 'Tel',
              dataIndex: 'tel',
              key: 'tel',
            },
            {
              className: "Manrope",
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
            },
            {
              className: "Manrope",
              title: 'Salary',
              dataIndex: 'base_salary',
              key: 'base_salary',
            },
            {
              className: "Manrope w-32",
              title: 'Address',
              dataIndex: 'address',
              key: 'address',
            },
            {
              key: 'image_empl',
              title: 'Photo',
              dataIndex: 'image_empl',
              render : (text) => {
                return (
                  <img 
                  src={Config.image_path+text}
                  className='h-10 w-10 rounded-full object-cover'  />
                )
              }
            },
            {
              className: "Manrope",
              title: 'Create At',
              dataIndex: 'creat_at',
              key: 'creat_at',
              render : (text) =>{
                return formateDateClient(text)
              },
            },
            {
              title: 'Action',
              key: 'update_at',
              render : (text, record, index) =>{
                return (
                  <div className='space-x-2 px-2 border-l'>
                    <button onClick={()=> onEdite(record)} className='bg-blue-400 text-sm uppercase text-white px-2 py-1 rounded-md hover:bg-blue-500 hover:duration-200'><i class="fa-solid fa-pen-to-square"></i></button>
                    <button onClick={()=> onDelete(record)} className='bg-red-400 text-sm uppercase text-white px-2 py-1 rounded hover:bg-red-500 hover:duration-200'><i class="fa-solid fa-trash-can"></i></button> 
                  </div>
                )
              },
            },
           
          ]}
          dataSource={list}
        />

      <Modal
          maskClosable={false}
          open={visible}
          onCancel={onCloseModal}
          footer={null}
          title={employeeIdEdit == null ? "Create Employee" : "Update Employee"}
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
                  label="Firstname"
                  name="firstname"
                  rules={[{ required: true, message: 'Please input your firstname!' }]}
                >
                  <input className='Manrope border w-full px-2 py-1 rounded-md' placeholder='Firstname' />
                  
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                 
                  label="Lastname"
                  name="lastname"
                  rules={[{ required: true, message: 'Please input your lastname!' }]}
                >
                  <input className='border Manrope w-full px-2 py-1 rounded-md' placeholder='Lastname' />                
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  
                  label="Telephone"
                  name="tel"
                  rules={[{ required: true, message: 'Please input your telephone!' }]}
                >
                  <input className='border Manrope w-full px-2 py-1 rounded-md' placeholder='telephone' />
                  
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password className='border Manrope w-full px-2 py-1 rounded-md' placeholder='password' />
                </Form.Item>
              </Col>
            </Row>

            <Col span={24}>
                <Form.Item
                  label="Salary"
                  name="base_salary"
                >
                  <Input type='number' className='border Manrope w-full px-2 py-1 rounded-md' placeholder='base salary' />
                </Form.Item>
              </Col>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input className='border Manrope w-full px-2 py-1 rounded-md' placeholder='email' /> 
            </Form.Item>
             
            <Form.Item
            
              label="Address"
              name="address"
            >
              <textarea rows={3} className='border Manrope w-full px-2 py-1 rounded-md' placeholder='address' />
            </Form.Item>

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
                <button type='submit' className='bg-blue-400 Manrope text-sm uppercase text-white px-3 py-2 rounded-md hover:bg-blue-500 hover:duration-200'> {employeeIdEdit == null ? "Save" : "Update" } </button>
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
