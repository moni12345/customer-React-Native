import React ,{Component} from  'react';
import {View,Dimensions,ScrollView,Keyboard} from 'react-native';
const {width,height} = Dimensions.get('window');
import {connect} from 'react-redux'
import Input from '../components/Input'
import Button from '../components/Buttons'
import Header from '../components/Header'

const mapStateToProps = (state) =>({
    state:state
    })
    const mapDispatchToProps = (dispatch) => ({
        // LOGIN:(abcd)=>dispatch(LOGIN(abcd))
    })
class ForgetPassword extends Component{
    constructor(){
        super();
        this.state={
        }
    }
    forget = (payload) => {
        fetch('http://18.223.28.90:3000/user/forgetPassword', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            // redirect: "follow", // manual, *follow, error
            // referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(
                payload
                // {phone:'04425345677'}
                ), 
        }).then((response)=>{
            if(response.status ===200){
                var data = JSON.parse(response._bodyText).data;
                console.log("VERIFICATION CODE: ", data.data.verficationCode);
                this.props.navigation.navigate('VerifyForgotPassword',{ forgotPasswordResponse: data.data, phone: payload.phone })
            }
            else{
                alert(JSON.parse(response._bodyText).data.message)
            }
        }).catch((error)=>alert(error))
    }
    static navigationOptions = {
        header:({navigation}) => <Header  title="Forget Password" goBack={()=>navigation.navigate('SignIn')}/>
    };

    componentDidMount () {
        // AsyncStorage.setItem('id','value')
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

                <Input
                onChangePhoneNumber={(phone)=>{
                    this.setState({phone: phone.replace(/\s/g, '')})
                }}
                phone
                value={this.state.phone}
                isValidNumber={(bool)=>console.log(bool,"ye lou")}
                />

                {/* <View style={{
                    flexDirection:"row",
                    width:width*0.9,
                    justifyContent:"space-between",
                    marginRight:"auto",
                    marginLeft:"auto",
                    marginVertical:10}}>
                    <TouchableOpacity onPress={()=>alert('this will work later')}>
                    <Text style={{color:"#808080"}}>Forgot Password?</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUp')}>
                    <Text style={{color:"blue"}}>
                    Click here to register
                    </Text>
                    </TouchableOpacity>
                </View> */}
                    <Button
                    onPress={
                            ()=>this.forget({
                                phone:this.state.phone
                            })
                    }
                    // disabled={true}
                    title="Send Code"
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
export default connect(mapStateToProps,mapDispatchToProps)(ForgetPassword)