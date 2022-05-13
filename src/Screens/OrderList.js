import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Colors } from '../Helper/Colors';
import { Header } from '../Helper/Header'
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/Reducers/userReducer';
import axios from '../utils/axios'
import Loading from '../Helper/Loading';
import { h2, p } from '../Helper/styles';
import { formatDateTimeSmall, formatUnixDateTime } from '../Helper/moment';
const OrderList = () => {
    const navigation = useNavigation()
    const user = useSelector(selectUser)
    const [orders, setOrders] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(true)
    console.log(user?.token)
    const getData = async () => {
        await axios.get('/rest/order', {
            headers: {
                Authorization: `Token ${user?.token}`
            }
        })
            .then(res => {
                setOrders(res.data.results)
                setLoading(false)
            })
    }
    useEffect(() => {
        getData()
    }, [user])

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = useCallback(() => {
        setRefresh(true)
        wait(2000)
            .then(() => {
                setRefresh(false)
            })
    }, []);
    if (loading) return <Loading />
    return (
        <ImageBackground source={require('../Assets/Images/bombaybg.png')} style={styles.cont}>
            <Text style={{ ...h2, fontWeight: '900', margin: 20 }}>My Orders</Text>
            <ScrollView style={{ width: '100%', flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={onRefresh}
                    />
                }>
                {orders.length > 0 ?
                    orders.map(item =>
                        <TouchableOpacity style={item.status === 'Delivered' ? styles.orderCard : styles.latestOrderCard} key={item.oid} onPress={() => navigation.navigate('OrderDetail', { data: item })}>
                            <Text style={{ ...p, alignSelf: 'flex-end', fontWeight: 'bold' }}>
                                {formatDateTimeSmall(item?.date_time)}
                            </Text>
                            {/* order id */}
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...styles.text, width: 100, fontWeight: '900' }}>order id :</Text>
                                <Text style={{ ...styles.text, }}>{item?.oid}</Text>
                            </View>
                            {/* Items */}
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...styles.text, width: 100, fontWeight: '900' }}>items :</Text>
                                <Text style={{ ...styles.text, }}>{item?.midorder_set?.length}</Text>
                            </View>
                            {/* PAid */}
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...styles.text, width: 100, fontWeight: '900' }}>paid :</Text>
                                <Text style={{ ...styles.text, }}>{'\u20B9 '}{parseInt(item?.total_amount).toFixed(2)}</Text>
                            </View>
                            {/* Status  */}
                            <View style={{
                                flexDirection: 'row', borderBottomWidth: 1,
                                borderColor: Colors.primary, paddingBottom: 20
                            }}>
                                <Text style={{ ...styles.text, width: 100, fontWeight: '900' }}>status :</Text>
                                <Text style={{ ...styles.text, }}>{item?.midorder_set[0]?.status}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                    : <View>
                        <Text>No Order History</Text>
                    </View>
                }
            </ScrollView>
        </ImageBackground>
    );
};

export default OrderList;

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        backgroundColor: '#fff',
    },
    orderCard: {
        width: '90%',
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingBottom: 30,
        borderRadius: 16,
        borderColor: Colors.primary,
        borderWidth: 1,
        alignSelf: 'center',
        opacity: 0.7
    }, text: {
        ...p,
        color: 'black',
        textTransform: 'capitalize',
        marginVertical: 2
    },
    latestOrderCard: {
        width: '90%',
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingBottom: 30,
        backgroundColor: Colors.active,
        borderRadius: 16, borderColor: Colors.primary,
        borderWidth: 1,
        alignSelf: 'center'
    }
});
