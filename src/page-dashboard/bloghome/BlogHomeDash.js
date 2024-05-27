import React, { useEffect, useState } from 'react'
import request from '../../share/request';
import { Config } from '../../share/helper';
import './bloghomedash.css'
import { Col, Form, Input, Modal, Row, message } from 'antd';

export default function BlogHomeDash() {
    const [list , setList] = useState([])
    const [visibleConfirm, setVisibleConfirm] = useState(false)
    const [item, setItem] = useState({})
    const [visible, setVisible] = useState(false)
    const [imageUpload, setImageUpload] = useState([])
    const [form] = Form.useForm();
    const [blogIdEdit, setBlogIdEdit] = useState('')


    useEffect(() => {
        getlist();
     }, []);

    const getlist = async () => {
        request("blog_home", "get").then((res) => {
          if(res){
            setList(res.data);
          }
        });
      }

    const onDelete = (item) => {
        setVisibleConfirm(true)
        setItem(item)
    }

    const onRemove = async () => {
        setVisibleConfirm(false)
        const res = await request("blog_home", "delete", item)
        if(res){
            getlist()
        }
    }

    const onCloseModal = () => {
        setVisible(false)
        form.resetFields()
        setBlogIdEdit(null)
    }

    const onFinish = async (values) => {
        if(blogIdEdit == null){
            var formData = new FormData();
            formData.append('name', values.name)
            formData.append('desc', values.desc)
            formData.append('blog_image', imageUpload, imageUpload.filename)
            const res = await request("blog_home", "post", formData, {
                headers : {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (res) {
                getlist()
                setVisible(false)
                form.resetFields()
            }
        }else{
            var formData = new FormData();
            formData.append('blog_home_id', blogIdEdit)
            formData.append('name', values.name)
            formData.append('desc', values.desc)
            formData.append('blog_image', imageUpload, imageUpload.filename)
            const res = await request("blog_home", "put", formData, {
                headers : {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (res) {
                message.success(res.message)
                getlist()
                setVisible(false)
                form.resetFields()
            }
        }
    }

    const onEdit = (values) => {
        setVisible(true)
        setBlogIdEdit(values.blog_home_id)
        form.setFieldsValue({
            name: values.name,
            desc: values.desc,
            // imageUpload: values.blog_image

        });
    }

    const onChnageFile = (e) => {
        var file = e.target.files[0]
        setImageUpload(file)
    }

  return (
    <main>
        <div>
            <button onClick={()=> setVisible(true)} className='bg-blue-400 Manrope hover:bg-blue-500 duration-300 text-white px-4 py-2 rounded'>New <i class="fa-solid fa-file-circle-plus"></i></button>
        </div>
        <div className='grid grid-cols-3 mt-2 gap-3'>
            {
                list.map((item,index) => (
                    <div key={index} className='w-[98%] h-[500px] border bg-gray-100 rounded '>
                        <div className='w-full h-[60%]'> 
                            <img className='w-full h-full object-cover rounded' src={Config.image_path+item.blog_image} alt="" />
                        </div>
                        <div className='px-2 box-border'>
                            <h1 className='text-2xl Manrope '>{item.name}</h1>
                            <p className='text-sm Manrope box-border line-clamp-4'>{item.desc}</p>
                        </div>
                        <div className='px-2 space-x-2'>
                            <button onClick={()=> onEdit(item)} className='bg-blue-400 text-white px-4 py-2 rounded'><i class="fa-regular fa-edit"></i></button>
                            <button onClick={()=> onDelete(item)} className='bg-red-400 text-white px-4 py-2 rounded'><i class="fa-regular fa-trash-can"></i></button>
                        </div>
                    </div>
                ))
            }
        </div>

        <Modal
          maskClosable={false}
          open={visible}
          onCancel={onCloseModal}
          footer={null}
          title={blogIdEdit == null ? "Create New" : "Update"}
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
                  name="name"
                  rules={[{ required: true, message: 'Please input your name!' }]}
                >
                  <input className='Manrope border w-full px-2 py-1 rounded-md' placeholder='name...' />
                  
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={24}>
                <Form.Item
                  className='Manrope'
                  label="Description"
                  name="desc"
                  rules={[{ required: true, message: 'Please input your image!' }]}
                >
                  <Input.TextArea className='Manrope border w-full px-2 py-1 rounded-md' placeholder='name...' />
                  
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  pan={12}
                  className='Manrope'
                  label="Choose Image"
                  name="blog_image"
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
                <button type='submit' className='bg-blue-400 Manrope text-sm uppercase text-white px-3 py-2 rounded-md hover:bg-blue-500 hover:duration-200'> {blogIdEdit == null ? "Save" : " Update" } </button>
              </div>
           </Form.Item>
          </Form>
      </Modal>

        <Modal
          title="DELETE NOW"
          open={visibleConfirm}
          footer={null}
          onCancel={() => setVisibleConfirm(false)}
          onOk={()=> onDelete()}
        >
          <p className='border-t pt-3'>Are You Sure to Detete this Item Now!!</p>
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
