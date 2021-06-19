import { Result, Button , Steps, Rate } from 'antd';
import axios from 'axios';
import {useEffect, useState } from 'react'
import InforForm from './infor-form';
import PaymentForm from './payment-form';
import HiringResult from "./result";

const { Step } = Steps;
const HiringForm = (props) =>{
    const [current, setCurrent] = useState(0);
    const [info, setInfo] = useState({});
    const [response,setResponse] = useState({});
    const [resLoading, setResLoading] = useState(false);
    useEffect(() => {
        console.log(props.total)
        setInfo({...info,listCar: props.listCar, total: props.total})
    },[props.total])
    const getInfo = (currentInfo) => {
        setInfo({...info,...currentInfo});
    };

    const onTabChange = current => {
        setCurrent(current)
    };
    
    const createPayment = () => {
        setResLoading(true);
        axios.post("https://mighty-meadow-74982.herokuapp.com/bill", info)
        .then(res => {
            localStorage.removeItem("cart");
            setResponse(res.data);
            setResLoading(false);
        })
    }
    const steps = [
        {
          title: 'Bước 1',
          content: <InforForm getInfo={getInfo} onTabChange={onTabChange} />,
          description: 'Điền thông tin'
        },
        {
          title: 'Bước 2',
          content: <PaymentForm createPayment={createPayment} onTabChange={onTabChange}/>,
          description: 'Thanh toán'
        },
        {
          title: 'Bước 3',
          content: <HiringResult updateListCar={props.updateListCar} loading={resLoading} result={response}/>,
          description: 'Hoàn thành'
        },
      ];
    return(
        <div style={{padding: '10px'}}>
            <Steps current={current}  size="small"  >
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} description={item.description} />
                    ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
        </div>
    )
}
export default HiringForm