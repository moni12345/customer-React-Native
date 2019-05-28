const INITIAL_STATE = {
    categories: [],
    services: []
}
const Services = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_SERVICES':
            return { ...state, categories: action.payload.categories, services: action.payload.services }
        default:
            return state
    }
}
export {
    Services
}