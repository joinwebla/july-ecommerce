import { useEffect, useState } from "react";
import { addProductToTheCart, getCartData, loadTheProducts } from "../apiCalls";


export const ProductFeed = () => {
    const [products, setProducts] = useState([]); //all products
    const [cartAddedProducts, setCartAddedProducts] = useState([]); //product id which is added to cart
    const [total, setTotal] = useState(0); //product id which is added to cart

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        window.location.href = "/login"
    }

    const fetchTheProducts = async () => {
        try {
            const response = await loadTheProducts(); //complete
            setProducts(response.data)
        } catch (error) {
            
        }
    }

    const loadTheCartData = async () => {
        try {
            const response = await getCartData()
            let ids = [];
            let totalVal = 0;

            response.data.forEach(({id, price}) => {
                totalVal = totalVal+price;
                if(ids.includes(id)){
                } else {
                    ids.push(id)
                }
            })
            setTotal(totalVal)
            setCartAddedProducts(ids)
        } catch (error) {
            
        }
    }

    const handleAddToCart = async (productID) => {
        const cartID = localStorage.getItem("cartId");
        
        try {
            const response = await addProductToTheCart(cartID, productID)
            if(response.data.success){
                setCartAddedProducts([...cartAddedProducts, productID])
            }
        } catch (error) {
            
        }
    }

    // use effect
    useEffect(() => {
        fetchTheProducts()
        loadTheCartData()
    }, [])


    return(
        <>
            <div style={{textAlign: 'center'}}>
                <h1>Product Street</h1>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>

                <div style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    with: 300,
                    height: 150,
                    padding: 20,
                    margin: 20,
                    border: "1px solid",
                    zIndex: 999,
                    backgroundColor: '#fff'
                }}>
                    <h5>Total Products - {cartAddedProducts.length}</h5>
                    <p>Total - {total}</p>
                    <button className="btn btn-primary">Checkout</button>
                </div>
            </div>

            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                {
                    products.map((product, index) => {
                        const { id, title, price, description, images = [] } = product;

                        return(
                            <div className="card" style={{width: 300, margin: 20}} key={index}>
                                <img className="card-img-top" src={images[0]} alt="Card image cap" style={{width: '100', height: 200}} />
                                <div className="card-body">
                                    <h5 className="card-title">{title}</h5>
                                    <p className="card-text">{description}</p>
                                    <h5 className="card-text">Price: {price}/-</h5>
                                    {
                                        cartAddedProducts.includes(id) ? (
                                            <button className="btn btn-danger" onClick={() => {}}>Remove</button>
                                        ) : (
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => { 
                                                handleAddToCart(id)
                                            }}
                                        >Add to cart</button>
                                        )
                                    }

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}