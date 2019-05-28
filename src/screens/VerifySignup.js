import React, { Component } from 'react';
import { View, Keyboard, Text, Dimensions, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import { VERIFY } from '../store/Middleware/auth';
import Header from '../components/Header';
import CodeInput from 'react-native-confirmation-code-input';

const { height, width } = Dimensions.get("window");

class VerificationCode extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    header: ({ navigation }) => <Header goBack={() => navigation.navigate('SignIn')} />
  };
  verify(code) {
    var uid = this.props.navigation.getParam('uid');
    var route = this.props.navigation.getParam('route');
    this.props.VERIFY({
      user: {
        id: uid,
      },
      code: code,
      navigation: this.props.navigation,
      route: route
    })
    // console.log(code,"this is code")
    // // /user/verifyUser/1/5490
    // fetch(`http://18.223.28.90:3000/user/verifyUser/4/${code}`, {
    //     method: "GET", // *GET, POST, PUT, DELETE, etc.
    //     mode: "cors", // no-cors, cors, *same-origin
    //     headers: {
    //         "Content-Type": "application/json",
    //     },

    // }).then((response)=>{console.log(response)})
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this._keyboardDidShow());
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this._keyboardDidHide());
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    this.setState({ keyboardOpened: true })
  }

  _keyboardDidHide() {
    this.setState({ keyboardOpened: false })
  }

  // verifyUser = async (code) => {
  //   const user = await AsyncStorage.getItem('user');
  //   const { verification_code } = JSON.parse(user);
  //   if (verification_code.toString() === code) { this.props.navigation.navigate('App') }

  // }

  render() {
    return (
      <View

      >
        <View
          style={{ height: height - (height * 0.08), backgroundColor: '#F8F8F8' }}
        >
          <View style={{ position: 'absolute', marginTop: height * 0.3, width: width, marginHorizontal: "auto" }}>
            <Text
              style={{ textAlign: "center", color: "black", fontSize: 14 }}
            >Please enter Verification Code</Text>
            <CodeInput
              ref="codeInputRef2"
              secureTextEntry
              activeColor='rgba(49, 180, 4, 1)'
              inactiveColor='rgba(49, 180, 4, 1.3)'
              autoFocus={true}
              keyboardType="numeric"
              ignoreCase={true}
              inputPosition='center'
              size={60}
              className="border-box"
              space={20}
              onFulfill={(code) => this.verify(code) }
              codeInputStyle={{ borderWidth: 1.5, backgroundColor: "white", borderWidth: 0, borderRadius: 10, height: 50 }}
              codeLength={4}
            />
            <Text
              style={{ textAlign: "center", color: "#0953f2", fontSize: 14, marginVertical: 5 }}
            >Resend Verification Code</Text>
            <Text
              style={{ textAlign: "center", color: "#0953f2", fontSize: 14, marginVertical: 10 }}
            >Change Mobile Number</Text>
          </View>
        </View>
      </View>
    )
  }

}

const mapStateToProps = (state) => ({
  state: state
})
const mapDispatchToProps = (dispatch) => ({
  VERIFY: (abcd) => dispatch(VERIFY(abcd))
})

export default connect(mapStateToProps, mapDispatchToProps)(VerificationCode);