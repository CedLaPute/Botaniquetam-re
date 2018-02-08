import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Switch, TouchableOpacity, AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {setBlindMode} from "../actions/settings";
import {connect} from "react-redux";



const screenDim = Dimensions.get("window")

class Settings extends React.Component{


    constructor(props){
        super(props)


        this.state = {blind : this.props.blind}

    }

     onBlindChange(){
        if (this.state.blind === true){
            this.setState({blind : false})
            this.props.setBlindMode(false)
        }else{
            this.setState({blind : true})
            this.props.setBlindMode(true)

        }
    }



    render(){
        return(
            <View style={styles.container}>

                <Text style={{width : screenDim.width, fontSize: screenDim.width / 17, textAlign : "center", marginTop: screenDim.height / 20}}>Settings</Text>


                <View style={{width : screenDim.width, marginTop : screenDim.height / 10, flexDirection: "row"}}>
                    <Text style={{fontSize : screenDim.width / 20, marginLeft: screenDim.width / 20}}>Blind mode</Text>
                    <Switch value={this.state.blind} onValueChange={() => {this.onBlindChange()}} style={{marginLeft : screenDim.width / 20}}/>
                </View>


                <View style={{position: "absolute", bottom : screenDim.height / 10, width : screenDim.width, alignItems: "center"}}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => Actions.pop()}
                    >
                        <Text style={styles.textButton}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>


            </View>
        );

    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#47525E',
        width: 200,
        height: 50,
        borderRadius: 90,
        justifyContent: "center"
    },
    textButton: {
        textAlign: 'center',
        color: 'white',
        fontSize: 28,
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
)(Settings)