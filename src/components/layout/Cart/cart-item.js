import { useEffect, useState } from "react"
import '../../../styles/cart.css'
const CartItem = ({cart, getTotal, increment, decrement}) =>{
    const {name, price, quantity, image, count, idVehicle} = cart
    const [newPrice, setNewPrice] = useState(price);
    const [number, setNumber] = useState(1)
    useEffect(() => {

    },[number])

    return(
        <div className="row cart-item">
            <div className="col-lg-6">
                {image?<img className="cart--image" src={image} alt=".."/>
                    :<p className="cart cart-image">
                    <div class="spinner-border text-light" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    </p>}
            </div>
            <div className="col-lg-6">
                <div className="cart-item-infor">
                    <p>{name}</p>
                    <p> Giá: {new Intl.NumberFormat().format(price)} VNĐ</p>
                </div>
                <div className="d-flex justify-content-between align-items-end">
                    <div className="d-flex edit-quantity">
                        <button onClick={() => decrement(idVehicle)} disabled={count === 1} className="btn-plus"><i class="fal fa-minus"></i></button>
                            <p> {count}</p>
                        <button onClick={() => increment(idVehicle)} disabled={count === quantity} className="btn-minus"><i class="fal fa-plus"></i></button>
                    </div>
                    <button style={{height: '40px'}} className="btn btn-outline-danger">Delete</button>
                </div>
            </div>
        </div>
    )
}
export default CartItem