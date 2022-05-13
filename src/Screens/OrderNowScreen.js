import { ImageBackground, StyleSheet, Text, View, Alert, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { Colors } from '../Helper/Colors';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../Components/CustomButton';
import BottomTab from '../Components/BottomTab';
import RazorpayCheckout from 'react-native-razorpay';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';
import { StackActions } from '@react-navigation/native'
import { useEffect } from 'react';
import { Header } from '../Helper/Header';
import { dfr, h2, p } from '../Helper/styles';
import { selectCartItems } from '../Redux/Reducers/cartReducer';
import { selectUser } from '../Redux/Reducers/userReducer';
import axios from '../utils/axios'
import moment from 'moment'
import { formatTime } from '../Helper/moment';
const OrderNowScreen = ({ route }) => {
  const item = useSelector(selectCartItems)
  const navigation = useNavigation()
  const user = useSelector(selectUser)
  const [loading,setLoading]=useState(false)
  const [services,setServices]=useState([])
  const orderID = Math.floor(1000 + Math.random() * 999999).toString();
  const addressId=route.params.addressId
  const userID = auth().currentUser.uid
  const method = route.params.method
  console.log(method)

  useEffect(() => {
    let temp=[]
    let data={}
    item.cartData.map(item=>{
      data['sid']=item.sid
      data['start_time']=moment(item.start_time,['hh:mm a']).format('hh:mm:ss')
      data['end_time']=moment(item.end_time,['hh:mm a']).format('hh:mm:ss')
      data['service_date']=item?.service_date
      data['instruction']=item?.instruction ?item.instruction :''
      temp.push(data)
    })
    setServices(temp)
  }, [item])
  console.log(services,"serv")
  const createOrder=(orderId,paymentId)=>{
    let body={
      address:addressId,
      payment_method:method.toString().toLowerCase(),
      rz_payment_id:paymentId,
      rz_order_id:orderId,
      discount:item?.discount,
      redeemed_points:0,
      services:services
    }
    console.log(body,"body")
    axios.post('/rest/order',body,{
      headers:{
        Authorization:`Token ${user?.token}`
      }
    })
    .then(res=>{
      console.log(res.data,'order')
      if(res.data.success){
        navigation.reset({
          index:0,routes:[{name:'Home'}]
        })
        alert("Order Placed")
      }
    }).catch(e=>console.log(e,"order exceptio"))
  }
  const createOrderID=()=>{
    setLoading(true)
    axios.get(`/rest/order_id?amount=${item?.payable}`)
    .then(res=>{
      if(res.data.success){
        setLoading(false)
        RazerPay(res.data.order_id)
      }else{
        setLoading(false)
        alert('Server Error')
      }
    }).catch(e=>{
      setLoading(false)
      console.log(e,'order create rzr exception')
    })
  }
  const RazerPay = (id) => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_DNUEkkoKK6IdYK', // Your api key
      amount: parseInt(item?.payable).toFixed(2) * 100,
      name: 'Vrittih',
      order_id:id,
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
      createOrder(id,data?.razorpay_payment_id)
      console.log(data.razorpay_payment_id)
    }).catch((error) => {
      // handle failure
      console.log(error,'rzr error')
      ToastAndroid.showWithGravityAndOffset('Payment Failed',ToastAndroid.SHORT,ToastAndroid.BOTTOM,50,25)
    });
  }
  return (
    <ImageBackground source={require('../Assets/Images/bombaybg.png')} style={styles.cont}>
      <Text style={{ ...h2, marginHorizontal: 20, marginVertical: 10, fontWeight: '900' }}>Order Now</Text>
      <View style={{ ...styles.innerCont, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
        <Text style={{ ...styles.text, fontWeight: 'bold' }}>items</Text>
        <Text style={{ ...styles.text }}>{item.items}</Text>
      </View>
      <View style={{ ...styles.innerCont, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ ...styles.text }}>You pay:</Text>
        <Text style={{ ...styles.text }}>{'\u20B9 '}{parseInt(item?.payable).toFixed(2)}</Text>
      </View>
      <View style={{ ...styles.innerCont, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.7, borderColor: Colors.primary, paddingBottom: 20 }}>
        <Text style={{ ...styles.text }}>You Save:</Text>
        <Text style={{ ...styles.text }}>{'\u20B9 '}{parseInt(item?.saved).toFixed(2)}</Text>
      </View>

      {/* Bought by */}
      <View style={{ ...styles.innerCont, marginVertical: 10 }}>
        <Text style={{ ...h2, fontWeight: '900' }}>Bought by:</Text>
        <Text style={{ ...styles.text, fontSize: 14, fontWeight: '400', marginTop: 10 }}>{user?.name}</Text>
      </View>
      {/* Delivery */}
      <View style={{ ...styles.innerCont, marginVertical: 10 }}>
        <Text style={{ ...h2, fontWeight: '900' }}>Pickup Location :</Text>
        <Text style={{ ...styles.text, fontSize: 14, fontWeight: '400', marginTop: 10 }}>{route.params.address}</Text>
      </View>

      {/* Expected delivery */}
      <View style={{ ...styles.innerCont, marginVertical: 10 }}>
        <Text style={{ ...h2, fontWeight: '900' }}>Service Booked For:</Text>
        {
          item.cartData.length > 0 && item.cartData.map(item =>
            <View key={item.sid} style={{...dfr,marginVertical: 5}}>
              <Text style={{ ...p,width:150}}>{item?.name}</Text>
              <Text style={{ ...p,}}>{item?.service_date}{`\n`}{item?.start_time}-{item?.end_time}</Text>
            </View>)
        }

      </View>

      {/*PAyment with */}
      <View style={{ ...styles.innerCont, marginVertical: 10 }}>
        <Text style={{ ...h2, fontWeight: '900' }}>Paying with:</Text>
        <Text style={{ ...styles.text, fontSize: 14, fontWeight: '400', marginTop: 10 }}>{method === 'Online' ? "Online Payment" : 'Cash On Delivery'}</Text>
      </View>
      <View style={{ width: '100%', position: 'absolute', bottom: 30, paddingHorizontal: 40 }}>
        {loading?<ActivityIndicator size="large" color="green"/>:<CustomButton title="Pay Now" onPress={method==="Cod"?()=>createOrder(null,null):createOrderID} />}
      </View>
      {/* <BottomTab /> */}
    </ImageBackground>
  );
};

export default OrderNowScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerCont: {
    width: '90%',
    marginVertical: 5,
    alignSelf: 'center'
  },
  text: {
    fontWeight: 'bold', color: 'black', textTransform: 'capitalize'
  }
});
