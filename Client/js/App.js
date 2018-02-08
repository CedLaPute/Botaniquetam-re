import React, { Component } from 'react';
import Settings from './components/Settings';
import Menu from './components/Menu';
import TourList from './components/TourList'
import Walk from './components/Walk'
import { Router, Scene } from 'react-native-router-flux';
import PlantDetails from "./components/PlantDetails";

export default class App extends React.Component{


    render(){
        return (
            <Router>
                <Scene key="root">
                    <Scene
                        key="menu"
                        component={Menu}
                        title="Menu"
                        initial
                        hideNavBar={true}
                    />

                    <Scene
                        key="settings"
                        component={Settings}
                        title="Settings"
                        hideNavBar={true}

                    />

                    <Scene
                        key="tour_list"
                        component={TourList}
                        title="TourList"
                        hideNavBar={true}

                    />

                    <Scene
                        key="walk"
                        component={Walk}
                        title="Walk"
                        hideNavBar={true}

                    />

                    <Scene
                        key="details"
                        component={PlantDetails}
                        title="Details"
                        hideNavBar={true}

                    />


                </Scene>
            </Router>
        );

    }

}


