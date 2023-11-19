import { useState } from "react"

const useCart = () => {
    const [cart, setCart] = useState({
        id: "",
        checked_out: false,
    })

    return { cart, setCart };
}

export default useCart;