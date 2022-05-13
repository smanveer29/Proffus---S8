import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../Helper/Colors'
import { dfrcsb, h2, p } from '../../Helper/styles'
import CustomButton from '../CustomButton'
import { useNavigation } from '@react-navigation/native'

const InviteAndEarn = () => {
   const navigation=useNavigation()
   return (
      <View style={styles.cont}>
         <Text style={{ ...p, fontWeight: '900', marginVertical: 10 }}>Earn ₹ 750 for every Friend you Refer</Text>
         <View style={{ ...dfrcsb }}>
         <View style={{width:'50%'}}>
            <Text style={{ ...p}}>Ornare tellus cursus vestibulum purus luctus posuere facilisi. Purus faucibus in id eget quisque mauris tristique in nunc.</Text>
            <CustomButton
               title="Refer Now"
               onPress={()=>navigation.navigate('Refer')}
               style={{height:40,marginVertical:5}} 
            />
         </View>
            <Image source={require('../../Assets/Images/invite.png')}/>
         </View>
      </View>
   )
}

export default InviteAndEarn

const styles = StyleSheet.create({
   cont: {
      backgroundColor: Colors.secondary,
      height: 200, paddingHorizontal: 15,marginBottom:70
   }
})