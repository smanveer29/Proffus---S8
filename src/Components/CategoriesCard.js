import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../Helper/Colors';
import { useNavigation } from '@react-navigation/native';
import Icon from './ui/Icon';

const CategoriesCard = (props) => {
    const navigation = useNavigation()
    const [active, setActive] = useState(0)
    const subCategory = props?.sub ? props.sub : false
    let data = null
    if (props !== null) {
        data = props.data
    }

    console.log(data, "data")
    return (
        <TouchableOpacity style={{ ...styles.cont }}
            onPress={() => {
                if (subCategory) {
                    navigation.navigate('SelectedSubCat', { selected: data?.scid })
                }
                else {
                    setActive(data.cid)
                    props.select(data.cid)
                }
            }}
        >
            <View style={{ borderWidth: 1, borderColor: Colors.primary, backgroundColor: '#fff', padding: 10, borderRadius: 15, elevation: 3 }}>
                <Image source={{ uri: data?.image }} style={{ width: 50, height: 50, borderRadius: 10, padding: 5, resizeMode: "cover" }} />
            </View>
            <Text style={{ fontSize: 12, fontWeight: 'bold', paddingVertical: 5, color: 'black', textTransform: 'capitalize' }}>{data?.name}</Text>
        </TouchableOpacity>
    );
};

export default CategoriesCard;

const styles = StyleSheet.create({
    cont: {
        marginHorizontal: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    wrapCont: {
        width: '30%',
        alignItems: "center",
        justifyContent: 'center',
        marginVertical: 15
    }
});
