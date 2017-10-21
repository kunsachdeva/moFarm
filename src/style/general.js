import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import theme from './theme';

var {width, height}=Dimensions.get('window');

const GeneralStyles = StyleSheet.create({
  box: {
    flex: 1,
    marginBottom:20,
    margin: 5,
    flexDirection:'column',
    justifyContent: 'space-between',
    backgroundColor:'white',
    padding:10,
    borderRadius:10,
    width:width-40,
    elevation:5,
  },
  horizontalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingTop: 10,
    // paddingBottom: 10,
    // backgroundColor: 'yellow',
  },
  button: {
    width: width-60,
    height: 40,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop:10,
    backgroundColor: theme.accent,
  },
  buttonText: {
    color: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
  },
  progressBox:{
    width: width-60,
    height: 60,
    // backgroundColor: 'blue',
    justifyContent:'space-around',
    marginBottom: 5,
    marginTop:10,
    flexDirection:'row',
  },
  progressBoxItem:{
    flexDirection:'column',
    alignItems: 'center', 
    // backgroundColor: 'red', 
    height: 60, 
    width:70
  },
  progressBoxCircle: {
    borderRadius: 50, 
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: theme.fadedGrey,
    height: 40, 
    width: 40,
  },
  progressBoxCircleComplete: {
    borderRadius: 50, 
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: theme.secondary,
    height: 40, 
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default GeneralStyles;