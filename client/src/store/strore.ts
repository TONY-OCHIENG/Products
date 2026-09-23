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

interface ProductItem {
    name: string,
    price: string,
    quantity: string,
    image: File
}

interface ProductState{
    products: ProductItem[],
    createProduct: (formData: FormData) => Promise<void>
}

interface AddResponse{
    message: string,
    success: boolean,
}

interface Response{
    response: AddResponse[]
}

export const useProducts = create<ProductState & Response>()(
    devtools(
        (set) => ({
            products: [],
            response: [],
            createProduct: async (formData: FormData) => {
                const res = await axios.post<ProductItem & AddResponse>("http://localhost:3000/api/products/addProducts", formData)
                set((state) => ({ products: [...state.products, res.data], response: [res.data] }))
            },
        }),
        { name: "products-store" }
    )
)