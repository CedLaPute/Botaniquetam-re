import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Settings from './Settings';
import Menu from './Menu';
import TourList from './TourList'
import Walk from './Walk'
import { Router, Scene } from 'react-native-router-flux';

const App = () => {
    return (
        <Router>
            <Scene key="root">
                <Scene
                    key="menu"
                    component={Menu}
                    title="Menu"
                    initial
                />

                <Scene
                    key="settings"
                    component={Settings}
                    title="Settings"
                />

                <Scene
                    key="tour_list"
                    component={TourList}
                    title="TourList"
                />

                <Scene
                    key="walk"
                    component={Walk}
                    title="Walk"
                />
            </Scene>
        </Router>
    );
};

AppRegistry.registerComponent('test3', () => App);
