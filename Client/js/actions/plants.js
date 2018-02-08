import {serverAddress} from "../components/MapPage";

export const SET_PLANTS = "SET_PLANTS"
export const SET_SELECTED = "SET_SELECTED"
export const SET_BEACONS = "SET_BEACONS"
export const SET_POSITION = "SET_POSITION"



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

export const getBeacons = () => dispatch => {


    return fetch(serverAddress + "/beacons/", {
        method : "GET",
        headers : {
            'Accept' : 'Application/json',
            'Content-Type' : 'application/json'
        },
    }).then((response) => response.json())
        .then(async (responseJson) => {
            console.log(responseJson)
            dispatch({
                type : SET_BEACONS,
                data : responseJson
            });
            return responseJson;
        })


}


export const setSelected = (plant) => dispatch => {

    return dispatch({type : SET_SELECTED,
    data : plant})

}

export const setPosition = (beacon) => dispatch => {

    return dispatch({type : SET_POSITION, data : beacon})

}

export const resetSelected = () => dispatch => {
    return dispatch({type : SET_SELECTED, data : {}})
}