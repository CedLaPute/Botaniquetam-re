import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';

const TourList = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.welcome}>
                Tour List Page
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => Actions.pop()}
            >
                <Text style={styles.textButton}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

export default TourList;