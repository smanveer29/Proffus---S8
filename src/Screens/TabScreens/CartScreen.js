import { Button, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconE from 'react-native-vector-icons/Entypo';
import { Colors } from '../../Helper/Colors';
import { Header } from '../../Helper/Header';
import Coupons from '../../Components/Coupons';
import CustomInput from '../../Components/CustomInput';
import { dfrcsb, h2, p } from '../../Helper/styles';
import axios from '../../utils/axios'
import { selectUser } from '../../Redux/Reducers/userReducer';
import Loading from '../../Helper/Loading';
import { addCart } from '../../Redux/actions/cart';
const CartScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [showPannel, setShowPannel] = useState(false)
  const [loading, setLoading] = useState(true)
  const [promo, setPromo] = useState('')
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [pay, setPay] = useState(0)
  const [saved, setSaved] = useState(0)
  const [discount, setDiscount] = useState(100)
  const user = useSelector(selectUser)
  useEffect(() => {
    getCartItems()
  }, [user])

  const getCartItems = () => {
    setData([])
    setLoading(true)
    axios.get('/rest/cart', {
      headers: {
        Authorization: `Token ${user?.token}`
      }
    }).then(res => {
      console.log(res.data,'cart')
      if (res.data.success) {
        setLoading(false)
        setData(res.data.cart_products)
      }
    }).catch(e => {
      console.log(e)
      setLoading(false)
    })

  }
  useEffect(() => {
    let temp = 0
    let amountSaved = 0
    data.map(item => {
      temp = temp + item?.service_price
      amountSaved = amountSaved + (item?.actual_price - item?.service_price)
    })
    setTotal(temp)
    setPay(temp - discount)
    setSaved(amountSaved)
  }, [data])

  const deleteItem = (id) => {
    axios.delete(`/rest/cart?sid=${id}`, {
      headers: {
        Authorization: `Token ${user?.token}`
      }
    })
      .then(res => {
        if (res.data.success) {
          getCartItems()
          ToastAndroid.showWithGravityAndOffset('Item Removed', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 50, 25)
        }
      })
  }
  const change = (flag) => {
    setPromo(flag)
    setShowPannel(false)
  }
  if (loading) return <Loading />
  return (
    <ImageBackground source={require('../../Assets/Images/bombaybg.png')} style={styles.cont}>
      {/* <Header title={'My Cart'} /> */}
      <ScrollView style={{ width: '100%' }} bounces vertical={true} showsVerticalScrollIndicator={false}>
        {data.length > 0
          ?
          <>
            {/* <ScrollView> */}
            <Text style={{ ...h2, marginHorizontal: 20, marginVertical: 10, fontWeight: '900' }}>My Cart</Text>
            {data.map((item) =>
              <View key={item?.sid} style={styles.card}>
                <TouchableOpacity onPress={() => deleteItem(item?.sid)} style={{ position: 'absolute', top: 5, right: 10, backgroundColor: 'red', borderRadius: 50, padding: 2, zIndex: 40 }}>
                  <IconE name="cross" color='white' size={16} />
                </TouchableOpacity>
                <View style={{ ...dfrcsb }}>
                  <Image source={{ uri: item.image }} style={styles.img} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ ...p, fontSize: 18, fontWeight: '700' }}>{item?.name}</Text>
                    <Text style={{ ...p, fontWeight: '800' }}>{`\u20B9`}{item?.service_price}</Text>
                    <Text style={{ ...p, fontWeight: '600', textDecorationLine: 'line-through' }}>{`\u20B9`}{item?.actual_price}</Text>
                    {/* Price with buttons View */}
                    {/* PRice with button view Ended */}
                  </View>
                </View>
                <View style={{ width: '90%', height: 1, backgroundColor: '#c8c8c8' }}></View>
                <CustomInput
                  placeholder="Add Instructions"
                  outlined={false}
                  value={item['instruction']}
                  onChangeText={e => item['instruction'] = e}
                  style={{ backgroundColor: '#EEEEEE', width: '90%', marginHorizontal: 10, marginVertical: 10, borderRadius: 10 }}
                  underLineColor={'transparent'}
                  multiline={true}
                />
              </View>
            )
            }
            {/* </ScrollView> */}
            {/* Promo COde and payable amount */}

            <View style={styles.payDetail}>
              <View style={styles.promoCard}>
                <TextInput
                  value={promo}
                  onChangeText={(e) => setPromo(e)}
                  placeholder="ENTER PROMO CODE"
                  style={{ backgroundColor: '#fff', flex: 0.8, margin: 1, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, paddingLeft: 20 }}
                />
                <TouchableOpacity style={{ borderTopRightRadius: 8, borderBottomRightRadius: 8, alignItems: 'center', justifyContent: 'center', flex: 0.3 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', }}>APPLY</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: -20, marginBottom: 20 }} onPress={() => setShowPannel(true)}>
                <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>View All Coupons</Text>
              </TouchableOpacity>

              {showPannel && <Coupons show={showPannel} change={change} />}
              {/* Info */}
              <View style={{ justifyContent: 'space-evenly', borderWidth: 1, borderStyle: 'dashed', padding: 10, borderRadius: 15 }}>
                <Text style={{ ...h2, fontWeight: '900' }}>Bill Summary</Text>
                <View style={styles.infoCard}>
                  <Text style={{ ...p, fontWeight: '900' }}>Items Total</Text>
                  <Text style={{ ...p, fontWeight: '800' }}>{'\u20B9 '}{total}</Text>
                </View>
                <View style={styles.infoCard}>
                  <Text style={{ ...p, color: Colors.primary }}>Discount</Text>
                  <Text style={{ ...p, fontWeight: '800', color: Colors.primary }}>{'\u20B9 '}{discount}</Text>
                </View>
                <View style={styles.infoCard}>
                  <Text style={{ ...p, fontWeight: '900' }}>You Pay</Text>
                  <Text style={{ ...p, fontWeight: '800' }}>{'\u20B9 '}{pay}</Text>
                </View>
              </View>
            </View>
            {/* Promo code and payable amount end */}

          </>
          :
          <View style={{ flex: 1, width: '100%' }}>
            <LottieView source={require('../../Assets/Animations/notFound.json')} autoPlay loop style={{ width: '100%' }} />
            <Text style={{ ...styles.text, alignSelf: 'center', fontSize: 23 }}>Cart Empty</Text>
          </View>
        }
        {
          data.length > 0 &&
          <View style={{ width: '80%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 30 }}>
            <CustomButton title={"Checkout" + `\t(${data.length} Items)`} onPress={() => {
              if (pay <= 0) return ToastAndroid.showWithGravityAndOffset('Please Select service more than 0', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 50, 25)
              else {
                dispatch(addCart({ items: data?.length, cartData: data, payable: pay, discount: discount, saved: saved + discount }))
                navigation.navigate('CheckOut')
              }
            }} />
          </View>
        }
      </ScrollView>

    </ImageBackground>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  card: {
    // flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  img: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
    margin: 10
  },
  text: {
    color: 'black', textTransform: 'capitalize', padding: 5
  },
  payDetail: {
    width: '100%', padding: 20
  }, infoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  promoCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginVertical: 30,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: 10
  },
  deliveryOptions: {
    width: '40%',
    elevation: 5,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  }
});
