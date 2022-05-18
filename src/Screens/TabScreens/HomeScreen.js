import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { Colors } from '../../Helper/Colors'
import { dfccsb, dfcsb, dfr, h1, h2, p } from '../../Helper/styles'
import SearchBar from '../../Helper/SearchBar'
import { ScheduledServices, TrendingServices } from '../../Helper/FakeData'
import HomeServicesCard from '../../Components/Home/HomeServicesCard'
import InviteAndEarn from '../../Components/Home/InviteAndEarn'
import BottomTab from '../../Components/BottomTab'
import HomeTrendingCard from '../../Components/Home/HomeTrendingCard'
import { useNavigation } from '@react-navigation/native'
import axios from '../../utils/axios'
import { selectUser } from '../../Redux/Reducers/userReducer'
import { useSelector } from 'react-redux'

const HomeScreen = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [trending, setTrending] = useState([])
    const user= useSelector(selectUser)

    console.log(user,'redux user')
    useEffect(() => {
        getCategories()
        getTrendingServices()
    }, [navigation])

    const getCategories = async () => {
        setLoading(true)
        await axios.get('/rest/categories')
            .then(res => {
                setCategories(res.data.results)
                setLoading(false)
            }).catch(e => {
                console.log(e, 'services error')
            })
    }
    const getTrendingServices = async () => {
        setLoading(true)
        await axios.get('/rest/trending')
            .then(res => {
                setTrending(res.data.results)
                setLoading(false)
            }).catch(e => {
                console.log(e, 'trending services error')
            })
    }
    return (
        <View style={styles.cont}>

            <ScrollView>
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text style={{ ...h2, fontWeight: '900' }}><Entypo name="location-pin" size={20} color={Colors.primary} />Location</Text>
                    <Text style={{ ...p, color: '#c8c8c8', fontSize: 12 }}>Sanjay Gandhi Puram, Lucknow Uttar Pradesh 226016</Text>
                    {/* Scheduled Services */}
                    <Text style={{ ...p, marginVertical: 15 }}>Scheduled Services</Text>
                    <View style={{ ...dfr }}>
                        {
                            categories.map((item) => <HomeServicesCard data={item} key={item?.cid} />)
                        }
                    </View>
                    {/* Scheduled Services */}
                    <Text style={{ ...p, marginVertical: 15 }}>Value Added Services</Text>
                    <View style={{ ...dfr }}>
                        {
                            categories.map((item) => <HomeServicesCard data={item} key={item?.cid} />)
                        }
                    </View>
                    <ImageBackground source={require('../../Assets/Images/homeback.png')} style={{ width: '100%', height: 100, marginVertical: 20 }} resizeMode='contain'>
                        <View style={{ ...dfcsb, marginHorizontal: 15, marginVertical: 10 }}>
                            <Text style={{ ...h2, color: 'white' }}>YOU ARE SECURED</Text>
                            <Text style={{ ...p, color: 'white', fontSize: 12, width: '60%' }}>Euismod sed congue leo consectetur imperdiet nibh massa. At et id mauris ut egestas habitasse commodo eget.</Text>
                        </View>
                    </ImageBackground>

                    {/* trenfing  */}
                    {trending.length > 0 &&
                        <>
                            <Text style={{ ...p, marginVertical: 5 }}>Trending Services</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={{ ...dfr }}>
                                    {
                                        trending.map((item, i) => <HomeTrendingCard data={item} key={i} />)
                                    }
                                </View>
                            </ScrollView>
                        </>
                    }

                    <ImageBackground source={require('../../Assets/Images/homeback.png')} style={{ width: '100%', height: 100, marginVertical: 20 }} resizeMode='contain'>
                        <View style={{ ...dfcsb, marginHorizontal: 15, marginVertical: 10 }}>
                            <Text style={{ ...h2, color: 'white' }}>YOU ARE SECURED</Text>
                            <Text style={{ ...p, color: 'white', fontSize: 12, width: '60%' }}>Euismod sed congue leo consectetur imperdiet nibh massa. At et id mauris ut egestas habitasse commodo eget.</Text>
                        </View>
                    </ImageBackground>

                </View>
                <InviteAndEarn />
            </ScrollView>
            <BottomTab />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    cont: {
        flex: 1, backgroundColor: '#fff'
    }
})