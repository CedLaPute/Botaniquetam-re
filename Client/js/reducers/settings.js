import {SET_BLIND_MODE} from "../actions/settings"

const initialState = {


    blindMode : false

}



export default function (state = initialState, action) {

    const {type, data} = action;


    switch (type){

        case SET_BLIND_MODE:
            return Object.assign({}, state, {
                blindMode: data
            })

        default :
            return state
    }





}