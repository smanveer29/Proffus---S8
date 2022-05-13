import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { h2 } from '../Helper/styles'
import CustomInput from '../Components/CustomInput'
import CustomButton from '../Components/CustomButton'
import axios from '../utils/axios'
import { selectUser } from '../Redux/Reducers/userReducer'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
const dataClass = {
   name: '',
   address_1: '',
   address_2: '',
   city: '',
   telephone: '',
   state: '',
   pin_code: ''
}
const AddAddress = ({ route }) => {
   const navigation = useNavigation()
   const user = useSelector(selectUser)
   const address = route?.params?.address
   const screen = route?.params?.edit ? 'Edit' : 'Add'
   const [data, setData] = useState(address ? address :dataClass)

   console.log(user)
   console.log(address, "add")

   useEffect(() => {
      data['name'] = address?.name
      data['address_1'] = address?.address_1
      data['address_2'] = address?.address_2
      data['city'] = address?.city
      data['telephone'] = address?.telephone.slice(2, 13)
      data['state'] = address?.state
      data['pin_code'] = address?.pin_code
      data['user'] = address?.user
   }, [address])

   const addAddress = () => {
      axios.post('/rest/address', data, {
         headers: {
            Authorization: `Token ${user?.token}`
         }
      })
         .then(res => {
            console.log(res.data, "address")
            navigation.goBack()
         })
   }

   const editAddress = () => {
      axios.put(`/rest/address/${data.id}`, data, {
         headers: {
            Authorization: `Token ${user?.token}`
         }
      }).then(res => {
         console.log(res.data, "edit")
         navigation.goBack()
      }).catch(e => console.log(e, "edit address exception"))
   }
   return (
      <View style={styles.main}>
         <Text style={{ ...h2, fontWeight: '900' }}>{screen} Address</Text>

         <View style={{ marginVertical: 10 }}>
            <CustomInput
               value={data?.name}
               label="Name"
               outlined
               style={{ marginVertical: 5 }}
               onChangeText={e => setData({ ...data, name: e })}
            />
            <CustomInput
               value={data?.address_1}
               label="Address 1"
               outlined
               style={{ marginVertical: 5 }}
               onChangeText={e => setData({ ...data, address_1: e })}
            />
            <CustomInput
               value={data?.address_2}
               label="Address 2"
               outlined
               style={{ marginVertical: 5 }}
               onChangeText={e => setData({ ...data, address_2: e })}
            />
            <CustomInput
               value={data?.city}
               label="City"
               outlined
               style={{ marginVertical: 5 }}
               onChangeText={e => setData({ ...data, city: e })}
            />
            <CustomInput
               value={data?.telephone}
               label="Telephone"
               outlined
               keyboardType="numeric"
               style={{ marginVertical: 5 }}
               onChangeText={e => setData({ ...data, telephone: e })}
            />
            <CustomInput
               value={data?.state}
               label="State"
               outlined
               style={{ marginVertical: 5 }}
               onChangeText={e => setData({ ...data, state: e })}
            />
            <CustomInput
               value={data?.pin_code}
               label="PIN Code"
               outlined
               maxLength={6}
               keyboardType='numeric'
               style={{ marginVertical: 5 }}
               onChangeText={e => setData({ ...data, pin_code: e })}
            />


            <CustomButton
               title={screen}
               style={{ marginVertical: 20, width: '60%', alignSelf: 'center' }}
               onPress={screen === 'Edit' ? editAddress : addAddress}
            />
         </View>
      </View>
   )
}

export default AddAddress

const styles = StyleSheet.create({
   main: {
      flex: 1,
      backgroundColor: '#FFF', padding: 10
   }
})