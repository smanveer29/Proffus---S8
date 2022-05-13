import { ActivityIndicator, Alert, Dimensions, ImageBackground, KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../Components/CustomButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DraggablePanel from 'react-native-draggable-panel';
import { Colors } from '../../Helper/Colors';
import CustomInput from '../../Components/CustomInput'
import LottieView from 'lottie-react-native';
import BottomTab from '../../Components/BottomTab';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { profileDetails } from '../../Helper/FakeData';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../Redux/Reducers/userReducer';
import EncryptedStorage from 'react-native-encrypted-storage';
import { userLogout } from '../../Redux/actions/user';
const ProfileScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [data, setData] = useState(null)
  const [userAddress, setUserAddress] = useState('')
  const [userName, setUserName] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPannel, setShowPannel] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const user = useSelector(selectUser)

  const info = [
    { label: 'Orders', icon: 'clipboard-list',screen:'OrdersList' },
    { label: 'Wallet', icon: 'wallet',screen:'Wallet' },
    { label: 'Coupons', icon: 'money-bill' },
  ]
  const logout=async()=>{
    await EncryptedStorage.clear()
    dispatch(userLogout())
    navigation.reset({
      index:0,
      routes:[{name: 'Splash',}]
    })
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Account',
      headerStyle: {
        shadowColor: '#000',
      },
    })
  }, [navigation]);

  const ProfileCard = ({ data }) => {
    return (<TouchableOpacity style={{ alignItems: 'center' }} onPress={()=>data.screen && navigation.navigate(data.screen)}>
      <Icon name={data.icon} size={18} color='#000' style={{ backgroundColor: Colors.primary, padding: 10, borderRadius: 100, width: 60, height: 60, textAlign: 'center', textAlignVertical: 'center' }} />
      <Text style={{ ...styles.text, fontWeight: 'bold' }}>{data.label}</Text>
    </TouchableOpacity>
    )
  }
  return (
    <ImageBackground source={require('../../Assets/Images/bombaybg.png')} style={styles.cont}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <Text style={{ ...styles.text, fontWeight: '800', fontSize: 22 }}>Hello,<Text style={{ fontWeight: 'bold' }}>{user?.name}</Text>
        </Text>
        <Text style={{ ...styles.text, fontWeight: '500', fontSize: 14 }}>{user?.ph_number}</Text>

        <View style={{ ...styles.borderCard, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 30 }}>
          {
            info.map((item, index) => <ProfileCard data={item} key={index} />)
          }
        </View>
        {/* Refer earn info */}
        <TouchableOpacity style={{ ...styles.card, padding: 15, flexDirection: 'row', marginVertical: 15 }} onPress={() => navigation.navigate("Refer")}>
          <Text style={{ ...styles.text, fontSize: 23, backgroundColor: Colors.primary, width: 40, height: 40, borderRadius: 100, elevation: 4, textAlignVertical: 'center', textAlign: 'center' }}>{`\u20B9`}</Text>
          <View style={{ marginHorizontal: 15 }}>
            <Text style={{ ...styles.text }}>Refer & Earn</Text>
            <Text style={{ ...styles.text, fontWeight: 'bold', fontSize: 17 }}>{`\u20B9 `}{user?.earned_points}</Text>
          </View>
          <Icon name="angle-right" size={12} color="#000" style={{ alignSelf: 'flex-end', textAlignVertical: 'center', position: 'absolute', right: 10, top: 10, bottom: 10 }} />
        </TouchableOpacity>
        <View style={{ ...styles.borderCard }}>
          {
            profileDetails.map((item, i) => <TouchableOpacity key={i} style={styles.settingsCard}>
              <Icon name={item.icon} size={16} color="black" />
              <Text style={{ ...styles.text, marginHorizontal: 20 }}>{item.label}</Text>
              <Icon name="angle-right" size={16} color="black" style={{ position: 'absolute', right: 10 }} />
            </TouchableOpacity>)
          }
        </View>
        <TouchableOpacity style={{ alignSelf: 'center', marginVertical: 20 }}
        onPress={logout}
        >
          <Text style={{ ...styles.text, color: 'red', fontSize: 18, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 'bold' }}>Logout</Text>
        </TouchableOpacity>
      </View>
      <BottomTab />
    </ImageBackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 30,
  },
  btn: {
    width: Dimensions.get('window').width / 1.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 17,
    borderRadius: 15,
    marginTop: 8,
    elevation: 1
  },
  settingsCard: {
    flexDirection: 'row',
    alignItems: 'center', marginVertical: 10
  },
  editBtn: {
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
    padding: 17,
    borderRadius: 15,
    backgroundColor: Colors.textColor,
  },
  text: {
    // color:Colors.primary,
    textTransform: 'capitalize',
    marginTop: 5, color: '#000'
  },
  card: {
    backgroundColor: Colors.secondary, borderRadius: 10,
    elevation: 10
  }, borderCard: {
    borderBottomWidth: 1, borderTopWidth: 1, borderColor: Colors.primary, paddingVertical: 15, marginVertical: 10,
  }
});
