import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions, ScrollView
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from "react-redux";
import {getPlants, getTours} from "../actions/plants";
import TourItem from "./TourItem";



const screendim = Dimensions.get("window")

class TourList extends React.Component{


    constructor(props){
        super(props);

        this.props.getTours();
        this.props.getPlants()
    }



    getItems(){
        return this.props.tours.map((item, index) => {

            return <TourItem onPress={this.onPress.bind(this)} item={item} key={index}/>

        })
    }

    onBack(){
        Actions.pop()
    }

    onPress(){
        Actions.tourdetail()
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{width : "100%", height : screendim.height / 10, backgroundColor : "#47525E", alignItems: "center", justifyContent: "center",}}>
                    <Text style={this.props.blind === true ? styles.fatTitle : styles.title}>Select a tour</Text>
                </View>

                <View style={{width : screendim.width, alignItems : "center"}}>
                <View style={{width : screendim.width / 1.1, borderWidth: 1, borderColor : "grey", height : screendim.height / 1.4, marginTop: screendim.height / 40}}>
                <ScrollView>
                    {this.getItems()}
                </ScrollView>
                </View>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => Actions.pop()}
                >
                    <Text style={this.props.blind === true ? styles.fatTextButton : styles.textButton}>Back</Text>
                </TouchableOpacity>

            </View>
        );
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    title : { color : "white",
        fontSize :  screendim.width / 15
    },
    fatTitle : {
        color : "white",
        fontSize :  screendim.width / 7,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#47525E',
        position : "absolute",
        bottom : 0, left : 0, right : 0, top : screendim.height / 1.16,
        justifyContent : "center"
    },
    textButton: {
        textAlign: 'center',
        color: 'white',
        fontSize: screendim.width / 12,
    },
    fatTextButton : {
        textAlign: 'center',
        color: 'white',
        fontSize: screendim.width / 6,
    }

});



function mapStateToProps (store) {
    return {
        blind : store.settings.blindMode,
        tours : store.plants.tours
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getTours : () => dispatch(getTours()),
        getPlants : () => dispatch(getPlants())
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TourList)