import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface FormInput{
    name: string,
    price: string,
    quantity: string,
    image: File | null
}

interface FormActions{
    setName: (name: string) => void,
    setPrice: (price: string) => void,
    setQuantity: (quantity: string) => void,
    setImage: (image: File | null) => void
}

type FormDatas = FormInput & FormActions

export const useForm = create<FormDatas>()(
    devtools(
      (set) => ({
        name: "",
        price: "",
        quantity: "",
        image: null,
        setName: (name) => set({name: name}),
        setPrice: (price) => set({price: price}),
        setQuantity:(quantity) => set({quantity: quantity}),
        setImage: (image) => set({image})
    }), {name: "use-form"})
)

// edit input data

interface ProductItem {
    id:string,
    name: string,
    price: string,
    quantity: string,
    image: string   // see note below
}

interface AddResponse {
    message: string,
    success: boolean,
    product?: ProductItem   // adjust to whatever your API actually returns
}

interface ProductState {
    products: ProductItem[],
    product: ProductItem[],
    response: AddResponse | null,
    setProduct: () => void,
    deleteProduct: (productID: string) => Promise<{
        success: boolean,
        message: string
    }>,
    singleProduct: (productID: string) => void,
    singleUpdateProduct: (productID: string) => Promise<{
        productDetail: ProductItem[]
    }>,
    editProduct: (formData: FormData, productID: string) => Promise<{
        success: boolean,
        message: string
    }>,
    createProduct: (formData: FormData) => Promise<{
        success: boolean,
        message: string
    }>
}

export const useProducts = create<ProductState>()(
    devtools(
        (set) => ({
            products: [],
            product:[],
            response: null,
            singleUpdateProduct: async (productID: string) => {
                const res = await axios.get(`http://localhost:3000/api/products/singleProduct/${productID}`)
                const { result } = res.data
                return {productDetail: result}
            },
            deleteProduct: async (productID: string) => {
                const res = await axios.delete(`http://localhost:3000/api/products/deleteProduct/${productID}`)
                const { message, success} = res.data
                return { message, success}
            },
            editProduct: async (formData: FormData, productID: string) => {
                const res = await axios.put<AddResponse>(`http://localhost:3000/api/products/updateProduct/${productID}`,formData)
                const { message, success} = res.data
                return {message, success}
            },
            singleProduct:async (productID: string) => {
                const res = await axios.get(`http://localhost:3000/api/products/singleProduct/${productID}`)
                const { result, message, success} = res.data
                set(() => ({
                    product: result
                }))                
            },
            setProduct: async () => {
              const res = await axios.get("http://localhost:3000/api/products/allProducts")
              const { result } = res.data
              set(() => ({
                products: result
              }))
            },
            createProduct: async (formData: FormData) => {
                const res = await axios.post<AddResponse>(
                    "http://localhost:3000/api/products/addProducts",
                    formData
                )
                const { success, message, product } = res.data

                set((state) => ({
                    products: product ? [...state.products, product] : state.products,
                    response: res.data,
                }))

                return { success, message }
            },
        }),
        { name: "products-store" }
    )
)
