import React from 'react';


const CarDetail = ({car}) =>{
    return(
        <div className="CarDetail">
            <ol>
            <li>Tên Xe: <p>{car.name} </p></li>
            <li>Giá Xe: <p>{car.price} VNĐ</p></li>
            </ol>
        </div>
    );
}
export default CarDetail;