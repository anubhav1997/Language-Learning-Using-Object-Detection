// src/styles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

const deviceHeight = Dimensions.get("window").height;

const deviceWidth = Dimensions.get("window").width;


export default StyleSheet.create({
    preview: {
        height: winHeight,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    alignCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomToolbar: {
        width: winWidth,
        position: 'absolute',
        height: 100,
        bottom: 0,
    },
    captureBtn: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 60,
        borderColor: "#FFFFFF",
    },
    captureBtnActive: {
        width: 80,
        height: 80,
    },
    captureBtnInternal: {
        width: 76,
        height: 76,
        borderWidth: 2,
        borderRadius: 76,
        backgroundColor: "red",
        borderColor: "transparent",
    },
    galleryContainer: { 
        bottom: 100 
    },
    galleryImageContainer: { 
        width: 75, 
        height: 75, 
        marginRight: 5 
    },
    galleryImage: { 
        width: 75, 
        height: 75 
    },

	rectangleContainer: {
       	 flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
  	},
  rectangle: {
      borderLeftColor: 'rgba(0, 0, 0, .6)',
      borderRightColor: 'rgba(0, 0, 0, .6)',
      borderTopColor: 'rgba(0, 0, 0, .6)',
      borderBottomColor: 'rgba(0, 0, 0, .6)',
      borderLeftWidth: deviceWidth / 10,
      borderRightWidth: deviceWidth / 10,
      borderTopWidth: deviceHeight / 6,
      borderBottomWidth: deviceHeight / 4
  },
  rectangleColor: {
      height: 450,
      width: 500,
      backgroundColor: 'transparent'
  },
  topLeft: {
      width: 50,
      height: 50,
      borderTopWidth: 2,
      borderLeftWidth: 2,
      position: 'absolute',
      left: -1,
      top: -1,
      borderLeftColor: 'white',
      borderTopColor: 'white'
  },
  topRight: {
      width: 50,
      height: 50,
      borderTopWidth: 2,
      borderRightWidth: 2,
      position: 'absolute',
      right: -1,
      top: -1,
      borderRightColor: 'white',
      borderTopColor: 'white'
  },
  bottomLeft: {
      width: 50,
      height: 50,
      borderBottomWidth: 2,
      borderLeftWidth: 2,
      position: 'absolute',
      left: -1,
      bottom: -1,
      borderLeftColor: 'white',
      borderBottomColor: 'white'
  },
  bottomRight: {
      width: 50,
      height: 50,
      borderBottomWidth: 2,
      borderRightWidth: 2,
      position: 'absolute',
      right: -1,
      bottom: -1,
      borderRightColor: 'white',
      borderBottomColor: 'white'
  }


});

