import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import * as firebase from 'firebase'

export default class AdminScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        adminID: '',
        password: '',
        errorMessage: null
    }

    onLogin = async () => {
        const { adminID, password } = this.state;

        firebase
            .admin()
            .signInWithEmailAndPassword(adminID, password)
            .catch(error => this.setState({ errorMessage: error.message}));
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content'></StatusBar>
                <Image source={require('../assets/profile.png')} style={{ alignSelf: 'center', resizeMode: 'contain', height: 100, marginTop: 150, marginBottom: -15}}></Image>
                <Image source={require('../assets/authFooter.png')} style={{position:'absolute', resizeMode: 'contain', width: 480, right: -50, top: -40}}></Image>
                <Text style={styles.greetings}>{'Administrator Login'}</Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Admin ID</Text>
                        <TextInput 
                            style={styles.input}
                            autoCapitalize='none'
                            onChangeText={email => this.setState({adminID})}
                            value={this.state.adminID}
                        ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput 
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize='none'
                            onChangeText={password => this.setState({password})}
                            value={this.state.password}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('AdminHome')}>
                    <Text style={{color:'#fff', fontWeight:'500'}}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignSelf:'center', marginTop:32 }} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={{color:'#414959', fontSize:13 }}>
                        New to GO:eARth? <Text style={{fontWeight:'500', color:'#f0634f'}}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignSelf:'center', marginTop:5 }} onPress={() => this.props.navigation.navigate('Admin')}>
                    <Text style={{color:'#414959', fontSize:13 }}>
                        Administrator <Text style={{fontWeight:'500', color:'#f0634f'}}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1
    },
    greetings: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    error: {
        color: '#f0634f',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: '#8a8f9e',
        fontSize: 10,
        textTransform: 'capitalize'
    },
    input: {
        borderBottomColor: '#8a8f9e',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161f3d'
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: '#f0634f',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'
    }
});