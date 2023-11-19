import { useState } from "react";

const useItem = () => {
    const [items, setItems] = useState([]);

    return { items, setItems };
}

export default useItem;