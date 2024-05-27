import React, { useEffect, useState } from 'react'
import request from '../../share/request'
import { Table, Tag, Modal, Form, Row, Col, Input, Select, message } from 'antd';
import { formateDateClient, isEmptyOrNull, Config } from '../../share/helper';
import './CategoryDashboard.css'
import Search from 'antd/es/input/Search';
const { Option } = Select;


export default function ProductDashboard() {

  const [list, setList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [brand, setBrand] = useState([]);
  const [visble, setVisible] = useState(false);
  const [productIdEdit, setProductIdEdit] = useState(null);
  const [form] = Form.useForm();
  const [txtSearch, setTxtSearch] = useState("")
  const [categorySearch, setCategorySearch] = useState(null)
  const [productStatus, setProductStatus] = useState(null)
  const [imageUpload, setImageUpload] = useState(null)


  useEffect(() => {
    if(txtSearch == "" && categorySearch == null && productStatus == null){
      getList();
    }
  }, [txtSearch, categorySearch, productStatus])

  const getList = () => {
    var param = "?txtSearch="+txtSearch
    if(!isEmptyOrNull(categorySearch)){
      param += "&categoryId=" + categorySearch
    }
    if(!isEmptyOrNull(productStatus)){
      param += "&productStatus=" + productStatus
    }
    request("product"+param,"get",{}).then(res => {
      console.log(res)
      if(res){
        setList(res.data)
        setCategoryList(res.data_category)
        setBrand(res.data_brand)
      }
    })
  }

  const onClear = () => {
    setTxtSearch("")
    setCategorySearch(null)
    setProductStatus(null)
    // getList();
  }

  const onCancelModal = () => {
    setVisible(false)
    setProductIdEdit(null)
    form.resetFields();
  }

  const onFinish = (item) => {
    if(productIdEdit == null){
      var formData = new FormData();
      formData.append("category_id",item.category)
      formData.append("barcode",item.barcode)
      formData.append("name",item.product_name)
      formData.append("quantity",item.quantity)
      formData.append("price",item.price)
      formData.append("description",item.description)
      formData.append("image_emp",imageUpload,imageUpload.filename)
      request("product","post",formData,{
        headers : {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        if(res){
          message.success(res.message)
          form.resetFields();
          setVisible(false);
          getList();
        }
      })
    }
    else{
      var formData = new FormData();
      formData.append("product_id",productIdEdit)
      formData.append("category_id",item.category)
      formData.append("barcode",item.barcode)
      formData.append("name",item.product_name)
      formData.append("quantity",item.quantity)
      formData.append("price",item.price)
      formData.append("description",item.description)
      formData.append("image_emp",imageUpload,imageUpload.filename)
      request("product","put",formData,{
        headers : {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
       
        if(res){
          message.success(res.message)
          form.resetFields();
          setVisible(false);
          getList();
        }
      })
    }
  }


  const onEditClick = (item) => {
    console.log(item)
    setProductIdEdit(item.product_id)
    form.setFieldsValue({
      category: item.category_id,
      barcode: item.barcode,
      product_name: item.name,
      quantity: item.quantity,
      price: item.price,
      brand: item.brand_id,
      description: item.description,
      // imageUpload : imageUpload
    });
    setVisible(true)
  }
  const onDelete = (item) => {
    console.log(item)
    var param = {
      id:item.product_id
    }
    request("product/","delete",param).then(res => {
      if(res){
        message.success(res.message)
        getList();
      }
    })
  }

  const onChnageFile = (event) => {
    var file = event.target.files[0]
    setImageUpload(file)
  }

  return (
    <main>
        {/* create new button create */}
        <div className='flex mt-2'>
          <button onClick={() => setVisible(true)} className='bg-blue-400 Manrope text-sm uppercase text-white px-3 py-2 rounded-md hover:bg-blue-500 hover:duration-200'>New Product <i class="fa-solid fa-plus"></i></button>
        </div>
        <div className='mt-3 space-x-3'>
        <Search
          value={txtSearch}
          placeholder="Search..."
          allowClear
          style={{
            width: 150,
          }}
          onChange={(event) => setTxtSearch(event.target.value)}
        />

        <Select 
        value={categorySearch}
        className='w-[150px]' 
        allowClear placeholder="Category"
        onChange={(value) => setCategorySearch(value)}
        > 
         {
            categoryList?.map((item, index) => {
              return (
                <Option value={item.category_id} key={index}>{item.name}</Option>
              )
            })
         }
        </Select>

        <Select 
        value={productStatus}
        onChange={(value) => setProductStatus(value)}
        className='w-[100px]' 
        allowClear 
        placeholder="Status"
        >
          <Option value="1">Active</Option>
          <Option value="0">Disable</Option>
        </Select>

        <button onClick={()=> getList()} className='bg-blue-400 Manrope text-sm text-white px-3 py-2 rounded-md hover:bg-blue-500 hover:duration-200'>Search</button>
        <button onClick={()=> onClear()} className='bg-gray-100 Manrope text-sm text-blue-600 border px-3 py-2 rounded-md hover:bg-gray-200 hover:duration-200'>Clear</button>
        

        </div>
        <Table
        className='mt-3 shadow border bg-gray-100'
        columns={[
          {
            key : "no",
            title: "No",
            className : "Manrope",
            render : (text, record, index) => {
              return index + 1
            }
            
          },
          {
            key : "barcode",
            title: "Barcode",
            dataIndex: "barcode",
            className : "Manrope"
            
          },
          {
            key : "name",
            title: "Name",
            dataIndex: "name",
            className : "Manrope"
            
          },
          {
            key : "quantity",
            title: "Quantity",
            dataIndex: "quantity",
            className : "Manrope"
          },
          {
            key : "price",
            title: "Price",
            dataIndex: "price",
            className : "Manrope"
          },
          {
            key : "image",
            title: "Image",
            dataIndex: "image",
            render : (value) => {
              return (
                <img 
                className='rounded-sm'
                src={Config.image_path+value} 
                width={30}
                height={20} />
              )
            }
          },
          {
            key : "category",
            title: "Category",
            dataIndex: "category_name",
            className : "Manrope"
          },
          {
            key : "description",
            title: "Description",
            dataIndex: "description",
            className : "Manrope max-w-[150px] overflow-hidden line-clamp-3"
          },
          {
            key : "is_active",
            title: "Active",
            dataIndex: "is_active",
            render : (text, record, index)=>{
              return (
                <Tag className="Manrope" color={text == 1 ? "green" : "red" } key={1}>
                  {text == 1 ? "Active" : "Disable"}
                </Tag>
              )
            }
          },
          {
            key : "create_at",
            title: "Create",
            dataIndex: "create_at",
            render : (text, record, index) =>{
              return formateDateClient(text)
            },
            className : "Manrope"
          },
          {
            key : "action",
            title: "Action",
            className : "Manrope",
            render : (text, record, index) =>{
              return (
                <div className='space-x-2 px-2 border-l'>
                  <button onClick={() => onEditClick(record)} className='bg-blue-400 text-sm uppercase text-white px-2 py-1 rounded-md hover:bg-blue-500 hover:duration-200'><i class="fa-solid fa-pen-to-square"></i></button>
                  <button onClick={() => onDelete(record)} className='bg-red-400 text-sm uppercase text-white px-2 py-1 rounded hover:bg-red-500 hover:duration-200'><i class="fa-solid fa-trash-can"></i></button> 
                </div>
              )
            }
          },
        ]}
            dataSource={list}
        />

        <Modal
          className='Manrope'
          open={visble}
          title={productIdEdit == null ? "Create" : "Update"}
          onCancel={onCancelModal}
          footer={null}
          maskClosable={false}
          width={600}
        >
          <Form layout="vertical" form={form} onFinish={onFinish}>
              <Row gutter={10}>
                <Col span={12}>
                    <Form.Item
                      className='Manrope'
                      label="Barcode"
                      name="barcode"
                      rules={[{ required: true, message: 'Please input your barcode!' }]}
                    >
                      <Input allowClear={true} className='border border-gray-600 p-2 rounded' placeholder='barcode' />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        className='Manrope'
                        label="Product Name"
                        name="product_name"
                        rules={[{ required: true, message: 'Please input your product name!' }]}
                      >
                      <Input allowClear={true} className='border border-gray-600 p-2 rounded' placeholder='product name' />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={10}>
              <Col span={12}>
                  <Form.Item
                    className='Manrope'
                    label="Quantity"
                    name="quantity"
                    rules={[{ required: true, message: 'Please input your quantity!' }]}
                  >
                    <Input allowClear={true} className='border border-gray-600 p-2 rounded' placeholder='quantity' />
                  </Form.Item>
              </Col>

              <Col span={12}>
                  <Form.Item
                      className='Manrope'
                      label="Price"
                      name="price"
                      rules={[{ required: true, message: 'Please input your price!' }]}
                     
                    >
                    <Input allowClear={true} className='border border-gray-600 p-2 rounded' placeholder='price' />
                  </Form.Item>
              </Col>
            </Row>

            <Row gutter={10}>
              <Col span={12}>
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
                      categoryList?.map((item, index) => {
                        return (
                          <Option value={item.category_id} key={index}>{item.name}</Option>
                        )
                      })
                    }

                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                  <Form.Item
                    className='Manrope'
                    label="Brand"
                    name="brand"
                  >
                  <Select
                    placeholder="Select brand"
                    allowClear={true}
                  >
                    {
                      brand?.map((item, index) => {
                        return (
                          <Option value={item.id} key={index}>{item.name}</Option>
                        )
                      })
                    }

                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={10}>
              <Col span={24}>
                  <Form.Item
                      className='Manrope'
                      label="Description"
                      name="description"
                      rules={[{ required: true, message: 'Please input your description!' }]}
                    >
                    <Input.TextArea allowClear={true} className='border border-gray-600 p-2 rounded' placeholder='description' />
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
                <button onClick={onCancelModal} className='border Manrope text-sm uppercase text-gray-600 px-3 py-2 rounded-md hover:bg-blue-100 hover:duration-200'>Cancel</button>
                <button onClick={()=> form.resetFields()} className='border Manrope text-sm uppercase text-gray-600 px-3 py-2 rounded-md hover:bg-blue-100 hover:duration-200'>Clear</button>
                <button type='submit' className='bg-green-400 Manrope text-sm uppercase text-white px-3 py-2 rounded-md hover:bg-green-500 hover:duration-200'> {productIdEdit == null ? "Save" : "Update"} </button>
              </div>
           </Form.Item>

          </Form>
        </Modal>

    </main>
    


  )
}
