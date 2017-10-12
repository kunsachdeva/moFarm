import React, { Component } from 'react';
import {
    View,Dimensions,Image,Picker,ActivityIndicator,
    Text,TextInput,TouchableOpacity,ScrollView,TouchableWithoutFeedback
} from 'react-native';
import theme from '../style/theme';
import style,{height,width} from '../style';
import quantities from '../constants/quantities'
import {getAllOrders} from '../actions/order'
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

