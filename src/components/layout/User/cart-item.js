import { useState } from "react";

const CartItem = ({cart, removeItem, index}) => {
    const [number, setNumber] = useState(1)
    const {name, price, quantity, image} = cart
    return (
        <div className="row bg-light cart-row">
            <div className="col-3">
                {image?<img className="cart-car-image" src={image} alt=".."/>
                :<p className="cart-image">Image</p>}
            </div>
            <div className="col-8">
                <div>
                    <p>{name}</p>
                    <p>{price}</p>
                </div>
                <div className="d-flex edit-quantity">
                    <button onClick={()=>setNumber(number-1)} disabled={number === 1} className="btn-plus"><i class="fal fa-minus"></i></button>
                        <p> {number}</p>
                    <button onClick={()=>setNumber(number+1)} disabled={number === quantity} className="btn-minus"><i class="fal fa-plus"></i></button>
                </div>
            </div>
            <div className="col-1">
                <button  onClick={() => { removeItem(index) }} className="btn btn-danger"><i class="fal fa-trash-alt"></i></button>
            </div>
        </div>
    );
}
export default CartItem