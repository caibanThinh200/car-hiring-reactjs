import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { Bar, Doughnut, Pie } from "react-chartjs-2";

const { Statistic, Skeleton } = require("antd")

const KPI = () => {
    const date = new Date()
    const [kpi, setKpi] = useState([])
    const [saled, setSaled] = useState([])
    const [kpiDetail, setKpiDetail] = useState({})
    const [saledDetail, setSaledDetail] = useState({})
    const [nameDetail, setNameDetail] = useState({})

    useEffect(() => {
        try {
            axios.get("https://mighty-meadow-74982.herokuapp.com/bill/KPI?year=2021")
                .then(res => {
                    setKpi(res.data.data)
                    res.data.data.map(item=>{
                        if(item.month == date.getMonth() + 1){
                            setKpiDetail(item)
                        }
                    })
                    console.log(res.data.data)
                })
        } catch (error) {
            console.log(error)
        }

    }, [])
    useEffect(() => {
        try {
            axios.get("https://mighty-meadow-74982.herokuapp.com/vehicle")
                .then(res => {
                    const filter = res.data.data.sort((a,b)=> b.saled - a.saled)
                    setSaled(filter)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <div className="container compo mt-4">
            <div className="row p-2">
                <h4><b>Báo cáo doanh thu tháng {date.getMonth() + 1}</b></h4>
                <div className="col-3 p-1">
                    <div className="bg-white kpi-box">
                        <Statistic title="Doanh thu" value={kpiDetail.total} />
                    </div>
                </div>
                <div className="col-3 p-1">
                    <div className="bg-white kpi-box">
                        <Statistic title="Chỉ tiêu" value="100000000" />
                    </div>
                </div>
                <div className="col-3 p-1">
                    <div className="bg-white kpi-box kpi-box-2">
                        <Statistic title="Đạt được" value={kpiDetail.total * 100 / 100000000} suffix="%" valueStyle={{ color: 'red' }} />
                    </div>
                </div>
            </div>
            <h4 className="mt-4"><b>Biểu đồ cột doanh thu</b></h4>
            <Bar
                data={{
                    labels: kpi.sort((a,b)=>a.month - b.month).map(item => "Tháng " + item.month),
                    datasets: [
                        {
                            label: "Biểu đồ cột doanh thu",
                            backgroundColor: [
                                "#EBDEF0",
                                "#C39BD3",
                                "#AF7AC5",
                                "#D7BDE2",
                                "#F4D03F",
                                "#52BE80"
                            ],
                            data: kpi.map(item => item.total)
                        }
                    ]
                }}
                height={1}
                width={3}
                options={{
                    legend: { display: false },
                    title: {
                        display: true,
                        text: "Biểu đồ cột doanh thu và chi tiêu"
                    },
                    maintainAspectratio: false
                }}
            />
            <h4 className="mt-4 mb-4">Biểu đồ xe được thuê nhiều nhất</h4>
            <div className="row">
                <div className="col-4">
                <Pie
                data={{
                    labels: saled.slice(0,5).map(item => item.name),
                    datasets: [
                        {
                            label: "saled",
                            backgroundColor: [
                                "#3e95cd",
                                "#8e5ea2",
                                "#3cba9f",
                                "#e8c3b9",
                                "#c45850"
                            ],
                            data: saled.map(item => item.saled),
                        }
                    ]
                }}
                option={{
                    title: {
                        display: true,
                        text: "Biểu đồ những xe bán chạy nhất"
                    }
                }}
            />
                </div>
                <div className="col-1"></div>
                <div className="col-7">
                <table class="table table-bordered mt-5">
                        <thead>
                            <tr>
                                <th scope="col">Stt</th>
                                <th scope="col">Tên xe</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Đã thuê</th>
                            </tr>
                        </thead>
                        <tbody>
                            {saled.length > 0 ? saled.slice(0,5).map((car, index) => {
                                return (
                                    <tr className="list-car-row">
                                        <th scope="row"> {index + 1} </th>
                                        <td> {car.name}</td>
                                        <td> {car.price} / Ngày</td>
                                        <td> {car.quantity}</td>
                                        <td> {car.saled}</td>
                                    </tr>
                                );
                            }):
                            <Skeleton width={700} style={{backgroundColor:"black"}} active/>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default KPI