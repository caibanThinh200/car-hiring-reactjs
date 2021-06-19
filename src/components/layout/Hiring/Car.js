import '../../../styles/hiring.css';
const Car = ({car}) =>{
    return(
        <div style={{paddingBottom: '15px'}} className="col-md-4 col-sm-6 col-6">
            <div className="box">
                <p className="car-image">image</p>
                    <div className="information">
                        <h6>{car.name}</h6>
                        <p>Giá theo ngày: <span style={{color: 'red', marginLeft:'5px'}}>${car.price} </span></p>
                    </div>
                <a href="details.html">Xem ngay</a>
            </div>
        </div>
    );
}
export default Car;
