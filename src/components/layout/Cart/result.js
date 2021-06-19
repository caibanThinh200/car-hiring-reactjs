import { Button, Rate, Result, Skeleton, Spin } from "antd"
import { Fragment, useEffect } from "react"

const HiringResult = (props) =>{
    useEffect(() => {
        if(props.result.status === "SUCCESS") {
            props.updateListCar("");
            localStorage.removeItem("cart");
        }
    },[props.result.status])
    return(
        <Fragment>
            {
                props.result.status === "SUCCESS" ? <Result
                    status="success"
                    title="Đã đặt xe thành công!"
                    subTitle={props.result.result}
                    extra={
                        <div>
                            <Rate value={3}/>
                            <div className="d-flex justify-content-center mt-4">
                                <Button>Phản hồi</Button>
                                <Button style={{marginLeft: "20px"}} type="primary">Về trang chủ</Button>
                            </div>
                        </div>
                    } 
                /> : !props.loading ? <Result
                    status="500"
                    title="Đã có lỗi xảy ra, đặt xe thất bại!"
                    extra={
                        <div>
                            <div className="d-flex justify-content-center mt-4">
                                <Button type="primary">Về trang chủ</Button>
                            </div>
                        </div>
                    } 
                /> : <Skeleton/>
        }
        </Fragment>
        
    )
}
export default HiringResult