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

type FormData = FormInput & FormActions

export const useForm = create<FormData>()(
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