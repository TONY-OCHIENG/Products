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
        setName: (name) => set({name}),
        setPrice: (price) => set({price}),
        setQuantity:(quantity) => set({quantity}),
        setImage: (image) => set({image})
    }), {name: "use-form"})
)

// edit input data

interface EditInputs{
    edit_name: string,
    edit_price: string,
    edit_quantity: string
}

interface EditInputsAction{
    setEditName: (edit_name: string) => void,
    setEditPrice: (edit_price: string) => void,
    setEditQuantity: (edit_quantity: string) => void
}

type EditProduct = EditInputs & EditInputsAction

export const EditProducts = create<EditProduct>()(
    devtools(
        (set) => ({
            edit_name: "",
            edit_price: "",
            edit_quantity: "",
            setEditName: (edit_name) => set({edit_name}),
            setEditPrice: (edit_price) => set({edit_price}),
            setEditQuantity: (edit_quantity) => set({edit_quantity})
        })
        , {name: "Edit_Products"}
    )
)

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
            deleteProduct: async (productID: string) => {
                const res = await axios.delete(`http://localhost:3000/api/products/deleteProduct/${productID}`)
                const { message, success} = res.data
                return { message, success}
            },
            editProduct: async (formData: FormData, productID: string) => {
                const res = await axios.put(`http://localhost:3000/api/products/updateProduct/${productID}`,formData)
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
