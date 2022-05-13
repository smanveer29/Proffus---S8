import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomTab from '../../Components/BottomTab'
import CategoriesCard from '../../Components/CategoriesCard'
import { Categories } from '../../Helper/FakeData'
import { h2 } from '../../Helper/styles'
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../Helper/Colors'
import CarrierForm from '../../Components/Carrier/CarrierForm'

const CarrierScreen = () => {
   return (
      <View style={styles.cont}>
         <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
            <Text style={{ ...h2, fontWeight: 'bold' }}>Carrier</Text>
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
               {
                  Categories.map((item, i) => <CategoriesCard data={item} key={i} />)
               }
            </View> */}
         </View>
         <View style={{ borderTopWidth: 2, borderColor: Colors.primary, marginHorizontal: 20, }}>
            <Icon name="caretdown" size={19} color={Colors.primary} style={{ alignSelf: 'center' }} />
         </View>
         <CarrierForm/>
         <BottomTab />
      </View>
   )
}

export default CarrierScreen

const styles = StyleSheet.create({
   cont: {
      flex: 1, backgroundColor: '#fff'
   }
})