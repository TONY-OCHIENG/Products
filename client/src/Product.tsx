import { Edit, Search, Trash, X } from 'lucide-react'
import React, { useEffect, useState, type ChangeEvent } from 'react'
import { useForm, useProducts } from './store/strore'
import toast from 'react-hot-toast'

function Product() {
    const [open, setOpen] = useState<Boolean>(false)
    const [image, setImage] = useState<File | null>(null)
    const {setProduct,products, createProduct,product,singleProduct,
        deleteProduct
    } = useProducts()
    const [openDelete, setopenDelete] = useState<Boolean>(false)
    const { name, price,quantity,
        setName, setPrice, setQuantity
    } = useForm()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return    
        setImage(file)
    }
    const handleSubmit = async (event: ChangeEvent) : Promise<void> => {
        event.preventDefault()
        setOpen(false)

        if (!image) return // checking if image file exists

        const formData = new FormData()
        formData.append('name',name)
        formData.append('price',price)
        formData.append('quantity',quantity)
        formData.append('image',image)

        // await createProduct(formData)
        const {success, message} = await createProduct(formData)

        if (success) {
            toast.success(message)
            setProduct()
        } else {
            toast.error(message)
        }

        
       
        setName("")
        setPrice("")
        setQuantity("")

    }

    useEffect(() => {
        setProduct()
    },[])
    
    //delete a product

    const handleDelete = async (id: string) => {
        const { success, message} = await deleteProduct(id)
        if (success) {
            toast.success(message)
        } else {
            toast.error(message)
        }
    }  

  return (
    <div className='relative h-screen bg-gray-50'>
        <div className='fixed top-0 h-[10vh] w-full bg-white shadow-md flex items-center'>
          <div className='md:w-[80%] mx-auto w-full px-2  justify-between flex'>
            <h1 className='font-extrabold text-2xl text-gray-600'>Products</h1>
            <div className='flex gap-4 w-[40%] p-2 border rounded-full border-gray-400'>
                <Search className='h-5 w-5 ml-4 text-gray-400'/>
                <input type="text" className='text-sm outline-none w-[80%]' placeholder='search products...'/>                
            </div>
            <button onClick={() => setOpen(!open)} className='border px-8 rounded-md cursor-pointer text-gray-700 font-extrabold'>Add</button>
          </div>
        </div> 
        <div className={`${open ? 'absolute' : 'hidden'} transition-all duration-300 bg-white rounded-md shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-full px-2 md:w-[30%] flex flex-col`}>
        <div className='w-full flex justify-end'>
            <X onClick={() => setOpen(!open)} className='text-gray-600 h-5 w-5 cursor-pointer'/>
        </div>
        <form action="" className='w-full' onSubmit={handleSubmit}>
            <label htmlFor="" className='text-gray-600 font-extrabold'>Name</label>
            <input  required type="text" name='name' value={name} onChange={(event) => setName(event.target.value)}  className='p-2 rounded-md border w-full text-sm mb-2' placeholder='Product name...'/>      
            <label htmlFor="" className='text-gray-600 font-extrabold'>Price</label>
            <input required type="number" name='price' value={price} onChange={(event) => setPrice(event.target.value)}  className='p-2 rounded-md border w-full text-sm mb-2' placeholder='0'/>     
            <label htmlFor="" className='text-gray-600 font-extrabold'>Quantity</label>
            <input required type="number" name='quantity' value={quantity} onChange={(event) => setQuantity(event.target.value)}  className='p-2 rounded-md border w-full text-sm mb-2' placeholder='0'/>     
            <label htmlFor="" className='text-gray-600 font-extrabold'>Image</label>
            <input  required id="image"
            type="file"
            name="image"
            accept="image/*"  onChange={handleFileChange}  className='p-2 rounded-md border w-full text-sm mb-2'/>
            <button type='submit' className='py-2 w-full bg-black text-white font-extrabold rounded-md mt-2 cursor-pointer'>Add product</button>
        </form>
        </div> 
        <div className='md:w-[80%] w-full px-2 h-screen mx-auto py-30 grid grid-cols-2 md:grid-cols-4 gap-2'>
          {
            products.map((items) => (
                <div key={items.id} className='p-2 rounded-md shadow-md bg-white h-[250px]'>
                    <img src={`http://localhost:3000/images/`+ items.image}  alt="" className='w-full object-cover h-[150px]'/> 
                    <div className='flex justify-between mt-2 '>
                     <div>
                        <h1 className='text-gray-600 font-extrabold '>{items.name}</h1>    
                        <p className='text-sm text-gray-400'>Quantity {items.quantity}psc</p> 
                        <p className='font-extrabold text-xl text-gray-700'>KES {items.price}</p>  
                     </div>
                     <div className='flex gap-2'>
                        <Trash onClick={() => {singleProduct(items.id), setopenDelete(!openDelete)}} className='h-4 w-4 text-red-400 cursor-pointer rounded-md'>
                            <title>Delete</title>
                        </Trash>
                        <Edit className='h-4 w-4 text-green-400 cursor-pointer  rounded-md'>
                            <title>Edit</title>
                        </Edit>
                     </div>
                    </div>            
                </div>
            ))
          }
        </div> 
           {/*Delete dialogue  */}
        <div className={`${openDelete ? 'absolute' : 'hidden'} transition-all duration-300 bg-white rounded-md shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-[40%] px-2 md:w-[30%] flex flex-col`}>
         <h1 className='font-extrabold text-center'>Are you sure you want to delete ?</h1>
         <p className='font-extrabold text-center text-xl text-gray-600'>{product.map((item) => item.name)}</p>
         <div className='w-full mt-2 flex justify-end gap-4'>
          <button onClick={() => setopenDelete(!openDelete)}  className='text-sm py-2 bg-black cursor-pointer text-white font-extrabold px-8 rounded-md'>Cancel</button>
          <button className='text-sm py-2 bg-red-600 cursor-pointer text-white font-extrabold px-8 rounded-md'>Delete</button> 
         </div>      
        </div> 
    </div>
  )
}

export default Product
