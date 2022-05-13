import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import firestore from '@react-native-firebase/firestore';
const AddCategory = () => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [mrp, setMrp] = useState(0);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState('');
    const [type, setType] = useState('');
    const subcategory = firestore().collection('Sub-Categories');
    const add=()=>{
        subcategory.add({
            name:name,
            image_url:image,
            quantity:quantity,
            mrp:mrp,
            price:price,
            type:type
        }).then(()=>{
            alert('Addded')
            setName('')
            setImage('')
            setPrice(0)
            setQuantity('')
            setMrp(0)
        })
    }
  return (
    <View>
    <Text>ADD</Text>
    <CustomInput label="image" value={image} onChangeText={(e)=>setImage(e)}/>
    <CustomInput label="name" value={name} onChangeText={(e)=>setName(e)}/>
    <CustomInput label="quantity" value={quantity} onChangeText={(e)=>setQuantity(e)}/>
    <CustomInput label="mrp" value={mrp} onChangeText={(e)=>setMrp(e)}/>
    <CustomInput label="price" value={price} onChangeText={(e)=>setPrice(e)}/>
    <CustomInput label="type" value={type} onChangeText={(e)=>setType(e)}/>
    <CustomButton title="Add" onPress={add}/>
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({

});
