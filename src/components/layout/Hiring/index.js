import { Fragment } from 'react';
import Category from './Category'
import Hiring from './hiring'
import '../../../styles/hiring.css'

const Index = () => {
    return (
        <Fragment>
            <div className="d-flex ">
                <Category />
                <Hiring className="ml-8" />
            </div>
        </Fragment>
    )
}
export default Index;