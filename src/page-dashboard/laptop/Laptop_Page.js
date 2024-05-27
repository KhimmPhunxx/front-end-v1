// 
import React, { useEffect, useState } from 'react'
import  request  from '../../share/request';
import { Col, Form, Input, Modal, Row, Select, Table, message } from 'antd';
import { Config, formateDateClient } from '../../share/helper';
const { Option } = Select;

export default function Laptop_Page() {

  const [list,setList] = useState([]);
  const [lclist,setLcList] = useState([]);
  const [form] = Form.useForm();
  const [visible,setVisible] = useState(false);
  const [file,setFile] = useState(null);
  const [visibleConfirm, setVisibleConfirm] = useState(false)
  const [laptopID, setLaptopID] = useState(null)
  const [laptopIDEdit, setLaptopIDEdit] = useState(null)

  useEffect(() => {
    getList();
  }, [])

  const getList = () => {
    request("laptop","get").then(res => {
      if(res){
        setList(res.data)
        setLcList(res.data)
      }
    })
  }

  const onFinish = (values) => {
   if(laptopIDEdit == null){
      var formData = new FormData();
        formData.append('name',values.name)
        formData.append('price',values.price)
        formData.append('desc',values.desc)
        formData.append('cpu',values.cpu)
        formData.append('ram',values.ram)
        formData.append('storage',values.storage)
        formData.append('graphic',values.graphic)
        formData.append('display',values.display)
        formData.append('keyboard',values.keyboard)
        formData.append('os',values.os)
        formData.append('weigh',values.weigh)
        formData.append('warranty1',values.warranty1)
        formData.append('warranty2',values.warranty2)
        formData.append('free1',values.free1)
        formData.append('free2',values.free2)
        formData.append('free3',values.free3)
        formData.append('lt_image',file,file.filename)
        request("laptop","post",formData,{
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
        formData.append('id',laptopIDEdit)
        formData.append('name',values.name)
        formData.append('price',values.price)
        formData.append('desc',values.desc)
        formData.append('cpu',values.cpu)
        formData.append('ram',values.ram)
        formData.append('storage',values.storage)
        formData.append('graphic',values.graphic)
        formData.append('display',values.display)
        formData.append('keyboard',values.keyboard)
        formData.append('os',values.os)
        formData.append('weigh',values.weigh)
        formData.append('warranty1',values.warranty1)
        formData.append('warranty2',values.warranty2)
        formData.append('free1',values.free1)
        formData.append('free2',values.free2)
        formData.append('free3',values.free3)
        formData.append('lt_image',file,file.filename)
        request("laptop","put",formData,{
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
    setLaptopIDEdit(value.id)
    form.setFieldsValue({
        name: value.name,
        price: value.price,
        desc: value.desc,
        cpu: value.cpu,
        ram: value.ram,
        storage: value.storage,
        graphic: value.graphic,
        display: value.display,
        keyboard: value.keyboard,
        os: value.os,
        weigh: value.weigh,
        warranty1: value.warranty1,
        warranty2: value.warranty2,
        free1: value.free1,
        free2: value.free2,
        free3: value.free3,
        
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
    setLaptopID(param.id)
    setVisibleConfirm(true)
  }

  const onRemove = () => {
    request("laptop/"+laptopID,"delete").then(res => {
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
            scroll={{ x: 3000 }}
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
              title: 'Category',
              dataIndex: 'laptop_cate_id',
              key: 'name',
            },
            {
              key : "category",
              title: "Category",
              dataIndex: "name",
              className : "Manrope"
            },
            {
              className: "Manrope",
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              className: "Manrope",
              title: 'Price',
              dataIndex: 'price',
              key: 'price',
            },
            {
              className: "Manrope",
              title: 'Desc',
              dataIndex: 'desc',
              key: 'desc',
            },
            {
              className: "Manrope",
              title: 'CPU',
              dataIndex: 'cpu',
              key: 'cpu',
            },
            {
              className: "Manrope",
              title: 'RAM',
              dataIndex: 'ram',
              key: 'ram',
            },
            {
              className: "Manrope w-32",
              title: 'Storage',
              dataIndex: 'storage',
              key: 'storage',
            },
            {
                className: "Manrope w-32",
                title: 'Graphic',
                dataIndex: 'graphic',
                key: 'graphic',
            },
            {
                className: "Manrope w-32",
                title: 'Display',
                dataIndex: 'display',
                key: 'display',
            },
            {
                className: "Manrope w-32",
                title: 'Keyboard',
                dataIndex: 'keyboard',
                key: 'keyboard',
            },
            {
                className: "Manrope w-32",
                title: 'OS',
                dataIndex: 'os',
                key: 'os',
            },
            {
                className: "Manrope w-32",
                title: 'Weigh',
                dataIndex: 'weigh',
                key: 'weigh',
            },
            {
                className: "Manrope w-32",
                title: 'Warranty1',
                dataIndex: 'warranty1',
                key: 'warranty1',
            },
            {
                className: "Manrope w-32",
                title: 'Warranty2',
                dataIndex: 'warranty2',
                key: 'warranty2',
            },
            {
                className: "Manrope w-32",
                title: 'Free1',
                dataIndex: 'free1',
                key: 'free1',
            },
            {
                className: "Manrope w-32",
                title: 'Free2',
                dataIndex: 'free2',
                key: 'free2',
            },
            {
                className: "Manrope w-32",
                title: 'Free3',
                dataIndex: 'free3',
                key: 'free3',
            },
            {
              key: 'lt_image',
              title: 'Photo',
              dataIndex: 'lt_image',
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
              dataIndex: 'import_date',
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
         width={1200}
          maskClosable={false}
          open={visible}
          onCancel={onCloseModal}
          footer={null}
          title={laptopIDEdit == null ? "Create Employee" : "Update Employee"}
          className='Manrope'
        >
          <Form
            form={form}
            onFinish={onFinish}
            layout='vertical'
          >
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  className="Manrope"
                  label='Name'
                  name='name'
                  rules={[{ required: true, message: 'Please input name!' }]}
                >
                  <Input className='rounded-md' />
                </Form.Item>
              </Col>
              <Col span={8}>
                  <Form.Item
                    className='Manrope'
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please select your category!' }]}
                  >
                  <Select
                    placeholder="Select category"
                    allowClear={true}
                    // rules={[{ required: true, message: 'Please select your category!' }]}
                  >
                    {
                      lclist?.map((item, index) => {
                        return (
                          <Option value={item.laptop_cate_id} key={index}>{item.name}</Option>
                        )
                      })
                    }

                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  className="Manrope"
                  label='Price'
                  name='price'
                  rules={[{ required: true, message: 'Please input price!' }]}
                >
                  <Input className='rounded-md' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  className="Manrope"
                  label='Desc'
                  name='desc'
                  rules={[{ required: true, message: 'Please input desc!' }]}
                >
                  <Input className='rounded-md' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  className="Manrope"
                  label='CPU'
                  name='cpu'
                  rules={[{ required: true, message: 'Please input cpu!' }]}
                >
                  <Input className='rounded-md' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  className="Manrope"
                  label='RAM'
                  name='ram'
                  rules={[{ required: true, message: 'Please input ram!' }]}
                >
                  <Input className='rounded-md' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  className="Manrope"
                  label='Storage'
                  name='storage'
                  rules={[{ required: true, message: 'Please input storage!' }]}
                >
                  <Input className='rounded-md' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  className="Manrope"
                  label='Graphic'
                  name='graphic'
                  rules={[{ required: true, message: 'Please input graphic!' }]}
                >
                  <Input className='rounded-md' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  className="Manrope"
                  label='Display'
                  name='display'
                  rules={[{ required: true, message: 'Please input display!' }]}
                >
                  <Input className='rounded-md' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  className="Manrope"
                  label='Keyboard'
                  name='keyboard'
                  rules={[{ required: true, message: 'Please input keyboard!' }]}
                >
                  <Input className='rounded-md' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  className="Manrope"
                  label='OS'
                  name='os'
                  rules={[{ required: true, message: 'Please input os!' }]}
                >
                  <Input className='rounded-md' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  className="Manrope"
                  label='Weigh'
                  name='weigh'
                  rules={[{ required: true, message: 'Please input weigh!' }]}
                >
                  <Input className='rounded-md' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  className="Manrope"
                  label='Warranty1'
                  name='warranty1'
                  rules={[{ required: true, message: 'Please input warranty1!' }]}
                >
                  <Input className='rounded-md' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  className="Manrope"
                  label='Warranty2'
                  name='warranty2'
                  rules={[{ required: true, message: 'Please input warranty2!' }]}
                >
                  <Input className='rounded-md' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  className="Manrope"
                  label='Free1'
                  name='free1'
                  rules={[{ required: true, message: 'Please input free1!' }]}
                >
                  <Input className='rounded-md' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  className="Manrope"
                  label='Free2'
                  name='free2'
                  rules={[{ required: true, message: 'Please input free2!' }]}
                >
                  <Input className='rounded-md' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  className="Manrope"
                  label='Free3'
                  name='free3'
                  rules={[{ required: true, message: 'Please input free3!' }]}
                >
                  <Input className='rounded-md' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  className="Manrope"
                  label='Image'
                  name='lt_image'
                  rules={[{ message: 'Please input image!' }]}
                >
                  <input type='file' onChange={onChnageFile} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item className='border-t'>
              <div className='space-x-3 mt-3' style={{float: "right"}}>
                <button onClick={onCloseModal} className='border Manrope text-sm uppercase text-gray-600 px-3 py-2 rounded-md hover:bg-blue-100 hover:duration-200'>Cancel</button>
                <button type='submit' className='bg-blue-400 Manrope text-sm uppercase text-white px-3 py-2 rounded-md hover:bg-blue-500 hover:duration-200'> {laptopIDEdit == null ? "Save" : "Update" } </button>
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
