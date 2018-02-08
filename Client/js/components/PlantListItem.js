import React from "react"
import {Text, TouchableOpacity, Dimensions, Image} from "react-native";
import {setSelected} from "../actions/plants";
import {connect} from "react-redux";


const screenDim = Dimensions.get("window")


class PlantListItem extends React.Component{


    onPress(){
        this.props.setSelectedPlant(this.props.item)
        this.props.onClick()
    }

    render(){
        return(
            <TouchableOpacity onPress={() => {this.onPress()}} style={{width : "100%", height : screenDim.height / 6, alignItems: "center", borderBottomWidth: 1, borderBottomColor : "grey", flexDirection: "row"}}>
                <Text style={{fontSize : screenDim.width / 10, marginLeft: screenDim.width / 40}}>{this.props.item.Name}</Text>
                <Image style={{height : screenDim.height / 12, width : screenDim.height / 12, position : "absolute", right : screenDim.width / 30}} source={require("../../resources/rightArrow.png")}/>
            </TouchableOpacity>
        )
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
)(PlantListItem)