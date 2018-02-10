import React from "react"
import {Text, TouchableOpacity, View, StyleSheet, Dimensions} from "react-native";
import {connect} from "react-redux";
import {setSelected} from "../actions/plants";
import {Actions} from 'react-native-router-flux';



const screendim = Dimensions.get("window")



class PlantTourItem extends React.Component{


    constructor(props){
        super(props)
    }

    onPress(){

        this.props.setSelectedPlant(this.props.item)
        Actions.details();

    }

    render(){
        return(
            <TouchableOpacity onPress={() => {this.onPress()}} style={this.props.blind === true ? styles.fatcontainer : styles.container}>
                <Text style={this.props.blind === true ? styles.fatText : styles.text}>{this.props.item.Name}</Text>
            </TouchableOpacity>
        )
    }


}


const styles = StyleSheet.create({
    container : {
        width : "100%",
        height : screendim.height / 10,
        borderBottomColor : "grey",
        borderBottomWidth: 1,
        justifyContent: "center"
    },
    fatcontainer : {
        width : "100%",
        height : screendim.height / 10,
        borderBottomColor : "grey",
        borderBottomWidth: 1,
        justifyContent: "center"
    },
    text : {
        marginLeft: screendim.width / 20,
        fontSize : screendim.width / 15
    },
    fatText : {

    }
})


function mapStateToProps (store) {
    return {
        blind : store.settings.blindMode

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
)(PlantTourItem)