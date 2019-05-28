import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View, StyleSheet, AsyncStorage,TouchableOpacity,Dimensions,Image,SafeAreaView } from 'react-native';
import {connect} from 'react-redux'
import Avatar from '../../images/avatar.jpg'
import Star from '../../images/star.png'
import Profile from '../../images/profile.png'
import Jobs from '../../images/availability.png'
import Logout from '../../images/logout.png'
import QMark from '../../images/help.png'
import Round from '../../images/about.png'
import Wallet from '../../images/wallet.png'
import Favorite from '../../images/favorite.png'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const mapStateToProps = (state) =>({
    user:state.auth.user
    })
    const mapDispatchToProps = (dispatch) => ({
    })
class drawerContentComponents extends Component {
    constructor(props){
        super(props);
        this.state={
            user:null
        }
    }
    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })
    logout(){
        AsyncStorage.removeItem('user')
        // AsyncStorage.setItem('user',null).then(()=>console.log(success)).catch(()=>console.log('fail'));
        this.props.navigation.navigate('SignIn')
    }
    componentDidMount(){
        this.props.user !== null&&
        this.setState({
            user:this.props.user
        })
    }
  render() {
    const profileImage = this.props.user.profile_picture;
    const userName = this.props.user.name;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{ height: "100%", width: "100%" }}
            >
                <View style={{
                    backgroundColor: "#AE1371",
                    height: height * 0.35,
                }}>
                    <Image source={profileImage ? { uri: profileImage } : Avatar}
                        style={styles.avatar}
                    />
                    <Text
                        style={styles.userName}
                    >{this.state.user ? userName : 'Username'}</Text>
                    <View style={styles.ratingContainer}>
                        {[1, 2, 3, 4, 5].map((value, index) => (<Image key={index} source={Star} style={styles.ratingStar} />))}
                    </View>
                </View>
                <View style={{ marginTop: 15 }}>
                    {
                        [
                            { name: "Profile", icon: Profile, route: "Profile",param:{user:this.state.user} },
                            { name: "Jobs", icon: Jobs }, //, route: "Jobs" },
                            { name: "Wallet", icon: Wallet},//, route: "Wallet" },
                            { name: "Favorites", icon: Favorite},//, route: "FavServices" },
                            { name: "FAQ's", icon: QMark},//, route: "FAQ" },
                            { name: "About", icon: Round },//, route: "About" },
                            { name: "Logout", icon: Logout, route: "Receipt" }

                        ].map((data, index) =>
                            (<TouchableOpacity key={index} onPress={()=>{
                                if(data.name==="Logout"){
                                    this.logout()
                                }
                                else {
                                    console.log("The user: ", this.state.user);
                                    if(data.route) {
                                        this.props.navigation.navigate(`${data.route}`, { ...data.param });
                                    }
                                }
                            }
                                }>
                            <View style={styles.itemContainer} >
                                <Image source={data.icon} style={styles.itemImage} />
                                <Text
                                    style={styles.itemText}
                                >{data.name}</Text>
                            </View></TouchableOpacity>)
                        )
                    }
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.bottomText}>Legal</Text>
                    <Text style={styles.bottomText}>v2.19</Text>
                </View>
            </View>
        </SafeAreaView>
    )
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(drawerContentComponents)
const styles = StyleSheet.create({
    ratingStar:{
        height:10,
        width:10
    },
    itemText:{
        color:"black",
        marginLeft:10,
        marginBottom:8,
        fontSize:15,
        fontWeight:"400"
    },
    itemImage:{
        height:22,
        width:22,
        marginLeft:12,
        marginBottom:12
    },
    itemContainer:{
        flexDirection:"row",
        borderBottomWidth:1,
        width:"80%",
        marginTop:10,
        marginLeft:"auto",
        marginRight:"auto",
        borderColor:"#DCDCDC"
    },
    bottomText:{
        color:"black",
        margin:10,
        fontSize:15,
        fontWeight:"bold"
    },
    bottomContainer:{
        borderTopColor:"#DCDCDC",
        borderTopWidth:1,
        bottom:0,
        flexDirection:"row",
        justifyContent:"space-between",
        position:"absolute",
        width:"100%"
    },
    avatar:{
        height:100,
        width:100,
        borderRadius:50,
        borderWidth:2,
        borderColor:"white",
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:height*0.075
    },
    ratingContainer:{
        width:"50%",
        marginLeft:"auto",
        marginRight:"auto",
        flexDirection:"row",
        justifyContent:"center"
    },
    userName:{
        color:"white",
        textAlign:"center",
        fontSize:18,
        fontWeight:"bold",
        marginTop:7.5
    }

});