import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { View, Text, Image, Dimensions, ScrollView, ImageStore, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import { UPDATE_PROFILE } from '../store/Middleware/profile'
import Camera from '../../images/camera.png'
import Home from '../../images/home3.png'
import Arrow from '../../images/arrow3.png'
import Header from '../components/Header'
import Avatar from '../../images/avatar.jpg'

const { height } = Dimensions.get('window')

let _this = null;
class EditProfile extends Component {
  constructor(props) {
    super(props);
    const { name, profile_picture, id, user_role_id } = this.props.user;
    this.state = {
      name: name,
      user_role_id: user_role_id,
      profile_picture: profile_picture ? { uri: profile_picture } : Avatar,
      base64Image: '',
      authToken: '',
      addresses: [],
      base64Image: ''
    };
  }

  static navigationOptions = {
    header: ({ navigation }) => <Header title="Edit Profile" textRight="Save" onRightPress={() =>
      _this.props.UPDATE_PROFILE({
        id: _this.props.user.id,
        user: {
          name: _this.state.name,
          profile_picture: _this.state.base64Image,
          user_role_id: _this.props.profile.user.user_role_id,
          addresses: _this.state.addresses
        },
        authToken: _this.props.user.token,
        navigation: _this.props.navigation
      })
    } goBack={navigation.pop} />
  };
  componentDidMount() {
    _this = this;
  }
  uploadProfilePicture = () => {
    ImagePicker.showImagePicker(response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri }
        ImageStore.getBase64ForTag(response.uri, (base64Data) => {
          this.setState({ base64Image: base64Data, profile_picture: source })
        }, (reason) => console.error(reason));
      }
    });
  };
  render() {
    const { email, phone } = this.props.user;
    const { profile_picture, name } = this.state;
    return (
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#F8F8F8', minHeight: height }}>
          <View style={styles.topContainer}>
            <View style={styles.profileContainer}>
              <TouchableOpacity onPress={() => this.uploadProfilePicture()}>
                <Image source={profile_picture} style={styles.avatar} />
              </TouchableOpacity>
              <View
                style={styles.cameraContainer}>
                <Image source={Camera}
                  style={styles.camera}
                />
              </View>
            </View>
          </View>

          <View style={styles.itemContainer}>

            <Text
              style={[styles.itemHeader,
              {
                width: "70%", marginLeft: "auto",
                marginRight: "auto"
              }]}>
              Name
      </Text>
            <TextInput
              style={styles.itemText}
              value={name}
              underlineColorAndroid="transparent"
              onChangeText={(text) => this.setState({ name: text })}
            />
          </View>

          <View style={styles.itemContainer}>

            <Text
              style={[styles.itemHeader,
              {
                width: "70%", marginLeft: "auto",
                marginRight: "auto"
              }]}>
              Email
      </Text>

            <TextInput
              style={styles.itemText}
              value={email}
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.itemContainer}>

            <Text
              style={[styles.itemHeader,
              {
                width: "70%", marginLeft: "auto",
                marginRight: "auto"
              }]}>
              Phone
      </Text>

            <TextInput
              style={styles.itemText}
              value={phone}
              underlineColorAndroid="transparent"
            />

          </View>

          {
            this.state.user && this.state.user.UserAddresses && this.state.user.UserAddresses.length ?
              this.state.user.UserAddresses.map((data, index) => (

                <View style={styles.itemIconContainer} key={index}>
                  <View style={{ width: "15%" }}>
                    <Image source={Home} style={styles.icon} /></View>
                  <Text style={[styles.itemHeader, { width: "70%" }]}>{data.house_no},{data.street_no},{data.state}</Text>
                  <View style={{ width: "15%" }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("AddOrEditAddress", { id: data.id })}>
                      <Image source={Arrow} style={[styles.icon, { height: 15, width: 15 }]} /></TouchableOpacity>
                  </View>
                </View>
              ))
              :
              <View style={styles.itemIconContainer}>
                <View style={{ width: "15%" }}>
                  <Image source={Home} style={styles.icon} /></View>
                <Text style={[styles.itemHeader, { width: "70%" }]}>Add Adddress</Text>
                <View style={{ width: "15%" }}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("AddOrEditAddress")}>
                    <Image source={Arrow} style={[styles.icon, { height: 15, width: 15 }]} /></TouchableOpacity>
                </View>
              </View>
          }

          <View style={{
            borderBottomWidth: 1, borderColor: "#DCDCDC"
          }}>
            {
              this.state.user && this.state.user.UserAddresses &&
              <TouchableOpacity onPress={() => this.props.navigation.navigate("AddOrEditAddress")}
              >
                <Text style={{
                  color: "#0953f2",
                  paddingTop: 5,
                  marginBottom: 11.5,
                  width: "70%",
                  marginRight: "auto",
                  marginLeft: "auto"
                }}>Add another location</Text>
              </TouchableOpacity>
            }
          </View>

          <View style={{ width: '70%', marginLeft: "auto", marginRight: "auto", flexDirection: "row", alignItems: "center", height: 50 }}>
            <Text style={{ color: "#0953f2" }}>
              Add another Car
                            </Text>
          </View>

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
    height: height * 0.35,
    padding: 40,
  },
  profileContainer: {
    height: 100,
    width: 100,
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
  icon: {
    height: 20,
    width: 20,
    marginRight: "auto",
    marginLeft: "auto"
  },
  itemText: {
    color: "#bcb8b8",
    fontSize: 12,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto"
  }
}
const mapStateToProps = (state) => ({
  profile: state.profile, // TODO: The user is saved in store.auth.user and store.profile.user this is redundancy..
  user: state.auth.user
})
const mapDispatchToProps = (dispatch) => ({
  UPDATE_PROFILE: (abcd) => dispatch(UPDATE_PROFILE(abcd))
})
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);