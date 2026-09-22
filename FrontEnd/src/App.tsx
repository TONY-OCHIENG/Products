import { Plus, Search, X } from 'lucide-react'
import React, { useState } from 'react'


function App() {
  const [open,setOpen] = useState<Boolean>(false)
 
  const handleOpen = (): void => {
    setOpen(!open)
  }
  return (
    <div className='relative bg-gray-50 h-screen'>
      <div className='w-full fixed bg-white shadow-md p-4 h-[10vh] items-center'>
        <div className='md:w-[80%] w-full mx-auto px-2 flex items-center justify-between'>
          <h1 className='text-4xl font-extrabold'>Products</h1>
          <div className='flex gap-1 text-gray-400 w-[40%] border border-gray-400 p-2 rounded-full'>
            <Search/>
            <input type="text" placeholder='Search product...' className='outline-none w-[80%]'/>
          </div>
          <button onClick={handleOpen} className='flex gap-1 py-2 px-8 rounded-md cursor-pointer bg-gray-600 text-white font-extrabold'><Plus/> Add</button>
        </div>
      </div>  
      <div className={`z-10 ${open ?'absolute' : 'hidden'} p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white rounded-md max-w-md shadow-md`}>
      <div className='flex justify-end'><X onClick={handleOpen} className='right-0 h-5 w-5 text-gray-600'/></div>
       <form action="" className='w-full'>
        <label htmlFor="" className='text-sm text-gray-400'>Name</label>
        <input type="text"  className='w-full border p-2 rounded-md outline-none'/>
         <label htmlFor="" className='text-sm text-gray-400'>Price</label>
        <input type="number" className='w-full border p-2 rounded-md outline-none'/>
         <label htmlFor="" className='text-sm text-gray-400'>Quantity</label>
        <input type="number" className='w-full border p-2 rounded-md outline-none'/>
         <label htmlFor="" className='text-sm text-gray-400'>Image</label>
        <input type="file" className='w-full border p-2 rounded-md outline-none'/>
        <button className='py-2 w-full bg-gray-800 mt-4 rounded-md text-white font-extrabold cursor-pointer'>Add product</button>
       </form>
      </div>    
    </div>
  )
}

export default App
