import React from 'react';
import { Dimensions, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import CaptureButton from './CaptureButton.js'

export default class ScanningScreen extends React.Component {

	constructor(props){
		super(props);
    this.state = { 
      identifedAs: '',
      loading: false
    }
  }

    takePicture = async function(){
		
		if (this.camera) {

			// Pause the camera's preview
			this.camera.pausePreview();
            
      // Set the activity indicator
			this.setState((previousState, props) => ({
				loading: true
			}));
			
			// Set options
			const options = {
        base64: true
      };
			
			// Get the base64 version of the image
			const data = await this.camera.takePictureAsync(options)
			
			// Get the identified image
			this.identifyImage(data.base64);
		}
	}

	identifyImage(imageData){

    const Clarifai = require('clarifai');

		const app = new Clarifai.App({
			apiKey: '8eee29a0d9c6479a8d75cb1cd4afa2d6'
    });
  
		// Identify the image
		app.models.predict({id:'Recylables', version:'c2344701a7f64451bc52bc511f261f5d'}, "https://samples.clarifai.com/metro-north.jpg")
			.then((response) => this.displayAnswer(response.outputs[0].data.concepts[0].name)
			.catch((err) => alert(err))
    );
	}

	displayAnswer(identifiedImage){

		// Dismiss the acitivty indicator
		this.setState((prevState, props) => ({
      identifedAs:identifiedImage,
			loading:false
		}));

		// Show an alert with the answer on
		Alert.alert(
			this.state.identifedAs,
      'My Alert Msg. \n Do not forget to dispose them in the correct bin!',
      [
        { text: 'I Got It!', onPress: () => console.log('OK Pressed') },
      ],

			{ cancelable: false }
		  )

		// Resume the preview
		this.camera.resumePreview();
	}
    
	render() {
		return (
      <Camera ref={ref => {this.camera = ref;}} style={styles.preview}>
      <ActivityIndicator size="large" style={styles.loadingIndicator} color="#fff" animating={this.state.loading}/>
          <CaptureButton buttonDisabled={this.state.loading} onClick={this.takePicture.bind(this)}/>
      </Camera>
		);
	}
}

const styles = StyleSheet.create({
    preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
	},
	loadingIndicator: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});