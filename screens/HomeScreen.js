import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, Button, Dimensions, ScrollView, FlatList} from 'react-native';

import plasticData from '../api/plasticData';
import paperData from '../api/paperData';
import electronicData from '../api/electronicData';
import glassData from '../api/glassData';
import metalData from '../api/metalData';

import Fire from "../Fire";

import PlasticList from '../component/PlasticList';
import PaperList from '../component/PaperList';
import ElectronicList from '../component/ElectronicList';
import GlassList from '../component/GlassList';
import MetalList from '../component/MetalList';

import ebin from '../assets/ebin.png'; 
import gbin from '../assets/gbin.png'; 
import papbin from '../assets/papbin.png'; 
import plasbin from '../assets/plasbin.png'; 
import mbin from '../assets/mbin.png'; 

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        header: null
    };

    state = {
        isVisible: false,
        isPlasticVisible: true,
        plastic: [],
        recyclables: {},
        loading: true
    };

    componentDidMount() {
        firebase = new Fire((error, user) => {
            if (error) {
                return alert("Uh oh, something went wrong");
            }

            firebase.getLists(lists => {
                this.setState({ lists, user }, () => {
                    this.setState({ loading: false });
                });
            });

            this.setState({ user });
        });
    }

    renderPlasticResults=() =>{ 
        this.setState({
          isPlasticVisible:true,
          isPaperVisible:false,
          isElectronicsVisible:false,
          isGlassVisible:false,
          isMetalVisible:false
        })
    } 

    renderPaperResults=() =>{
        this.setState({ 
            isPlasticVisible:false,
            isPaperVisible:true,
            isElectronicsVisible:false,
            isGlassVisible:false,
            isMetalVisible:false
        })
    } 

    renderElectronicsResults=() =>{ 
        this.setState({
            isPlasticVisible:false,
            isPaperVisible:false,
            isElectronicsVisible:true,
            isGlassVisible:false,
            isMetalVisible:false
        })
    } 

    renderGlassResults=() =>{ 
        this.setState({
            isPlasticVisible:false,
            isPaperVisible:false,
            isElectronicsVisible:false,
            isGlassVisible:true,
            isMetalVisible:false
        })
    } 

    renderMetalResults=() =>{ 
        this.setState({
            isPlasticVisible:false,
            isPaperVisible:false,
            isElectronicsVisible:false,
            isGlassVisible:false,
            isMetalVisible:true
        })
    } 

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Did You Know?</Text>
                </View>
                {/* Header Buttons */}
                <View style={{ flexDirection:"row", marginTop: 20, justifyContent: 'center'}}>
                    <View style={styles.plasticBtn}>
                        <Button
                        title="Plastic"
                        color="white"
                        onPress={this.renderPlasticResults}
                        />     
                    </View>

                    <View style={styles.paperBtn}>
                        <Button
                        title="Paper"
                        color="white"
                        onPress={this.renderPaperResults} 
                        />
                    </View>

                    <View style={styles.elecBtn}>
                        <Button
                        title="Electronics"
                        color="white"
                        onPress={this.renderElectronicsResults}
                        />          
                    </View>

                    <View style={styles.glassBtn}>
                        <Button
                            title="Glass"
                            color="white"
                            onPress={this.renderGlassResults}
                            underlayColor='#fff'
                        />          
                    </View>

                    <View style={styles.metalBtn}>
                        <Button
                        title="Metal"
                        color="white"
                        onPress={this.renderMetalResults}
                        />          
                    </View>
                </View>
                {/* End of Header Buttons */}

                {this.state.isPlasticVisible?
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <FlatList style={{height: 400, paddingLeft: 32, marginTop: 50}}
                            data={this.state.lists}
                            keyExtractor={item => item.id.toString()}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => this.renderList(item)}
                        />

                        <Image source={plasbin} style={{ height: 400, resizeMode: 'contain'}} />
                    </View>
                :null}   

                {this.state.isPaperVisible?
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <FlatList style={{height: 400, paddingLeft: 32, marginTop: 50}}
                            data = {paperData}
                            keyExtractor = {item => item.name}
                            horizontal = {true}
                            showsHorizontalScrollIndicator = {false}

                            renderItem = {({item}) => <PaperList list={item} />
                            }
                        />

                        <Image source={papbin} style={{ height: 400, resizeMode: 'contain'}} />
                    </View>
                :null}

                {this.state.isElectronicsVisible?
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <FlatList style={{height: 400, paddingLeft: 32, marginTop: 50}}
                        data = {electronicData}
                        keyExtractor = {item => item.name}
                        horizontal = {true}
                        showsHorizontalScrollIndicator = {false}

                        renderItem = {({item}) => <ElectronicList list={item} />
                        }
                    />

                    <Image source={ebin} style={{ height: 400, resizeMode: 'contain'}} />
                </View>
                :null}

                {this.state.isGlassVisible?
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <FlatList style={{height: 400, paddingLeft: 32, marginTop: 50}}
                        data = {glassData}
                        keyExtractor = {item => item.name}
                        horizontal = {true}
                        showsHorizontalScrollIndicator = {false}

                        renderItem = {({item}) => <GlassList list={item} />
                        }
                    />

                    <Image source={gbin} style={{ height: 400, resizeMode: 'contain'}} />
                </View>
                :null}
                
                {this.state.isMetalVisible?
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <FlatList style={{height: 400, paddingLeft: 32, marginTop: 50}}
                        data = {metalData}
                        keyExtractor = {item => item.name}
                        horizontal = {true}
                        showsHorizontalScrollIndicator = {false}

                        renderItem = {({item}) => <MetalList list={item} />
                        }
                    />
                    <Image source={mbin} style={{ height: 400, resizeMode: 'contain'}} />
                </View>
                :null}

            </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1
    },
    header: {
        paddingTop: 64,
        paddingBottom: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ebecf4',
        shadowColor: '#454d65',
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800'
    },
    feed: {
        marginHorizontal: 16
    },
      plasticBtn: {
        borderRadius: 50,
        backgroundColor: '#F0634F',
        margin: 3.5,
      },
      paperBtn: {
        borderRadius: 50,
        backgroundColor: '#2D5C9B',
        margin: 3.5,
      },
      elecBtn: {
        borderRadius: 50,
        backgroundColor: '#FB863F',
        margin: 3.5,
      },
      glassBtn: {
        borderRadius: 50,
        backgroundColor: '#00B4A4',
        margin: 3.5,
      },
      metalBtn: {
        borderRadius: 50,
        backgroundColor: '#FFC144',
        margin: 3.5,
      },
});