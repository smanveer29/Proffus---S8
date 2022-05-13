import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../Helper/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
const SocialMediaCard = (props) => {
    const data=props.data
  return (
    <TouchableOpacity style={styles.cont}>
      <View style={{flexDirection:'row',alignItems: 'center',paddingHorizontal:20}}>
          <Icon name={data.icon} size={30} color='grey'/>
          <Text style={{fontSize:18,fontWeight:'bold',paddingHorizontal:15}}>{data.id}</Text>
      </View>
      <View style={{paddingHorizontal:30}}>
      <Icon name='share-alt' size={26} color='grey'/>
      </View>
    </TouchableOpacity>
  );
};

export default SocialMediaCard;

const styles = StyleSheet.create({
    cont:{
        width:'90%',
        backgroundColor:Colors.primary,
        margin:10,
        paddingVertical:25,borderRadius:16,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        marginVertical:10
    }
});
