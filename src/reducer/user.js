import { unstable_renderSubtreeIntoContainer } from "react-dom"

const initialState ={
    name: '',
    phone: '',
    mail: '',
    role: '',
}
const userReducer = (state = initialState, action) =>{
    switch (action.type){
        case 'LOG_IN':{
            const user = action.payload
            return{...state, idUser: user.idUser, name: user.fullname, phone: user.phoneNum, mail: user.mail, address: user.address}
        }
        default:
            return state
    }
}
export default userReducer