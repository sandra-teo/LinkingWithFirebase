import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import {Ionicons} from "@expo/vector-icons";

import Fire from '../Fire';
// import UserPermissions from '../utilities/UserPermissions';
// import * as ImagePicker from 'expo-image-picker';

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    
    state = {
        user: {
            name: '',
            email: '',
            password: '',
            avatar: null
        },
        errorMessage: null
    };

    // handlePickAvatar = async () => {
    //     UserPermissions.getCameraPermission();
    
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //       allowsEditing: true,
    //       aspect: [4, 3]
    //     });
    
    //     if (!result.cancelled) {
    //       this.setState({ user: { ...this.state.user, avatar: result.uri } });
    //     }
    //   };
    
      handleSignUp = () => {
        Fire.shared.createUser(this.state.user);
      };    

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content'></StatusBar>
                <Image source={require('../assets/authFooter.png')} style={{position:'absolute', resizeMode: 'contain', width: 480, right: -50, top: -40}}></Image>
                
                <View style={{position: 'absolute', top: 64, alignItems: 'center', width: '100%'}}>
                    <Text style={styles.greetings}>{'Hello. \n Sign up to get started.'}</Text>
                    {/* <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                        <Ionicons name='ios-add' size={40} color='#fff' style={{marginTop: 0, marginLeft: 2}}></Ionicons>
                        {this.state.user.avatar != null ? <Image source={{ uri: this.state.user.avatar }} style={styles.avatar}/> : <Text style={{color:'#f9f9f9', marginTop:-10}}>{'Upload'}</Text> }
                    </TouchableOpacity> */}
                </View>                

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput 
                            style={styles.input}
                            autoCapitalize='none'
                            onChangeText={name => this.setState({user: {...this.state.user, name}})}
                            value={this.state.user.name}
                        ></TextInput>
                    </View>
                    
                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput 
                            style={styles.input}
                            autoCapitalize='none'
                            onChangeText={email => this.setState({user: {...this.state.user, email}})}
                            value={this.state.user.email}
                        ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput 
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize='none'
                            onChangeText={password => this.setState({user: {...this.state.user, password}})}
                            value={this.state.user.password}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
                    <Text style={{color:'#fff', fontWeight:'500'}}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignSelf:'center', marginTop:32 }} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={{color:'#414959', fontSize:13 }}>
                        Already Registered to GO:eARth? <Text style={{fontWeight:'500', color:'#f0634f'}}>Sign In</Text>
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
        marginTop: 250,
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
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e1e2e6',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
    }
});
