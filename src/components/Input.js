import React from 'react';
import {View,Text,Dimensions,TextInput} from 'react-native';
import PhoneInput from 'react-native-phone-input'
const {height,width} = Dimensions.get("window")
const Input = (props) =>{
    return (
    // This outer view sets the height for the input, as well as the
    // top margin for seperation.
    <View style={{ height: height * 0.11 , marginTop: 5 }}>
        {/* This inner view sets the flex as 1 for its children.
            It has two children views:
                i) The first children has a flex of .2 and it holds the error message
                   and the title of the field.
                ii) The second children has a flex of .8 and holds the actual input.
        */}
        <View style={{ flex: 1, flexDirection: "column"  }}>
            <View style={{
                flex: 4,
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                width: width * 0.9,
                marginLeft: "auto",
                marginRight: "auto" }}>

                {/* Here we render the label for the input.*/}
                {props.label &&
                <Text style={{
                    color: "black",
                    fontSize:13,
                    marginBottom: 3,
                    marginLeft: 2
                    }}
                >{props.label}</Text>}
                <Text style={{
                    color:"red",
                    fontSize:12
                    }}
                >{props.error}</Text>
            </View>
            <View
            style={{
                backgroundColor:"white",
                borderRadius:10,
                width:width*0.9,
                marginRight:"auto",
                marginLeft:"auto",
                flex: 8,
                alignItems:'center',
                borderColor:"red",
                borderWidth: props.error ? 1 : 0
            }}
            >

                {props.phone ?
                <PhoneInput
                getISOCode={(code)=>console.log(code,'this is the code')}
                onChangePhoneNumber={props.onChangePhoneNumber}
                getValue={props.getValue}
                isValidNumber={props.isValidNumber}
                textProps={{
                    placeholder:"Mobile Number"
                }}
                textStyle	={{fontSize:18}}
                initialCountry="ae"
                // onSelectCountry={(a)=>console.log(a)}
                style={{
                    width:"85%",
                    marginVertical:15,
                }}
                {...props}
                />:
                <TextInput
                // editable={props.editable}
                // secureTextEntry={props.secureTextEntry}
                // onChangeText={props.onChangeText}
                underlineColorAndroid="transparent"
                // placeholder={props.placeholder}
                // placeholderTextColor="#d6d4d4"
                placeholderTextColor='black'
                onFocus={props.onFocus}
                style={{
                    width:"85%",
                    marginRight:"auto",
                    marginLeft:"auto",
                    fontSize:18

                }}
                {...props}
                />}
            </View>
        </View>

    </View>
);
}

export default Input