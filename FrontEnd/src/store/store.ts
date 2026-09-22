import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface FormData{
    name: string,
    quantity: number,
    price:number,
    image:string,
    setName: (name: string) => void,
    setQuantity: (quantity: number) => void,
    setPrice: (price: number) => void,
    setImage: (image: string) => void,
}

export const useForm = create(
    devtools<FormData>((set) => ({
        name:"",
        quantity:0,
        price:0,
        image:"",
        setName: (name) => set(() => ({name})),
        setQuantity: (quantity) => set(() => ({quantity})),
        setPrice: (price) => set(() => ({price})),
        setImage: (image) => set(() => ({image}))
    }))
)