import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { dfr, h2, p } from '../../Helper/styles';
import UserImageViewer from '../ui/UserImageViewer';
const CustomerReviewsCard = () => {
   return (
      <View style={styles.card}>
         <View style={{ ...dfr, marginVertical: 10 }}>
            <UserImageViewer name="Harshit" />
            <View style={{ alignItems: 'center' }}>
               <Text style={{ ...h2, marginHorizontal: 10, fontWeight: 'bold' }}>Harshit Dubey</Text>
               <Rating
                  imageSize={20}
                  readonly
                  startingValue={3.5}
                  style={{ marginLeft: -15 }}
               />
            </View>
         </View>
         <Text style={{ ...p, textAlign: 'justify',fontSize:11 }}>Morbi condimentum morbi turpis tortor, cursus diam placerat. Sit sit eu tincidunt ullamcorper sit egestas id sed est. Nulla a ultricies ac fermentum morbi sollicitudin dignissim pulvinar quisque.</Text>
      </View>
   )
}

export default CustomerReviewsCard

const styles = StyleSheet.create({
   card: {
      width: '90%',
      height: 180,
      padding: 10, backgroundColor: '#fff', elevation: 5, alignSelf: 'center',
      borderRadius: 15, marginVertical: 20
   }
})