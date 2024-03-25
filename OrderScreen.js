import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
} from 'react-native';
import {C, F} from '../assets/styles/ColorsFonts';
import CommonHeader from '../components/Header/CommonHeader';
import {fS} from '../constants/Loader/Loader';
import OutgoingOrderList from '../components/Order/OutgoingOrderList';
import CompletedOrderList from '../components/Order/CompletedOrderList';

const OrdersScreen = () => {
  const [onGoing, setOnGoing] = useState(true);
  const [completed, setCompleted] = useState(false);
  const onPressOngoingHandler = () => {
    setOnGoing(true);
    setCompleted(false);
  };
  const onPressCompletedHandler = () => {
    setOnGoing(false);
    setCompleted(true);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroungColor: C.WHITE}}>
      <CommonHeader title="Orders" />
      <View style={{padding: 10, flexDirection: 'row', width: '100%'}}>
        <TouchableOpacity
          onPress={() => onPressOngoingHandler()}
          style={{width: '50%', alignItems: 'center'}}>
          <Text style={[styles.tabText, {color: onGoing ? '#000' : C.grey}]}>
            Ongoing
          </Text>
          <View
            style={[
              styles.btmView,
              {
                backgroundColor: onGoing ? C.LIGHT_ORANGE : 'transparent',
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPressCompletedHandler()}
          style={{width: '50%', alignItems: 'center'}}>
          <Text style={[styles.tabText, {color: !onGoing ? '#000' : C.grey}]}>
            Completed
          </Text>
          <View
            style={[
              styles.btmView,
              {
                backgroundColor: !onGoing ? C.LIGHT_ORANGE : 'transparent',
              },
            ]}
          />
        </TouchableOpacity>
      </View>
      {onGoing ? <OutgoingOrderList /> : <CompletedOrderList />}
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  tabText: {
    fontFamily: F.f3,
    fontSize: fS(20),
  },
  btmView: {
    width: '75%',
    height: fS(5),
    marginTop: 10,
    borderRadius: 20,
  },
});
