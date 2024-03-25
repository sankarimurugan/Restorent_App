import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../components/Login/LoginScreen';
import SignUp from '../components/Login/SignUp';
import ForgetPassword from '../components/Login/ForgetPassword';
// import HomeScreen from '../screens/HomeScreen';
import Drawer from '../components/drawer/Drawer';
import EmptyAddress from '../components/address/EmptyAddress';
import AddAddress from '../components/address/AddAddress';
import TableDateTime from '../components/tablebooking/TableDateTime';
import TableBooking from '../components/tablebooking/TableBooking';
import TableBookingDetails from '../components/tablebooking/TableBookingDetails';
import FoodOrderList from '../components/tablebooking/FoodOrderList';
import FoodDetailPage from '../components/tablebooking/FoodDetailPage';
import FoodCheckOutPage from '../components/tablebooking/FoodCheckOut';
import BookingSuccess from '../components/tablebooking/BookingSuccess';
import CartPage from '../components/tablebooking/CartPage';
import FoodDeliveryList from '../components/fooddelivery/FoodDeliveryList';
import FoodDeliveryDetail from '../components/fooddelivery/FoodDeliveryDetail';
import FoodCartPage from '../components/fooddelivery/FoodCartPage';
import FoodDeliveryCheckOut from '../components/fooddelivery/FoodDeliveryCheckOut';
import NewPassword from '../components/Login/NewPassword';
import AddressEditPage from '../components/address/AddressEditPage';
import SavedAddress from '../components/address/SavedAddress';
import TableReservationScreen from '../screens/TableReservationScreen';
import TableReservationDetailScreen from '../screens/TableReservationDetailScreen';
import OrdersScreen from '../screens/OrdersScreen';
import PhoneNumberVerifyScreen from '../screens/PhoneNumberVerifyScreen';
import OtpScreen from '../screens/OtpScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import QRCodeScannerScreen from '../screens/QRCodeScannerScreen';
import BookTableScreen from '../screens/BookTableScreen';
import CuisinListScreen from '../screens/CuisinListScreen';
import RecervationScreen from '../screens/RecervationScreen';
import FoodListScreen from '../screens/FoodListScreen';
import FavoritsScreen from '../screens/FavoritsScreen';
import AddressListScreen from '../screens/AddressListScreen';
import LocationFindScreen from '../screens/LocationFindScreen';
import HelpAndSupportScreen from '../screens/HelpAndSupportScreen';
import SavedAddressScreen from '../screens/SavedAddressScreen';
import TrackOrderScreen from '../screens/TrackOrderScreen';
import DirectionsExample from '../screens/DirectionExample';
import ProfileScreen from '../screens/ProfileScreen';

const MainStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="splash"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="splash" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="forgot_password" component={ForgetPassword} />
      <Stack.Screen name="phone_verify" component={PhoneNumberVerifyScreen} />
      {/* <Stack.Screen name="home" component={HomeScreen} /> */}
      <Stack.Screen name="home" component={HomeScreen} />
      {/* <Stack.Screen name="TableDateTime" component={TableDateTime} /> */}
      <Stack.Screen name="TableDateTime" component={BookTableScreen} />
      <Stack.Screen name="otp_screen" component={OtpScreen} />
      <Stack.Screen name="new_password" component={NewPasswordScreen} />
      <Stack.Screen name="charebook" component={TableBooking} />
      <Stack.Screen name="cuisinLisscreen" component={CuisinListScreen} />
      <Stack.Screen name="reservationscreen" component={RecervationScreen} />
      <Stack.Screen name="foodlist" component={FoodListScreen} />
      <Stack.Screen name="favorits" component={FavoritsScreen} />
      <Stack.Screen name="address" component={AddressListScreen} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
      <Stack.Screen name="setlocation" component={LocationFindScreen} />
      <Stack.Screen name="help&support" component={HelpAndSupportScreen} />
      <Stack.Screen name="orders" component={OrdersScreen} />
      <Stack.Screen name="savedaddress" component={SavedAddressScreen} />
      <Stack.Screen name="trackorder" component={TrackOrderScreen} />
      <Stack.Screen name="profile" component={ProfileScreen} />
      {/* <Stack.Screen name="trackorder" component={DirectionsExample} /> */}

      {/* My code end */}

      <Stack.Screen name="Drawer" component={Drawer} />
      <Stack.Screen name="EmptyAddress" component={EmptyAddress} />

      <Stack.Screen
        name="TableBookingDetails"
        component={TableBookingDetails}
      />
      <Stack.Screen name="TableBooking" component={TableBooking} />
      <Stack.Screen name="FoodOrderList" component={FoodOrderList} />
      <Stack.Screen name="FoodDetailPage" component={FoodDetailPage} />
      <Stack.Screen name="FoodCheckOut" component={FoodCheckOutPage} />
      <Stack.Screen name="BookingSuccess" component={BookingSuccess} />
      <Stack.Screen name="CartPage" component={CartPage} />
      <Stack.Screen name="FoodDeliveryList" component={FoodDeliveryList} />
      <Stack.Screen name="FoodDeliveryDetail" component={FoodDeliveryDetail} />
      <Stack.Screen name="FoodCartPage" component={FoodCartPage} />
      <Stack.Screen
        name="FoodDeliveryCheckOut"
        component={FoodDeliveryCheckOut}
      />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="AddressEditPage" component={AddressEditPage} />
      <Stack.Screen name="SavedAddress" component={SavedAddress} />
      <Stack.Screen name="qr-scanner" component={QRCodeScannerScreen} />

      <Stack.Screen
        name="TableReservation"
        component={TableReservationScreen}
      />
      <Stack.Screen
        name="TableDetail"
        component={TableReservationDetailScreen}
      />
      <Stack.Screen name="order" component={OrdersScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
