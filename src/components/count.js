import React, { Component } from 'react';

const Count = ({count, index}) =>{
    return(
        <div>
            <p>{index +1}</p>
            <p>{count.id}</p>
            <p>{count.name}</p>
        </div>
    );
}

export default Count