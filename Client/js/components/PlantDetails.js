import React from "react"
import {
    View, Dimensions, Text, TouchableOpacity, Image, ScrollView, StyleSheet,
    TouchableWithoutFeedback
} from "react-native";
import {connect} from "react-redux";
import {Actions} from 'react-native-router-flux';
import YouTube from 'react-native-youtube'
import Orientation from 'react-native-orientation';
import Tts from 'react-native-tts';


const screendim = Dimensions.get("window")


class PlantDetails extends React.Component{


    constructor(props){
        super(props)

        Tts.setDefaultLanguage('en-IE');

        this.state = {play : false};


        this.speaking = false;

        Tts.addEventListener('tts-start', (event) => this.speaking = true);
        Tts.addEventListener('tts-finish', (event) => this.speaking = false);


    }




    onFullScreenChange(e){
        if(e.isFullscreen === false){
            this._youTubeRef.seekTo(0)
            this.setState({play : false});
            Orientation.lockToPortrait();

        }
    }

    onVideoStart(){
        this.setState({play : true})
    }


    onTextPress() {
        if(this.props.blind === true){
            Tts.getInitStatus().then(() => {
                Tts.speak(this.props.selected.Description);
            });


        }
    }


    onBack(){
        Tts.stop();
        Actions.pop()
    }


    render(){
        return (<View style={{flex : 1}}>
            <View style={{width : "100%", height : screendim.height / 10, backgroundColor : "#47525E", alignItems: "center", justifyContent: "center"}}>
                <TouchableOpacity onPress={() => {this.onBack()}} style={{position : "absolute", left : 0, top : 0, height : "100%", width : this.props.blind === true ? screendim.width / 4 : screendim.width / 7, justifyContent : "center", alignItems : "center"}}>
                    <Text style={{color : "white", fontSize : this.props.blind === true ? screendim.width / 10 : screendim.width / 20}}>Back</Text>
                </TouchableOpacity>
                <Text style={this.props.blind === true ? styles.fatTitle : styles.title}>{this.props.selected.Name}</Text>
            </View>

            <TouchableOpacity onPress={() => {this.onVideoStart()}} style={{width : "100%", height : screendim.height / 3.5, backgroundColor : "black", alignItems : "center", justifyContent : "center"}}>
                <Image style={{width : this.props.blind === true ? screendim.height / 5 : screendim.height / 10, height : this.props.blind === true ? screendim.height / 5 : screendim.height / 10}}  source={require("../../resources/play.png")}  />
            </TouchableOpacity>


            <View style={{width : screendim.width, alignItems : "center", marginTop: screendim.height / 15, height : screendim.height / 2.5}}>
                <ScrollView>
                    <TouchableWithoutFeedback onPress={() => {this.onTextPress()}}>
                        <View>
                            <Text style={{width : screendim.width / 1.2, textAlign : "center", fontSize : this.props.blind === true ? screendim.width / 7 : screendim.width / 20}}>{this.props.selected.Description}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>

            </View>




            <YouTube
                videoId="KVZ-P-ZI6W4"   // The YouTube video ID
                play={this.state.play}             // control playback of video with true/false
                fullscreen={this.state.play}       // control whether the video should play in fullscreen or inline
                loop={false}             // control whether the video should loop when ended
                apiKey={"AIzaSyBfiA4Yg7hEFqBbC17fqxgZ6uujCIUqtnw"}
                onReady={e => this.setState({ isReady: true })}
                onChangeState={e => this.setState({ status: e.state })}
                onChangeQuality={e => this.setState({ quality: e.quality })}
                onError={e => this.setState({ error: e.error })}
                onChangeFullscreen={(e) => {this.onFullScreenChange(e)}}

                ref={component => {
                    this._youTubeRef = component;
                }}

                style={{ width : 0, height : 0 }}
            />


        </View>)
    }


}


const styles = StyleSheet.create({


    title : { color : "white",
        fontSize :  screendim.width / 15
    },
    fatTitle : {
        color : "white",
        fontSize :  screendim.width / 7,
        position: "absolute",
        right : screendim.width / 20
    }

})

function mapStateToProps (store) {
    return {
        plants: store.plants.plants,
        selected : store.plants.selected,
        blind : store.settings.blindMode
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchPlants : () => dispatch(getPlants())
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlantDetails)