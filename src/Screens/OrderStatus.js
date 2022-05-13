import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, ImageBackground, BackHandler } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import BottomTab from '../Components/BottomTab';
import { useNavigation } from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../Helper/Colors';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import { orderDetail } from '../Helper/FakeData';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Header } from '../Helper/Header';

const OrderStatus = ({ route }) => {
    const navigation = useNavigation()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isValid, setIsValid] = useState(false)
    const [orderID, setOrderId] = useState('')
    const [user, setUser] = useState(null)
    const [status, setStatus] = useState(0)
    // const steps = ['Received', 'Cooking', 'On The Way', 'Delivered']

    useEffect(() => {
        setUser(auth().currentUser)
        getData()
        BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.navigate('Home')
            return true
        })
    }, [navigation, user]);

    const getData = async () => {
        setOrderId(route.params.orderId)
        if (user) {
            await firestore()
            .collection('Orders')
                .doc(orderID)
                .onSnapshot(e => {
                    setData(e.data())
                    setLoading(false)
                })
        }
    }
    const showData = () => {
        return (
            <View style={{ flex: 1, margin: 20 }}>
                {loading ?
                    <ActivityIndicator size="large" color={Colors.primary} />
                    :
                    <View>
                        {data != null &&
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ ...styles.text, fontSize: 18, width: 100 }}>order id :</Text>
                                    <Text style={{ ...styles.text, paddingHorizontal: 5, fontWeight: 'bold', fontSize: 18 }}>{data.order_id}</Text>
                                </View>

                                {/* order info */}
                                <View style={{ marginVertical: 20 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ ...styles.text, width: 100 }}>items:</Text>
                                        <Text style={{ ...styles.text, paddingHorizontal: 10, fontWeight: 'bold' }}>{data.items.length}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ ...styles.text, width: 100 }}>paid:</Text>
                                        <Text style={{ ...styles.text, paddingHorizontal: 10, fontWeight: 'bold' }}>{'\u20B9 '}{parseInt(data.payment).toFixed(2)}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ ...styles.text, width: 100 }}>status:</Text>
                                        <Text style={{ ...styles.text, paddingHorizontal: 10, fontWeight: 'bold' }}>{data.status}</Text>
                                    </View>
                                </View>

                                {/* Delivery Addresss */}
                                <View>
                                    <Text style={{ ...styles.text, fontWeight: 'bold', marginTop: 20 }}>delivery address</Text>
                                    <Text style={{ ...styles.text, paddingVertical: 20 }}>{data.address}</Text>
                                </View>

                                {/* ITems */}
                                <View style={{ marginBottom: '20%' }}>
                                    <Text style={{ ...styles.text, marginTop: 20, fontWeight: '800' }}>items</Text>
                                    {data.items.map((item, index) =>
                                        <View style={{ borderBottomWidth: 1, borderColor: Colors.primary, paddingVertical: 14 }} key={index}>
                                            <Text style={{ ...styles.text, marginTop: 5 }}>{item.name}</Text>
                                            <Text style={{ ...styles.text, marginTop: 5, alignSelf: 'flex-end' }}>{item.quantity}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        }
                    </View>
                }
            </View>
        )
    }
    console.log(orderID)
    useEffect(() =>{
        checkStatus()
    },[navigation,data])
    const checkStatus=()=>{
        if(data!==null){
            if(data.status==='Received') setStatus(0)
            else if(data.status==='Cooking') setStatus(1)
            else if(data.status==='On The Way') setStatus(2)
            else {
                alert('Order Delivered Successfully')
                navigation.reset({  
                    index:0, routes:[{name:'Home'}]
                })
            }
        }
    }
    return (
        <ImageBackground source={require('../Assets/Images/bombaybg.png')} style={styles.cont}>
            <Header title={"Order Status"} />
            {data !== null &&
            <>
                <ProgressSteps
                    borderWidth={4}
                    progressBarColor={Colors.primary}
                    completedProgressBarColor={Colors.primary}
                    completedStepIconColor={Colors.primary}
                    activeStepIconColor={Colors.primary}
                    activeStep={status}
                    activeLabelColor='black'>
                    <ProgressStep label='Received' removeBtnRow={true}>
                        {showData()}
                    </ProgressStep>
                    <ProgressStep label='Cooking' removeBtnRow={true}>
                        {showData()}
                    </ProgressStep>
                    <ProgressStep label='On The Way' removeBtnRow={true}>
                        {showData()}
                    </ProgressStep>
                    <ProgressStep label='Delivered' removeBtnRow={true}>
                        {showData()}
                    </ProgressStep>
                </ProgressSteps>
            </>
            }
            {/* <BottomTab /> */}
        </ImageBackground>
    );
};

export default OrderStatus;

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 16, color: 'black', textTransform: 'capitalize'
    }
});
