/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
    Button,
    TouchableOpacity,
    Dimensions,
    AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from "react-redux";
import {setBlindMode} from "../actions/settings";



const screenDim = Dimensions.get("window")

class Menu extends React.Component{



    constructor(props){
        super(props)


    }



    async getBlindMode(){
        const blind = await AsyncStorage.getItem("blind");


        if (blind === null){
            await AsyncStorage.setItem("blind", "false");
            this.props.setBlindMode(false)
        }else if (blind === "true") {
            this.props.setBlindMode(true)
        }else if (blind === "false"){
            this.props.setBlindMode(false)
        }
    }

    componentDidMount(){
        this.getBlindMode()
    }



    render(){
        return (
            <View style={styles.mainPage}>
                <Text style={this.props.blind === true ? styles.fatWelcome : styles.welcome}> ZBG </Text>
                <View>
                    <TouchableOpacity
                        style={this.props.blind === true ? styles.fatButton : styles.button}
                        onPress={() => Actions.tour_list()}
                    >
                        <Text style={this.props.blind === true ? styles.fatTextButton : styles.textButton}> Take a tour </Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 20}}>
                    <TouchableOpacity
                        style={this.props.blind === true ? styles.fatButton : styles.button}
                        onPress={() => Actions.walk()}
                    >
                        <Text style={this.props.blind === true ? styles.fatTextButton : styles.textButton}> Walk around </Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 20}}>
                    <TouchableOpacity
                        style={this.props.blind === true ? styles.fatButton : styles.button}
                        onPress={() => Actions.settings()}
                    >
                        <Text style={this.props.blind === true ? styles.fatTextButton : styles.textButton}> Settings </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
      fontSize: screenDim.width / 10,
      textAlign: 'center',
      color: 'black',
  },
    fatWelcome: {
        fontSize: screenDim.width / 3,
        textAlign: 'center',
        color: 'black',
    },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
    mainPage: {
        flex: 1,
        height: 200,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#47525E',
        width: 200,
        height: 50,
        borderRadius: 90,
        justifyContent : "center",
    },
    fatButton: {
        backgroundColor: '#47525E',
        width: screenDim.width,
        height: screenDim.height / 5,
        justifyContent : "center",
    },
    textButton: {
        textAlign: 'center',
        color: 'white',
        fontSize: screenDim.width / 15,
    },
    fatTextButton: {
        textAlign: 'center',
        color: 'white',
        fontSize: screenDim.width / 6,
    },
});



function mapStateToProps (store) {
    return {
        blind : store.settings.blindMode
    }
}

function mapDispatchToProps (dispatch) {
    return {
        setBlindMode : (mode) => dispatch(setBlindMode(mode))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)
