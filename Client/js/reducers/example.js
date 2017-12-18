import {SET_VALUE} from "../actions/example"


const initialState = {

    value : undefined

};



export default function (state = initialState, action) {


    const {type, data} = action;


    switch (type){

        case SET_VALUE:
            return Object.assign({}, state, {
                value : data
            })

        default:
            return state

    }

}