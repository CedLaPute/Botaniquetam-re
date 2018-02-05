import {serverAddress} from "../components/MapPage";

export const SET_PLANTS = "SET_PLANTS"
export const SET_SELECTED = "SET_SELECTED"



export const getPlants = () => dispatch => {


    return fetch(serverAddress + "/plants", {
        method : "GET",
        headers : {
            'Accept' : 'Application/json',
            'Content-Type' : 'application/json'
        },
    }).then((response) => response.json())
        .then(async (responseJson) => {

                dispatch({
                    type : SET_PLANTS,
                    data : responseJson
                });
            return responseJson;
        })


}

export const setSelected = (plant) => dispatch => {

    return dispatch({type : SET_SELECTED,
    data : plant})

}

export const resetSelected = () => dispatch => {
    return dispatch({type : SET_SELECTED, data : {}})
}