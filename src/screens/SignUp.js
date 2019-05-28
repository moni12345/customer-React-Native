import React, { Component } from 'react';
import {
    View, Text, Dimensions, TouchableOpacity,
    ScrollView, Image, Keyboard, Linking, DatePickerAndroid, KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { REGISTER } from '../store/Middleware/auth'
const { width, height } = Dimensions.get('window')
import Select from '../../images/select.png'
import Unselect from '../../images/unselect.png'
import Input from '../components/Input'
import Button from '../components/Buttons'
import Header from '../components/Header'
import Logo from '../../images/logo.png'
import Menu from '../../images/menu.png'
import Back from '../../images/backward.png'

const Title = (props) => {
    (<View style={{ width: width, height: height * 0.08, flexDirection: "row", justifyContent: "space-evenly" }}>
        <Image source={props.menu ? Menu : Back} />
        <Image source={Logo} resizeMode="contain" />
    </View>)
}
class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            checked: false,
            passwordMatch: true,
            errorEmail: false,
            errorPass: false,
            gender: 0,
            dob: ''
        }
    }
    static navigationOptions = {
        header: ({ navigation }) => <Header goBack={() => navigation.replace('SignIn')} />
    };
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
    openCalandar = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({ dob: `${year}-${month + 1}-${day}` })
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }
    render() {
        return (
            <ScrollView>
                <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-400}>
                    <View
                        style={{ backgroundColor: "#F8F8F8" }}
                    >
                        <Text style={{
                            color: "#AE1371",
                            fontSize: 30,
                            fontWeight: '400',
                            marginVertical: 10,
                            textAlign: "center"
                        }}>
                            Sign up
                        </Text>
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
                            label="Name"
                            error={this.state.errorName}
                            logging={true}
                            onChangeText={(text) => {
                                var validate = new RegExp("(?=.{3,})");
                                var bool = validate.test(text)
                                this.setState({ name: text, errorName: bool ? '' : 'must be atleast 3 characters'})
                            }}
                        />
                        <Input
                            label="Mobile Number"
                            onChangePhoneNumber={(phone) => { this.setState({ phone: phone }) }}
                            phone
                            isValidNumber={(bool) => console.log(bool, "this will show the phone ")}
                        />
                        <Input
                            label="Email"
                            error={this.state.errorEmail}
                            onChangeText={(text) => {
                                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                var bool = re.test(text)
                                this.setState({ email: text, errorEmail: bool ? '' : 'Invalid email' })
                            }
                            }

                        />
                        <Input
                            label="Password"
                            error={this.state.errorPass}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                var validate = new RegExp("(?=.{6,})");
                                var bool = validate.test(text)
                                this.setState({ password: text, errorPass: bool ? '' : 'password must be atleast 6 characters' })
                            }}

                        />
                        <Input
                            label="Confirm Password"
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({ confirm: text, errorPasswordMatch: this.state.password === text ? false : 'password did not match' })}
                            error={this.state.errorPasswordMatch}
                        />
                        <TouchableOpacity
                            onPress={this.openCalandar}
                        >
                        {/*
                            Confession:
                            ==========
                                Date of birth.... Just to make this element consistent with other ones, we have used
                                an Input with a label instead of <Text> and stuff.
                                The problem is that we want to have this with editable={false} because we want the
                                user to select the date from a calendar and not by typing it in text. So we set the date
                                using calendar and now we want to display it in this field, to do that we can use value={}
                                but the problem there is that on Android - I don't know about ios yet - since the input is
                                disabled the text appears grey, so in order to change that we have use placeholder to display
                                the text and we have set the placeholder color to black.
                        */}
                        <Input
                            label="Date Of Birth"
                            disabled={true}
                            editable={false}
                            placeholderTextColor={'black'}
                            placeholder={this.state.dob}
                        />
                        </TouchableOpacity>

                        <View
                            style={
                                {
                                    flexDirection: "row",
                                    width: "75%",
                                    marginRight: "auto",
                                    marginLeft: "auto",
                                    justifyContent: "space-between",
                                    marginTop: 20,
                                    marginBottom: 15
                                }
                            }
                        >
                            {['Male', 'Female', "Other"].map((data, index) => (
                                <TouchableOpacity onPress={() => { this.setState({ gender: index }) }} key={index}
                                    style={{
                                        backgroundColor: this.state.gender === index ? "#AE1371" : "white",
                                        width: "27.5%",
                                        height: 30,
                                        borderRadius: 12.5,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: 'center'
                                    }}>
                                    <View>
                                        <Text style={{ fontSize: 13, color: this.state.gender === index ? "white" : "black" }}>{data}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}</View>

                        <View style={{
                            flexDirection: "row",
                            width: width * 0.9,
                            marginRight: "auto",
                            marginLeft: "auto"
                        }}>
                            <TouchableOpacity onPress={() => this.setState((prevState) => ({ checked: !prevState.checked }))}>
                                <Image source={this.state.checked ? Select : Unselect} style={{ height: 20, width: 20, marginRight: 10 }} />
                            </TouchableOpacity>
                            <Text style={{ color: "#808080" }}>
                                I agree to <Text
                                    onPress={() =>
                                        Linking.openURL('https://layzee.com')
                                    }
                                    style={{ color: "blue", fontSize: 14 }}>terms and conditions</Text> of LAYZEE
                            </Text>
                        </View>
                        <Button
                            title="Sign Up"
                            colored
                            width={width * 0.9}
                            style={{
                                marginTop: 7,
                                marginBottom: 7
                            }}
                            onPress={() => this.props.REGISTER({
                                user: {
                                    name: this.state.name,
                                    phone: this.state.phone,
                                    email: this.state.email,
                                    password: this.state.password,
                                    user_role_id: 4,
                                    gender: this.state.gender,
                                    dob: this.state.dob,
                                    CityId: "1",
                                    addresses: []
                                },
                                navigation: this.props.navigation
                            })}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}
const mapStateToProps = (state) => ({
    state: state
})
const mapDispatchToProps = (dispatch) => ({
    REGISTER: (payload) => dispatch(REGISTER(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);