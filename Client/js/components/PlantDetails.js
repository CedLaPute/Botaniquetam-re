import React from "react"
import {View, Dimensions, Text, TouchableOpacity, Image} from "react-native";
import {connect} from "react-redux";
import {Actions} from 'react-native-router-flux';
import YouTube from 'react-native-youtube'


const screendim = Dimensions.get("window")


class PlantDetails extends React.Component{


    constructor(props){
        super(props)


        this.state = {play : false};
    }

    onFullScreenChange(e){
        if(e.isFullscreen === false){
            this._youTubeRef.seekTo(0)
            this.setState({play : false});
        }
    }

    onVideoStart(){
        this.setState({play : true})
    }

    render(){
        return (<View style={{flex : 1}}>
            <View style={{width : "100%", height : screendim.height / 10, backgroundColor : "#47525E", alignItems: "center", justifyContent: "center"}}>
                <TouchableOpacity onPress={() => {Actions.pop()}} style={{position : "absolute", left : 0, top : 0, height : "100%", width : screendim.width / 7, justifyContent : "center", alignItems : "center"}}>
                    <Text style={{color : "white"}}>Back</Text>
                </TouchableOpacity>
                <Text style={{color : "white", fontSize : screendim.width / 15, }}>{this.props.selected.Name}</Text>
            </View>

            <TouchableOpacity onPress={() => {this.onVideoStart()}} style={{width : "100%", height : screendim.height / 3.5, backgroundColor : "black", alignItems : "center", justifyContent : "center"}}>
                <Image style={{width : screendim.height / 10, height : screendim.height / 10}}  source={require("../../resources/play.png")}  />
            </TouchableOpacity>


            <View style={{width : screendim.width, alignItems : "center", marginTop: screendim.height / 15}}>
                <Text style={{width : screendim.width / 1.2, textAlign : "center", fontSize : screendim.width / 20}}>{this.props.selected.Description}</Text>
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


function mapStateToProps (store) {
    return {
        plants: store.plants.plants,
        selected : store.plants.selected
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