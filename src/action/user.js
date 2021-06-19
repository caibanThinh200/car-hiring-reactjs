export const loginUser = (user) =>{
    return{
        type: 'LOG_IN',
        payload: user,
    }
}