import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { dfr, dfrcc, dfrcsb, h2, p } from '../../Helper/styles'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Redux/Reducers/userReducer'
import axios from '../../utils/axios'
import { Colors } from '../../Helper/Colors'
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
const SelectAddress = ({ choose,addressId }) => {
   const user = useSelector(selectUser)
   const navigation = useNavigation()
   const [address, setAddress] = useState([])
   useEffect(() => {
      getAllAddress()
   }, [user])
   const getAllAddress = () => {
      axios.get('/rest/address', {
         headers: {
            Authorization: `Token ${user?.token}`
         }
      }).then(res => {
         setAddress(res.data.results)
      })
   }
   const editAddress = (flag) => {
      navigation.navigate('AddAddress', { edit: true, address: flag })
   }
   const deleteAddress = (id) => {
      axios.delete(`/rest/address/${id}`, {
         headers: { Authorization: `Token ${user?.token}` }
      })
         .then(res => {
            console.log(res.data, 'deelte')
            getAllAddress()
         }).catch(e => console.log(e, 'delete address exception'))
   }
   return (
      <View style={styles.main}>
         <Text style={{ ...h2, fontWeight: '900' }}>Select Address</Text>
         {
            address.length > 0 && address.map(item =>
               <TouchableOpacity key={item.id} style={{ ...dfrcsb, borderWidth: 1, borderColor: '#c8c8c8', padding: 10, borderRadius: 10, marginVertical: 10 }} onPress={() => {
                  choose(`${item?.name},${item?.address_1},${item?.address_2},${item?.address_1},${item?.city}`)
                  addressId(item?.id)
                  }}>
                  <View>
                     <Text style={{ ...p }}>{item?.name}</Text>
                     <Text style={{ ...p }}>{item?.address_1} , {item?.address_2}</Text>
                     <Text style={{ ...p }}>{item?.city} {item?.telephone}</Text>
                  </View>
                  <View style={{ ...dfr }}>
                     <Icon name="delete" color="red" size={22} style={{ marginHorizontal: 10 }} onPress={() => deleteAddress(item.id)} />
                     <Icon name="edit" color="black" size={22} style={{ marginHorizontal: 10 }} onPress={() => editAddress(item)} />
                  </View>
               </TouchableOpacity>)
         }
         <TouchableOpacity style={{ ...dfrcc, width: '40%', backgroundColor: Colors.primary, alignSelf: 'center', padding: 10, borderRadius: 15 ,marginVertical:20}}
            onPress={() => navigation.navigate('AddAddress', { add: true })}>
            <Text style={{ ...p }}>+ Add Address</Text>
         </TouchableOpacity>
      </View>
   )
}

export default SelectAddress

const styles = StyleSheet.create({
   main: {
      marginHorizontal: 20, marginVertical: 10
   }
})