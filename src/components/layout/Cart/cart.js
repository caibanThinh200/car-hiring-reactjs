import { useEffect, useState } from "react"
import CartItem from "./cart-item"
import HiringForm from "./hiring-form"
import '../../../styles/cart.css'
import { Button, Result } from "antd"
import { Link } from "react-router-dom"

const Cart = () =>{
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0) 
    let empty = (localStorage.getItem("cart"));

    useEffect(()=>{
        if(empty){
        const cartParsed = JSON.parse(empty) || [];
            setCart(cartParsed)
        }
        else setCart([])
    },[])

    useEffect(() => {
        if(cart.length > 0) {
            const cash = cart.reduce((prev, item) => {
                return prev + item.price * item.count;
              }, 0);
            setTotal(cash);
        }
    },[JSON.stringify(cart)])

    useEffect(() => {
        if(localStorage.getItem("cart"))
        localStorage.setItem("cart",JSON.stringify(cart))
    },[JSON.stringify(cart)])
    
    const updateListCar = (newListCar) => {
        setCart(newListCar);
    } 
    const decreament = (id) => {
        cart.forEach(item => {
            if(item.idVehicle === id) {
                if(item.count > 1) {
                    item.count -= 1;
                }
                else {
                    item.count = 1
                }
            }
        });
        setCart([...cart])
    }

    const increment = (id) => {
        cart.forEach(item => {
            if(item.idVehicle === id) {
                if(item.count < item.quantity) {
                    item.count += 1;
                }
            }
        })
        setCart([...cart])
    } 
    console.log(cart);
    return(
        <div className="container bg-white" style={{minHeight:'80vh', marginTop:'40px'}}>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-title">
                        <h4>Đơn đặt xe <span>Vui lòng điền thông tin</span> </h4>
                    </div>
                    <HiringForm updateListCar={updateListCar} listCar={cart} total={total}></HiringForm>
                </div>
                <div className="col-md-6">
                    <div className="container" >
                        <div className="row">
                            <div className="total-price d-flex justify-content-between">
                                <h5>Tổng cộng:</h5>
                                <h4 className="text-danger">{new Intl.NumberFormat().format(total) || 0} VNĐ</h4>
                            </div>
                        </div>
                        {
                            cart.length > 0 ? cart.map(item => 
                                <CartItem 
                                    cart={item} 
                                    increment={increment}
                                    decrement={decreament} />
                                ) :  <Result
                                status="404"
                                title="Đơn hàng trống"
                                subTitle="Chưa có xe trong đơn hàng"
                                extra={<Button type="primary"><Link to="/vehicles" replace>Về trang thuê xe đi em</Link></Button>}
                              />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Cart