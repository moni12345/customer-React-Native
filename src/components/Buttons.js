import React from 'react'
import {View,Text,TouchableOpacity,Dimensions} from 'react-native';
const {height} = Dimensions.get('window')
const Button = (props) => (
    <TouchableOpacity 
    disabled={props.disabled}
    style={[{
        width:props.width,
        backgroundColor:props.colored ? "#AE1371" : "white",
        height:height*0.08,
        borderRadius:10,
        marginLeft:"auto",
        marginRight:"auto",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:'center'
    },props.style]}
    onPress={props.onPress}
    >
    <View
    >
        <Text style={[{
            fontSize:19,
            // lineHeight:height*0.08,
            color:props.colored ? "white" : "#AE1371",
            textAlign:"center"
            },props.textStyle]}>
            {props.title}
        </Text>
    </View>
    </TouchableOpacity>
)
export default Button