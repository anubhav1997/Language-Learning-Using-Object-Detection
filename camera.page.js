// src/camera.page.js file
import React from 'react';
import { View, Text } from 'react-native';
import { Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import styles from './style';
import Toolbar from './toolbar.component';
import Gallery from './gallery.component';
import config from './config';
// var RNFS = require('react-native-fs');
// import * as RNFS from 'react-native-fs';

// import {database, auth, provider, storage} from "./config/firebase";


// import firebase from 'firebase'
// import RNFetchBlob from 'react-native-fetch-blob'


export default class CameraPage extends React.Component {
    camera = null;

    state = {
        captures: [],
        // setting flash to be turned off by default
        flashMode: Camera.Constants.FlashMode.off,
        capturing: null,
        // start the back camera by default
        cameraType: Camera.Constants.Type.back,
        hasCameraPermission: null,
        result: null,
        visionResponse: '',
        loading: false,
        googleVisionDetetion: undefined
    };

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };

    handlePress = async (base64) => {
        // fetch('http://192.168.43.249:3000/',{
        //     method: 'POST',
        //     image: photoData,
        //     headers: {"Content-Type": "img"}
        // })
        // .then(function(response){
        //     // console.log(response);
        //     return response.json()
        // }).catch(error => console.log(error));



        // var data = new FormData();
        // data.append('fileData', { uri: photoData.uri, name: 'picture.jpg', type: 'image/jpg' });
        // // Create the config object for the POST
        //  const config = {
        //   method: 'POST',
        //   headers: {
        //    'Accept': 'application/json',
        //    'Content-Type': 'multipart/form-data',
        //   },
        //   body: data,
        //  };
        // fetch('http://192.168.43.249:3000/', config).then(responseData => {
        //     // Log the response form the server // Here we get what we sent to Postman back
        //     console.log(responseData);
        // })
        // .catch(err => { console.log(err); });
        // };



        // var image = photoData.uri; 

        // const Blob = RNFetchBlob.polyfill.Blob;
        // const fs = RNFetchBlob.fs;
        // window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        // window.Blob = Blob;

       
        // let uploadBlob = null
        // const imageRef = Firebase.storage().ref('posts').child("test.jpg")
        // let mime = 'image/jpg'
        // fs.readFile(image, 'base64')
        //   .then((data) => {
        //     return Blob.build(data, { type: `${mime};BASE64` })
        // })
        // .then((blob) => {
        //     uploadBlob = blob
        //     return imageRef.put(blob, { contentType: mime })
        //   })
        //   .then(() => {
        //     uploadBlob.close()
        //     return imageRef.getDownloadURL()
        //   })
        //   .then((url) => {
        //     // URL of the image uploaded on Firebase storage
        //     console.log(url);
            
        //   })
        //   .catch((error) => {
        //     console.log(error);

        //   }) 

        let googleVisionRes = await fetch(config.googleCloud.api + config.googleCloud.apiKey, {
            method: 'POST',
            body: JSON.stringify({
                "requests": [
                    {
                        "image": {
                            "content": base64
                        },
                          "features": [
                            {
                              "maxResults": 10,
                              "type": "OBJECT_LOCALIZATION"
                            }
                          ],
                    }
                ]
            })
        });

        await googleVisionRes.json()
            .then(googleVisionRes => {
                console.log(googleVisionRes)
                if (googleVisionRes) {
                    this.setState(
                        {
                            loading: false,
                            googleVisionDetetion: googleVisionRes.responses[0]
                        }
                    )
                    console.log('this.is response', this.state.googleVisionDetetion);
                }
            }).catch((error) => { console.log(error) })
    


    }; 
    activeCamera = () => {
        this.setState({
            camera: true
        })
    }
    clickAgain = () => {
        this.setState({
            camera: true,
            googleVisionDetetion: false,
            loading: false
        })
    }
    handleShortCapture = async () => {
        const options = { quality: 0.5, base64: true};
            
        const photoData = await this.camera.takePictureAsync(options);
        console.log(photoData);
        // photoData = RNFS.readFile(photoData);
        // console.log(photoData.uri);
        this.setState({
                cameraResult: true,
                result: photoData.base64,
                camera: false
            }, () =>
                    this.handlePress(this.state.result))
        // this.handlePress(photoData.base64);
        this.setState({ capturing: false, captures: [photoData, ...this.state.captures] });
    };

    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
    };

    async componentDidMount(){
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' || audio.status === 'granted');
        // console.log(camera.status)
        // console.log(hasCameraPermission)
        this.setState({hasCameraPermission: hasCameraPermission});
    };

    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing, captures, googleVisionDetetion, result, loading} = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }
        return (
            <React.Fragment>
                <View>
                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                    />
                </View>

                {captures.length > 0 && <Gallery captures={captures}/>}

                <Toolbar 
                    capturing={capturing}
                    flashMode={flashMode}
                    cameraType={cameraType}
                    setFlashMode={this.setFlashMode}
                    setCameraType={this.setCameraType}
                    onCaptureIn={this.handleCaptureIn}
                    onCaptureOut={this.handleCaptureOut}
                    onLongCapture={this.handleLongCapture}
                    onShortCapture={this.handleShortCapture}
                />
            </React.Fragment>
        );
    };
};