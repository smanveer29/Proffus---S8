import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import BottomTab from '../Components/BottomTab';
import {Header} from '../Helper/Header'
const NotificationScreen = () => {
    const navigation = useNavigation()
  return (
    <ImageBackground source={require('../Assets/Images/bombaybg.png')} style={styles.cont}>
    <Header title={'Notifications'} notify={true}/>
      <Text>Notifications</Text>
      <BottomTab/>
    </ImageBackground>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
    cont:{
        flex:1
    }
});
