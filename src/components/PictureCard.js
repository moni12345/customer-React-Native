import React ,{Component} from 'react';
import {View,Text,StyleSheet,Image,Dimensions} from 'react-native'
import CardImage from '../../images/card.jpg'
const {height,width} = Dimensions.get('window')
const PictureCard =(props)=>(
    <View>
    <View  style={styles.cardContainer}>
    <Image source={props.src} style={styles.cardImage}/>
    </View>
    <View style={{width:width * 0.425,marginHorizontal: width * 0.0375,flexDirection:'row',justifyContent:'space-between'}}>
        {props.title && <Text style={{color:'grey',marginHorizontal:7}}>{props.title}</Text>}
        {props.number && <Text style={{color:'grey',marginHorizontal:7}}>{props.number} photos</Text>}
    </View>
    </View>
)
export default PictureCard
const styles = StyleSheet.create({
    cardContainer:{
        height: width * 0.425,
        width: width * 0.425,
        borderRadius: 12,
        marginHorizontal: width * 0.0375,
        marginVertical: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:12
    },
    cardImage:{
        width:width* 0.375,
        height: width* 0.375,
        marginRight:'auto',
        marginLeft:"auto"
        },
})