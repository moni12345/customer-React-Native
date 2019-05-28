import React from 'react';
import {View,Text,Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const NameValue = (props) => {
    return(
        <View style={styles.main}>
            <Text style={styles.headingStyle}>{props.heading}</Text>
            <Text style={styles.contentStyle}>{props.content}</Text>
        </View>
    );
}

const styles = {
    main:{
        marginLeft:width*0.1,
        marginTop:height*0.04
    },
    headingStyle:{
        fontSize:16,
        fontWeight:'bold',
        color:'black'
    },
    contentStyle:{
        fontSize:16,
        color:'black'
    }
}

export default NameValue;