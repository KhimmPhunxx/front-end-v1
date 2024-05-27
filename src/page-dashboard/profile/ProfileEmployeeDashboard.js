// 
import React, { useEffect, useState } from 'react'
import request from '../../share/request'
import { Config, formateDateClient, getUser } from '../../share/helper'

export default function ProfileEmployeeDashboard() {
    const [list,setList] = useState([])

    useEffect(() => {
        getList()
    }, [])

    const getList = () => {

        
    }

    const user = getUser();
  return (
    <>
        <main className='w-full h-[600px] border p-10 flex'>
            <div className='w-[25%] h-full'>
                <div className='w-[300px] rounded-full h-[400px] bg-red-300'>
                    <img className='w-full rounded-full shadow border-8 border-blue-500 h-full object-cover' src={Config.image_path+user.image_empl} alt='image'/> 
                </div>
                <h1 className='text-center text-gray-500 Manrope mt-3 text-5xl font-bold'>{user.firstname+ " " + user.lastname}</h1>
            </div>
            <div className="w-[73%] ml-[2%] h-full shadow border rounded-lg">
                <div className='w-full h-10 bg-gray-200 rounded-t-lg p-2'> <p className='Manrope font-bold text-md'>My Profile</p> </div>
                <div className='p-5'>
                    <h1 className='Manrope text-2xl text-gray-500 font-bold border-b-2 pb-2 '>Information Employee</h1>
                    <div className='flex'>
                        <div className='mt-2'>
                            <h3 className='Manrope text-xl text-gray-500'>Firstname</h3>
                            <p className='Manrope text-xl font-bold text-gray-700'>{user.firstname}</p>
                        </div>
                        <div className='mt-2 ml-40'>
                            <h3 className='Manrope text-xl text-gray-500'>Lastname</h3>
                            <p className='Manrope text-xl font-bold text-gray-700'> {user.lastname} </p>
                        </div>
                        <div className='mt-2 ml-40'>
                            <h3 className='Manrope text-xl text-gray-500'>Email</h3>
                            <p className='Manrope text-xl font-bold text-gray-700'> {user.email} </p>
                        </div>
                        
                    </div>
                    <h1 className='Manrope text-2xl text-gray-500 font-bold border-b-2 pb-2 mt-5'>Address Employee</h1>
                    <div className='flex'>
                        <div className='mt-2'>
                            <h3 className='Manrope text-xl text-gray-500'>Telephone</h3>
                            <p className='Manrope text-xl font-bold text-gray-700'> {user.tel} </p>
                        </div>
                        <div className='mt-2 ml-20 w-[200px]'>
                            <h3 className='Manrope text-xl text-gray-500'>Address</h3>
                            <p className='Manrope text-xl font-bold text-gray-700'>{user.address}</p>
                        </div>
                        <div className='mt-2 ml-20 w-[150px]'>
                            <h3 className='Manrope text-xl text-gray-500'>Create At</h3>
                            <p className='Manrope text-xl font-bold text-gray-700'>{formateDateClient(user.creat_at)}</p>
                        </div>
                        <div className='mt-2 ml-20'>
                            <h3 className='Manrope text-xl text-gray-500'>Salary</h3>
                            <p className='Manrope text-xl font-bold text-gray-700'>{user.base_salary} $</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}
