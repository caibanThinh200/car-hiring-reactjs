export const getListCarFromLowPrice = (list) =>{
    return{
        type: 'GET_LIST_CAR_FROM_LOW_PRICE',
        payload: list,
    }
}

export const getListCarFromHighPrice = (list) =>{
    return{
        type: 'GET_LIST_CAR_FROM_HIGH_PRICE',
        payload: list,
    }
}
export const setList = (list, defaultList) =>{
    return{
        type: 'SET_LIST_CAR',
        payload: {list, defaultList},
    }
}
export const getListCarByCategory = (list, condition) =>{
    return{
        type: 'GET_LIST_BY_CATEGORY',
        payload: {list, condition},
    }
}
export const getListCarByPrice = (range) =>{
    return{
        type: 'GET_LIST_CAR_BY_PRICE',
        payload: {range}
    }
}
export const collapsedCategory = () =>{
    return{
        type: 'SET_COLLAPSED_CATEGORY',
    }
}
export const searchCar = (value) =>{
    return{
        type: 'SEARCH_CAR',
        payload: value
    }
}
export const loadList = () =>{
    return{
        type: 'LOAD_LIST',
    }
}