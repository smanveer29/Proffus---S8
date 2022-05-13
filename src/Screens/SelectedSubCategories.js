import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import ItemDetailCard from '../Components/ItemDetailCard';
import { dfrcsb, h2, text } from '../Helper/styles';
import { selectedSubCat } from '../Helper/FakeData';
import axios from '../utils/axios'
import SelectedCatItemCard from '../Components/Categories/SelectedCatItemCard';
import Loading from '../Helper/Loading';

const SelectedSubCategories = ({ route }) => {
    const navigation = useNavigation()
    const scid = route.params.selected
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getServiceBySubCategory()
    }, [scid,navigation])
    

    const getServiceBySubCategory = async() =>{
        axios.get(`/rest/subcategory/${scid}`)
        .then(res=>{
            setLoading(false)
            setServices(res.data.results)
        })
    }
    if(loading) return <Loading/>
    return (
        <ImageBackground source={require('../Assets/Images/bombaybg.png')} style={styles.cont}>
            <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                <Text style={{ ...h2, fontWeight: 'bold' }}>{services.length>0 && services[0]?.sub_category?.name}</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} vertical={true}>
                <View>
                    {
                        services.map((item, index) => <SelectedCatItemCard data={item} key={index} />)
                    }
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default SelectedSubCategories;

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        backgroundColor: '#fff',
        // flexWrap: 'wrap', 
        // flexDirection: 'row', 
        // width: '100%', 
    }
});
