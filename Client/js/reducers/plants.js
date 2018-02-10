import {SET_PLANTS, SET_SELECTED, SET_BEACONS, SET_POSITION, SET_SELECTED_TOUR, SET_TOURS} from "../actions/plants"


const initialState = {

    plants : [],
    beacons : [],
    selected : {},
    position : {},
    tours : [],
    selectedTour : {}


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
        case SET_BEACONS:
            return Object.assign({}, state, {
                beacons: data
            })
        case SET_POSITION:
            return Object.assign({}, state, {
                position : data
            })
        case SET_TOURS:
            return Object.assign({}, state, {
                tours : data
            })
        case SET_SELECTED_TOUR:
            return Object.assign({}, state, {
                selectedTour : data
            })
        default:
            return state;
    }

}