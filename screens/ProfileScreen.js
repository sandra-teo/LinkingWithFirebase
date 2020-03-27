import React from 'react';
import {View, Text, StyleSheet, Button, Image, TouchableOpacity} from 'react-native';
import Fire from '../Fire';
import {Ionicons} from "@expo/vector-icons";

import UserPermissions from '../utilities/UserPermissions';
import * as ImagePicker from 'expo-image-picker';

export default class ProfileScreen extends React.Component {

    state = {
        user: {
            name: '',
            email: '',
            password: '',
            avatar: null
        },
        errorMessage: null
    };

    handlePickAvatar = async () => {
        UserPermissions.getCameraPermission();
    
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3]
        });
    
        if (!result.cancelled) {
          this.setState({ user: { ...this.state.user, avatar: result.uri } });
        }
      };
    
      handleSignUp = () => {
        Fire.shared.createUser(this.state.user);
      };    

    unsubscribe = null;

    componentDidMount() {
        const user = this.props.uid || Fire.shared.uid;
    
        this.unsubscribe = Fire.shared.firestore
          .collection('users')
          .doc(user)
          .onSnapshot(doc => {
            this.setState({ user: doc.data() });
          });
      }
    
      componentWillUnmount() {
        this.unsubscribe();
      }    

    render() {
        return (
            <View style={styles.container}>
                <View style={{marginTop: 64, alignItems: 'center'}}>
                    <View style={styles.avatarContainer}>
                    <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                        <Ionicons name='ios-add' size={40} color='#fff' style={{marginTop: 0, marginLeft: 2}}></Ionicons>
                        {this.state.user.avatar != null ? <Image source={{ uri: this.state.user.avatar }} style={styles.avatar}/> : <Text style={{color:'#f9f9f9', marginTop:-10}}>{'Upload'}</Text> }
                    </TouchableOpacity>
                        {/* <Image 
                            style={styles.avatar}  
                            source={
                                this.state.user.avatar 
                                    ? {uri: this.state.user.avatar} 
                                    : require('../assets/profile.png')
                            } 
                        /> */}
                    </View>
                    <Text style={styles.name}>{this.state.user.name}</Text>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                        <Text style={styles.statAmount}>21</Text>
                        <Text style={styles.statTitle}>Scans</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statAmount}>500</Text>
                        <Text style={styles.statTitle}>EXP</Text>
                    </View>
                </View>

                <Button onPress ={() => {
                    Fire.shared.signOut();
                }} 
                title='Logout' />
                
                <View style={styles.dropdown}>
                    <Text></Text>
                </View>

                <TouchableOpacity style={{alignSelf:'center', marginTop:5 }} onPress={() => this.props.navigation.navigate('Admin')}>
                    <Text style={{color:'#414959', fontSize:13 }}>
                        Administrator <Text style={{fontWeight:'500', color:'#f0634f'}}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarContainer: {
        shadowColor: '#151734',
        shadowRadius: 15,
        shadowOpacity: 0.4
    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 68
    },
    name: {
        marginTop: 24,
        fontSize: 16,
        fontWeight: '600'
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 32
    },
    stat: {
        alignItems: 'center',
        flex: 1,
    },
    statAmount: {
        color: '#4f566d',
        fontSize: 18,
        fontWeight: '300'
    },
    statTitle: {
        color: '#c3c5cd',
        fontSize: 12,
        fontWeight: '500',
        marginTop: 4
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