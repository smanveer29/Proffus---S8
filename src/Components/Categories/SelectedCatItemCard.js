import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { dfccsb, dfr, dfrcsb, h2, h3, p } from '../../Helper/styles'
import CustomButton from '../CustomButton'
import { useNavigation } from '@react-navigation/native'
import axios from '../../utils/axios'
import { useSelector } from 'react-redux'
import { selectAccessToken, selectUser } from '../../Redux/Reducers/userReducer'
const SelectedCatItemCard = ({ data }) => {
  const user = useSelector(selectUser)
  const navigation = useNavigation()

  const addToCart = () => {
    axios.post(`/rest/cart?sid=${data.sid}`, {}, {
      headers: {
        Authorization: `Token ${user?.token}`
      }
    }).then(res => {
      console.log(res.data, 'cart')
      if (res.data.success) {
        ToastAndroid.showWithGravityAndOffset('Added to Cart'
          , ToastAndroid.SHORT, ToastAndroid.BOTTOM, 50, 25)
      } else {
        ToastAndroid.showWithGravityAndOffset(`${res.data.error}`
          , ToastAndroid.SHORT, ToastAndroid.BOTTOM, 50, 25)
      }
    })
  }
  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ServiceDetails', { data: data })}>
      <View style={{flex:0.7}}>
        <Text style={{ ...p, fontWeight: 'bold' }}>{data?.name}</Text>
        <Text style={{ ...p, width: '60%', textAlign: 'justify', marginVertical: 4, fontSize: 11 }}>{data?.description.slice(0, 120)}</Text>
        <Text style={{ ...p, fontWeight: 'bold' }}>{`\u20B9`} {data?.service_price}</Text>
        <Text style={{ ...p, textDecorationLine: 'line-through' }}>{`\u20B9`} {data?.actual_price}</Text>
      </View>
      <View style={{...dfccsb,flex:0.3}}>
      <Image source={{uri:data?.image}} style={{width:'100%',height:75,backfaceVisibility:'hidden',resizeMode:'contain'}}/>
        <CustomButton
          title="Add To Cart"
          onPress={addToCart}
          style={{width:'100%',height:40}}
        />
      </View>
    </TouchableOpacity>
  )
}

export default SelectedCatItemCard

const styles = StyleSheet.create({
  card: {
    ...dfr,
    width: '90%', height: 160,
    padding: 10, backgroundColor: '#fff', alignSelf: 'center', marginVertical: 10, elevation: 5, borderRadius: 16
  }
})