import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Header } from '../Helper/Header';
const SearchView = ({ route }) => {
  const [data, setData] = useState([])
  const navigation = useNavigation()
  const item = route.params.item

  return (
    <ImageBackground source={require('../Assets/Images/bombaybg.png')} style={styles.cont}>
      <Header title={route.params.item.type} />
      <Image source={{ uri: item.image_url }} style={{ width: '90%', height: Dimensions.get('window').height / 3, resizeMode: 'contain', alignSelf: 'center' }} />
      <Text style={{ ...styles.text, fontSize: 18, fontWeight: '800' }}>{item.name}</Text>
      <Text style={{ ...styles.text, fontSize: 16 }}>{item.quantity}</Text>
      <Text style={{ ...styles.text, fontSize: 16, fontWeight: '600' }}>{'\u20B9 '}{item.price}</Text>
      <Text style={{ ...styles.text, fontSize: 14, }}>More Details...</Text>
      <Text style={{ ...styles.text, fontSize: 14, textAlign: 'justify' }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </Text>
    </ImageBackground>
  );
};

export default SearchView;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    paddingHorizontal: 30
  }, text: {
    color: 'black',
    textTransform: 'capitalize',
    marginVertical: 5
  }
});
