import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Header } from '../Helper/Header';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ItemDetailCard from '../Components/ItemDetailCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../Helper/Colors';
import LottieView from 'lottie-react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
const WishListScreen = ({ route }) => {
    const navigation = useNavigation()
    const [data, setData] = useState([])
    const user = auth().currentUser

    // const remove = async (item) => {
    //     if (user) {
    //         const favRef = firestore().collection('users').doc(user.uid)
    //         await favRef
    //             .collection('Wishlist')
    //             .doc(item)
    //             .delete().then(async() => {
    //                 let res = await EncryptedStorage.getItem('Favs')
    //                 if (res != null) {
    //                     res = JSON.parse(res)
    //                     res = res.filter(e => {
    //                         if(e != item) return e
    //                     })
    //                     console.log(res)
    //                     await EncryptedStorage.setItem('Favs', JSON.stringify(res))
    //                     console.log(res)
    //                 }
    //             })
    //     }
    // }

    useEffect(() => {
        if (user) {
            firestore()
                .collection('users')
                .doc(user.uid)
                .collection('Wishlist')
                .onSnapshot(e => setData(e.docs.map(doc => doc.data()))
                )
        }
    }, [user,navigation])

    console.log(data)
    return (
        <ImageBackground source={require('../Assets/Images/bombaybg.png')} style={styles.cont}>
            <Header title={route.name | 'Wishlist'} wish={true} />
            <ScrollView vertical={true} showVerticalScrollbar={false}>
                <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', padding: 10, marginVertical: 20 }}>
                    {data.length > 0 ?
                        data.map((item, index) =>
                            <View key={index}>
                                <ItemDetailCard data={item} top={true} wish={true} favs={data}/>
                                {/* <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={() => remove(item.item_id)}>
                                    <Entypo name="cross" size={25} color="red" />
                                </TouchableOpacity> */}
                            </View>
                        )
                        :
                        <View style={{ alignItems: "center" }}>
                            <LottieView source={require('../Assets/Animations/notFound.json')} autoPlay loop style={{ width: '100%', marginVertical: 20 }} />
                            <Text style={{ fontSize: 23, color: '#555', marginVertical: 30, letterSpacing: 2, textTransform: 'uppercase', fontWeight: '900' }}>Wishlist Empty</Text>
                        </View>
                    }
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default WishListScreen;

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
