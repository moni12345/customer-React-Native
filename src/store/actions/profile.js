class Profile{
    static getUser = () =>({
        type:"GET_USER",
    })
    static getUserSuccess = (payload) =>({
        type:"GET_USER_SUCCESS",
        payload
    })
    static getUserFail = (payload) =>({
        type:"GET_USER_FAIL",
        payload
    })
    static updateUser = () =>({
        type:"UPDATE_USER",
    })
    static updateUserSuccess = (payload) =>({
        type:"UPDATE_USER_SUCCESS",
        payload
    })
    static updateUserFail = (payload) =>({
        type:"UPDATE_USER_FAIL",
        payload
    })

}
export default Profile