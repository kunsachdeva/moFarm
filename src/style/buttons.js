import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import theme from './theme';

const ButtonStyles = StyleSheet.create({
  button:{
    padding: 0,
    height: 20,
    width: 200,
    margin: 0,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: theme.accent,
    },
  buttonText: {
    color: 'white'
  }
});

export default ButtonStyles;