import React from "react"
import {Text, TouchableOpacity, View, StyleSheet, Dimensions, Image} from "react-native";
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
                <Text style={this.props.blind === true ? styles.fatText : styles.text}>{this.props.item.Name}</Text>
                <Image style={this.props.blind === true ? styles.fatIcon : styles.icon} source={require("../../resources/rightArrow.png")}/>
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
        alignItems: "center",
        flexDirection: "row"
    },
    fatcontainer : {
        width : "100%",
        height : screendim.height / 7,
        borderBottomColor : "grey",
        borderBottomWidth: 1,
        alignItems: "center",
        flexDirection: "row"
    },
    text : {
        fontSize : screendim.width / 15,
        marginLeft: screendim.width / 20
    },
    fatText : {
        fontSize : screendim.width / 5,
        marginLeft: screendim.width / 20
    },
    icon : {
        width : screendim.height / 15,
        height : screendim.height / 15,
        marginLeft: screendim.width / 2
    }, fatIcon : {
        width : screendim.height / 8,
        height : screendim.height / 8,
        marginLeft: screendim.width / 10
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