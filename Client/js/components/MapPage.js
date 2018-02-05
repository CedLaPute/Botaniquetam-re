
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions, ScrollView, Image
} from 'react-native';
import Marker, {xPos} from "./Marker";
import {getPlants} from "../actions/plants";
import {connect} from "react-redux";
var map = require( "../../resources/map.png")

export const serverAddress = "http://psyycker.fr.nf:5678"


const screendim = Dimensions.get("window")

class App extends Component<{}> {

  constructor(props){
    super(props)

      this.props.fetchPlants()

  }


  getMarkers(){
    return this.props.plants.map((item, index) => {
      return <Marker item={item} key={index}/>
    })
  }

  getSelectedPlant(){
    if (Object.keys(this.props.selected).length > 0){
      return         <View style={{width : screendim.width, height : screendim.height / 2.4 }}>

      <Text style={{fontSize: screendim.width / 20}}>Plant name : {this.props.selected.Name}</Text>

        <Text style={{fontSize: screendim.width / 20}}>Description : {this.props.selected.Description}</Text>

      </View>

    }
  }





  render() {
    return (
      <View style={styles.container}>


        <View style={{borderWidth: 1, width : screendim.width / 1, height: screendim.height / 1.8}}>
          <ScrollView>
            <ScrollView horizontal={true}>
              <View style={{width : 890, height : 530}}>
              <Image style={{flex : 1, width : undefined, height : undefined}} resizeMode="contain" source={require("../../resources/map.png")}/>
              </View>
                {this.getMarkers()}


            </ScrollView>
          </ScrollView>
        </View>

          {this.getSelectedPlant()}

      </View>
    );
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
});



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
)(App)