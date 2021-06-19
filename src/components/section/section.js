import React, { Fragment, useState } from "react";
import HomeContent from '../layout/Home/homeContent'
import HiringIndex from '../layout/Hiring/index'
import Login from '../Login'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Introduce from "../layout/Introduce";
import Register from "../Register";
import UserPage from "../layout/User/user";
import Cart from "../layout/Cart/cart";
import Detail from "../cardetail/cardetail";
import Payment from "../layout/Payment";
import Admin from "../Admin/admin";
import ListCar from "../Admin/list_car";
import ListBill from "../Admin/list-bill";
import AddCar from "../Admin/add_car";
import KPI from "../Admin/KPI";
import revenue from "../Admin/chart/revenue"
import saled from "../Admin/chart/saled"
import RevenueChart from "../Admin/chart/revenue";
import SaledChart from "../Admin/chart/saled";
const Section = () => {

    const token = localStorage.getItem('token')
    return (
        <Fragment>
            <Switch>
                <Route exact path="/" component={HomeContent}>
                </Route>
                <Route path="/vehicles" component={HiringIndex}>
                </Route>
                <Route path='/detail/:id' component={Detail}>
                </Route>
                <Route exact path="/admin">
                    <Admin com={<KPI/>} />
                </Route>
                <Route exact path="/admin/bill">
                    <Admin com={<ListBill/>} />
                </Route>
                <Route exact path="/admin/revenue-chart">
                    <Admin com={<RevenueChart/>} />
                </Route>
                <Route exact path="/admin/saled-chart">
                    <Admin com={<SaledChart/>} />
                </Route>
                <Route exact path="/admin/vehicle">
                    <Admin com={<ListCar />} />
                </Route>
                <Route exact path="/admin/add-vehicle">
                    <Admin com={<AddCar/>}/>
                </Route>
                {token ? <Route path="/login">
                    <Redirect to="/" />
                </Route> : <Route path="/login" component={Login}>
                    </Route>}
                {token ? <Route path="/sign-up">
                    <Redirect to="/" />
                </Route> : <Route path="/sign-up" component={Register}>
                    </Route>}
                <Route path='/introduce' component={Introduce}>
                </Route>
                {token ? <Route exact path='/user/:id' component={UserPage}>
                </Route> : <Route>
                        <Redirect to="/login" />
                    </Route>}
                {token ? <Route exact path='/cart' component={Cart}>
                </Route> : <Route>
                        <Redirect to="/login" />
                    </Route>}
                {token ? <Route exact path='/:id/payment' component={Payment}>
                </Route> : <Route>
                        <Redirect to="/login" />
                    </Route>}
            </Switch>
        </Fragment>


    )
}
export default Section;