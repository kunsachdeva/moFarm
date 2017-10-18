import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import theme from './theme'

const ButtonStyles = StyleSheet.create({
  button:{
    padding: 20,
    height: 70,
    width: 350,
    margin: 20,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: theme.accent,
    },
  buttonText: {
    color: 'white',
  }
});

export default ButtonStyles;