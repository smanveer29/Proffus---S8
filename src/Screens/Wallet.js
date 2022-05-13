import { Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { dfccc, dfr, dfrccc, h1, h2 } from '../Helper/styles'
import { Colors } from '../Helper/Colors'
import { TextInput } from 'react-native-paper'
import axios from '../utils/axios'
import { selectUser } from '../Redux/Reducers/userReducer'
import { useSelector } from 'react-redux'
import BottomTab from '../Components/BottomTab'
import RazorpayCheckout from 'react-native-razorpay'
const dataClass = {
  amount: ''
}
const amounts = [
  50, 100, 200, 500
]
const Wallet = () => {
  const [data, setData] = useState(dataClass)
  const [active, setActive] = useState(null)
  const user=useSelector(selectUser)

  const RazerPay = (id) => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_DNUEkkoKK6IdYK', // Your api key
      amount: parseInt(data?.amount),
      order_id:"order_DaZlswtdcn9UNV",
      name: 'Vrittih',
      prefill: {
        email: user?.email,
        contact: user?.ph_number,
        name: user?.name
      },
      theme: { color: Colors.primary }
    }
    return RazorpayCheckout.open(options).then((data) => {
      // handle success
      console.log(data,"rzr")
    }).catch((error) => {
      // handle failure
      console.log(error,'rzr error')
      ToastAndroid.showWithGravityAndOffset('Payment Failed',ToastAndroid.SHORT,ToastAndroid.BOTTOM,50,25)
    });
  }

  const addAmountToWallet = () => {
    axios.post('/auth/wallet', {
      razorpay_order_id: null,
      razorpay_payment_id: null,
      razorpay_signature: null,
      amount: data?.amount
    })
      .then(res => {
        console.log(res.data)
      })
  }
  console.log(user)
  return (
    <View style={styles.main}>
      <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <Text style={{ ...h1,fontWeight:'900' }}>Wallet</Text>
        <Image source={require('../Assets/Images/wallet.png')} style={{ marginVertical: 10, alignSelf: 'center' }} />

        {/* Amoutns */}
        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ ...dfr }}>
          {amounts.map((item, i) => <TouchableOpacity key={i} style={{ ...styles.card, backgroundColor: active && active === item ? Colors.primary : '#fff' }}
            onPress={() => {
              setActive(item)
              data['amount'] = item.toString()
            }}>
            <Text style={{ ...h2, color: active && active === item ? '#000' : Colors.primary }}>+ {`\u20B9`} {item}</Text>
          </TouchableOpacity>)}
        </ScrollView>
        <View style={styles.promoCard}>
          <TextInput
            value={data?.amount}
            onFocus={() => {
              data['amount'] = ''
              setActive(null)
            }}
            onChangeText={(e) => setData({ ...data, amount: e })}
            placeholder="Enter Amout to add"
            underlineColor='tranparent'
            theme={{ colors: { primary: 'transparent', text: '#000' } }}
            style={{ backgroundColor: '#fff', flex: 0.8, margin: 1, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, paddingLeft: 20 }}
          />
          <TouchableOpacity style={{ borderTopRightRadius: 8, borderBottomRightRadius: 8, alignItems: 'center', justifyContent: 'center', flex: 0.3 }} onPress={RazerPay}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', }}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={{ ...dfccc,paddingVertical:10,borderBottomWidth:1,borderColor:'#c8c8c8' }}>
          <Text style={{...h2,fontWeight: '800'}}>Balance Available</Text>
          <Text style={{...h1,fontWeight: '900',color:Colors.primary,marginVertical: 10}}>{`\u20B9 `}{user?.wallet_balance}</Text>
        </View>
      </View>
      <BottomTab/>
    </View>
  )
}

export default Wallet

const styles = StyleSheet.create({
  main: {
    flex: 1, backgroundColor: '#fff'
  }, promoCard: {
    // flex: 1,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginVertical: 30,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: 10
  },
  card: {
    ...dfrccc,
    borderWidth: 1, borderColor: Colors.primary,
    width: 110, padding: 10, borderRadius: 5, marginRight: 10
  }
})