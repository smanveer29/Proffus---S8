import { ActivityIndicator, Image, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { Colors } from '../../Helper/Colors';
import AuthInputs from '../../Components/AuthInputs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-paper';
import OTP from './OTP';
import { dfrcc, dfrccc, h2, p } from '../../Helper/styles';
const dataClass = { phoneNumber: '', name: '',email:'' }
const RegisterScreen = () => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(dataClass)
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [user, setUser] = useState(null);

  const change = (flag) => {
    setConfirm(flag)
    setLoading(false)
  }
  const register = async () => {
    setLoading(true)
    try{
      await auth().verifyPhoneNumber('+91' + data.phoneNumber,true)
      .then((res) => {
        console.log(res, "response");
        setUser(data)
        setConfirm(res)
        // navigation.navigate('OTP', { confirm: {res}, screen: 'register', user: user })
        setLoading(false)
      })
      .catch(e => {
        alert(e)
        setLoading(false)
      })
    }
    catch(e)
    {
      console.log(e,'catche exception register')
    }
  }
  return (
    <ImageBackground source={require('../../Assets/Images/bombaybg.png')} style={styles.cont}>
      {confirm === null ?
        <ScrollView>
          <KeyboardAvoidingView style={{ margin: 20 }}>
            <Text style={{ ...h2, letterSpacing: 3, textTransform: 'uppercase', color: Colors.primary, fontSize: 20 }}>Register now</Text>
            <Text style={{ ...p }}>We will send an OTP to your phone number</Text>
            <Image source={require('../../Assets/Images/register.png')} style={{ resizeMode: 'contain', width: 200, height: 200, alignSelf: 'center', marginVertical: 20 }} />
            {/* name */}
            <AuthInputs
              label="Full Name"
              onChangeText={(e) => setData({ ...data, name: e })}
              value={data?.name}
              left={
                <TextInput.Icon name={() => <Icon name={'user'} size={16} color="#000" />} />
              }
            />
            {/* name */}
            <AuthInputs
              label="Email"
              onChangeText={(e) => setData({ ...data, email: e })}
              value={data?.email}
              left={
                <TextInput.Icon name={() => <Ionicons name='mail' size={16} color="#000" />} />
              }
            />
            {/* phonenumber */}
            <AuthInputs
              label="Phone Number"
              keyboardType="number-pad"
              onChangeText={(e) => setData({ ...data, phoneNumber: e })}
              value={data?.phoneNumber}
              maxLength={10}
              left={
                <TextInput.Icon name={() => <Icon name={'phone'} size={16} color="#000" />} />
              }
            />

            <View style={{ alignItems: 'center', marginVertical: 15 }}>
              {
                loading ?
                  <ActivityIndicator size="large" color={Colors.primary} />
                  :
                  <CustomButton title="SEND OTP" onPress={register} />
              }
            </View>
          </KeyboardAvoidingView>
          <View style={{ ...dfrcc}}>
            <Text style={{ color: '#c8c8c8', textTransform: 'uppercase', letterSpacing: -1 }}>--------------------</Text>
            <Text style={{ ...p, textTransform: 'uppercase', letterSpacing: 2 }}> OR ALREADY A MEMBER? </Text>
            <Text style={{ color: '#c8c8c8', textTransform: 'uppercase', letterSpacing: -1 }}>--------------------</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.btn}>
            <Text style={{ color: Colors.primary, fontWeight: '900', textTransform: 'uppercase' }}>Login</Text>
          </TouchableOpacity>
        </ScrollView>
        : <OTP screen='register' confirm={confirm} user={user} change={change} />
      }
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 16, fontWeight: '900',
    color: Colors.primary,
    textTransform: 'capitalize',
    marginVertical: 5
  },
  input: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#440CB3',
    borderRadius: 15,
    padding: 5, height: 60,
    alignItems: 'center'
  }, btn: {
    ...dfrccc,
    alignSelf: 'center',
    borderColor: Colors.primary, borderWidth: 1,
    width: '90%', borderRadius: 15, padding: 15, marginBottom: '30%',
    marginTop:30 
  }
});
