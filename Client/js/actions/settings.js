import {AsyncStorage} from "react-native"

export const SET_BLIND_MODE = "SET_BLIND_MODE"


export const setBlindMode = (mode) => async dispatch => {

    if (mode === false)
        await AsyncStorage.setItem("blind", "false");
    else
        await AsyncStorage.setItem("blind", "true")


    return dispatch({type : SET_BLIND_MODE, data : mode})


}