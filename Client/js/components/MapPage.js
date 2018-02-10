
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions, ScrollView, Image, Button, TouchableOpacity, DeviceEventEmitter, AsyncStorage
} from 'react-native';
import Marker, {xPos} from "./Marker";
import {getBeacons, getPlants, setPosition} from "../actions/plants";
import {connect} from "react-redux";
import {Actions} from 'react-native-router-flux';
var map = require( "../../resources/map.png")
import Kontakt from 'react-native-kontaktio';
import PositionMarker from "./PositionMarker";
import PlantList from "./PlantList";
const konnect = Kontakt.connect;
const  startScanning  = Kontakt.startScanning;
const disconnect = Kontakt.disconnect;

export const serverAddress = "http://psyycker.fr.nf:5678"


const screendim = Dimensions.get("window")



const distance = {


    "IMMEDIATE" : 0,
    "NEAR" : 1,
    "FAR" : 2

}

class MapPage extends Component<{}> {

  constructor(props){
    super(props)

      this.props.fetchPlants()
      this.props.fetchBeacons()

      this.state = {blind : undefined}


  }





    componentDidMount() {



        konnect()
            .then(() => startScanning())
            .catch(error => console.log('error', error));

        DeviceEventEmitter.addListener(
            'beaconsDidUpdate',
            ({ beacons, region }) => {

                let beacon = undefined;

                beacons.map(item => {


                    if (beacon === undefined) {
                        beacon = item;
                        return;
                    }

                    const currentDistance = distance[beacon.proximity]
                    const itemDistance = distance[item.proximity]

                    if (currentDistance > itemDistance){

                    }else if (currentDistance === itemDistance){
                        if (beacon.accuracy > item.accuracy){

                        }else{
                            beacon = item;
                        }
                    }else{
                        beacon = item;
                    }

                })

                const uuid = beacon.uuid;

                this.props.beacons.map((beacon) => {


                    if (uuid.toString() === beacon.uuid.toString()){
                        this.props.setPosition(beacon)
                    }

                })



            }
        );
    }

    componentWillUnmount(){
        disconnect();
        DeviceEventEmitter.removeAllListeners();
    }

  getMarkers(){
    return this.props.plants.map((item, index) => {
      return <Marker color={"red"} item={item} key={index}/>
    })
  }


  getPositionMarker(){


      if (Object.keys(this.props.position).length > 0){
          return <PositionMarker position={this.props.position}/>
      }

  }

  getSelectedPlant(){
    if (Object.keys(this.props.selected).length > 0){
      return         <View style={{width : screendim.width, height : screendim.height / 4, alignItems: "center" }}>

          <View style={{marginTop: screendim.height / 10}}>
          <TouchableOpacity
              style={styles.button}
              onPress={() => Actions.details()}
          >
              <Text style={styles.textButton}>{this.props.selected.Name}</Text>
          </TouchableOpacity>
          </View>


      </View>

    }
  }


    onListItemClick(){
        Actions.details();
    }


  render() {

    if (this.props.blind === false)
    return (
      <View style={styles.container}>


        <View style={{borderWidth: 1, width : screendim.width / 1, height: screendim.height / 1.8}}>
          <ScrollView>
            <ScrollView horizontal={true}>
              <View style={{width : 890, height : 530}}>
              <Image style={{flex : 1, width : undefined, height : undefined}} resizeMode="contain" source={require("../../resources/map.png")}/>
              </View>
                {this.getMarkers()}
                {this.getPositionMarker()}

            </ScrollView>
          </ScrollView>
        </View>

          {this.getSelectedPlant()}

          <View style={{position: "absolute", bottom : screendim.height / 10}}>
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => Actions.pop()}
              >
                  <Text style={styles.textButton}>Back</Text>
              </TouchableOpacity>
          </View>


      </View>
    );
    else if (this.props.blind === true){
        return (
            <View style={{flex : 1}}>
                <View style={{width : screendim.width, alignItems : "center"}}>
                <PlantList onPlantClick={this.onListItemClick.bind(this)} list={this.props.plants}/>
                </View>
                <TouchableOpacity onPress={() => {Actions.pop()}} style={{position : "absolute", bottom : 0, width : screendim.width, top : screendim.height / 1.2, backgroundColor: "#47525E", alignItems : "center", justifyContent: "center"}}>

                    <Text style={{fontSize : screendim.width / 5, color : "white"}}>BACK</Text>

                </TouchableOpacity>
            </View>
        )
    }else {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      alignItems: "center"
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



function mapStateToProps (store) {
    return {
        plants: store.plants.plants,
        selected : store.plants.selected,
        beacons : store.plants.beacons,
        position : store.plants.position,
        blind : store.settings.blindMode
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchPlants : () => dispatch(getPlants()),
        fetchBeacons : () => dispatch(getBeacons()),
        setPosition : (beacon) => dispatch(setPosition(beacon))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapPage)