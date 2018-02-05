/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
    Button,
    TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

const Menu = () => {
    return (
        <View style={styles.mainPage}>
            <Text style={styles.welcome}> ZBG </Text>
        <View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => Actions.tour_list()}
            >
                <Text style={styles.textButton}> Take a tour </Text>
            </TouchableOpacity>
        </View>

            <View style={{marginTop: 20}}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => Actions.walk()}
                >
                    <Text style={styles.textButton}> Walk around </Text>
                </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => Actions.settings()}
                >
                    <Text style={styles.textButton}> Settings </Text>
                </TouchableOpacity>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 42,
    textAlign: 'center',
    margin: 50,
      color: 'black',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
    mainPage: {
        flex: 1,
        height: 200,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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

export default Menu;
