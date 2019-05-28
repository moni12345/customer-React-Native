import React,{Component} from 'react';
import {View,Keyboard,Text,Dimensions} from 'react-native';
import {connect} from 'react-redux'
import {VERIFY} from '../store/Middleware/auth'
import Button from '../components/Buttons'
import Header from '../components/Header'
import CodeInput from 'react-native-confirmation-code-input';

const { height, width } = Dimensions.get("window");
const mapStateToProps = (state) =>({
    state:state
    })
    const mapDispatchToProps = (dispatch) => ({
        VERIFY:(abcd)=>dispatch(VERIFY(abcd))
    })
    
class VerificationCode extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    static navigationOptions = {
        header:({navigation}) => <Header  goBack={()=>navigation.navigate('SignIn')}/>
        };    
        verify(code){
            let fpResponse = this.props.navigation.getParam('forgotPasswordResponse')
            let phone = this.props.navigation.getParam('phone');
            this.props.VERIFY({
                user:{
                    phone: phone,
                    id: fpResponse.Id
                },
                code: code,
                navigation:this.props.navigation,
                route: "NewPassword",
            })
            // console.log(code,"this is code")
            // // /user/verifyUser/1/5490
        }

        resendVerificationCode() {
            let phone = this.props.navigation.getParam('phone');
            console.log("Resend verification code not implemented.");
        }
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
                <View
                
                >
                <View
            style={{height:height-(height*0.08),backgroundColor:'#F8F8F8'}}                
                >
                <View style={{position:'absolute',marginTop:height*0.3,width:width,marginHorizontal:"auto"}}>
                <Text
                style={{textAlign:"center",color:"black",fontSize:14}}
                >Please enter Verification Code</Text>
                <CodeInput
                    ref="codeInputRef2"
                    secureTextEntry
                    compareWithCode='7536'
                    activeColor='rgba(49, 180, 4, 1)'
                    inactiveColor='rgba(49, 180, 4, 1.3)'
                    autoFocus={true}
                    keyboardType="numeric"
                    ignoreCase={true}
                    inputPosition='center'
                    size={60}
                    className="border-box"
                    space={20}
                    onFulfill={(isValid,code)=>this.verify(code)}
                    // containerStyle={{ marginTop: 30 ,backgroundColor:"white"}}
                    codeInputStyle={{ borderWidth: 1.5 ,backgroundColor:"white",borderWidth:0,borderRadius:10,height:50}}
                    codeLength={4}
                />
                {/* Resend verification code. */}
                <Text
                    style={{ textAlign: "center", color: "#0953f2", fontSize: 14,marginVertical:5 }}
                    onPress={() => this.resendVerificationCode()}
                >Resend Verification Code</Text>
                <Text
                    style={{ textAlign: "center", color: "#0953f2", fontSize: 14,marginVertical:10 }}
                >Change Mobile Number</Text>
                </View>
                </View>
                <Button
                title="Submit"
                    colored
                    width={width*0.9}
                    style={{
                        bottom:30,
                        position:'absolute',
                        left:width*0.05,
                        right:width*0.05
                    }}
                    onPress={()=>this.props.navigation.navigate('Starter')}
                    />
                </View>
        )
    }

}

const styles = {
    midHeading:{
        alignSelf:'flex-start'
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(VerificationCode);