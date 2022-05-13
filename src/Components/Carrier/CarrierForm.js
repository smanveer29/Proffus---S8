import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { p } from '../../Helper/styles'
import CustomInput from '../CustomInput'
import CustomButton from '../CustomButton'

const CarrierForm = () => {
  return (
    <View style={styles.main}>
      <Text style={{...p,fontWeight:'bold'}}>Basic Details *</Text>
      <CustomInput
         label="Customer Name"
         outlined
         style={{backgroundColor:'#e5e5e5'}}
      />
      <CustomInput
         label="Mobile Number"
         outlined
         style={{backgroundColor:'#e5e5e5'}}
      />
      <Text style={{...p,fontWeight:'bold',marginVertical:15}}>More Details (optional)</Text>
      <CustomInput
         label="Email"
         outlined
         style={{backgroundColor:'#e5e5e5'}}
      />
      <CustomInput
         label="Pincode"
         outlined
         style={{backgroundColor:'#e5e5e5'}}
      />
      <CustomInput
         label="PAN Number"
         outlined
         style={{backgroundColor:'#e5e5e5'}}
      />

      <CustomButton
         style={{marginVertical:30,width:'40%',alignSelf:'center'}}
         title="Submit"
      />
    </View>
  )
}

export default CarrierForm

const styles = StyleSheet.create({
   main:{
      marginHorizontal:20,marginVertical:20
   }
})