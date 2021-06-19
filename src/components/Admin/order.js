import {Table} from 'antd'
const {Column} = Table
const OrderList = () =>{
    return(
        <div className="container compo">
            <div className="row">
                <div className="col-12">
                <Table
                bordered
            >
                <Column title="Stt" dataIndex="nameFood" key="nameFood" />
                <Column title="Ngày thuê" dataIndex="cateName" key="cateName" />
                <Column title="Ngày kết thúc"  key="price" 
                    render={data=>(
                        <span> VND</span>
                    )}
                />
                <Column title="Trạng thái" dataIndex="foodAddress" key="foodAddress" />
                <Column title="Hành động" key="action" width="130px"
                    render={action => (
                        <div className="d-flex">
                            <button className="btn-view">View</button>
                        </div>
                    )}
                />
            </Table>
                </div>
            </div>
        </div>
    )
}
export default OrderList