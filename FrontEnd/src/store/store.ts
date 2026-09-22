import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface FormState {
    name: string;
    quantity: string;
    price: string;
    image: string;
}

interface FormActions {
    setName: (name: string) => void;
    setQuantity: (quantity: string) => void;
    setPrice: (price: string) => void;
    setImage: (image: string) => void;
    resetForm: () => void;
}

type FormData = FormState & FormActions;

export const useForm = create<FormData>()(
    devtools(
        (set) => ({
            name: "",
            quantity: "",
            price: "",
            image: "",
            setName: (name) => set({ name }),
            setQuantity: (quantity) => set({ quantity }),
            setPrice: (price) => set({ price }),
            setImage: (image) => set({ image }),
            resetForm: () => set({ name: "", quantity: "", price: "", image: "" }),
        }),
        { name: "form-store" }
    )
);