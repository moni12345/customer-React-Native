import React, { Component } from 'react';
import { Image, Dimensions, View } from 'react-native';
const { height, width } = Dimensions.get("window");

class LayzeeLogoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: height,
            width: width
        };
    }
    navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#AE1371', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={require('../../images/logo.png')}
                    style={{ width: width * 0.35, height: 60 }}
                    resizeMode='contain'
                />
            </View>
        );
    }
}

export default LayzeeLogoScreen;