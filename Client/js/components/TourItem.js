import React from "react"
import {Text, TouchableOpacity, View, StyleSheet, Dimensions} from "react-native";
import {getTours, setSelectedTour} from "../actions/plants";
import {connect} from "react-redux";



const screendim = Dimensions.get("window")


class TourItem extends React.Component{


    constructor(props){
        super(props)

        console.log(this.props.item)
    }


    onPress(){
        this.props.setSelectedTour(this.props.item.Id)
        this.props.onPress()
    }

    render(){
        return(
            <TouchableOpacity onPress={() => {this.onPress()}} style={this.props.blind === true ? styles.fatcontainer : styles.container}>
                <Text>{this.props.item.Name}</Text>
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

    }


})


function mapStateToProps (store) {
    return {
        blind : store.settings.blindMode,
        tours : store.plants.tours
    }
}

function mapDispatchToProps (dispatch) {
    return {
        setSelectedTour : (id) => dispatch(setSelectedTour(id))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TourItem)