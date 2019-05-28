import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Logo from '../../images/logoSplash.jpg'
import Menu from '../../images/menu.png'
import Back from '../../images/backward.png'
import Cross from '../../images/close.png'

const { height, width } = Dimensions.get('window')

const Header = (props) => {
    const onLeftPress = props.menu ? props.openDrawer : props.goBack;
    const onRightPress = props.onRightPress ? () => props.onRightPress() : () => {}

    return (
        <View style={styles.container}>

            <View style={styles.leftView}>

                {onLeftPress ?
                    <TouchableOpacity onPress={() => onLeftPress()} style={styles.iconContainer}>
                        <Image source={props.menu ? Menu : Back} style={styles.imageLeft} />
                    </TouchableOpacity> :
                    null
                }
            </View>
            <View style={styles.centerView}>
                {props.title ?
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerText}>{props.title}</Text>
                    </View> :
                    <Image source={Logo} style={styles.logo} />
                }
            </View>
            <View style={styles.rightView}>
                {props.RightIcon ?
                    <TouchableOpacity onPress={() => onRightPress()} style={styles.iconContainer}>
                        <Image source={props.RightIcon} style={styles.imageRight} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => onRightPress()} style={styles.rightTextContainer}>
                        <Text style={styles.textRight}>{props.textRight}</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}
export default Header;

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height * 0.08,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent:"center",
        backgroundColor: "white"
    },
    leftView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    centerView: {
        flex: 7,
        justifyContent: "center"
    },
    rightView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    iconContainer:{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    rightTextContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems:"center"
    },
    imageLeft: {
        height: 20,
        width: 20,
        //marginLeft: 16,
        // marginVertical: 20
    },
    imageRight: {
        height: 25,
        width: 25,
    },
    textRight: {
        // marginTop: 14,
        fontSize: 14,
        color: 'black'
    },
    empty: {
        width: "40%",
        height: height * 0.08
    },
    logo: {
        height: height * 0.0275,
        marginVertical: 15,
        width: width * 0.25,
        alignSelf:'center',
    },
    headerTextContainer: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems:"flex-start",
    },
    headerText: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold"
        // marginTop: 14
    }
})