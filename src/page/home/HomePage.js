import React from 'react'
import './HomePage.css'
import computer from '../../assets/image/computer_store.jpg'
import { useNavigate } from 'react-router-dom';
//  import {IoCart, IoHome, IoRemove,} from "react-icons/io5";

export default function HomePage() {
  const navigate = useNavigate();
 
  return (
    <>
     {/* <div className='w-full'> <CarouselHomeSlider/></div> */}
      <main className='max-w-full h-screen bg-blue-200 Manrope bg-repeat bg-cover bg-center flex justify-center items-center' 
        style={{
          backgroundImage : `url(${computer})`,
        }}
      >
        <div className='w-96 bg-gray-700 mx-auto rounded-xl bg-opacity-90 p-5'>
          <h1 className='text-2xl text-center text-white uppercase Manrope'>Please Click for Login</h1>
            <button onClick={()=> navigate('/dashboard')} className='px-5 w-full uppercase Manrope font-bold text-xl text-gray-100 rounded-lg mx-auto py-3 bg-blue-400'>Login</button>
        </div>
        
      </main>
    </>
  )
}

// react plugin antd design library end video
