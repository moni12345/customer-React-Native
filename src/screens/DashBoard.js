import React, { Component } from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity, PermissionsAndroid, TouchableHighlight, ScrollView, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import MapView, { } from 'react-native-maps';
import Carousel from 'react-native-banner-carousel';
import { TabView, TabBar, SceneMap, PagerPan } from 'react-native-tab-view';
import { NavigationActions } from 'react-navigation';
import Location from '../../images/mapsPurple.png'
import Down from '../../images/Down.png'
import Header from '../components/Header'
import Mylocation from '../../images/mylocation.png'
import { getServices } from '../store/Middleware/services'

var startPoint;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const content = [
  "Earn rewards NOW!",
  "15% off on first service",
  "Bank on our biggest deal",
  "Get all your feedback"
];

class DashBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carSelect: 'Current Location',
      region: {
        latitude: 24.9418733,
        longitude: 67.1121096,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      index: 0,
      routes: [
        { key: 'first', title: 'Vehicle', icon: require('../../images/car.png') }],
      markers: [
        {
          coordinate: {
            latitude: 24.9418733,
            longitude: 67.1121096,
            title: "Best Place"
          },
          description: "Description1",
          id: 1
        },
       
      ],
      modalVisible: false,
      dropDownCurrentLocation: false,
      currentLocationHeader: {
        title: 'Current location',
        id: 0
      },
    }
  }

  componentDidMount() {
    this.props.getServices();
  }

  static navigationOptions = {
    header: ({ navigation }) => <Header menu={true} openDrawer={navigation.openDrawer} />
  };

  static getDerivedStateFromProps(props, state) {
    if ((props.categories !== state.routes) && props.categories.length) {
      return {
        routes: props.categories
      }
    }
    return null;

  }

  renderPage(banner, index) {
    return (
      <View style={[styles.banner, { display: this.state.modalVisible ? "none" : 'flex' }]} key={index}>
        <Text style={{ color: '#AE1371', fontSize: 26, fontWeight: 'normal', textAlign: 'center' }}>{banner}</Text>
      </View>
    );
  }

  openBottomSheet() {
    // We are commenting out this functionality temporarily.
    this.setState({
      modalVisible: true
    });
  }

  setModalVisible() {
    this.setState({
      modalVisible: false
    });
  }
  componentWillUnmount() {
    this.setModalVisible()
  }

  navigateToScreen = (route) => (
    () => {
      const navigateAction = NavigationActions.navigate({
        routeName: route
      });
      this.props.navigation.dispatch(navigateAction);
    })


  renderDropdownCurrentLocation = () => {
    let { title, id } = this.state.currentLocationHeader;
    let add = this.state.dropDownCurrentLocation ? require('../../images/up.png') : require('../../images/Down.png');
    let { downImage } = styles;
    return (
      <TouchableOpacity style={styles.dropDownContainer} onPress={() => this.setState(prevState => ({
        dropDownCurrentLocation: !prevState.dropDownCurrentLocation,
      }))}>

        <Text style={styles.headerText}>{title}</Text>
        <Image resizeMode='contain' source={add} style={downImage} />
      </TouchableOpacity>
    )
  }

  valueSelected(dataArr) {
    this.setState({
      currentLocationHeader: dataArr,
      dropDownCurrentLocation: false
    });
  }

  renderDropdownOptionsCurrentLocation = () => {
    let { dropDownOptionImage } = styles;
    if (this.state.dropDownCurrentLocation === true) {
      return (
        <View style={styles.dropDownOptionContainer}>
          {/* <Text style={styles.optionsGuide}>Select Car</Text> */}
          <TouchableOpacity style={styles.row} onPress={() => this.valueSelected({ title: 'Address 1', id: 1 })}>
            <Image resizeMode='contain' source={require('../../images/address.png')} style={dropDownOptionImage} />
            <Text style={styles.headerText}>Address 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={() => this.valueSelected({ title: 'Address 2', id: 2 })}>
            <Image resizeMode='contain' source={require('../../images/address.png')} style={dropDownOptionImage} />
            <Text style={styles.headerText}>Address 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Image resizeMode='contain' source={require('../../images/plus.png')} style={dropDownOptionImage} />
            <Text style={styles.headerText}>Add new Address</Text>
          </TouchableOpacity>
        </View>

      )
    } else {
      return <View />
    }

  }

  _renderTabBar = props => { return (
         <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'black' }}
        style={{ backgroundColor: 'white' }}
        scrollEnabled={true}
        bounces={true}
        labelStyle={{ color: 'black', fontSize: 10 }}
        tabStyle={{ width: width * 0.25, height: height * 0.1 }}
        renderIcon={
          ({ route, index }) =>
            <Image key={index} source={{ uri: route.icon }} resizeMode='contain' style={{ width: "100%", height: "100%" }} />
        }
      />
    );
  };

  returnServicesView = (servicesToBeMapped) => {
    let views = {};
    servicesToBeMapped.forEach(service => {
      views[service.key] = () => (

        <View style={{ backgroundColor: '#F5F5F5', height: "100%" }}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.linearGradient}>
              {service.services.map(singleService => (
                <TouchableOpacity onPress={this.navigateToScreen('WindowTinting')} style={styles.mainSubCategory} key={singleService.id}>
                  <Image resizeMode='contain' source={{ uri: singleService.serviceImage}} style={styles.subCategoryIcon} />
                  <Text style={styles.subServiceName}>{singleService.serviceName}</Text>
                </TouchableOpacity>
              ))}

            </View>
          </ScrollView>
        </View>
        )
    })

    if (Object.keys(views).length == 0) {
      // If the views are empty. Then we'll use a default one.
      views = {
        'first': () => (<View style={styles.container2}></View>)
      };
    }
    return views;
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => this.setModalVisible()}
          >
            <TouchableOpacity style={{ width: width, flexDirection: 'row', justifyContent: 'center', marginTop: height * 0.2, height: height * 0.25 }}
              onPress={() => this.setModalVisible()}><Image source={require('../../images/close.png')} /></TouchableOpacity>
            <TabView
              navigationState={this.state}
              onIndexChange={index => this.setState({ index })}
              renderScene={SceneMap(this.returnServicesView(this.props.services))}
              tabBarPosition="top"
              renderTabBar={this._renderTabBar}

              initialLayout={{ width: width, height: height * 0.5, backgroundColor: '#0C4A9E' }}
            />
          </Modal>
        </View>
        <MapView
          ref={map => this.map = map}
          showsMyLocationButton={true}
          showsCompass={true}
          showsUserLocation={true}
          loadingEnabled={true}
          initialRegion={this.state.region}
          style={[styles.containerMap, { paddingTop: this.state.paddingTop }]}
          onMapReady={() => PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            .then(granted => {
              this.setState({ paddingTop: 0 });
            })}
        >
          {this.state.markers.map((marker) =>
            (
              <MapView.Marker
                key={marker.id}
                coordinate={marker.coordinate}
                image={Location}
                draggable
                title={marker.title}
                description={marker.description}
              />))
          }
        </MapView>

        <View style={{ alignSelf: 'center', flexDirection: 'row', width: width * 3, position: 'absolute', top: height * 0.11, alignItems: 'center', height: 'auto', justifyContent: 'center' }}>
          <Carousel
            autoplay
            autoplayTimeout={10000}
            loop
            index={1}
            pageSize={width * 0.9}
            pageIndicatorContainerStyle={{ height: 'auto', width: 'auto' }}
            pageIndicatorStyle={{ backgroundColor: 'white', height: 10, width: 10, borderRadius: 5, borderColor: '#AE1371', borderWidth: 1 }}
            activePageIndicatorStyle={{ backgroundColor: '#AE1371', }}
            pageIndicatorOffset={20}
          >
            {content.map((banner, index) => this.renderPage(banner, index))}
          </Carousel>
        </View>

        {this.renderDropdownCurrentLocation()}
        {this.renderDropdownOptionsCurrentLocation()}
        <TouchableOpacity
          onPress={(position) => {
            // Disabling get current location
            return;
            navigator.geolocation.getCurrentPosition((position) => {
              const { longitude, latitude } = position.coords
              this.setState({
                region: {
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,

                }
              })
            })
          }}
          style={{
            bottom: 70,
            right: width * 0.05,
            position: 'absolute'

          }}
        >
          <Image source={Mylocation} style={{
            height: 100,
            width: 100,
          }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomSheetButton} onPress={() => this.openBottomSheet()}>
          <Text style={{ color: 'white', fontSize: 18, alignSelf: 'center', marginLeft: width * 0.17 }}>Request a Service</Text>
        </TouchableOpacity>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  containerMap: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    margin: 10,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  currentLocation: {
    width: "90%",
    height: 'auto',
    flexDirection: 'row',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    zIndex: 200
  },
  carSize: {
    height: 15,
    width: 23
  },
  contentWithImage: {
    marginLeft: 10,
    fontSize: 14
  },
  onePart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: "100%",
    padding: 10,
    paddingLeft: 7,
    paddingRight: 7
  },
  contentSelectCar: {
    width: width * 0.9,
    height: 'auto',
    marginTop: 5,
    padding: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
  dropdownHead: {
    alignSelf: 'center',
    marginTop: 10,
    width: width * 0.9,
    height: 52,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 15
  },
  container: {
    flex: 1
  },
  contentContainer: {
    width: width,
    height: 'auto',
  },
  linearGradient: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: "100%",
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: 10
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerAccordian: {
    width: "90%",
    height: 'auto',
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor: 'white',
    zIndex: 200
  },
  subServiceName: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
    color: 'black'
  },
  firstOfThree: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondOfThree: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdOfThree: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container2: {
    flex: 1,
    width: width,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  members: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    marginRight: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    height: height * 0.06,
    width: width * 0.9,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 5
  },
  bottomSheetButton: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 14,
    width: width * 0.8,
    borderRadius: 15,
    backgroundColor: '#AE1371'
  },
  banner: {
    flexDirection: 'row',
    // display:1==1 ? "none" : "block",
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 20,
    zIndex: -10,
    paddingRight: 10,
    backgroundColor: 'white',
    height: height * 0.19,
    width: width * 0.9,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 25
  },
  dropStyle: {
    width: width * 0.9,
    height: 'auto',
    top: 50,
    padding: 3,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: 15
  },
  bannerMain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
    paddingRight: 10,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    height: height * 0.1,
    width: width,
    borderRadius: 5,
    paddingRight: 10,
    paddingLeft: 18
  },
  contentText: {
    fontSize: 16,
    color: 'grey',
    marginTop: 10
  },
  bulletsSubService: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(52, 52, 52,0.7)',
    marginTop: 20,
    marginRight: 35,
    marginLeft: 35,
    marginBottom: 2
  },
  drawerContent: {
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 20

  },
  smallNavigate: {
    fontSize: 16
  },
  ratingStar: {
    height: 25,
    width: 15
  },
  ratingNumber: {
    fontSize: 16,
    marginRight: 5
  },
  drawerOneElement: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
    marginLeft: 10
  },
  bottomSheetUpper: {
    width: width,
    height: height * 0.09,
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  subCategoryIcon: {
    height: 30,
    width: 40
  },
  mainSubCategory: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 17,
    marginTop: 2,
    width: width * 0.20,
    borderRadius: 10,
    height: width * 0.20,
    backgroundColor: 'white',//change
    padding: 10
  },
  icon: {
    height: 10,
    width: 9
  },
  contentAccordian: {
    width: "90%",
    height: 'auto',
    zIndex: 100,
    justifyContent: 'center',
    backgroundColor: '#DCDFE1',
    alignSelf: 'center',
    padding: 20
  },
  addAnother: {
    color: '#3D81C9',
    fontSize: 16,
    marginTop: 10
  },
  dropDownOptionImage: {
    height: 15,
    width: 20,
    marginLeft: 10
  },
  downImage: {
    height: 15,
    width: 20,
    position: 'absolute',
    right: 20
  },
  dropDownContainer: {
    flexDirection: 'row',
    width: width * 0.9,
    alignSelf: 'center',
    height: height * 0.06,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 7,
    alignItems: 'center',
    marginTop: 20
  },
  dropDownOptionContainer: {
    width: width * 0.9,
    height: 'auto',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 12,
    alignItems: 'center',
    marginTop: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    paddingBottom: 5,
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E3E0DD'
  },
  scrollablePart: {
    backgroundColor: 'white',
    width: width,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
});


const mapStateToProps = (state) => ({
  services: state.services.services,
  categories: state.services.categories,
  authtoken: state.auth.user.authToken
});
const mapDispatchToProps = (dispatch) => ({
  getServices: (authtoken) => dispatch(getServices(authtoken))
})
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);