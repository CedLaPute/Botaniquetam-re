import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Switch, TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';



const screenDim = Dimensions.get("window")

export default class Settings extends React.Component{


    constructor(props){
        super(props)


        this.state = {blind : false, enlarge : false, button : false}

    }

    onBlindChange(){
        if (this.state.blind === true){
            this.setState({blind : false})
        }else{
            this.setState({blind : true})
        }
    }

    onEnlargeChange(){
        if (this.state.enlarge === true){
            this.setState({enlarge : false})
        }else{
            this.setState({enlarge : true})
        }
    }

    onButtonChange(){
        if (this.state.button === true){
            this.setState({button : false})
        }else{
            this.setState({button : true})
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

                <View style={{width : screenDim.width, marginTop : screenDim.height / 10, flexDirection: "row"}}>
                    <Text style={{fontSize : screenDim.width / 20, marginLeft: screenDim.width / 20}}>Enlarge text</Text>
                    <Switch value={this.state.enlarge} onValueChange={() => {this.onEnlargeChange()}} style={{marginLeft : screenDim.width / 20}}/>
                </View>

                <View style={{width : screenDim.width, marginTop : screenDim.height / 10, flexDirection: "row"}}>
                    <Text style={{fontSize : screenDim.width / 20, marginLeft: screenDim.width / 20}}>Enlarge button</Text>
                    <Switch value={this.state.button} onValueChange={() => {this.onButtonChange()}} style={{marginLeft : screenDim.width / 20}}/>
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
    },
    textButton: {
        textAlign: 'center',
        color: 'white',
        fontSize: 28,
    },

});
