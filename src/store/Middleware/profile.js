import Profile from '../actions/profile'
import Auth from '../actions/auth';
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'
const PROFILE = (payload) => {
    return (dispatch, getState) => {
        setTimeout(
            async () =>
                await AsyncStorage.getItem('user', (err, res) => {
                    if (err) {
                        dispatch(Profile.getUserFail())
                    }
                    else if (res === null) {
                        dispatch(Profile.getUserFail())

                    }
                    else {
                        dispatch(Profile.getUserSuccess(JSON.parse(res)))
                        payload && payload.navigation && payload.navigation.navigate(payload.route)
                    }
                }
                ), 0
        )

    }
}

const UPDATE_PROFILE = (payload) => {
    return (dispatch, getState) => {
        dispatch(Profile.updateUser());
        const headers = {
            "Content-Type": "application/json",
            "Authorization": payload.authToken
            // "Content-Type": "application/x-www-form-urlencoded",
        };
        console.log("Updating payload");
        console.log(payload.user);
        const body = {
            name: payload.user.name,
            profile_picture: payload.user.profile_picture,
            user_role_id: payload.user.user_role_id,
            addresses: payload.user.addresses ? payload.user.addresses : []
        };

        console.log("Here is the body");
        console.log(body);
        fetch(`http://18.223.28.90:3000/user/${payload.id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            headers: headers,
            body: JSON.stringify(body), // body data type must match "Content-Type" header
        }).then((response) => {
            if (response.status === 200) {
                const userData = JSON.parse(response._bodyText).data.data;
                // First dispatch the user update action
                // to update the store with the latest values.
                dispatch(Auth.userUpdated({
                    name: userData.name,
                    profile_picture: userData.profile_picture,
                    addresses: payload.user.addresses
                }));
                // Then dispatch the action that will take us to the
                // profile page.
                return dispatch(UPDATE_PROFILE_SUCCESS({
                    navigation: payload.navigation
                }))
            } else {
                // return dispatch(Profile.updateUserFail(JSON.parse(response._bodyText).data.message));
            }
        }).catch((error) => {
            console.log('thid id error in apiu', error);
            return dispatch(Profile.updateUserFail(error));
        })
    }
}

const UPDATE_PROFILE_SUCCESS = (payload) => {
    return (dispatch, getState) => {
        payload.navigation.navigate('Profile');
    }
}

export { PROFILE, UPDATE_PROFILE }