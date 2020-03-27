import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as firebase from 'firebase'

export default class GameScreen extends React.Component {

    state = {
        email: "",
        displayName: ""
    };

    componentDidMount() {
        const {email, displayName} = firebase.auth().currentUser;
        this.setState({email, displayName});
    }

    render () {
        return (
            <View style={styles.container}>
                <Text>Hi {this.state.email}!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});