// src/camera.page.js file
import React from 'react';
import { View, Text } from 'react-native';
import { Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import styles from './style';
import Toolbar from './toolbar.component';
import Gallery from './gallery.component';
import config from './config';
import config2 from './config2';

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
    // constructor(){
    //         this.myRef = React.createRef();
    // };

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };


    translate = async (term, target, key) => {
        var url = "https://translation.googleapis.com/language/translate/v2";
        //Strings requiring translation
        url += "?q=" + term;

        // url += "&q=" + escape($("#title").text());
        //Target language
        
        url += "&target=" + "de";
        //Replace with your API key
        
        url += "&key=API_KEY";
        let googleTranslate = await fetch(url);

        await googleTranslate.json()
            .then(googleTranslateRes => {
                // console.log(googleTranslateRes)
                console.log(googleTranslateRes.data.translations[0].translatedText);


                if (googleTranslateRes) {
                    this.setState(
                        {
                            loading: false,
                            // googleVisionDetetion: googleVisionRes.responses[0].localizedObjectAnnotations[0].name,
                        }
                    )
                   return googleTranslateRes;
                }
            }).catch((error) => { console.log(error) })

    }

    handlePress = async (base64) => {


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
                console.log(googleVisionRes.responses[0].localizedObjectAnnotations[0].name)
                this.translate(googleVisionRes.responses[0].localizedObjectAnnotations[0].name, "de", "API_KEY")
                if (googleVisionRes) {
                    this.setState(
                        {
                            loading: false,
                            googleVisionDetetion: googleVisionRes.responses[0].localizedObjectAnnotations[0].name,
                            googleVisionDetetion_x1 : googleVisionRes.responses[0].localizedObjectAnnotations[0].boundingPoly.normalizedVertices[0].x,
                            googleVisionDetetion_y1 : googleVisionRes.responses[0].localizedObjectAnnotations[0].boundingPoly.normalizedVertices[0].y,
                            googleVisionDetetion_x2 : googleVisionRes.responses[0].localizedObjectAnnotations[0].boundingPoly.normalizedVertices[1].x,
                            googleVisionDetetion_y2 : googleVisionRes.responses[0].localizedObjectAnnotations[0].boundingPoly.normalizedVertices[1].y,
                            googleVisionDetetion_x3 : googleVisionRes.responses[0].localizedObjectAnnotations[0].boundingPoly.normalizedVertices[2].x,
                            googleVisionDetetion_y3 : googleVisionRes.responses[0].localizedObjectAnnotations[0].boundingPoly.normalizedVertices[2].y,
                            googleVisionDetetion_x4 : googleVisionRes.responses[0].localizedObjectAnnotations[0].boundingPoly.normalizedVertices[3].x,
                            googleVisionDetetion_y4 : googleVisionRes.responses[0].localizedObjectAnnotations[0].boundingPoly.normalizedVertices[3].y,
                            
                        }
                    )

                    return googleVisionRes.responses[0].localizedObjectAnnotations[0];
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

        this.setState({
                cameraResult: true,
                result: photoData.base64,
                camera: false
            }, () =>
                    this.handlePress(this.state.result).then(googleVisionRes => { 
                        if(googleVisionRes){
                            console.log('OUTPUT', googleVisionRes);
                            this.drawBox(googleVisionRes, googleVisionRes.name)
                        }
                        
                    }))
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
    // drawing the boxes aronund the detected text elements
    drawRectangles() {
        const {textElements} = this.state;
        return textElements.map((element, index) => this.drawBox(element, index));
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
                        androidCameraPermissionOptions={{
                          title: 'Permission to use camera',
                          message: 'We need your permission to use your camera',
                          buttonPositive: 'Ok',
                          buttonNegative: 'Cancel',
                        }}
                        ref={camera => this.camera = camera}
                    />
                </View>

                <View style={styles.reactangleContainer}>
                     <View style={styles.rectangle}>
                          <View style={styles.rectangleColor} />
                          <View style={styles.topLeft} />
                          <View style={styles.topRight} />
                          <View style={styles.bottomLeft} />
                          <View style={styles.bottomRight} />
                     </View>
                     <Text> Helloooo </Text>
                     
                </View>

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


