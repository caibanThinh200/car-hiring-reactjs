import React, { Fragment, useEffect, useState } from "react"
import { Menu } from 'antd';
import '../../../styles/hiring.css'
import SubMenu from "antd/lib/menu/SubMenu";
import 'antd/dist/antd.css';
import axios from 'axios'
import { CarOutlined, InsertRowRightOutlined, ControlOutlined  } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { getListCarByCategory } from "../../../action/car";
const Category = () => {
    const [category, setCategory] = useState([])
    const [manufactor, setManufactor] = useState([])
    const list = useSelector(state => state.car.listCar)
    const collapsed = useSelector(state=>state.car.collapsed)
    const dispatch = useDispatch()
    const onFilter = (e) => {
        const action = getListCarByCategory(list, e.key)
        dispatch(action)
    }
    const getManuFactor = () =>{
        try {
            axios.get('https://mighty-meadow-74982.herokuapp.com/manufactor')
                .then(response=>{
                    setManufactor(response.data.data)
                })
        } catch (error) {
            console.log(error)
        }
    }
    const getCategory = () =>{
        try {
            axios.get('https://mighty-meadow-74982.herokuapp.com/cate')
            .then(response =>{
                setCategory(response.data.data)
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getCategory();
        getManuFactor();
    },[])
    return (
        <Fragment>
                <Menu
                    mode="inline"
                    className="vehicles-type cate"
                    defaultOpenKeys={['category', 'manufactor']}
                    onSelect={onFilter}
                    style={{maxWidth: '250px'}}
                    inlineCollapsed = {collapsed}
                    inlineIndent={20}
                >
                    <SubMenu icon={<CarOutlined />} key="category" className="accordion" title="Loại xe">
                        {category.map(items=>(
                             <Menu.Item key={items.idCategory}>Xe {items.nameCate} chỗ</Menu.Item>
                        ))}
                    </SubMenu>
                    <SubMenu icon={<InsertRowRightOutlined />} key="manufactor" className="accordion" title="Hãng xe">
                        {manufactor.map(items=>(
                            <Menu.Item key={items.idManufactor}>{items.name}</Menu.Item>
                        ))}
                    </SubMenu>
                </Menu>
        </Fragment>

    )
}
export default Category