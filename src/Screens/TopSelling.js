import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ItemDetailCard from '../Components/ItemDetailCard';
import { Colors } from '../Helper/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import BottomTab from '../Components/BottomTab';
import { Header } from '../Helper/Header';
import SearchBar from '../Helper/SearchBar';

const TopSelling = ({route}) => {
    const data = route.params.data ? route.params.data:null
    const subCatData = firestore().collection('Sub-Categories');
    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const navigation = useNavigation()
    useEffect(() => {
        getSubCategories()
    }, [navigation]);
    const getSubCategories = () => {
        subCatData
            .get()
            .then(snapshot =>
                setSubCategories(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))))
            .then(() => setLoading(false))
    }
    console.log(data[0])
    return (
        <ImageBackground source={require('../Assets/Images/bombaybg.png')} style={styles.cont}>
        <Header title={data.length>0  ? data[0].category :route.params.name} />
            <SearchBar directory="top"/>
            {loading ? <ActivityIndicator size="large" color={Colors.primary} /> :
                <ScrollView vertical={true} showsVerticalScrollIndicator={false} style={{marginTop:10}}>
                    <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', padding: 10, marginBottom: '30%' }}>
                        {
                            !data ? subCategories.map(item => <ItemDetailCard data={item} key={item.id} top={true} />)
                            :
                            data.map(item => <ItemDetailCard data={item} key={item.id} top={true} />)
                        }
                    </View>
                </ScrollView>
            }
            <BottomTab />
        </ImageBackground>
    );
};

export default TopSelling;

const styles = StyleSheet.create({
    cont: {
        flex: 1, backgroundColor: '#fff'
    }
});
