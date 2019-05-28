import Auth from '../actions/auth'
import Profile from '../actions/profile'
import { PROFILE } from './profile'
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'
const REGISTER = (payload) => {
    return (dispatch, getState) => {
        dispatch(Auth.register());
        fetch('http://18.223.28.90:3000/user/add', {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                payload.user
            ),
        }).then((response) => {
            if (response.status === 500) {
                alert(JSON.parse(response._bodyText).data.message)
            }
            if (response.status === 200) {
                var uid = JSON.parse(response._bodyText).data.data.id
                //temp. untill twilio is disabled
                // alert(JSON.parse(response._bodyText).data.data.verification_code);
                // TODO: Remove this async storage and the PROFILE action dispatch.
                AsyncStorage.setItem('user', JSON.stringify(JSON.parse(response._bodyText).data.data));
                dispatch(PROFILE())
                payload.navigation.navigate('VerifySignup', { uid: uid, route: 'App' });
                return dispatch(Auth.registerSuccess(JSON.parse(response._bodyText).data.data));
            }
            else {
                return dispatch(Auth.registerFail(JSON.parse(response._bodyText).data.message));
            }
        }).catch((error) => {
            console.log(error);
            return dispatch(Auth.registerFail(error));
        })
    }
}

const LOGIN_USER = (payload) => {
    return (dispatch, getState) => {
        console.log("Logging in the user");
        fetch('http://18.223.28.90:3000/user/login', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload.user), // body data type must match "Content-Type" header
        }).then((response) => {
            if (response.status === 401) { 
                alert(JSON.parse(response._bodyText).data.message);
            }
            if (response.status === 200) {
                // Set the user in Asyncstorage
                AsyncStorage.setItem('user', JSON.stringify(JSON.parse(response._bodyText).data.data), (err) => {
                    if(err) {
                        alert("Could not set user in local storage.");
                    } else {
                        // After setting the user in local storage, set the user in
                        // store.
                        dispatch(Auth.loginSuccess(JSON.parse(response._bodyText).data.data));
                        dispatch(Profile.getUserSuccess(JSON.parse(response._bodyText).data.data));
                        dispatch(GOTO_APP(payload.navigation));
                    }
                });
            }
            if (response.status === 403) {
                var id = JSON.parse(response._bodyText).data.data.id;
                payload.navigation.navigate('VerifySignup', { uid: id, route: 'App' })
            }
            else {
                return dispatch(Auth.loginFail(JSON.parse(response._bodyText).data.message));
            }
        }).catch((error) => {
            console.log('thid id error in apiu', error);
            return dispatch(Auth.loginFail(error));
        })
    }
}

const GOTO_APP = (navigation) => {
    return (dispatch, getState) => {
        navigation.navigate('App');
    }
}

const VERIFY = (payload) => {
    return (dispatch, getState) => {
        console.log("Here's the shit");
        console.log(payload);
        dispatch(Auth.verify());
        fetch(`http://18.223.28.90:3000/user/verifyUser/?id=${payload.user.id}&verificationCode=${payload.code}`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.status === 500) { alert(JSON.parse(response._bodyText).data.message) }
            else if (response.status === 200) {
                AsyncStorage.setItem('user', JSON.stringify(JSON.parse(response._bodyText).data.data))
                dispatch(PROFILE())
                console.log({ ...payload.user, code: payload.code });
                payload.navigation.navigate(payload.route, { ...payload.user, code: payload.code });
                return dispatch(Auth.verifySuccess(JSON.parse(response._bodyText).data.data));
            } else {
                return dispatch(Auth.verifyFail());
            }
        }).catch((error) => {
            console.log('thid id error in apiu', error);
            return dispatch(Auth.verifyFail(error));
        })
    }
}
export { REGISTER, LOGIN_USER, VERIFY }