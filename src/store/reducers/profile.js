const INITIAL_STATE ={
    user:null,
    isError:true,
    // isVerified : false
    }
    const Profile = (state=INITIAL_STATE,action) =>{
        switch(action.type){
            case 'GET_USER':
            return {...state}
            case 'GET_USER_SUCCESS':
            return {...state,user:action.payload,isError:false}
            case 'GET_USER_FAIL':
            return {...state,isError:true}
            case 'UPDATE_USER':
            return {...state}
            case 'UPDATE_USER_SUCCESS':
            return {...state,user:action.payload,isError:false}
            case 'UPDATE_USER_FAIL':
            return {...state,isError:true}
            default :
            return state
        }
    }
    export {
        Profile
    }