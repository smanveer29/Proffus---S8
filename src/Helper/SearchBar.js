import { BackHandler, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from './Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
const SearchBar = ({ directory }) => {
    const [search, setSearch] = useState('')
    const navigation = useNavigation()
    const [masterData, setMasterData] = useState([])
    const [filterData, setFilterData] = useState([])
    const [showList, setShowList] = useState(false)
    const fetchData = () => {
        firestore()
            .collection('Sub-Categories')
            .onSnapshot(e => {
                setMasterData(e.docs.map(doc => doc.data()))
                setFilterData(e.docs.map(doc => doc.data()))
            })
    }
    useEffect(() => {
        fetchData()
        BackHandler.addEventListener('hardwareBackPress', () => setShowList(false))
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', () => setShowList(false))
        }
    }, [navigation]);

    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                switch (directory) {
                    case "all": {
                        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase()
                        const textData = text.toUpperCase()
                        return itemData.indexOf(textData) > -1;
                    }
                    case 'top': {
                        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase()
                        const textData = text.toUpperCase()
                        return itemData.indexOf(textData) > -1;
                    }
                    case 'category': {
                        const itemData = item.type ? item.type.toUpperCase() : ''.toUpperCase()
                        const textData = text.toUpperCase()
                        return itemData.indexOf(textData) > -1;
                    }
                }
            })
            setFilterData(newData)
            setSearch(text)
        }
        else {
            setFilterData(masterData)
            setSearch(text)
        }
    }

    const ItemView = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemStyle} onPress={() => {
                setShowList(false)
                navigation.navigate('List', { item: item })
            }
            }>
                <Text style={{ color: 'black', fontSize: 16 }}>
                    {directory === 'all' && item.name.toUpperCase()}
                    {directory === 'top' && item.name.toUpperCase()}
                    {directory === 'category' && item.type.toUpperCase()}
                </Text>
            </TouchableOpacity>
        )
    }
    const ItemSeparatorView = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }} />
        )
    }
    return (
        <>
            <View style={{ alignItems: 'center', flexDirection: 'row-reverse', justifyContent: 'space-between', elevation: 10, backgroundColor: '#FFFFFF', marginHorizontal: 20, borderRadius: 15, marginTop: 20,paddingHorizontal:20 }}>
                <TextInput
                    placeholder="Search services & package"
                    onChangeText={(e) => searchFilter(e)}
                    value={search}
                    multiline={false}
                    underlineColorAndroid="transparent"
                    style={{ width: '90%' }}
                    onFocus={() => setShowList(true)}
                    // onBlur={() => setShowList(false)}
                // onPressOut={() => setShowList(false)}
                />
                <Icon name="search1" size={18} color={Colors.primary} />
            </View>
            {
                showList &&
                <FlatList
                    style={styles.list}
                    data={filterData}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                />
            }
        </>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    itemStyle: {
        padding: 10,
    },
    list: {
        // flex:1,
        position: 'absolute',
        backgroundColor: '#fff',
        zIndex: 200,
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 5,
        top: 80
    }
});
