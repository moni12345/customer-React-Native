import Profile from '../actions/profile'
import services from '../actions/services';
import parseServicesResponse from '../../utils/servicesParser'

const getServices = () => {
    return (dispatch, getState) => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": getState().auth.user.token
        };
        fetch(`http://18.223.28.90:3000/categories/getAllCategoriesAndServices`, {
            method: "GET",
            mode: "cors",
            headers: headers
        }).then((response) => {
            console.log("Got response", response);
            if (response.status === 200) {
                const resp = JSON.parse(response._bodyText).data.data;
                //call your middleware here to arrage data
                const parsedServices = parseServicesResponse(resp)
                return dispatch(services.updateServices({
                    categories: parsedServices.categories,
                    services: parsedServices.services
                }));

            } else {
                // return dispatch(Profile.updateUserFail(JSON.parse(response._bodyText).data.message));
            }
        }).catch((error) => {
            console.log('API error: ', error);
            return dispatch(Profile.updateUserFail(error));
        })
    }
}

export { getServices }