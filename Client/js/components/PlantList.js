import React from "react"
import {ScrollView, View, Dimensions, Text, TouchableOpacity} from "react-native";
import PlantListItem from "./PlantListItem";


const screenDim = Dimensions.get("window")

export default class PlantList extends React.Component{





    getPlants(){
        return this.props.list.map((item, index) => {
            return <PlantListItem onClick={this.props.onPlantClick.bind(this)} key={index} item={item}/>
        })
    }

    render(){
        return(
            <View style={{width : screenDim.width / 1.1, borderWidth: 1, borderColor : "grey", height : screenDim.height / 1.3, marginTop: screenDim.height / 30}}>
                <ScrollView>
                    <View>
                        {this.getPlants()}
                    </View>
                </ScrollView>
            </View>
        )
    }

}