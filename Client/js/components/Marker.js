import React from "react"
import {Image, TouchableOpacity, Dimensions} from "react-native"
import {connect} from "react-redux";
import {getPlants, setSelected} from "../actions/plants";


const screendim = Dimensions.get("window")
const imgSize = screendim.height / 15





export const xPos = {


    0 : -20,
    1 : -7,
    2 : 3,
    3 : 10,
    4 : 19,
    5 : 22,
    6 : 30,
    7 : 41,
    8 : 50,
    9 : 59,
    10 : 71,
    11 : 80,
    12 : 92,
    13 : 100,
    14 : 111,
    15 : 120,
    16 : 132,
    17 : 142,
    18 : 152,
    19 : 161,
    20 : 172,
    21 : 182,
    22 : 192,
    23 : 202,
    24 : 212,
    25 : 222,
    26 : 232,
    27 : 242,
    28 : 252,
    29 : 262,
    30 : 272,
    31 : 282,
    32 : 292,
    33 : 302,
    34 : 312,
    35 : 321,
    36 : 331,
    37 : 341,
    38 : 351,
    39 : 361,
    40 : 371,
    41 : 381,
    42 : 391,
    43 : 401,
    44 : 411,
    45 : 421,
    46 : 431,
    47 : 441,
    48 : 453,
    49 : 463,
    50 : 473,
    51 : 483,
    52 : 493,
    53 : 505,
    54 : 515,
    55 : 525,
    56 : 535,
    57 : 545,
    58 : 555,
    59 : 565,
    60 : 575,
    61 : 585,
    62 : 595,
    63 : 605,
    64 : 615,
    65 : 625,
    66 : 635,
    67 : 645,
    68 : 655,
    69 : 665,
    70 : 675,
    71 : 685,
    72 : 695,
    73 : 705,
    74 : 715,
    75 : 725,
    76 : 735,
    77 : 745,
    78 : 755,
    79 : 765,
    80 : 775,
    81 : 785,
    82 : 795,
    83 : 805,
    84 : 815,
    85 : 825,
    86 : 835,
    87 : 845,
    88 : 855

}

export const yPos = {
    0 : 475,
    1 : 467,
    2 : 457,
    3 : 447,
    4 : 437,
    5 : 427,
    6 : 416,
    7 : 406,
    8 : 396,
    9 : 386,
    10 : 376,
    11 : 367,
    12 : 357,
    13 : 347,
    14 : 337,
    15 : 327,
    16 : 317,
    17 : 307,
    18 : 297,
    19 : 287,
    20 : 277,
    21 : 267,
    22 : 257,
    23 : 247,
    24 : 237,
    25 : 227,
    26 : 217,
    27 : 207,
    28 : 197,
    29 : 187,
    30 : 177,
    31 : 167,
    32 : 157,
    33 : 147,
    34 : 137,
    35 : 127,
    36 : 117,
    37 : 107,
    38 : 97,
    39 : 87,
    40 : 77,
    41 : 67,
    42 : 57,
    43 : 47,
    44 : 37,
    45 : 27,
    46 : 15,
    47 : 5,
    48 : -5,
    49 : -15,
    50 : -25,
    51 : -35,
    52 : -45
}

 class Marker extends  React.Component{





    onMarkerPress(){
        this.props.setSelectedPlant(this.props.item)
    }

    render(){

        console.log(this.props.item)

        return(<TouchableOpacity onPress={() => {this.onMarkerPress()}} style={{position: "absolute", top : yPos[this.props.item.CoordinateY], left : xPos[this.props.item.CoordinateX], width : 50, height: 50}} >
            <Image style={{width : 50, height: 50}} source={require("../../resources/marker.png")}/>
        </TouchableOpacity>)
    }

}



function mapStateToProps (store) {
    return {
    }
}

function mapDispatchToProps (dispatch) {
    return {
        setSelectedPlant : (plant) => dispatch(setSelected(plant))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Marker)