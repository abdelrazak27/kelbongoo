import ProductsList from "../components/ProductsList";

function CustomerPage({ products }) {
    return (
        <>
            <ProductsList products={products}/>
        </>
    );
}

export default CustomerPage;