import { useEffect, useState } from "react"
import HiringForm from './hiring-form'
import axios from 'axios'
import { useParams } from "react-router-dom"
import CartItem from "./cart-item"
const Payment = () =>{
    const[carDetail,setCarDetail] = useState({}) 
    const {id} = useParams()
    useEffect(() => {
        try {
            axios.get(`https://mighty-meadow-74982.herokuapp.com/vehicle/detail/${id}`)
            .then(response => {
                setCarDetail(response.data.data)
            })
        } catch (error) {
            console.log(error)
        }
    }, [])
    return(
        <div className="container bg-white" style={{minHeight:'80vh', marginTop:'40px'}}>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-title">
                        <h4>Đơn đặt xe <span>Vui lòng điền thông tin</span> </h4>
                    </div>
                    <HiringForm></HiringForm>
                </div>
                <div className="col-md-6">
                    <div className="container" >
                        <CartItem cart = {carDetail}></CartItem>
                    </div>
                </div>
            </div>
        </div>
   )
}
export default Payment