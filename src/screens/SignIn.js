import React ,{Component} from  'react';
import {View,Text,Dimensions,Keyboard,ScrollView,TouchableOpacity} from 'react-native';
const {width,height} = Dimensions.get('window');
import {connect} from 'react-redux'
import Input from '../components/Input'
import Button from '../components/Buttons'
import Header from '../components/Header'
import {LOGIN_USER} from '../store/Middleware/auth'

const mapStateToProps = (state) =>({
    state:state
});
const mapDispatchToProps = (dispatch) => ({
    loginUser:(payload)=>dispatch(LOGIN_USER(payload))
});

class SignIn extends Component{
    constructor(){
        super();
        this.state={
        }
    }
    static navigationOptions = {
        header:({navigation}) => <Header />
    };

    componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this._keyboardDidShow());
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',() => this._keyboardDidHide());
      }

      componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
      }

    _keyboardDidShow () {
        this.setState({ keyboardOpened: true })
      }

      _keyboardDidHide () {
        this.setState({ keyboardOpened: false })
      }

    render(){
        return(
            <ScrollView>
            <View
            style={{height:height*0.88,backgroundColor:"#F8F8F8"}}
            >
                <Text style={{
                    color:"#AE1371",
                    fontSize:30,
                    fontWeight:'400',
                    marginVertical:10,
                    textAlign:"center"
                    }}>
                Sign in
                </Text>
                <Input
                onChangePhoneNumber={(phone)=>{
                    this.setState({
                        // Removing spaces from text
                        phone: phone.replace(/\s/g, '')
                    })
                }}
                phone={true}
                value={this.state.phone}
                label={"Mobile Number"}
                isValidNumber={(bool)=>console.log(bool,"ye lou")}
                />
                <Input
                    label={"Password"}
                    secureTextEntry={true}
                    onChangeText = {(Password)=>this.setState({password:Password})}
                />
                <View style={{
                    flexDirection:"row",
                    width:width*0.9,
                    justifyContent:"space-between",
                    marginRight:"auto",
                    marginLeft:"auto",
                    marginVertical:10}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('ForgotPassword')}>
                    <Text style={{color:"#AE1371"}}>Forgot Password?</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.replace('SignUp')}>
                    <Text style={{color:"#AE1371"}}>
                    Click here to register
                    </Text>
                    </TouchableOpacity>
                </View>
                    <Button
                    onPress={() => this.props.loginUser({
                        user:
                            {
                                phone: this.state.phone,
                                password: this.state.password
                        },
                        navigation:this.props.navigation
                    })
                    }
                    // disabled={true}
                    title="Sign in"
                    colored
                    width={width*0.9}
                    style={{
                        bottom:30,
                        position:'absolute',
                        left:width*0.05,
                        right:width*0.05
                    }}
                    />
            </View>
            </ScrollView>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignIn)