import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../Helper/Colors'
import { dfcsb, p } from '../../Helper/styles'
import Icon from '../ui/Icon'
import { useNavigation } from '@react-navigation/native'

const HomeServicesCard = ({ data }) => {
   const navigation=useNavigation()
   return (
      <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('ServicesByCategory',{category:data})}>
         <Image
            // source={require('../../Assets/Images/homeservice.png')} 
            source={{ uri: data?.image }}
            style={{ width: '90%', resizeMode: 'contain', height: 50 }} />
         <Text style={{ ...p, textAlign: 'center', fontSize: 10,width:'100%',fontWeight: 'bold' }}>{data?.name}</Text>
      </TouchableOpacity>
   )
}

export default HomeServicesCard

const styles = StyleSheet.create({
   card: {
      ...dfcsb,
      width: '24%',
      height: 90,
      backgroundColor: Colors.secondary,
      padding: 5,
      marginHorizontal: 2, alignItems: 'center'
   }
})