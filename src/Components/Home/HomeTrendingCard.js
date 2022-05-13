import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../Helper/Colors'
import { dfrcsb, h2, p } from '../../Helper/styles'
import { useNavigation } from '@react-navigation/native'

const HomeTrendingCard = ({ data }) => {
   // const data=data.category
   console.log(data,"tre")
   const navigation =useNavigation()
   return (
      <TouchableOpacity style={styles.main} onPress={()=>navigation.navigate('ServiceDetails',{data:data})}>
         {/* <Image source={require('../../Assets/Images/bodygaurd.png')} /> */}
         <Image source={{uri:data?.image}} style={{resizeMode:'cover',flex:0.4,width:'100%',height:'100%'}}/>
         <View style={{ flex:0.6,marginHorizontal:10 }}>
            <Text style={{ fontSize: 13 }}>Trending</Text>
            <Text style={{ ...p, fontWeight: '900'}}>{data?.name}</Text>
            <Text style={{ ...p, fontSize: 10,textAlign: 'justify'}}>{data?.description.slice(0,100)}</Text>
            {/* <Text style={{ ...p, fontSize: 11, marginVertical: 10, borderTopWidth: 1, borderColor: '#c8c8c8', paddingVertical: 5 }}>{data.bookings}</Text> */}
         </View>
      </TouchableOpacity>
   )
}

export default HomeTrendingCard

const styles = StyleSheet.create({
   main: {
      ...dfrcsb,
      width: 240, height: 160,
      backgroundColor: Colors.secondary,
      padding: 10, marginHorizontal: 10
   }
})