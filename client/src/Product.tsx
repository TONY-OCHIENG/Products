import { Search, X } from 'lucide-react'
import React, { useState } from 'react'

function Product() {
    const [open, setOpen] = useState<Boolean>(false)
  return (
    <div className='relative h-screen bg-gray-50'>
        <div className='fixed h-[10vh] w-full bg-white shadow-md flex items-center'>
          <div className='md:w-[80%] mx-auto w-full px-2  justify-between flex'>
            <h1 className='font-extrabold text-2xl text-gray-600'>Products</h1>
            <div className='flex gap-4 w-[40%] p-2 border rounded-full border-gray-400'>
                <Search className='h-5 w-5 ml-4 text-gray-400'/>
                <input type="text" className='text-sm outline-none w-[80%]' placeholder='search products...'/>                
            </div>
            <button onClick={() => setOpen(!open)} className='border px-8 rounded-md cursor-pointer text-gray-700 font-extrabold'>Add</button>
          </div>
        </div> 
        <div className={`${open ? 'absolute' : 'hidden'} transition-all duration-300 bg-white rounded-md shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-[30%] flex flex-col`}>
        <div className='w-full flex justify-end'>
            <X onClick={() => setOpen(!open)} className='text-gray-600 h-5 w-5 cursor-pointer'/>
        </div>
        <form action="" className='w-full'>
            <label htmlFor="" className='text-gray-600 font-extrabold'>Name</label>
            <input type="text" className='p-2 rounded-md border w-full text-sm mb-2' placeholder='Product name...'/>      
            <label htmlFor="" className='text-gray-600 font-extrabold'>Price</label>
            <input type="number" className='p-2 rounded-md border w-full text-sm mb-2' placeholder='0'/>     
            <label htmlFor="" className='text-gray-600 font-extrabold'>Quantity</label>
            <input type="number" className='p-2 rounded-md border w-full text-sm mb-2' placeholder='0'/>     
            <label htmlFor="" className='text-gray-600 font-extrabold'>Image</label>
            <input type="file" className='p-2 rounded-md border w-full text-sm mb-2'/>
            <button className='py-2 w-full bg-black text-white font-extrabold rounded-md mt-2 cursor-pointer'>Add product</button>
        </form>
        </div>     
    </div>
  )
}

export default Product
