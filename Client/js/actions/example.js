export const SET_VALUE = "SET_VALUE"



export const setValue = (value) => dispatch => {
    return dispatch({
        type : SET_VALUE,
        data : value
    })
}