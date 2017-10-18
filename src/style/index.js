import {
    Dimensions
} from 'react-native';
var {width,height}=Dimensions.get('window');
import theme from './theme'

var style={
    container:{
        minHeight:height-24,
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        backgroundColor: theme.primary,
    },
}


export default style;
export var width=width;
export var height=height;