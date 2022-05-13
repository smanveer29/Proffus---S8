import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';
import { Colors } from '../Helper/Colors';

const CustomInput = (props) => {
  return (
    <TextInput
      mode={props?.outlined?'outlined':'flat'}
      activeOutlineColor={Colors.primary}
      outlineColor="#c8c8c8"
      underlineColorAndroid={'transparent'}
      underlineColor="transparent"
      onSubmitEditing={props?.onSubmit}
      theme={{ colors: { primary: Colors.primary },roundness:10 }}
      style={styles.input}
      {...props}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: 'transparent'
  }
});
