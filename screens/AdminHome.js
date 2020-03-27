import React from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import * as firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class AdminHome extends React.Component {

    static navigationOptions = {
        header: null
    };

    render () {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.logoutButton}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <View styles={styles.locationForm}>
                    
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row-reverse',
        paddingVertical: 20,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#d8d9db'
    },
    logoutButton: {
        color: '#4ba9c8',
        marginRight: 15,
        fontSize: 20
    },
    locationForm: {

    }
});