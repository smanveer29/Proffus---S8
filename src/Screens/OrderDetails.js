import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Header } from '../Helper/Header';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { Colors } from '../Helper/Colors';
import CustomButton from '../Components/CustomButton';
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/Reducers/userReducer';
import { p } from '../Helper/styles';
import { formatDate, formatDateSmall } from '../Helper/moment';

const OrderDetails = ({ route }) => {
    const navigation = useNavigation()
    const user = useSelector(selectUser)
    const data = route.params.data
    const [loading, setLoading] = useState(false)
    useEffect(() => {

    }, [user])
    return (
        <ImageBackground source={require('../Assets/Images/bombaybg.png')} style={styles.cont}>
            <Header title='Check My Orders' />
            {loading ? <ActivityIndicator size="large" color={Colors.primary} />
                :
                <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 30, marginBottom: '30%' }}>
                        {/* order id */}
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ ...styles.text, width: 100, fontSize: 18 }}>Order id:</Text>
                            <Text style={{ ...styles.text, fontWeight: '900', fontSize: 18 }}>{data?.oid}</Text>
                        </View>
                        {/* Buyer */}
                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <Text style={{ ...styles.text, width: 100 }}>buyer:</Text>
                            <Text style={{ ...styles.text, fontWeight: '900' }}>{user?.name}</Text>
                        </View>
                        {/* Items */}
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ ...styles.text, width: 100 }}>items:</Text>
                            <Text style={{ ...styles.text, fontWeight: '900' }}>{data?.midorder_set.length}</Text>
                        </View>
                        {/* PAid */}
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ ...styles.text, width: 100 }}>paid:</Text>
                            <Text style={{ ...styles.text, fontWeight: '900' }}>{'\u20B9'}{parseInt(data?.total_amount).toFixed(2)}</Text>
                        </View>
                        {/* PAymewnt */}
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ ...styles.text, width: 100 }}>Payment:</Text>
                            <Text style={{ ...styles.text, fontWeight: '900' }}>{data?.payment_method}</Text>
                        </View>
                        {/* Status */}
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ ...styles.text, width: 100 }}>Status:</Text>
                            <Text style={{ ...styles.text, fontWeight: '900' }}>{data?.midorder_set[0]?.status}</Text>
                        </View>

                        {/* Delivery adddres */}
                        <Text style={{ ...styles.text, marginTop: 30, fontWeight: '800' }}>delivery address</Text>
                        <Text style={{ ...styles.text, marginTop: 20 }}>{data?.address}</Text>

                        {/* items */}
                        <Text style={{ ...styles.text, marginTop: 20, fontWeight: '800' }}>items</Text>

                        {data?.midorder_set.map((item, index) =>
                            <View style={{ borderBottomWidth: 1, borderColor: Colors.primary, paddingVertical: 14 }} key={index}>
                                <Text style={{ ...styles.text, marginTop: 5,fontWeight:'900' }}>{item?.service_name}</Text>
                                <Text style={{ ...p,alignSelf:'flex-end' }}>{formatDateSmall(item?.service_date)}{`\n`}{`\n`}{item?.start_time}-{item?.end_time}</Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            }
            {/* {data.status != "Delivered" &&
                <View style={{ position: 'absolute', bottom: 10, width: '100%', alignSelf: 'center' }}>
                    <CustomButton title="Track Order" onPress={() => navigation.navigate('OrderStatus', { orderId: data.order_id })} />
                </View>
            } */}
        </ImageBackground>
    );
};

export default OrderDetails;

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20
    },
    text: {
        ...p,
        textTransform: 'capitalize',
        color: 'black',
        marginHorizontal: 10,
    }
});
