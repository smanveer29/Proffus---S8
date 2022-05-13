import { Dimensions, Image, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React from 'react'
import { dfr, h2, h3, p } from '../Helper/styles'
import Icon from 'react-native-vector-icons/AntDesign'
import { Instructions, ServiceOffer } from '../Helper/FakeData'
import ServiceOfferCard from '../Components/Services/ServiceOfferCard'
import CustomerReviewsCard from '../Components/CustomerReview/CustomerReviewsCard'
import Carousel from 'react-native-reanimated-carousel'
import CustomButton from '../Components/CustomButton'
import axios from '../utils/axios'
import { useSelector } from 'react-redux'
import { selectUser } from '../Redux/Reducers/userReducer'
const ServiceDetails = ({ route }) => {
   const data = route.params.data
   const user = useSelector(selectUser)
   const addToCart = () => {
      axios.post(`/rest/cart?sid=${data?.sid}`, {}, {
         headers: {
            Authorization: `Token ${user.token}`
         }
      }).then(res => {
         if(res.data.success){
            ToastAndroid.showWithGravityAndOffset('Added to Cart'
               , ToastAndroid.SHORT, ToastAndroid.BOTTOM, 50, 25)
         }else{
            ToastAndroid.showWithGravityAndOffset(`${res.data.error}`
               , ToastAndroid.SHORT, ToastAndroid.BOTTOM, 50, 25)
         }
      }).catch(e=>console.log(e,'add cart exception'))
   }
   return (
      <ScrollView style={styles.main}>
         <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <Text style={{ ...h2, fontWeight: 'bold' }}>{data?.name}</Text>
            <Image 
            // source={require('../Assets/Images/carwashing.png')} 
            source={{uri:data.image}} 
            style={{ width: '100%', marginVertical: 20 ,height:200,resizeMode:'contain'}} />
            <Text style={{ ...p, fontWeight: 'bold' }}>Purus habitant lectus maecenas</Text>
            <View style={{ ...dfr, marginVertical: 10 }}>
               <Icon name="clockcircle" size={19} color="#000" />
               <Text style={{ ...p, marginHorizontal: 10 }}>{data?.min_time_range}-{data?.max_time_range} hours</Text>
            </View>
            <View style={{ ...dfr, marginVertical: 10 }}>
               <Icon name="user" size={19} color="#000" />
               <Text style={{ ...p, marginHorizontal: 10 }}>{data?.min_strength}-{data?.max_strength} Strength</Text>
            </View>
            <Text style={{ ...p, textAlign: "justify" }}>{data?.description}</Text>
            {/* Offers */}
            <View style={{ marginVertical: 20, borderTopWidth: 1, borderColor: '#c8c8c8', paddingVertical: 10 }}>
               <Text style={{ ...p, letterSpacing: 1, fontSize: 16 }}>Special Offers</Text>
               <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {
                     ServiceOffer.map((item, i) => <ServiceOfferCard data={item} key={i} />)
                  }
               </ScrollView>
            </View>
            {/* Instructions */}
            <View style={{ borderTopWidth: 1, borderColor: '#c8c8c8', paddingVertical: 10 }}>
               <Text style={{ ...h3, fontWeight: 'bold' }}>Instructions</Text>
               <Text style={{ ...p, marginVertical: 10 }}>{Instructions}</Text>
            </View>
            <View style={{ borderTopWidth: 1, borderColor: '#c8c8c8', paddingVertical: 10 }}>
               <Text style={{ ...h3, fontWeight: 'bold' }}>Customers Review Near You</Text>
               <Carousel
                  width={Dimensions.get('window').width - 20}
                  height={250}
                  autoPlay
                  autoPlayInterval={2000}
                  pagingEnabled
                  showLength
                  loop
                  data={["1", "2", "3"]}
                  renderItem={({ item }) => <CustomerReviewsCard />}
               />

            </View>
            <CustomButton
               title={`\u20B9 ${data?.service_price} \t\t\t\t\t\t\t\t\t\t\Add To Cart`}
               onPress={addToCart}
            />
         </View>
      </ScrollView>
   )
}

export default ServiceDetails

const styles = StyleSheet.create({
   main: {
      flex: 1,
      backgroundColor: '#fff'
   }
})