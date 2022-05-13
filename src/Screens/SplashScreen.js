import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../Helper/Colors';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useDispatch } from 'react-redux';
import { userlogin } from '../Redux/actions/user';

const SplashScreen = () => {
  const dispatch=useDispatch()
  const navigation = useNavigation()
  const checkUser = async () => {
    try {
      let session = await EncryptedStorage.getItem("@user");

      if (session) {
        // Congrats! You've just retrieved your first value!
        session=JSON.parse(session)
        dispatch(userlogin(session.user))
        navigation.replace('Home')
      }
      else navigation.replace('Login')
    } catch (error) {
      // There was an error on the native side
      console.log(error)
    }
  }
  setTimeout(() => {
    checkUser()
  }, 3000);
  // Unsubscribe from further state changes
  return (
    <ImageBackground source={require('../Assets/Images/bombaybg.png')} style={styles.cont}>
      <Image source={require('../Assets/Images/splash.png')} style={{ width: 200, height: 200, resizeMode: 'contain' }} />
      <LottieView source={require('../Assets/Animations/loader.json')} autoPlay loop style={{ width: '80%', height: 70 }} />
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 34,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: -2,
    fontFamily: 'Helvetica',
    color: Colors.textColor
  }
});
