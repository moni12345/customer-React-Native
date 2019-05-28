import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { UPDATE_PROFILE } from '../store/Middleware/profile'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker';
import Camera from '../../images/camera.png'
import Star from '../../images/star.png';
import Home from '../../images/home.png'
import Car from '../../images/car3.png'
import Avatar from '../../images/avatar.jpg'
import Header from '../components/Header'
import Edit from '../../images/edit3.png'
const { width, height } = Dimensions.get('window');

class Profile extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        header: ({ navigation }) => <Header title="Profile" RightIcon={Edit} onRightPress={() => navigation.navigate('EditProfile')} goBack={() => navigation.navigate('Home')} />
    };

    render() {
        const { name, email, profile_picture, phone } = this.props.user;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
                <View style={styles.topContainer}>
                    <View style={styles.profileContainer}>
                            <Image source={profile_picture ? { uri: profile_picture } : Avatar} style={styles.avatar} />
                    </View>
                    <Text
                        style={styles.userName}
                    >{name}</Text>
                    <View style={styles.ratingContainer}>
                        {[1, 2, 3, 4, 5].map((value, index) => (<Image key={index} source={Star} style={styles.ratingStar} />))}
                    </View>
                </View>
                <View
                    style={styles.itemContainer}
                >
                    <Text style={[styles.itemHeader, { width: "70%", marginLeft: "auto", marginRight: "auto" }]}>Email</Text>
                    <Text style={styles.itemText}>{email}</Text>
                </View>

                <View
                    style={styles.itemContainer}
                >
                    <Text style={[styles.itemHeader, { width: "70%", marginLeft: "auto", marginRight: "auto" }]}>Phone</Text>
                    <Text style={styles.itemText}>{phone}</Text>
                </View>
                {/* Addresses */}
                <View style={[styles.itemIconContainer, { flex: 1, flexDirection: "row" }]}>
                    <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                        <Image source={Home} style={styles.iconAddresses} resizeMode="contain" resizeMethod="scale"/>
                    </View>
                    <Text style={[styles.itemHeader, { flex: 9 }]}>Addresses</Text>
                </View>
                {/* Cars */}
                <View style={[styles.itemIconContainer, { flex: 1, flexDirection: "row" }]}>
                    <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                        <Image source={Car} style={styles.iconCars} resizeMode="contain" resizeMethod="scale"/>
                    </View>
                    <Text style={[styles.itemHeader, { flex: 9 }]}>Cars</Text>
                </View>

            </ScrollView>
        )
    }
}

const styles = {
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "white",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: height * 0.075,
        marginBottom: -10
    },
    ratingContainer: {
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
        flexDirection: "row",
        justifyContent: "center"
    },
    userName: {
        color: "black",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 7.5
    },
    ratingStar: {
        height: 10,
        width: 10
    },
    topContainer: {
        height: height * 0.35
    },
    profileContainer: {
        marginRight: "auto",
        marginLeft: "auto"
    },
    cameraContainer: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        marginTop: -15,
        marginLeft: 60
    },
    camera: {
        height: 20,
        width: 20,
        borderRadius: 10,
        margin: 5
    },
    itemContainer: {
        borderColor: "#DCDCDC",
        borderTopWidth: 1,
        height: 70,
        paddingTop: 15,
        paddingBottom: 16
    },
    itemIconContainer: {
        borderColor: "#DCDCDC",
        borderTopWidth: 1,
        height: 70,
        alignItems: "center",
        flexDirection: "row"
    },
    itemHeader: {
        color: "black",
        fontSize: 16
    },
    iconAddresses: {
        width: "35%",
        height: "35%",
    },
    iconCars: {
        width: "50%",
        height: "50%",
    },
    itemText: {
        color: "#bcb8b8",
        fontSize: 12,
        marginTop: 5,
        width: "70%",
        marginLeft: "auto",
        marginRight: "auto"
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})
const mapDispatchToProps = (dispatch) => ({
    UPDATE_PROFILE: (abcd) => dispatch(UPDATE_PROFILE(abcd))
})
export default connect(mapStateToProps, mapDispatchToProps)(Profile);