import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Webcam from "react-webcam";
 
export default class WebcamCapture extends React.Component {
  render() {
    const videoConstraints = {
      facingMode: { exact: "environment" }
    };
 
    return <Webcam videoConstraints={videoConstraints} />;
  }
}

