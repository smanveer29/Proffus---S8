import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './src/Screens/SplashScreen';
import CategoriesScreen from './src/Screens/CategoriesScreen';
import CheckoutScreen from './src/Screens/CheckoutScreen';
import HomeScreen from './src/Screens/TabScreens/HomeScreen';
import CartScreen from './src/Screens/TabScreens/CartScreen';
import ProfileScreen from './src/Screens/TabScreens/ProfileScreen';
import OrderNowScreen from './src/Screens/OrderNowScreen';
import NotificationScreen from './src/Screens/NotificationScreen';
import OrderStatus from './src/Screens/OrderStatus';
import AddCategory from './src/Helper/AddCategory';
import LoginScreen from './src/Screens/AuthScreens.js/LoginScreen';
import RegisterScreen from './src/Screens/AuthScreens.js/RegisterScreen';
import ForgetPassword from './src/Screens/AuthScreens.js/ForgetPassword';
import { Provider } from 'react-redux';
import configureStore from './src/Redux/store';
import TopSelling from './src/Screens/TopSelling';
import WishListScreen from './src/Screens/WishListScreen';
import SearchView from './src/Screens/SearchView';
import SelectedSubCategories from './src/Screens/SelectedSubCategories';
import OrderList from './src/Screens/OrderList';
import OrderDetails from './src/Screens/OrderDetails';
import ResetPassword from './src/Screens/AuthScreens.js/ResetPassword';
import AboutScreen from './src/Screens/AboutScreen';
import ServiceDetails from './src/Screens/ServiceDetails';
import CarrierScreen from './src/Screens/TabScreens/CarrierScreen';
import ReferAndEarn from './src/Screens/ReferAndEarn';
import Wallet from './src/Screens/Wallet';
import store from './src/Redux/store';
import AddAddress from './src/Screens/AddAddress';
import ServicesByCategory from './src/Screens/ServicesByCategory';
const Stack = createStackNavigator();
const options = {
  headerShown: false
}
const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        animated={true}
        barStyle='light-content'
      // translucent={true}
      />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen name="AddCat" component={AddCategory} /> */}
            <Stack.Screen name="Splash" component={SplashScreen} options={options} />
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={RegisterScreen} />
              <Stack.Screen name="Forget" component={ForgetPassword} />
              <Stack.Screen name="Reset" component={ResetPassword} />
            </Stack.Group>

            <Stack.Group screenOptions={{ ...horizontalAnimation, headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Categories" component={CategoriesScreen} />
              <Stack.Screen name="Carrier" component={CarrierScreen} />
              <Stack.Screen name="CheckOut" component={CheckoutScreen} />
              <Stack.Screen name="Cart" component={CartScreen} />
              <Stack.Screen name="List" component={SearchView} />
              <Stack.Screen name="WishList" component={WishListScreen} />
              <Stack.Screen name="Top" component={TopSelling} />
              <Stack.Screen name="SelectedSubCat" component={SelectedSubCategories} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="OrderNow" component={OrderNowScreen} />
              <Stack.Screen name="OrderStatus" component={OrderStatus} />
              <Stack.Screen name="OrdersList" component={OrderList} />
              <Stack.Screen name="OrderDetail" component={OrderDetails} />
              <Stack.Screen name="About" component={AboutScreen} />
              <Stack.Screen name="Notification" component={NotificationScreen} />
            </Stack.Group>

            <Stack.Group screenOptions={{ ...verticalAnimation, headerShown: false }}>
              <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
              <Stack.Screen name="ServicesByCategory" component={ServicesByCategory} />
              <Stack.Screen name="AddAddress" component={AddAddress} />
              <Stack.Screen name="Refer" component={ReferAndEarn} />
              <Stack.Screen name="Wallet" component={Wallet} />
            </Stack.Group>

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

const horizontalAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
const verticalAnimation = {
  gestureDirection: 'vertical',
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
    };
  },
};
export default App;
const styles = StyleSheet.create({});
