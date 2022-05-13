import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../Helper/Colors'
import { dfccc, h2, p } from '../../Helper/styles'

const ServiceOfferCard = ({data}) => {
  return (
    <View style={styles.card}>
      <Text style={{...p,fontWeight:'bold'}}>{data.title}</Text>
      <Text style={{color:'#000',fontSize:12}}>{data.desc}</Text>
      <View style={{...dfccc,position:'absolute',top:-20,right:-10,width:40,height:40,borderRadius:100,backgroundColor:Colors.primary,elevation:5}}>
        <Text style={{...p,color:'#000',fontSize:12}}>12%</Text> 
      </View>
    </View>
  )
}

export default ServiceOfferCard

const styles = StyleSheet.create({
   card:{
      width:200,
      height:100,
      borderWidth:1,borderColor:Colors.primary,
      borderRadius:5,padding:10,
      marginRight:15,marginVertical:20
   }
})