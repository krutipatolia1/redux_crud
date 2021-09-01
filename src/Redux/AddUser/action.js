import { USER } from "./type"

export const userAdded = (payload) => {
    return {
        type: USER.ADD_USER,
        payload: payload
    }
}

export const userEdit = (payload) => {
    return {
        type: USER.EDIT_USER,
        payload: payload
    }
}

export const userDelete = (payload) => {
    return {
        type: USER.DELETE_USER,
        payload: payload
    }
}

export const deleteAll = () => {
    return {
        type: USER.DELETE_ALL
    }
}

