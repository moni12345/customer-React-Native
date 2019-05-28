class Auth{
    static register = () =>({
        type:"REGISTER",
    })
    static registerSuccess = (payload) =>({
        type:"REGISTER_SUCCESS",
        payload
    })
    static registerFail = (payload) =>({
        type:"REGISTER_FAIL",
        payload
    })
    static login = () =>({
        type:"LOGIN",
    })
    static loginSuccess = (payload) =>({
        type:"LOGIN_SUCCESS",
        payload
    })
    static loginFail = (payload) =>({
        type:"LOGIN_FAIL",
        payload
    })
    static verify = () =>({
        type:"VERIFY",
    })
    static verifySuccess = (payload) =>({
        type:"VERIFY_SUCCESS",
        payload
    })
    static verifyFail = (payload) =>({
        type:"VERIFY_FAIL",
        payload
    })
    static userUpdated = (payload) => ({
        type: "USER_UPDATED",
        payload
    })

}
export default Auth