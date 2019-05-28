import React,{Component} from 'react';
import {View,Text,TextInput,StyleSheet} from 'react-native'

const TextArea = (props) => (
    <View style={{ margin: 12 }} >
    <Text style={styles.itemTitle}>{props.title}</Text>
        <View style={[styles.innerContainer, { minHeight: 120,height:'auto' ,alignItems:'flex-start'}]}>
        <TextInput
        underlineColorAndroid="transparent"
        multiline={true}
        placeholder="Type here"
        style={{width:"90%",marginRight:"auto",marginLeft:"auto"}}
        onChangeText={props.onChangeText}
        />
        </View>
    </View>
)
export default TextArea
const styles = StyleSheet.create({
    innerContainer:{
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "white",
        flexDirection: "row",
        height: 50,
        borderRadius: 14,
        justifyContent:"space-between",
        alignItems:"center"
    },
    itemTitle:{
        fontSize:14,
        color:"black",
        width:"80%",
        marginLeft:"auto",
        marginRight:"auto",
        marginBottom:10,
    },
})