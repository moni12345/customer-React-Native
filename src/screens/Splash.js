import React, { Component } from 'react';
import { Image, Dimensions, View } from 'react-native';
const { height, width } = Dimensions.get("window");
import { connect } from 'react-redux';


const mapStateToProps = (state) => ({
    user: state.auth.user
})
const mapDispatchToProps = (dispatch) => ({
    // PROFILE: (abcd) => dispatch(PROFILE(abcd))
})

class Splash extends Component {
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

    async componentDidMount() {
        
        this._loadInitialState();
    }

    componentWillUnmount() {

    }

    _loadInitialState = async () => {
        if(this.props.user) {
            this.props.navigation.navigate('App');
        } else {
            this.props.navigation.navigate('Auth');
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Splash)