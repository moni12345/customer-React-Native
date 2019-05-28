import React ,{Component} from 'react';
import {View,Text,TouchableOpacity,Image,StyleSheet} from 'react-native';
import StarRating from 'react-native-star-rating';
import Avatar from '../../images/avatar.jpg'
import Round from '../../images/infogrey.png'
import RoundWhite from '../../images/infowhite.png'


const VendorCard =(props) => (
            <TouchableOpacity style={[styles.cardContainer, 
            { backgroundColor:
                 props.selected ? '#AE1371' :
                  'white' }
        ]} 
        onPress={props.onPress}
            // key={index} onPress={() => this.setState({ vendor: index })}
            >
                {props.image && <View style={styles.cardContainerLeft}>
                    <Image source={props.image} style={styles.avatar} />
                </View>}
                <View style={[styles.cardContainerRight,{width:props.image ? '78%' : '100%'}]}>
                    <View style={styles.upperRow}>
                        <Text style={{ fontSize: 16, color: 
                            props.selected ? "white" : 
                            'black' }}>John Doe</Text>
                        <View style={{ width: props.image ? '40%' : '20%', flexDirection: 'row' }}>
                            {props.distance &&  <Text style={{ color: 
                                props.selected ? 'white' : 
                                'grey' }}>{props.distance}KM</Text>}
                            <View style={{}}>
                                <StarRating
                                    disabled={false}
                                    starSize={15}
                                    starStyle={{}}
                                    disabled={true}
                                    // style={{flexDirection:'row',justifyContent:'flex-start'}}
                                    emptyStar={'ios-star-outline'}
                                    fullStar={'ios-star'}
                                    halfStar={'ios-star-half'}
                                    iconSet={'Ionicons'}
                                    maxStars={5}
                                    rating={5}
                                    selectedStar={(rating) => this.setState({
                                        starCount: rating
                                    })}
                                    fullStarColor={'#e8c814'}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: "center", alignItems: 'center' }}>
                        <Text style={{ width: props.info ? '65%' : '100%', fontSize: 12, color: 
                        props.selected ? 'white' : 
                        'grey' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
                        {props.info && <TouchableOpacity onPress={() => props.navigation.navigate('VendorProfile')}>
                            <Image source={
                                props.selected ? RoundWhite :
                                 Round} style={{ width: 30, height: 30, marginRight: 15 }} />
                        </TouchableOpacity>}
                    </View>

                </View>
            </TouchableOpacity>

        )
export default VendorCard

const styles = StyleSheet.create({
    upperRow: {
        width: '90%',
        flexDirection: 'row',
        marginTop: 12,
        justifyContent: 'space-between',
        alignSelf: "center"
    },
    cardContainerRight: {
        width: '78%',
        // backgroundColor:"red",
        height: '100%'

    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 1,
        borderColor: "#C5C8CC"
    },
    cardContainerLeft: {
        width: '22%',
        // backgroundColor:"green",
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    cardContainer: {
        // backgroundColor: 'white',//"#AE1371",,
        marginTop: 12,
        width: '100%',
        height: 100,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})