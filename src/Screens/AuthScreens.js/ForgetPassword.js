import { Alert, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import { showMessage } from "react-native-flash-message";
import OTP from './OTP';

const ForgetPassword = () => {
    const navigation = useNavigation()
    const [phone, setPhone] = useState('');
    const [confirm, setConfirm] = useState(null);
    const forget = async () => {
        console.log('trigger');
        if (phone !== '') {
            // await auth().verifyPhoneNumber('+91' + phone).on('state_changed', (e) => {
            //     console.log(e)
            //     switch (e.state) {
            //         case 'sent': {
            //             setConfirm(e)
            //         }
            //         case 'timeout': {
            //         }
            //     }
            // }).then((res) => console.log(res))
            //     .catch((err) => console.log(err))
            firestore().collection('users')
            .where('phoneNumber', '==', phone)
            .get()
            .then((res)=>{
                const userData=res.docs.map(doc => doc.data())
                if(userData.length > 0){
                    navigation.replace('Reset',{user:userData[0]})
                }
                else alert("Phone Number not exists")
                // if(res){
                //     navigation.replace('Reset')
                // }
            }).catch((err)=>{console.log(err)})
        }
        else {
            alert('Please Enter valid phone number')
        }
    }
    const change = (flag) => {
        setConfirm(flag)
        // navigation.replace('Reset')
    }
    return (
        <View style={styles.cont}>
            {confirm === null
                ?
                <ScrollView>
                    <KeyboardAvoidingView style={{ margin: 20 }}>
                        <Text style={{ ...styles.text, fontSize: 26, letterSpacing: 3, textTransform: 'uppercase' }}>Forgot Password</Text>
                        <Text style={{ ...styles.text, fontWeight: '500' }}>don't worry! Reset your password.....</Text>
                        <Image source={require('../../Assets/Images/loginPage.png')} style={{ resizeMode: 'contain', width: 300, height: 300, alignSelf: 'center', marginVertical: 20 }} />
                        {/* emial */}
                        <AuthInputs
                            label="Phone Number"
                            value={phone}
                            onChangeText={(e) => setPhone(e)}
                            keyboardType="number-pad"
                            left={
                                <TextInput.Icon name={() => <Icon name={'phone'} size={16} color="#000" />} style={{ marginTop: 20 }} />
                            }
                        />

                        <View style={{ alignItems: 'center', marginVertical: 20 }}>
                            <CustomButton title="Reset Password" onPress={forget} />
                        </View>

                    </KeyboardAvoidingView>
                </ScrollView>
                : <OTP screen="forget" confirm={confirm} user={null} change={change} />
            }
        </View>
    );
};

export default ForgetPassword;

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
    }
});
