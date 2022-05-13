import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState, useRef } from 'react';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { Colors } from '../../Helper/Colors';
import CountDown from 'react-native-countdown-component';
import CodeInput from 'react-native-confirmation-code-input';
import { useNavigation } from '@react-navigation/native';
import postRequest from '../../utils/postRequest';
import axios from '../../utils/axios'
import EncryptedStorage from 'react-native-encrypted-storage';
import { useDispatch } from 'react-redux';
import { userlogin} from '../../Redux/actions/user';
const OTP = ({ confirm, screen, user, change }) => {
  const navigation = useNavigation()
  const inputRef = useRef('')
  const data = confirm
  const [loading,setLoading] =useState(false)
  const dispatch = useDispatch()
  const [code, setCode] = useState('')
  const storeUser = async (flag) => {
    await EncryptedStorage.setItem('@user', JSON.stringify({ user: flag })).then(() => {
      navigation.reset({
        index: 0, routes: [{ name: 'Home' }]
      })
    })
  }
  const splitName = (() => {
    if (user) return user.name && user?.name.split(/(?<=^\S+)\s/)[0]
  })()
  const login = async (flag) => {
    try {
      const credential = await auth.PhoneAuthProvider.credential(data.verificationId, flag)
      if (credential) {
        await auth().signInWithCredential(credential)
          .then((userCredential) => {
            console.log(userCredential,'<<<')
            let body = {
              username: "Test",
              password: userCredential.user.uid
            }
            axios.post('/auth/login', body)
              .then(res => {
                console.log(res.data, "api res")
                if (res.data.Success) {
                  storeUser({...res.data.user,token:res.data.token})
                  dispatch(userlogin({...res.data.user,token:res.data.token}))
                }
              })
          })
          .catch(err => console.error('Ignored sign out error: ', err)
          )
      } else {
        alert('Wrong Code Entered')
      }
    } catch (e) {
      alert(e.message | 'Enter Valid Code')
    }
  }

  const verify = async (flag) => {
    try {
      const res = await auth.PhoneAuthProvider.credential(data.verificationId, flag)
      if (res) {
        auth().signInWithCredential(res)
          .then(response => {
            let body = {
              username: splitName,
              email: user?.email,
              ph_number: user?.phoneNumber,
              name: user?.name,
              password: response.user.uid
            }
            axios.post('/auth/register', body)
              .then(res => {
                console.log(res.data, "api res")
                if (res.data.success) {
                  storeUser({...res.data.user,token:res.data.token})
                  dispatch(userlogin({...res.data.user,token:res.data.token}))
                }
              })
          })
      }
      else {
        alert("Please Enter the valid code")
      }
    }
    catch (e) {
      alert('Please Enter the valid code')
    }
  }
  return (
    <View style={styles.cont}>
      <Text style={{ ...styles.text, color: Colors.primary, fontSize: 20, textTransform: 'uppercase', letterSpacing: 3 }}>verify now</Text>
      <Text style={{ ...styles.text, textTransform: 'capitalize', fontSize: 14 }}>Please enter the OTP that we have sent to your phone number ending with  ******<Text style={{ ...styles.text, fontWeight: '900' }}>{user?.phoneNumber.slice(6, 10)}</Text></Text>
      <Image source={require('../../Assets/Images/otp.png')} style={{ resizeMode: 'contain', width: 200, height: 200, alignSelf: 'center', marginVertical: 20 }} />
      {/* <View style={{ margin: 20 }}>
        <CustomInput
          label="Enter Your 6-Digit OTP"
          autoFocus
          onChangeText={(e) => setCode(e)}
        />
      </View> */}
      <View style={{ marginVertical: 30, padding: 10 }}>
        <CodeInput
          ref={inputRef}
          keyboardType="numeric"
          codeLength={6}
          className='border-box'
          activeColor={Colors.primary}
          cellBorderWidth={1}
          inactiveColor='rgba(0, 0, 0, 0.3)'
          space={6}
          autoFocus={true}
          codeInputStyle={{ fontWeight: '800' }}
          onFulfill={(e) => {
            screen === 'login' ?
              login(e)
              :
              verify(e)
          }}
        />
      </View>
      <View style={{ marginTop: '20%', flexDirection: 'row', alignItems: 'flex-end' }}>
        <Text style={{ ...styles.text, fontSize: 17 }}>Resend </Text>
        <CountDown
          until={3000}
          size={20}
          onFinish={() => {
            alert('Session Expired Retry!!!')
            change(null)
          }}
          digitStyle={{ backgroundColor: 'transparent' }}
          digitTxtStyle={{ color: Colors.primary }}
          timeToShow={['S']}
          timeLabels={{ 'S': '' }}
        />
        <Text style={{ ...styles.text, fontSize: 17 }}>seconds</Text>
      </View>
      {/* <View style={{ marginHorizontal: 50, marginVertical: 20,position:'absolute',bottom:30 }}>
        <CustomButton title="Verify" />
      </View> */}
    </View>
  );
};

export default OTP;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    marginVertical: 20,
    paddingHorizontal: 20,
  }, text: {
    marginVertical: 10
  }
});
