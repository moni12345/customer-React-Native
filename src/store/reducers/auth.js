const INITIAL_STATE ={
user:null,
isError:true,
isVerified : false
}
const Auth = (state=INITIAL_STATE,action) =>{
    switch(action.type){
        case 'REGISTER':
        return {...state}
        case 'REGISTER_SUCCESS':
        return {...state,user:action.payload,isError:false,isVerified:action.payload.phone_number_confirmed}
        case 'REGISTER_FAIL':
        return {...state,isError:true}
        case 'LOGIN':
        return {...state}
        case 'LOGIN_SUCCESS':
        return {...state,user:action.payload,isError:false,isVerified:action.payload.phone_number_confirmed}
        case 'LOGIN_FAIL':
        return {...state,isError:true}
        case 'VERIFY':
        return {...state}
        case 'VERIFY_SUCCESS':
        return {...state,isError:false,isVerified:true,user:action.payload,isVerified:action.payload.phone_number_confirmed}
        case 'VERIFY_FAIL':
        return {...state,isError:true,isVerified:false}
        case 'USER_UPDATED':
        const user = {...state.user, ...action.payload}
        return {...state,user}

        default :
        return state
    }
}
export {
    Auth
}