import { Col, Form, Input, Modal, Row, Table, message } from 'antd';
import React, { useEffect, useState } from 'react'
import request from '../../share/request';
import { Config, formateDateClient } from '../../share/helper';

export default function CateDashNew() {
    const [list, setList] = useState([])
    const [visible, setVisible] = useState(false)
    const [imageUpload, setImageUpload] = useState([])
    const [form] = Form.useForm();
    const [visibleConfirm, setVisibleConfirm] = useState(false)
    const [item, setItem] = useState({})
    const [categoryIdEdit, setCategoryIdEdit] = useState(null)

    useEffect(() => {
        getList()
    }, [])

    const getList = async () => {
        request('category', 'get').then(res => {
            if (res) {
                setList(res.data_category)
            }
        })
    }

    const onCloseModal = () => {
        setVisible(false)
        form.resetFields()
        setCategoryIdEdit(null)
    }


    const onFinish = async (values) => {
        if( categoryIdEdit == null ){
            var formData = new FormData();
            formData.append('name', values.name)
            formData.append('description', values.description)
            formData.append('parent_id', values.parent_id)
            formData.append('status', values.status)
            formData.append('cate_image', imageUpload, imageUpload.filename)
            const res = await request("category", "post", formData, {
                headers : {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (res) {
                getList()
                setVisible(false)
                form.resetFields()
            }
        }else{
            var formData = new FormData();
            formData.append('category_id', categoryIdEdit)
            formData.append('name', values.name)
            formData.append('description', values.description)
            formData.append('parent_id', values.parent_id)
            formData.append('status', values.status)
            formData.append('cate_image', imageUpload, imageUpload.filename)
            const res = await request("category", "put", formData, {
                headers : {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (res) {
                message.success(res.message)
                getList()
                setVisible(false)
                form.resetFields()
                setCategoryIdEdit(null)
            }
        }
       
    }

    const onEditeClick = (values) => {
        setVisible(true)
        setCategoryIdEdit(values.category_id)
        form.setFieldsValue({
            name: values.name,
            description: values.description,
            parent_id: values.parent_id,
            status: values.status,
            // imageUpload : imageUpload
        })
       
    }

    const onChnageFile = (e) => {
        var file = e.target.files[0]
        setImageUpload(file)
    }

    const onDelete = async (item) => {
        setVisibleConfirm(true)
        setItem(item)
    }

    const onRemove = async () => {
        setVisibleConfirm(false)
        const res = await request("category","delete",{
            category_id : item.category_id
        })
        if(res){
            getList()
        }
    }


  return (
   <>
    <div>
        <button onClick={()=> setVisible(true)} className='bg-blue-400 Manrope text-sm uppercase text-white px-3 py-2 rounded-md hover:bg-blue-500 hover:duration-200'>Add New <i class="fa-solid fa-plus"></i></button>
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
          dataIndex: 'name',
        },
        {
          className: "Manrope",
          key: 'description',
          title: 'Description',
          dataIndex: 'description',
        },
        {
            className: "Manrope",
            key: 'parent_id',
            title: 'Parent_id',
            dataIndex: 'parent_id',
        },
        {
            className: "Manrope",
            key: 'status',
            title: 'Status',
            dataIndex: 'status',
        },
        {
          className: "Manrope",
          key: 'cate_image',
          title: 'Image',
          dataIndex: 'cate_image',
          render: (value) => {
            return (
              <div className='w-10 h-8'>
                <img src={Config.image_path+value} className='rounded w-full h-full object-cover border'  alt="image"/>
              </div>
            )
          }
        },
        {
            className: "Manrope",
            key: 'create',
            title: 'Create_at',
            dataIndex: 'create',
            render: (value) => {
                return formateDateClient(value)
            }
        },
        {
          className: "Manrope",
          key: 'action',
          title: 'Action',
          render: (text,record,index) => {
            return (
              <div className='space-x-2'>
                <button onClick={()=> onEditeClick(record)} className='bg-blue-400 Manrope text-sm uppercase text-white px-3 py-2 rounded-md hover:bg-blue-500 hover:duration-200'> <i class="fa-solid fa-edit"></i></button>
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
          title={categoryIdEdit == null ? "Create New" : "Edit"}
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
                  name="name"
                  rules={[{ required: true, message: 'Please input your name!' }]}
                >
                  <input className='Manrope border w-full px-2 py-1 rounded-md' placeholder='name...' />
                  
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                 
                  label="Status"
                  name="status"
                  rules={[{ required: true, message: 'Please input your status!' }]}
                >
                  <input className='border Manrope w-full px-2 py-1 rounded-md' placeholder='status..' />                
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
                 
                 label="Description"
                 name="description"
                 rules={[{ required: true, message: 'Please input your description!' }]}
               >
                 <Input.TextArea className='border Manrope w-full px-2 py-1 rounded-md' placeholder='des..' />                
               </Form.Item>


            <Row>
              <Col span={12}>
                <Form.Item
                  pan={12}
                  className='Manrope'
                  label="Choose Image"
                  name="image"
                  rules={[{ required: true, message: 'Please input your image!' }]}
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
                <button type='submit' className='bg-blue-400 Manrope text-sm uppercase text-white px-3 py-2 rounded-md hover:bg-blue-500 hover:duration-200'> {categoryIdEdit == null ? "Save" : "Update"} </button>
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
          <p className='border-t pt-3'>Are You Sure to Detete this Category Now!!</p>

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
