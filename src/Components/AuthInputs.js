import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';
import { Colors } from '../Helper/Colors';

const AuthInputs = (props) => {
  return (
    <TextInput
        mode='outlined'
        style={styles.input}
        // underlineColor='transparent'
        // activeUnderlineColor='transparent' 
        outlineColor='#c8c8c8'
        theme={{colors:{primary:Colors.primary,text:'#000'},roundness:20}}
        {...props}
    />
  );
};

export default AuthInputs;

const styles = StyleSheet.create({
    input:{
        width:'100%',
        backgroundColor:'#fff',
        elevation:10
    }
});
