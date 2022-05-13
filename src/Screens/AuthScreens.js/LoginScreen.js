import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Colors } from '../../Helper/Colors';
import AuthInputs from '../../Components/AuthInputs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-paper';
import OTP from './OTP'
import { dfr, dfrcc, dfrccc, h2, p } from '../../Helper/styles'

const dataClass={phoneNumber:''}
const LoginScreen = () => {
    const navigation = useNavigation();
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(null)
    const [data, setData] = useState(dataClass)
    const [confirm, setConfirm] = useState(null)
    const [loading, setLoading] = useState(false)
    const login = () => {
        setLoading(true)
        auth().signInWithPhoneNumber('+91' + data.phoneNumber).then((res) => {
            setConfirm(res)
            setUser(data)
        }).catch(e => {
            alert(e)
            setLoading(false)
        })
    }
    const change = (flag) => {
        setConfirm(flag)
        setLoading(false)
    }
    return (
        <ImageBackground source={require('../../Assets/Images/bombaybg.png')} style={styles.cont}>
            {confirm === null ?
                <ScrollView>
                    <KeyboardAvoidingView style={{ margin: 20 }}>
                        <Text style={{ ...h2, letterSpacing: 3, textTransform: 'uppercase', color: Colors.primary, fontSize: 20 }}>login now</Text>
                        <Text style={{ ...p }}>We will send an OTP to your phone number</Text>
                        <Image source={require('../../Assets/Images/login.png')} style={{ resizeMode: 'contain', width: 250, height: 250, alignSelf: 'center', marginVertical: 20 }} />

                        {/* Number */}
                        <AuthInputs
                            label="Phone Number"
                            keyboardType="number-pad"
                            value={data?.phoneNumber}
                            onChangeText={(e) => setData({...data,phoneNumber: e})}
                            left={
                                <TextInput.Icon name={() => <Icon name={'phone'} size={16} color="#000" />} />
                            }
                        />
                        <View style={{ alignItems: 'flex-end' }}>
                            <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => navigation.navigate('Forget')}>
                                <Text style={{ color: Colors.primary }}>Forget Password</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', marginVertical: 20 }}>
                            {loading ? <ActivityIndicator size="large" color={Colors.primary} /> :
                                <CustomButton title="SEND OTP" onPress={login} />
                            }
                        </View>
                    </KeyboardAvoidingView>
                    <View style={{ ...dfrcc, marginBottom: 30 }}>
                        <Text style={{ color: '#c8c8c8', textTransform: 'uppercase', letterSpacing: -1 }}>-------------------------------------</Text>
                        <Text style={{ ...p, textTransform: 'uppercase', letterSpacing: 2 }}> or new here? </Text>
                        <Text style={{ color: '#c8c8c8', textTransform: 'uppercase', letterSpacing: -1 }}>-------------------------------------</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.btn}>
                        <Text style={{ color: Colors.primary, fontWeight: '900', textTransform: 'uppercase' }}>Register</Text>
                    </TouchableOpacity>
                </ScrollView>
                : <OTP screen="login" user={user} confirm={confirm} change={change} />
            }
        </ImageBackground>
    );
};

export default LoginScreen;

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
        width: '90%', borderRadius: 15, padding: 15
    }
});
