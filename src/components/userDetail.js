import React from 'react'

const UserDetail= ({user}) =>{
    return(
        <div className="UserInfo">
            <ol>
            <li>Họ và tên: <p>{user.fullname}</p></li>
            <li>Email: <p>{user.mail}</p></li>
            <li>Căn cước công dân: <p>{user.cmnd}</p></li>
            </ol>
        </div>
    );
}

export default UserDetail; 