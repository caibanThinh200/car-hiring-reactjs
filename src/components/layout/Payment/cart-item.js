import { useState } from "react"
import '../../../styles/cart.css'
const CartItem = ({cart}) =>{
    const [number, setNumber] = useState(1)
    return(
        <div className="row cart-items p1 shadow-sm">
            <div className="col-lg-12">
                {cart.image?
                    <div className="cart-image-container">
                        <img className="cart--image-detail" src={cart.image} alt=".."/>
                    </div>
                    :<p className="cart cart-image">
                    <div class="spinner-border text-light" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    </p>}
            </div>
            <div className="col-lg-12 mt-3">
                <div className="cart-item-infor-detail">
                    <p>{cart.name}</p>
                    <h4> Giá: {new Intl.NumberFormat().format(cart.price)} VNĐ / <span style={{fontSize:'16px'}}>Ngày</span> </h4>
                </div>
            </div>
        </div>
    )
}
export default CartItem