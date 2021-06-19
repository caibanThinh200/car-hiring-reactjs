import { Input, Modal } from "antd"
import { AudioOutlined } from '@ant-design/icons';
import axios from 'axios';
import { React, Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { loginUser } from '../../../action/user';
import '../../../styles/Home.css'
import { useJwt} from "react-jwt" 

const SignInSignUp = () => {
    return (
        <Fragment>
            <Link to="/sign-up" id="signuptext">Đăng ký</Link>
            <Link to="/login" id="logintext">Đăng nhập</Link>
        </Fragment>
    );
}

const Header = () => {
    const token = localStorage.getItem('token') || "";
    const fbtoken = localStorage.getItem('fbtoken') || "";
    const name = localStorage.getItem('fullname')
    const fname = localStorage.getItem('fname')
    const { decodedToken, isExpired } = useJwt(token);
    const dispatch = useDispatch()
    const userDetail = useSelector(state => state.user.user)
    let empty = localStorage.getItem("cart")
    let cart = [];
    empty ? cart = empty.split(",") : cart = [];
    const header = {
        'Authorization': 'Bearer ' + token
    }
    const [user, setUser] = useState({});
    const [acc, setAcc] = useState()
    const [isMoodalOpen, setIsModalOpen] = useState(true);
    const {Search} = Input;
    const location = useLocation().pathname
    useEffect(() => {
        try {
            axios.get('https://mighty-meadow-74982.herokuapp.com/customer/user/info', {
                headers: header
            })
                .then(response => {
                    setUser(response.data.data)
                    const action = loginUser(response.data.data)
                    dispatch(action)
                })
        } catch (error) {
            console.log('error: ' + error)
        }
    }, [])
    if(location.includes("admin") == false)
    return (
        <Fragment>
            <div>
                <div className="top">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-4 bar">
                                <div>
                                    <button className="fal fa-bars" id="bar" type="button" data-bs-toggle="offcanvas" data-bs-target="#menu-left" ></button>
                                    <div className="offcanvas offcanvas-start" tabIndex={-1} id="menu-left" aria-labelledby="offcanvasRightLabel">
                                        {
                                            isExpired && <Modal  visible={isMoodalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => setIsModalOpen(false)}>
                                                Phiên làm việc đã hết hạn, vui lòng đăng nhập lại
                                            </Modal>
                                        }
                                        <div className="offcanvas-header">
                                            {token || fbtoken && !isExpired ? <h5 id="offcanvasRightLabel">Welcome</h5> : <p id="offcanvasRightLabel">Bạn chưa đăng nhập</p>}
                                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                                        </div>
                                        <div className="offcanvas-body">
                                            {token || fbtoken && !isExpired ? <div className="user-control">
                                                <div className="avatar" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/images/defaultAvatar.png'})` }}>
                                                    <p>Thay đổi</p>
                                                </div>
                                                <p id="user-name">{fname} {user.fullname} </p>
                                                <div className="setting">
                                                    <Link to={`/user/${user.idUser}`}><i class="fal fa-user-cog"></i>Thông tin cá nhân</Link>
                                                    {
                                                        user && user.role === "admin" ? <Link to="/admin" replace><i class="fal fa-ballot"></i>Trang admin </Link> :
                                                        <Fragment>
                                                            <Link to="/cart" replace><i class="fal fa-ballot"></i>Đơn đặt xe </Link>
                                                            <Link><i class="fal fa-history"></i>Lịch sử giao dịch</Link>
                                                            <Link><i class="fal fa-key"></i>Đổi mật khẩu</Link>
                                                        </Fragment>
                                                    }
                                                </div>
                                            </div> :
                                                <div className="user-control">
                                                    <div className="user">
                                                        <i class="fad fa-user-circle"></i>
                                                    </div>
                                                    <div className="signin-signup">
                                                        <Link to="/login" >Đăng nhập</Link>
                                                    </div>
                                                </div>}
                                            <div className="menu-left">
                                                <Link to="/"><i class="fal fa-home-lg"></i>Trang chủ</Link>
                                                <Link to="/introduce"><i class="fal fa-address-book"></i>Giới thiệu</Link>
                                                <Link><i class="fal fa-newspaper"></i>Tin tức</Link>
                                                <Link to="/vehicles"><i class="far fa-car-alt"></i>Thuê xe</Link>
                                                <Link><i class="fal fa-mail-bulk"></i>Liên hệ</Link>
                                            </div>
                                            {token || fbtoken ? 
                                                <div className="log-out">
                                                <Link onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('fbtoken');localStorage.removeItem('fname');localStorage.removeItem('name'); localStorage.removeItem('cart'); window.location = '/' }} to="/" id="signuptext"><i class="fal fa-sign-out-alt"></i>Đăng xuất</Link>
                                                </div> :
                                             <span></span>}
                                        </div>
                                    </div>
                                </div>
                                <p id="logo">CarHiring</p>
                            </div>
                            <div className="col-4">
                                {/* <Search 
                                    placeholder="Tìm kiếm thông tin tại đây ..."
                                    size="large"
                                /> */}
                            </div>
                            <div className="col-4 group-icon  text-2xl">
                                <a className="icon"><i className="fal fa-user-circle" /></a>
                                {token || fbtoken ? <Link to="/" id="signuptext">Hi {fname} {user.fullname} </Link> : <SignInSignUp />}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="menu">
                    <Link to="/">Trang chủ</Link>
                    <Link to="/introduce">Giới thiệu</Link>
                    <Link>Tin tức</Link>
                    <Link to="/vehicles">Thuê xe</Link>
                    <Link>Liên hệ</Link>
                </div>
            </div>
        </Fragment>
    )
    else return <div></div>
}
export default Header;