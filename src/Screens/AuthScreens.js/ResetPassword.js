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
import {showMessage} from "react-native-flash-message";

const ResetPassword = ({route}) => {
    const user=route.params.user
    const navigation = useNavigation()
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirm, setConfirm] = useState(null);
    console.log(user,"userdata")
    const reset = () => {
        if(confirmPassword===password){
            firestore().collection('users').doc(user.user_id)
            .set({
                password:password
            },{merge: true})
            .then((res)=>{
                alert('Password Succesfully Changed')
                navigation.replace('Login')
            }).catch((err)=>{console.log(err)})
        }
        else{z
            alert("Password must be same in both feilds")
        }
    }
    return (
        <View style={styles.cont}>
            <ScrollView>
                <KeyboardAvoidingView style={{ margin: 20 }}>
                    <Text style={{ ...styles.text, fontSize: 26, letterSpacing: 3, textTransform: 'uppercase' }}>Reset Password</Text>
                    <Text style={{ ...styles.text, fontWeight: '500' }}>don't worry! Reset your password.....</Text>
                    <Image source={require('../../Assets/Images/loginPage.png')} style={{ resizeMode: 'contain', width: 300, height: 300, alignSelf: 'center', marginVertical: 20 }} />
                    {/* emial */}
                    <AuthInputs
                            label="Password"
                            secureTextEntry={!show}
                            value={password}
                            onChangeText={(e) => setPassword(e)}
                            left={
                                <TextInput.Icon name={() => <Icon name={'lock'} size={16} color="#000" />} style={{ marginTop: 20 }} />
                            }
                            right={
                                <TextInput.Icon name={() => <Icon name={show ? 'eye-slash' : 'eye'} size={23} style={{ marginTop: 7 }} />} onPress={() => setShow(!show)} />
                            }
                        />
                    <AuthInputs
                            label="Confirm Password"
                            secureTextEntry={!show}
                            value={confirmPassword}
                            onChangeText={(e) => setConfirmPassword(e)}
                            left={
                                <TextInput.Icon name={() => <Icon name={'lock'} size={16} color="#000" />} style={{ marginTop: 20 }} />
                            }
                            right={
                                <TextInput.Icon name={() => <Icon name={show ? 'eye-slash' : 'eye'} size={23} style={{ marginTop: 7 }} />} onPress={() => setShow(!show)} />
                            }
                        />
                    
                    <View style={{ alignItems: 'center', marginVertical: 20 }}>
                        <CustomButton title="Reset Password" onPress={reset} />
                    </View>
                    
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};

export default ResetPassword;

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        backgroundColor:'#fff'
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
