import { Result, Button , Steps, Rate } from 'antd';
import {useState } from 'react'
import InforForm from './infor-form';
import PaymentForm from './payment-form';


const HiringResult = () =>{
    return(
        <Result
        status="success"
        title="Đã đặt xe thành công!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={
            <div>
                <Rate value={3}/>
                <div className="d-flex justify-content-center mt-4">
                    <Button>Phản hồi</Button>
                    <Button type="link">Về trang chủ</Button>
                </div>
            </div>
        }
    />
    )
}

const { Step } = Steps;
const HiringForm = () =>{
    const [current, setCurrent] = useState(0);
    const onTabChange = current => {
        setCurrent(current)
    };
    const steps = [
        {
          title: 'Bước 1',
          content: <InforForm onTabChange={onTabChange} />,
          description: 'Điền thông tin'
        },
        {
          title: 'Bước 2',
          content: <PaymentForm onTabChange={onTabChange}/>,
          description: 'Thanh toán'
        },
        {
          title: 'Bước 3',
          content: <HiringResult/>,
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