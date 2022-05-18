import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../Helper/Colors';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign';
import CategoriesCard from '../Components/CategoriesCard';
import BottomTab from '../Components/BottomTab';
import firestore from '@react-native-firebase/firestore';
import {Header} from '../Helper/Header';
import SearchBar from '../Helper/SearchBar';
import {Categories} from '../Helper/FakeData';
import axios from '../utils/axios';
import Loading from '../Helper/Loading';
import {dfccc, h2} from '../Helper/styles';
const subCat = [
  {label: 'Vehile Washing', icon: require('../Assets/Images/acFilter.png')},
  {label: 'Interior Cleaning', icon: require('../Assets/Images/acFilter.png')},
  {label: 'AC Filter Cleaning', icon: require('../Assets/Images/acFilter.png')},
];
const CategoriesScreen = ({route}) => {
  const catData = firestore().collection('Categories');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    axios.get('/rest/categories').then(res => {
      setLoading(false);
      setCategories(res.data.results);
    });
  }, [navigation]);

  useEffect(() => {
    setLoading(true);
    if (selected) {
      axios.get(`/rest/category_sub/${selected}`).then(res => {
        setLoading(false);
        setSubCategories(res.data.results);
      });
    }
  }, [selected]);

  if (loading) return <Loading />;
  return (
    <View style={styles.cont}>
      <View style={{marginHorizontal: 20, marginVertical: 10}}>
        <Text style={{...styles.text, fontWeight: 'bold'}}>Categories</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          {categories.length > 0 &&
            categories.map((item, i) => (
              <CategoriesCard
                data={item}
                key={item.cid}
                select={e => setSelected(e)}
              />
            ))}
        </View>
      </View>

      <View
        style={{
          borderTopWidth: 2,
          borderColor: Colors.primary,
          marginHorizontal: 20,
          marginVertical: 10,
        }}>
        <Icon
          name="caretdown"
          size={19}
          color={Colors.primary}
          style={{alignSelf: 'center'}}
        />
      </View>
      {selected && (
        <View style={{marginHorizontal: 20, marginVertical: 10}}>
          <Text style={{...styles.text, fontWeight: 'bold'}}>
            Sub Categories
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
              marginHorizontal: 20,
              flexWrap: 'wrap',
            }}>
            {subCategories.length > 0 ? (
              subCategories.map((item, i) => (
                <CategoriesCard data={item} key={i} sub={true} />
              ))
            ) : (
              <Text style={{...dfccc, ...h2}}>No Data</Text>
            )}
          </View>
        </View>
      )}
      <BottomTab />
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
    textTransform: 'capitalize',
  },
});
