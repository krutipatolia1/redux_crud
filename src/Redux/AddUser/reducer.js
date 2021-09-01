import { USER } from './type';

export const intialState = {
    users: []
};

export const usersReducer = (state = intialState, action) => {
    switch (action.type) {
        case USER.ADD_USER:
            let item = state.users
            item.push(action.payload)
            return {
                ...state,
                users: item
            };
        case USER.EDIT_USER:
            return {
                ...state,
                users: state.users.map((item) => item.id === action.payload.id ? action.payload : item),
                loca: localStorage.setItem('usersdata', JSON.stringify(state.users))
            };
        case USER.DELETE_USER:
            return {
                ...state,
                users: state.users.filter((item) => item.id !== action.payload.id),
            };
        case USER.DELETE_ALL:
            return {
                ...state,
                users: []
            };
        default:
            return state;
    };

};