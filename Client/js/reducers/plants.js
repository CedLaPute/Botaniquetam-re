import {SET_PLANTS, SET_SELECTED} from "../actions/plants"


const initialState = {

    plants : [],
    selected : {}


}


export default function (state = initialState, action) {


    const {data, type} = action;

    switch (type){

        case SET_PLANTS:
            return Object.assign({}, state, {
                plants: data
            })

        case SET_SELECTED:
            return Object.assign({}, state, {
                selected: data
            })

        default:
            return state;
    }

}