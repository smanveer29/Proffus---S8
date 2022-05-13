import { ImageBackground, ScrollView, StyleSheet, Text, ToastAndroid, TouchableHighlight, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomInput from '../Components/CustomInput';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors } from '../Helper/Colors';
import { RadioButton, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { CheckBox } from 'react-native-elements';
import BottomTab from '../Components/BottomTab';
import CustomButton from '../Components/CustomButton';
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { Header } from '../Helper/Header';
import { h2, h3, p } from '../Helper/styles';
import { selectUser } from '../Redux/Reducers/userReducer';
import { selectCartItems } from '../Redux/Reducers/cartReducer';
import moment from 'moment';
import TimeSlots from '../Components/Checkout/TimeSlots';
import SelectAddress from '../Components/Checkout/SelectAddress';

const CheckoutScreen = ({route}) => {
    console.log(route.params,"parma")
    const item = useSelector(selectCartItems)
    const navigation = useNavigation()
    console.log(item, 'item')
    const [address, setAddress] = useState('');
    const [selectedAddId,setSelectedAddId] = useState(null)
    const [checked, setChecked] = useState('');
    const [tslots, setTslots] = useState([]);
    const user = useSelector(selectUser)

    return (
        <ImageBackground source={require('../Assets/Images/bombaybg.png')} style={styles.cont}>
            <ScrollView vertical showsVerticalScrollIndicator={false}>

                <View style={{ margin: 20 }}>
                    <Text style={{ ...h3, fontWeight: 'bold', marginVertical: 5 }}>Checkout</Text>
                    <Text style={{ ...h2, fontWeight: 'bold', marginVertical: 10, textTransform: 'capitalize' }}>Location for pickup</Text>
                    <CustomInput
                        multiline
                        dense
                        value={address}
                        onChangeText={(e) => setAddress(e)}
                        textStyle={{ ...p, fontWeight: 'bold' }}
                        placeholder="Add Delivery Address"
                        underlineColor={Colors.primary}
                        right={<TextInput.Icon name="pencil-box-multiple-outline" color={Colors.primary} size={20} />}
                    />
                    <Text style={{ ...p, color: '#c8c8c8', fontSize: 12 }}>Update your exact Map Location for Hassel Free Pickup!</Text>
                </View>
                {/* Select Address */}
                <SelectAddress choose={e=>setAddress(e)} addressId={e=>setSelectedAddId(e)}/>
                {/* Time Sots */}
                <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
                    <Text style={{ ...h2, fontWeight: 'bold' }}>Select your preferred Date & Time</Text>
                    {item.cartData.map(item => <View key={item.sid} style={{ marginTop: 30 }}>
                        <Text style={{ ...h3 }}>Select Time Slot for {item?.name}</Text>
                        <TimeSlots select={e => {
                            item['start_time'] = e.start
                            item['end_time'] = e.end
                            item['service_date'] = e.date
                        }} />
                    </View>)}
                </View>

                <View style={{ margin: 20 }}>
                    <Text style={{ ...styles.text, fontWeight: 'bold', marginVertical: 10 }}>select payment method</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton
                            value="Online"
                            status={checked === 'Online' ? 'checked' : 'unchecked'}
                            color={Colors.primary}
                            onPress={() => setChecked('Online')}
                        />
                        <Text style={{ ...styles.text }}>Online Payment</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton
                            value="COD"
                            color={Colors.primary}
                            status={checked === 'COD' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('COD')}
                        />
                        <Text style={{ ...styles.text }}>Cash On Delivery</Text>
                    </View>

                </View>
                <View style={{ margin: 20, borderTopWidth: 0.5, borderColor: Colors.primary }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={{ ...styles.text, fontSize: 14, fontWeight: '400' }}>you pay</Text>
                        <Text style={{ ...styles.text, fontSize: 14, fontWeight: '900' }}>{'\u20B9 '}{item?.payable}</Text>
                    </View>

                </View>
                <View style={{ marginBottom: 40, marginHorizontal: 30 }}>
                    <CustomButton
                        title="Continue"
                        onPress={() => {
                            address ? checked === 'Online' ? navigation.navigate('OrderNow', { address: address, method: 'Online',addressId:selectedAddId })
                                : navigation.navigate('OrderNow', { address: address, method: 'Cod',addressId:selectedAddId })
                                :ToastAndroid.showWithGravityAndOffset('Choose Address',ToastAndroid.SHORT,ToastAndroid.BOTTOM,50,25)
                        }}
                    />
                </View>
                {/* <BottomTab /> */}

            </ScrollView>
        </ImageBackground>
    );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 18,
        textTransform: 'capitalize',
        color: 'black'
    }
});
