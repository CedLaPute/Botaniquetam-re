import React from "react"
import {Text, View, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {Actions} from 'react-native-router-flux';
import {setSelectedTour} from "../actions/plants";
import PlantTourItem from "./PlantTourItem";



const screendim = Dimensions.get("window")



class TourDetail extends React.Component{

    constructor(props){
        super(props)




    }

    onBack(){
        setSelectedTour()
        Actions.pop()
    }

    getPlantWithId(id) {


        index = 0;
        while (index < this.props.plants.length){
            if (this.props.plants[index].Id === id){
                return this.props.plants[index]
            }
            index++;
        }
        return undefined


    }

    getPlantList(){
        if (Object.keys(this.props.plants).length > 0){


            const array = [];

            const plantsIds = this.selected.Plants;

            index = 0;
            str = "";
            while (index < plantsIds.length){

                if (plantsIds[index] === ';'){
                    array.push(parseInt(str));
                    str = "";
                }else{
                    str += plantsIds[index]
                }
                index++
            }
            array.push(parseInt(str));

           return array.map((item, index) => {

                const plant = this.getPlantWithId(item);

                if (plant !== undefined)
                return <PlantTourItem item={plant} key={index}/>

            })
        }
    }


    render(){

        this.selected = this.props.selected[0];

        if (this.selected !== undefined) {
            console.log(this.selected)
            return (
                <View style={{flex: 1}}>
                    <View style={{
                        width: "100%",
                        height: screendim.height / 10,
                        backgroundColor: "#47525E",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <TouchableOpacity onPress={() => {
                            this.onBack()
                        }} style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: "100%",
                            width: this.props.blind === true ? screendim.width / 4 : screendim.width / 7,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Text style={{
                                color: "white",
                                fontSize: this.props.blind === true ? screendim.width / 10 : screendim.width / 20
                            }}>Back</Text>
                        </TouchableOpacity>
                        <Text
                            style={this.props.blind === true ? styles.fatTitle : styles.title}>{this.selected.Name}</Text>

                    </View>

                    <View style={{width : screendim.width, alignItems : "center", marginTop: screendim.height / 20}}>
                        <View style={{width : screendim.width / 1.1, borderColor : "grey", borderWidth: 1, height : screendim.height / 1.9}}>
                            {this.getPlantList()}
                        </View>
                    </View>

                    <View style={{width : screendim.width, alignItems : "center"}}>
                    <TouchableOpacity onPress={() => {Actions.pop()}} style={{position : "absolute", bottom : 0, width : screendim.width, top : screendim.height / 1.2, backgroundColor: "#47525E", alignItems : "center", justifyContent: "center"}}>

                        <Text style={{fontSize : screendim.width / 5, color : "white"}}>BACK</Text>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {Actions.pop()}} style={{position : "absolute", bottom : 0, width : screendim.width, top : screendim.height / 1.2, backgroundColor: "#47525E", alignItems : "center", justifyContent: "center"}}>

                        <Text style={{fontSize : screendim.width / 5, color : "white"}}>BACK</Text>

                    </TouchableOpacity>

                    </View>



                </View>
            )
        }
        else
            return(
                <View style={{flex : 1}}>
                    <Text>Loading...</Text>
                </View>
            )
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
})

function mapStateToProps (store) {
    return {
        blind : store.settings.blindMode,
        selected : store.plants.selectedTour,
        plants : store.plants.plants
    }
}

function mapDispatchToProps (dispatch) {
    return {
        setSelectedTour : () => dispatch(setSelectedTour(""))

    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TourDetail)