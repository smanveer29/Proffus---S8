import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../Helper/Colors';

const CustomButton = ({style,onPress,title}) => {
  return (
    <TouchableOpacity style={[styles.btn,style]} onPress={onPress}>
        <Text style={{fontWeight: 'bold',color:'black'}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
    btn:{
        width:'100%',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Colors.primary,
        elevation:5,
        borderRadius:16,
    }
});
