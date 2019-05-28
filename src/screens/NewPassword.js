import React ,{Component} from  'react';
import {View,Text,Dimensions,Image,Keyboard} from 'react-native';
import  {connect} from 'react-redux';
const {width,height} = Dimensions.get('window');
import Input from '../components/Input'
import Button from '../components/Buttons'
import Header from '../components/Header'
import Logo from '../../images/logo.png'
import Menu from '../../images/menu.png'
import Back from '../../images/backward.png'
import Cross from '../../images/close.png'

const Title = (props) =>{
    (<View style={{width:width,height:height*0.08,flexDirection:"row",justifyContent:"space-evenly"}}>
        <Image source={props.menu ? Menu : Back}/>
        <Image source={Logo} resizeMode="contain"/>
    </View>)
}
const mapStateToProps = (state) =>({
state:state.profile
})
const mapDispatchToProps = (dispatch) => ({
    // REGISTER:(abcd)=>dispatch(REGISTER(abcd))
})
    
class NewPassword extends Component{
    constructor(){
        super();
        this.state={
            checked:false,
            passwordMatch : true,
            errorEmail : false,
            errorPass : false
        }
        this.submit=this.submit.bind(this)
    }
    static navigationOptions = {
        header:({navigation}) => <Header RightIcon={Cross}  goBack={()=>navigation.navigate('SignIn')}/>
        };
    submit(){
        var phone = this.props.navigation.getParam('phone');
        var code = this.props.navigation.getParam('code');
        let body =JSON.stringify(
                // payload
                {
                    password:this.state.password,
                    phone: phone,
                    verification_code: code
                });
        console.log("We will send this body to the API: ");
        console.log(body);
        console.log(phone);
        fetch('http://18.223.28.90:3000/user/confirmForgetPassword', {
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
            body: body, 
        }).then((response)=>{
            console.log(response);
            if(response.status === 200){
                alert("Password changed.");
                this.props.navigation.navigate('SignIn')
            } 
            else{
                alert(response.error)
            }
        })
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
            style={{height:height*0.88,backgroundColor:"#F8F8F8"}}
            >
                {
                this.state.errorEmail ||  
                this.state.errorPass || 
                this.state.errorName || 
                !this.state.passwordMatch ? 
                <Text style={{
                    color: "red",
                    fontSize: 12,
                    width: width * 0.9,
                    marginRight: "auto",
                    marginLeft: "auto"
                }}>
                {this.state.errorMsg}
                </Text> : null}
                <Input
                    placeholder="Password"
                    error={this.state.errorPass}
                    secureTextEntry={true}
                    onChangeText={(text)=>{
                        var validate = new RegExp("(?=.{6,})");
                        var bool = validate.test(text)
                        this.setState({password:text,errorPass:bool ? false : true ,errorMsg:'password must be 6 characters'})}}

                />
                <Input
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    onChangeText={(text)=>this.setState({confirm:text,passwordMatch:this.state.password === text ? true : false,errorMsg:'password did not match'})}
                    error={!this.state.passwordMatch}
                />
                <View style={{
                    flexDirection:"row",
                    width:width*0.9,
                    marginRight:"auto",
                    marginLeft:"auto",
                    marginVertical:10}}>
                </View>
                    <Button
                    title="Confirm New Password"
                    colored
                    width={width*0.9}
                    style={{
                        bottom:30,
                        position:'absolute',
                        left:width*0.05,
                        right:width*0.05
                    }}
                    onPress={this.submit}
                    />
            </View>
            // </ScrollView>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(NewPassword)