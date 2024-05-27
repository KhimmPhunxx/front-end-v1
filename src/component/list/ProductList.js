import React from 'react'
import {Rate} from 'antd';
import { FaHeart } from "react-icons/fa";

export default function ProductList(props) { // 1. Create a component called ProductList
  return (
    <main>
        <div className=''>
            <div className='w-full h-44'>
                <img src={props.image} alt="" className='w-full h-full object-cover' />
            </div>
            <div className='justify-between flex mt-3'>
                <div className='text-xl font-bold'>{props.name}</div>
                <FaHeart className='text-red-500 mt-1' />
            </div>
            <div>{props.price}</div>
            <div>{props.desc}</div>
            <Rate />
           
        </div>
    </main>
  )
}
