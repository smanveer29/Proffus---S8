import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../Helper/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DraggablePanel from 'react-native-draggable-panel';
import Entypo from 'react-native-vector-icons/Entypo';
import Share from 'react-native-share';
const showToastWithGravityAndOffset = (flag) => {
    ToastAndroid.showWithGravityAndOffset(
        `${flag}`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        25
    );
};

const ItemDetailCard = ({ data, top, wish }) => {
    const navigation = useNavigation()
    const user = auth().currentUser
    const [showPannel, setShowPannel] = useState(false)
    const [fav, setFav] = useState(false)
    const [favsList, setFavsList] = useState([])

    useEffect(() => {
        if (user) return firestore().collection('users')
            .doc(user.uid)
            .collection('Wishlist')
            .onSnapshot(e => setFavsList(e.docs.map(doc => doc.id)))
    }, [user, fav, data, favsList])
    const showDragg = () => {
        return (
            <DraggablePanel
                animationDuration={600}
                expandable={true}
                hideable={true}
                borderRadius={20}
                visible={showPannel}
                
                onDismiss={() => setShowPannel(false)}
            >
                <ScrollView>
                    <ImageBackground source={require('../Assets/Images/bombaybg.png')} style={{ marginHorizontal: 10, marginVertical: 30 }}>
                        <Image source={{ uri: data.image_url }} style={{ resizeMode: 'contain', width: 150, height: 150, borderRadius: 100, alignSelf: 'center' }} />
                        <Text style={{ ...styles.text, fontSize: 16, color: 'black', marginTop: 20 }}>{data.name}</Text>
                        <Text style={{ ...styles.text, borderBottomWidth: 0.6, borderColor: Colors.primary }}>{data.quantity}</Text>
                        <Text style={{ ...styles.text, fontSize: 18, fontWeight: 'bold', color: 'black' }}>{' \u20B9. '}{data.price}</Text>
                        {data?.description ? 
                        <View>
                            <Text style={{ ...styles.text }}>More Details...</Text>
                            <Text style={{ ...styles.text, textAlign: 'justify' }}>{data.description}</Text>
                        </View>
                        :
                            null
                        }
                        {!wish &&
                            <View style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 30 }}>
                                <TouchableOpacity onPress={user && selectedItem} style={{ ...styles.pannelBtn }}>
                                    <Text style={{ ...styles.text, color: 'white', fontWeight: 'bold', fontSize: 18 }}>Add To Cart</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ ...styles.pannelBtn, backgroundColor: Colors.textColor }} onPress={() => addFav(data)}>
                                    <Text style={{ ...styles.text, color: 'white', fontWeight: 'bold', fontSize: 18 }}>{fav ? "Remove from Favorites" : "Add To Favorites"}</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </ImageBackground>
                </ScrollView>
            </DraggablePanel>
        )

    }

    const checkFav = () => {
        favsList.length > 0 ? favsList.map(e => {
            if (e === data.id) {
                setFav(true)
            }
        })
            : setFav(false)
    }
    useEffect(() => {
        checkFav()
    }, [favsList, fav, data]);


    const shareItem = async (data) => {
        const options = {
            url: data.image_url,
            message: `Checkout This product With price-'\u20B9'${data.price}`
        }
        try {
            Share.open(options)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    err && alert(err);
                });
        } catch (e) {
            alert(e.message)
        }
    }
    const addFav = async () => {
        const favRef = firestore().collection('users').doc(user.uid)
        if (fav) {
            await favRef.collection('Wishlist').doc(data.id).delete()
                .then(() => setFav(false))
            showToastWithGravityAndOffset("Removed From Favs")
            checkFav()
        }
        else {
            await favRef
                .collection('Wishlist')
                .doc(data.id)
                .set({
                    item_id: data.id,
                    name: data.name,
                    price: data.price,
                    mrp: data.mrp,
                    quantity: data.quantity,
                    image_url: data.image_url
                })
                .then(() => {
                    setFav(true)
                    showToastWithGravityAndOffset("Added To Favs")
                })
            checkFav()
        }
        checkFav()
    }

    const selectedItem = () => {
        const cartRef = firestore().collection('users').doc(user.uid).collection('Cart')
        let added = false
        cartRef.doc(data.id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    cartRef.doc(doc.id).set({ total: doc.data().total + 1, }, { merge: true });
                    added = true;
                }
            }).then(() => {
                if (!added)
                    cartRef.doc(data.id).set({ ...data, total: 1, })
            }).catch((err) => { console.log(err) })
        showToastWithGravityAndOffset("Item Added To Cart")
    }
    const remove = async () => {
        if (user) {
            const favRef = firestore().collection('users').doc(user.uid)
            await favRef
                .collection('Wishlist')
                .doc(data.item_id)
                .delete()
        }
    }
    return (
        <TouchableOpacity style={top ? styles.contTop : styles.cont} onPress={() => setShowPannel(true)}>
            {showPannel && showDragg()}
            {wish &&
                <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={remove}>
                    <Entypo name="cross" size={25} color="red" />
                </TouchableOpacity>}
            <View style={{ flex: 0.8,justifyContent:'space-between' }}>
                <Image source={{ uri: data.image_url }} style={{ resizeMode: 'contain', width: 100, height: 100, alignSelf: 'center', borderRadius: 100, marginVertical: 10 }} />
                <Text style={{ ...styles.text }}>{data.name}</Text>
                <Text style={{ ...styles.text }}>{data.quantity}</Text>
            </View>

            <View style={{ flex: 0.2, justifyContent: 'space-evenly', borderTopWidth: 0.5, borderColor: Colors.primary }}>
                <Text style={{ ...styles.text, fontSize: 18, fontWeight: 'bold', color: 'black' }}>{' \u20B9. '}{data.price}</Text>
                {!wish &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10 }}>
                        <TouchableOpacity onPress={() => shareItem(data)}>
                            <Icon name="share-alt" size={20} color={Colors.primary} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={user && selectedItem}>
                            <Icon name="cart-plus" size={20} color={Colors.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => addFav(data)}>
                            <Icon name={fav ? "heart" : "heart-o"} size={20} color={fav ? "red" : Colors.primary} />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </TouchableOpacity>
    );
};

export default ItemDetailCard;

const styles = StyleSheet.create({
    cont: {
        width: 160,
        borderRadius: 20,
        elevation: 3,
        padding: 2,
        backgroundColor: '#fff',
        marginHorizontal: 4,
        marginVertical: 5,
        borderRadius: 10
    },
    text: {
        paddingVertical: 5,
        color: 'grey',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        paddingHorizontal: 10
    },
    contTop: {
        width: Dimensions.get('window').width / 2.3,
        padding: 8,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#fff',
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 10
    },
    pannelBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
        backgroundColor: Colors.primary,
        borderRadius: 20,
        width: Dimensions.get('screen').width / 1.5
    }
});
