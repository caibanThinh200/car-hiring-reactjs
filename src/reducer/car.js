const initialState ={
    listCar: [],
    defaultList: [],
    collapsed: false,
}

const carReducer = (state = initialState, action)=>{
    switch (action.type){
        case 'GET_LIST_CAR_FROM_LOW_PRICE':{
            const newList = action.payload
            newList.sort((a,b)=>{
                return a.price - b.price;
            })
            return {...state, listCar: [...newList]}
        }
        case 'GET_LIST_CAR_FROM_HIGH_PRICE':{
            const newList = action.payload
            newList.sort((a,b)=>{
                return b.price - a.price;
            })
            return {...state, listCar: [...newList]}
        }
        case 'GET_LIST_CAR_BY_PRICE':{
            const range = action.payload.range
            const newList = state.defaultList.filter(item=>{
                return item.price >= range[0] && item.price <= range[1]
            })
            return {...state, listCar: [...newList]}
        }
        case 'GET_LIST_BY_CATEGORY':{
            const condition = action.payload.condition
            let newArr = []
            state.defaultList.filter(car=>{
                car.idCategory === condition&&newArr.push(car) || car.idManufactor === condition&&newArr.push(car)
            })
            return {...state, listCar: newArr, defaultSortList: newArr}
        }
        case 'SET_LIST_CAR':{
            return {...state, listCar: action.payload.list, defaultList: action.payload.defaultList}
        }
        case 'SEARCH_CAR':{
            const keyWord = action.payload
            let newArr = []
            state.defaultList.filter(car=>{
                car.name.toLowerCase().includes(keyWord)&&newArr.push(car)
            })
            return {...state, listCar: newArr}
        }
        case 'SET_COLLAPSED_CATEGORY':{
            const collapsed = !state.collapsed
            return{...state, collapsed: collapsed}
        }
        case 'LOAD_LIST' :{
            return{...state, listCar: [...state.defaultList]}
        }
        default:
            return state
    }
}
export default carReducer;