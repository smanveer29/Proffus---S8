import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import Loading from '../Helper/Loading'
import { dfccc, dfrccc, h1, h2, p } from '../Helper/styles'
import SelectedCatItemCard from '../Components/Categories/SelectedCatItemCard'
const ServicesByCategory = ({ route }) => {
   const category = route.params.category
   const [services, setServices] = useState([])
   const [loading, setLoading] = useState(true)
   useEffect(() => {
      axios.get(`/rest/category/${category?.cid}`)
         .then(res => {
            setServices(res.data.results)
            setLoading(false)
         })
   }, [category])
   if (loading) return <Loading />
   return (
      <View style={styles.main}>
         <View style={{ marginVertical: 15 }}>
            <Text style={{ ...h2, marginHorizontal: 20 }}>{category?.name}</Text>
            <ScrollView style={{ marginVertical: 10 }} showsVerticalScrollIndicator={false} vertical={true}>
               {services.length > 0 ? services.map(item => <SelectedCatItemCard data={item} key={item?.sid} />)
                  : <Text style={{ ...h2, alignSelf: 'center',marginVertical:20}}>NO Data Found</Text>
               }
            </ScrollView>
         </View>
      </View>
   )
}

export default ServicesByCategory

const styles = StyleSheet.create({
   main: {
      flex: 1, backgroundColor: '#fff'
   }
})