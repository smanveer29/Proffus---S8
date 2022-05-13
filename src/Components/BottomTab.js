import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../Helper/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
const BottomTab = () => {
  const navigation = useNavigation()
  const [active,setActive] = useState('')
  const tabs = [
    { name: 'Home', screen: 'Home', icon: 'home' },
    { name: 'Category', screen: 'Categories', icon: 'th-large' },
    { name: 'Carrier', screen: 'Carrier', icon: 'file-text-o' },
    { name: 'Cart', screen: 'Cart', icon: 'shopping-bag' },
    { name: 'Profile', screen: 'Profile', icon: 'user-circle-o' },
  ]
  return (
    <View style={styles.tab}>
      {tabs.map((item, index) =>
        <TouchableOpacity style={item.name===active?styles.active:{ alignItems: 'center'}} key={index} onPress={() => {
          setActive(item.name)
          navigation.navigate(item.screen)
          }}>
          <Icon name={item.icon} color='white' size={20} />
          <Text style={{ fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', marginVertical: 5,color:'white' }}>{item.name}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  tab: {
    width: '100%',
    height: 80,
    position: 'absolute',
    bottom: -4,
    backgroundColor: Colors.primary,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },active:{
    alignItems: 'center',borderBottomWidth:1,borderColor:'#fff'
  }
});
