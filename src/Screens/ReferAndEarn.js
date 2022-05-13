import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { h1, h2, h3 } from '../Helper/styles'
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../Helper/Colors'
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../Components/CustomButton'
import { selectUser } from '../Redux/Reducers/userReducer'
import { useSelector } from 'react-redux'
import Clipboard from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';

const ReferAndEarn = () => {
  const navigation = useNavigation()
  const [promo, setPromo] = useState('')
  const user=useSelector(selectUser)
  const copyToClipboard = (flag) => {
    Clipboard.setString(flag)
    ToastAndroid.showWithGravityAndOffset('Copied To Clipboard',ToastAndroid.SHORT,ToastAndroid.BOTTOM,50,25)
  };
  const shareCode = async () => {
    const options = {
      // url: data.image_url,
      message: `Use My Reffer Code ${user?.referal_code} and get exciting discounts and prizes`
    }
    try {
      Share.open(options)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
    } catch (e) {
      console.log(e.message)
    }
  }
  return (
    <View style={styles.main}>
      <View style={{ marginHorizontal: 15, marginVertical: 20 }}>
        <Text style={{ ...h2, fontWeight: '900' }}>Refer And Earn</Text>
        <Image source={require('../Assets/Images/refer.png')} style={{ alignSelf: 'center', marginVertical: 10, resizeMode: 'contain' }} />
        <View style={styles.promoCard}>
          <TextInput
            value={promo}
            onChangeText={(e) => setPromo(e)}
            placeholder="ENTER PROMO CODE"
            underlineColor='transparent'
            underlineColorAndroid={'transparent'}
            style={{ backgroundColor: '#fff', flex: 0.8, margin: 1, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, paddingLeft: 20 }}
          />
          <TouchableOpacity style={{ borderTopRightRadius: 8, borderBottomRightRadius: 8, alignItems: 'center', justifyContent: 'center', flex: 0.3 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', }}>APPLY</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ ...h3, fontWeight: '800', alignSelf: 'center' }}>Total points earned</Text>
        <Text style={{ ...h1, fontWeight: '900', alignSelf: 'center', color: Colors.primary }}>{user.earned_points}</Text>

        {/* ReferCode */}
        <View style={{ borderWidth: 2, borderColor: Colors.primary, backgroundColor: '#fff', elevation: 5, padding: 10, marginVertical: 20, width: '90%', borderRadius: 10, borderStyle: 'dashed', alignSelf: 'center' }}>
          <Text style={{ fontSize: 10, textTransform: 'capitalize' }}>your referal code</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ ...h1, fontSize: 30, color: Colors.primary, textTransform: 'uppercase', fontWeight: 'bold' }}>{user?.referal_code}</Text>
            <Icon name="copy-outline" color="grey" size={40} onPress={()=>copyToClipboard(user?.referal_code)}/>
          </View>
        </View>
        <CustomButton
          title="Share Referal Code"
          style={{marginVertical:30}}
          onPress={shareCode}
        />
      </View>
    </View>
  )
}

export default ReferAndEarn

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff'
  }, promoCard: {
    // flex: 1,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginVertical: 30,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: 10
  },
})